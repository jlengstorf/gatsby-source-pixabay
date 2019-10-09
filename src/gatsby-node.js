const fetch = require('node-fetch');
const queryString = require('query-string');

exports.sourceNodes = async (
  { boundActionCreators: { createNode }, createNodeId, createContentDigest },
  { plugins, ...options }
) => {
  const apiUrl = `https://pixabay.com/api/?${queryString.stringify(options)}`;
  const response = await fetch(apiUrl);
  const data = await response.json();

  data.hits.forEach(photo => {
    createNode({
      ...photo,
      id: createNodeId(`pixabay-photo-${photo.id}`),
      parent: null,
      children: [],
      internal: {
        type: 'PixabayPhoto',
        content: JSON.stringify(photo),
        contentDigest: createContentDigest(photo)
      }
    });
  });
};
