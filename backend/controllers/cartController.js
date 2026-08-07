import Cart from '../models/Cart.js';

const getCartQuery = (req) => {
  if (req.user?._id) {
    return { user: req.user._id };
  }
  const guestId = req.headers['x-guest-id'] || req.body?.guestId || req.query?.guestId;
  if (guestId) {
    return { guestId };
  }
  return null;
};

// @desc    Get cart (User or Guest)
// @route   GET /api/cart
// @access  Public / Private
export const getCart = async (req, res) => {
  try {
    const guestId = req.headers['x-guest-id'] || req.query?.guestId;

    // If logged in, check if there's a guest cart to merge
    if (req.user?._id && guestId) {
      const guestCart = await Cart.findOne({ guestId });
      if (guestCart && guestCart.items.length > 0) {
        let userCart = await Cart.findOne({ user: req.user._id });
        if (!userCart) {
          userCart = new Cart({ user: req.user._id, items: [] });
        }
        for (const gItem of guestCart.items) {
          const idx = userCart.items.findIndex(i => i.product.toString() === gItem.product.toString());
          if (idx > -1) {
            userCart.items[idx].quantity += gItem.quantity;
          } else {
            userCart.items.push({ product: gItem.product, quantity: gItem.quantity });
          }
        }
        await userCart.save();
        await Cart.deleteOne({ _id: guestCart._id });
      }
    }

    const query = getCartQuery(req);
    if (!query) {
      return res.status(400).json({ message: 'User or Guest ID required' });
    }

    let cart = await Cart.findOne(query).populate('items.product');
    if (!cart) {
      cart = await Cart.create({ ...query, items: [] });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add item or update quantity in cart (User or Guest)
// @route   POST /api/cart
// @access  Public / Private
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const query = getCartQuery(req);

    if (!query) {
      return res.status(400).json({ message: 'User or Guest ID required' });
    }

    let cart = await Cart.findOne(query);

    if (!cart) {
      cart = new Cart({ ...query, items: [] });
    }

    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
    } else {
      cart.items.push({ product: productId, quantity: quantity || 1 });
    }

    await cart.save();
    cart = await Cart.findById(cart._id).populate('items.product');
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove item from cart (User or Guest)
// @route   DELETE /api/cart/:productId
// @access  Public / Private
export const removeFromCart = async (req, res) => {
  try {
    const query = getCartQuery(req);
    if (!query) {
      return res.status(400).json({ message: 'User or Guest ID required' });
    }

    let cart = await Cart.findOne(query);

    if (cart) {
      cart.items = cart.items.filter((item) => item.product.toString() !== req.params.productId);
      await cart.save();
      cart = await Cart.findById(cart._id).populate('items.product');
      res.json(cart);
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Clear cart (User or Guest)
// @route   DELETE /api/cart
// @access  Public / Private
export const clearCart = async (req, res) => {
  try {
    const query = getCartQuery(req);
    if (!query) {
      return res.status(400).json({ message: 'User or Guest ID required' });
    }

    let cart = await Cart.findOne(query);
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
