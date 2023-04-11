/* eslint-disable no-extend-native */
import React from 'react';
import { compose } from 'redux';
import cs from 'classnames';
import config from '@plone/volto/registry';
import { BodyClass } from '@plone/volto/helpers';
import { updateScreen } from '../actions';
import { getOSName, detectTouchScreen, getBrowserToolbarWidth } from '../utils';
import { withScreenSize } from '../hocs';

let timer;

if (!Number.prototype.toPixel) {
  Number.prototype.toPixel = function toPixel() {
    return `${this}px`;
  };
}

const debounce = (func) => {
  return (event) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, config.settings.resizeDebounce, event);
  };
};

class ScreenSize extends React.Component {
  constructor(props) {
    super(props);
    this.onUpdateScreen = this.onUpdateScreen.bind(this);
    this.updateScreen = this.updateScreen.bind(this);
    this.updateCSSVars = this.updateCSSVars.bind(this);
    this.init = this.init.bind(this);
  }

  updateCSSVars() {
    const documentElement = document.documentElement;
    const page = {
      height: documentElement.clientHeight,
      width: documentElement.clientWidth,
      scrollbarWidth: window.innerWidth - documentElement.clientWidth,
    };

    window.requestAnimationFrame(() => {
      documentElement.style.setProperty(
        '--scrollbar-width',
        page.scrollbarWidth.toPixel(),
      );
      documentElement.style.setProperty('--vw', `${page.width * 0.01}px`);
      documentElement.style.setProperty('--vh', `${page.height * 0.01}px`);
    });
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

    this.props.dispatch(updateScreen(newScreen));
  }

  onUpdateScreen(event) {
    this.updateCSSVars();
    debounce(this.updateScreen)(event);
  }

  init() {
    const browserToolbarHeight = getBrowserToolbarWidth();
    this.updateCSSVars();
    this.updateScreen({
      os: getOSName(),
      hasTouchScreen: detectTouchScreen(),
      initialBrowserToolbarHeight: browserToolbarHeight,
      browserToolbarHeight,
    });
  }

  componentDidMount() {
    if (__SERVER__) return;
    setTimeout(() => {
      this.init();
    }, 0);
    window.addEventListener('resize', this.onUpdateScreen);
  }

  componentWillUnmount() {
    if (__SERVER__) return;
    window.removeEventListener('resize', this.onUpdateScreen);
  }

  componentDidUpdate(prevProps) {
    if (__SERVER__) return;
    if (this.props.content?.['@id'] !== prevProps.content?.['@id']) {
      this.onUpdateScreen();
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
