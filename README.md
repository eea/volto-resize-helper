# volto-resize-helper

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

The add-on package lives in [`packages/volto-resize-helper`](packages/volto-resize-helper),
its [README](packages/volto-resize-helper/README.md) documents installation and usage.

## Development

See [DEVELOP.md](DEVELOP.md).

## Release

See [RELEASE.md](RELEASE.md).

## License

See [LICENSE.md](LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
