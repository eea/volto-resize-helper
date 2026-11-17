# @eeacms/volto-resize-helper

[![Releases](https://img.shields.io/github/v/release/eea/volto-resize-helper)](https://github.com/eea/volto-resize-helper/releases)
[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-resize-helper%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-resize-helper/job/master/display/redirect)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-resize-helper&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-resize-helper)

[Volto](https://github.com/plone/volto) add-on: Window resize helper
### Usage
After you add this add-on to your project, the screen state is available as a global state in redux store.
**!! Note** that the values inside of screen object are related to the [device / display sizes](https://developer.mozilla.org/en-US/docs/Web/API/Screen), not the browser sizes.
The `layoutViewport` object contains the sizes of the browser with scrollbars.
The `page` object contains the sizes of the browser without scrollbars. Note that the scrollbarWidth is available in `page.scrollbarWidth`.
The `content` object contains the width and offsets of `content-area` element (where blocks are rendered). This is useful for when you want to determine the widths of toolbar / sidebar and height of whatever is rendered above `content-area`.
The `visualViewport` object contains the sizes of the [visual viewport](https://developer.mozilla.org/en-US/docs/Web/API/VisualViewport). Note that the visual viewport is changing when zoomed in / out.
```js
screen : {
   os: String, // This are all the posible values: ['mac', 'ios', 'windows', 'android', 'linux', 'mobile', 'unknown']
   hasTouchScreen: Boolean
   browserToolbarHeight : Number
   availHeight: Number,
   availWidth: Number,
   height: Number,
   width: Number,
   colorDepth: Number,
   orientation: {
      angle: Number,
      type: String, // https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation/type
   },
   pixelDepth: Number,
   layoutViewport = {
      height: Number,
      width: Number,
   },
   page: {
      height: Number,
      width: Number,
      scrollbarWidth: Number,
   },
   content = {
      width: Number,
      offsetTop: Number,
      offsetLeft: Number,
   },
   visualViewport: {
      height: Number,
      width: Number,
      scale: Number,
      offsetLeft: Number,
      offsetTop: Number,
      pageLeft: Number,
      pageTop: Number,
   }
}

## Requirements

### Backend

- [Plone](https://plone.org/download)
- [plone.restapi](https://pypi.org/project/plone.restapi/)

### Frontend

- Node.js: `>=22.0.0`

## Installation

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

   ```Bash
   docker compose up backend
   ```

1. Start Volto frontend

* If you already have a volto project, just update `package.json`:

   ```JSON
   "dependencies": {
       "@eeacms/volto-resize-helper": "*"
   }
   ```

   and `volto.config.js`:

   ```JavaScript
   const addons = ['@eeacms/volto-resize-helper'];
   ```

* If not, create one with Cookieplone, as recommended by the official Plone documentation for Volto 18+:

   ```
   uvx cookieplone project
   cd project-title
   ```

1. Install or update dependencies, then start the project:

   ```
   make install
   ```

   For a Cookieplone project, start the backend and frontend in separate terminals:

   ```
   make backend-start
   make frontend-start
   ```

1. Go to http://localhost:3000

1. Happy editing!

## License

See [LICENSE.md](LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
