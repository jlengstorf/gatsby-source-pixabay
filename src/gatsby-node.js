const fetch = require('node-fetch');
const crypto = require('crypto');

const getQueryString = options =>
  Object.entries(options)
    .map(entry => `${entry[0]}=${entry[1]}`)
    .join('&');

exports.sourceNodes = async (
  { boundActionCreators: { createNode } },
  { plugins, ...options },
) => {
  const apiUrl = `https://pixabay.com/api/?${getQueryString(options)}`;
  const response = await fetch(apiUrl);
  const data = await response.json();

  data.hits.forEach(photo => {
    createNode({
      ...photo,
      id: `pixabay-photo-${photo.id}`,
      parent: null,
      children: [],
      internal: {
        type: 'PixabayPhoto',
        content: JSON.stringify(photo),
        contentDigest: crypto
          .createHash('md5')
          .update(JSON.stringify(photo))
          .digest('hex'),
      },
    });
  });
};
