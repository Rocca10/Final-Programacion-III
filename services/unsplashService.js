const axios = require('axios');

const ACCESS_KEY = '8OuZJINZOLlfn31aTAzTjnsTQaEsRCqzXhrCrIsHbOo';

const buscarImagenUnsplash = async (query) => {
  try {
    const res = await axios.get('https://api.unsplash.com/search/photos', {
      params: { query, per_page: 1 },
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    });

    if (res.data.results.length > 0) {
      return res.data.results[0].urls.regular;
    }

    return null;
  } catch (error) {
    console.error('Error buscando imagen en Unsplash:', error.message);
    return null;
  }
};

module.exports = { buscarImagenUnsplash };
