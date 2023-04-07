/* eslint-disable no-extend-native */
import React from 'react';
import { compose } from 'redux';
import cs from 'classnames';
import config from '@plone/volto/registry';
import { BodyClass } from '@plone/volto/helpers';
import { updateScreen } from '../actions';
import { detectTouchScreen, getBrowserToolbarWidth } from '../utils';
import { withScreenSize } from '../hocs';

if (!Number.prototype.toPixel) {
  Number.prototype.toPixel = function toPixel() {
    return `${this}px`;
  };
}

const debounce = (func) => {
  let timer;
  return (event) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, config.settings.resizeDebounce, event);
  };
};

class ScreenSize extends React.Component {
  constructor(props) {
    super(props);
    this.updateScreen = this.updateScreen.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  updateScreen(initialState = {}) {
    // https://developer.mozilla.org/en-US/docs/Web/API/VisualViewport
    // This containse the visual viewport sizes
    // Note: the visual viewport is changing when zoomed in / out
    const visualViewport = {
      height: window.visualViewport.height,
      width: window.visualViewport.width,
      scale: window.visualViewport.scale,
      offsetLeft: window.visualViewport.offsetLeft,
      offsetTop: window.visualViewport.offsetTop,
      pageLeft: window.visualViewport.pageLeft,
      pageTop: window.visualViewport.pageTop,
    };
    // https://developer.mozilla.org/en-US/docs/Glossary/layout_viewport
    // This contains the layout viewport sizes
    const layoutViewport = {
      height: window.innerHeight,
      width: window.innerWidth,
    };
    // https://developer.mozilla.org/en-US/docs/Web/API/Screen
    // Use this to determine screen size (or device size)
    const screen = {
      availHeight: window.screen.availHeight,
      availWidth: window.screen.availWidth,
      height: window.screen.height,
      width: window.screen.width,
      colorDepth: window.screen.colorDepth,
      orientation: {
        angle: window.screen.orientation?.angle,
        type: window.screen.orientation?.type,
      },
      pixelDepth: window.screen.pixelDepth,
    };
    const browserToolbarHeight = getBrowserToolbarWidth();
    if (browserToolbarHeight <= this.props.screen.initialBrowserToolbarHeight) {
      screen.browserToolbarHeight = browserToolbarHeight;
    }
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement
    // documentElement offset(Width/Height) includes padding & border. Note: this can be greater then viewport size
    // documentElement client(Width/Height) includes padding but excludes border / margins / scrollbar. Note: this is not greater then viewport size
    const documentElement = document.documentElement;
    const contentElement = document.querySelector('div.content-area');

    const page = {
      height: documentElement.clientHeight,
      width: documentElement.clientWidth,
      scrollbarWidth: layoutViewport.width - documentElement.clientWidth,
    };

    const content = {
      width: contentElement?.offsetWidth,
      offsetTop: contentElement?.offsetTop,
      offsetLeft: contentElement?.offsetLeft,
    };

    const newScreen = {
      ...initialState,
      ...screen,
      layoutViewport,
      page,
      content,
      visualViewport,
    };

    documentElement.style.setProperty(
      '--scrollbar-width',
      page.scrollbarWidth.toPixel(),
    );
    documentElement.style.setProperty('--vw', `${page.width * 0.01}px`);
    documentElement.style.setProperty('--vh', `${page.height * 0.01}px`);

    this.props.dispatch(updateScreen(newScreen));
  }

  onScroll() {
    const browserToolbarHeight =
      window.screen.height -
      window.screen.availHeight +
      window.outerHeight -
      window.innerHeight;

    if (
      browserToolbarHeight !== this.props.screen.browserToolbarHeight &&
      browserToolbarHeight <= this.props.screen.initialBrowserToolbarHeight
    ) {
      this.props.dispatch(updateScreen({ browserToolbarHeight }));
    }
  }

  componentDidMount() {
    if (__SERVER__) return;
    setTimeout(() => {
      this.updateScreen({
        hasTouchScreen: detectTouchScreen(),
        initialBrowserToolbarHeight: getBrowserToolbarWidth(),
        browserToolbarHeight: getBrowserToolbarWidth(),
      });
    }, 0);
    window.addEventListener('resize', debounce(this.updateScreen));
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    if (__SERVER__) return;
    window.removeEventListener('resize', debounce(this.updateScreen));
    window.removeEventListener('scroll', this.onScroll);
  }

  componentDidUpdate(prevProps) {
    if (__SERVER__) return;
    if (this.props.content?.['@id'] !== prevProps.content?.['@id']) {
      this.updateScreen();
    }
  }

  render() {
    return (
      <BodyClass
        className={cs({
          'with-scrollbar': this.props.screen?.page?.scrollbarWidth > 0,
        })}
      />
    );
  }
}

export default compose(withScreenSize)(ScreenSize);
