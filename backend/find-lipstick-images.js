const searchLipstick = async () => {
  try {
    const r = await fetch('https://unsplash.com/napi/search/photos?query=black%20lipstick&per_page=10&page=1');
    const data = await r.json();
    for (const item of data.results) {
      console.log('ALT:', item.alt_description);
      console.log('URL:', item.urls.regular);
      console.log('---');
    }
  } catch (e) {
    console.error('Error:', e.message);
  }
};

searchLipstick();