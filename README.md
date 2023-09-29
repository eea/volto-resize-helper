# volto-resize-helper

[![Releases](https://img.shields.io/github/v/release/eea/volto-resize-helper)](https://github.com/eea/volto-resize-helper/releases)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-resize-helper%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-resize-helper/job/master/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-resize-helper-master&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-resize-helper-master)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-resize-helper-master&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-resize-helper-master)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-resize-helper-master&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-resize-helper-master)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-resize-helper-master&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-resize-helper-master)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-resize-helper%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-resize-helper/job/develop/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-resize-helper-develop&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-resize-helper-develop)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-resize-helper-develop&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-resize-helper-develop)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-resize-helper-develop&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-resize-helper-develop)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-resize-helper-develop&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-resize-helper-develop)

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

## Getting started

### Try volto-resize-helper with Docker

      git clone https://github.com/eea/volto-resize-helper.git
      cd volto-resize-helper
      make
      make start

Go to http://localhost:3000

### Add volto-resize-helper to your Volto project

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

   ```Bash
   docker compose up backend
   ```

1. Start Volto frontend

* If you already have a volto project, just update `package.json`:

   ```JSON
   "addons": [
       "@eeacms/volto-resize-helper"
   ],

   "dependencies": {
       "@eeacms/volto-resize-helper": "*"
   }
   ```

* If not, create one:

   ```
   npm install -g yo @plone/generator-volto
   yo @plone/volto my-volto-project --canary --addon @eeacms/volto-resize-helper
   cd my-volto-project
   ```

1. Install new add-ons and restart Volto:

   ```
   yarn
   yarn start
   ```

1. Go to http://localhost:3000

1. Happy editing!

## Release

See [RELEASE.md](https://github.com/eea/volto-resize-helper/blob/master/RELEASE.md).

## How to contribute

See [DEVELOP.md](https://github.com/eea/volto-resize-helper/blob/master/DEVELOP.md).

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-resize-helper/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
u)
