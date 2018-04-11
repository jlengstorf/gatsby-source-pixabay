# gatsby-source-pixabay

This source plugin for Gatsby will make images from [Pixabay](https://pixabay.com/) available in GraphQL queries.

## Installation

```sh
# Install the plugin
yarn add gatsby-source-pixabay
```

In `gatsby-config.js`:

```js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-pixabay',
      options: {
        key: 'YOUR_PIXABAY_API_KEY'
      }
    }
  ]
};
```

**NOTE:** To get a Pixabay API key, [register for a Pixabay account](https://pixabay.com/en/accounts/register/). You can find your API key in the [“Search Images” section of the Pixabay API docs](https://pixabay.com/api/docs/#api_search_images).

## Configuration Options

The configuration options for this plugin mirror the [“Search Image” options](https://pixabay.com/api/docs/#api_search_images). Please review those docs for more details.

| Option           | Default   | Description                                                                                                                                                                                                                                                                |
| ---------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `key`            |           | **[required]** Your Pixabay API key                                                                                                                                                                                                                                        |
| `q`              |           | A URL encoded search term. If omitted, all images are returned. This value may not exceed 100 characters, e.g. "yellow+flower"                                                                                                                                             |
| `lang`           | "en"      | Language code of the language to be searched in.<br>Accepted values: cs, da, de, en, es, fr, id, it, hu, nl, no, pl, pt, ro, sk, fi, sv, tr, vi, th, bg, ru, el, ja, ko, zh                                                                                                |
| `image_type`     | "all"     | Filter results by image type.<br>Accepted values: "all", "photo", "illustration", "vector"                                                                                                                                                                                 |
| `orientation`    | "all"     | Whether an image is wider than it is tall, or taller than it is wide.<br>Accepted values: "all", "horizontal", "vertical"                                                                                                                                                  |
| `category`       |           | Filter results by category.<br>Accepted values: fashion, nature, backgrounds, science, education, people, feelings, religion, health, places, animals, industry, food, computer, sports, transportation, travel, buildings, business, music                                |
| `min_width`      | 0         | Minimum image width.                                                                                                                                                                                                                                                       |
| `min_height`     | 0         | Minimum image height.                                                                                                                                                                                                                                                      |
| `colors`         |           | Filter images by color properties. A comma separated list of values may be used to select multiple properties.<br>Accepted values: "grayscale", "transparent", "red", "orange", "yellow", "green", "turquoise", "blue", "lilac", "pink", "white", "gray", "black", "brown" |
| `editors_choice` | "false"   | Select images that have received an Editor's Choice award.<br>Accepted values: "true", "false"                                                                                                                                                                             |
| `safesearch`     | "false"   | A flag indicating that only images suitable for all ages should be returned.<br>Accepted values: "true", "false"                                                                                                                                                           |
| `order`          | "popular" | How the results should be ordered.<br>Accepted values: "popular", "latest"                                                                                                                                                                                                 |
| `page`           | 1         | Returned search results are paginated. Use this parameter to select the page number.                                                                                                                                                                                       |
| `per_page`       | 20        | Determine the number of results per page.<br>Accepted values: 3 - 200 number.                                                                                                                                                                                              |

### Example Configuration

```js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-pixabay',
      options: {
        key: process.env.PIXABAY_API_KEY,
        q: 'candy',
        image_type: 'photo',
        editors_choice: true,
        safesearch: true,
        order: 'popular',
        per_page: 200
      }
    }
  ]
};
```

## Querying Pixabay Images

Once the plugin is configured, two new queries are available in GraphQL: `allPixabayPhoto` and `pixabayPhoto`.

Here’s an example query to load 10 images:

```gql
query PhotoQuery {
  allPixabayPhoto(limit: 10) {
    edges {
      node {
        largeImageURL
        pageURL
        tags
        user
      }
    }
  }
}
```

See the [Pixabay API docs](https://pixabay.com/api/docs/#api_search_images) or the GraphiQL UI for info on all returned fields.
