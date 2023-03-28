/* eslint-disable no-extend-native */
import React from 'react';
import { compose } from 'redux';
import cs from 'classnames';
import config from '@plone/volto/registry';
import { BodyClass } from '@plone/volto/helpers';
import { updateScreen } from '../actions';
import { detectTouchScreen } from '../utils';
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
    this.state = {
      withScrollbar: false,
    };
  }

  updateScreen(initialState = {}) {
    const documentElement = document.documentElement;
    const vw = document.documentElement.offsetWidth * 0.01;
    const vh = document.documentElement.offsetHeight * 0.01;

    const screen = {
      height: window.screen.availHeight,
      width: window.screen.availWidth,
      browserToolbarHeight: window.outerHeight - window.innerHeight,
    };

    const page = {
      height: window.innerHeight,
      width: window.innerWidth,
      scrollbarWidth: window.innerWidth - documentElement.offsetWidth,
      vw,
      vh,
    };

    const newScreen = {
      ...initialState,
      ...screen,
      page,
      content: {
        height: documentElement.offsetHeight,
        width: documentElement.offsetWidth,
        offsetTop: document.querySelector('div.content-area')?.offsetTop,
      },
    };

    if (
      documentElement.scrollHeight > documentElement.clientHeight &&
      !this.state.withScrollbar
    ) {
      this.setState({ withScrollbar: true });
    } else if (
      documentElement.scrollHeight <= documentElement.clientHeight &&
      this.state.withScrollbar
    ) {
      this.setState({ withScrollbar: false });
    }

    documentElement.style.setProperty(
      '--scrollbar-width',
      page.scrollbarWidth.toPixel(),
    );
    documentElement.style.setProperty('--vw', `${vw}px`);
    documentElement.style.setProperty('--vh', `${vh}px`);

    this.props.dispatch(updateScreen(newScreen));
  }

  componentDidMount() {
    if (__SERVER__) return;
    setTimeout(() => {
      this.updateScreen({
        hasTouchScreen: detectTouchScreen(),
      });
    }, 0);
    window.addEventListener('resize', debounce(this.updateScreen));
    // window.addEventListener('scroll', debounce(this.updateScreen));
  }

  componentWillUnmount() {
    if (__SERVER__) return;
    window.removeEventListener('resize', debounce(this.updateScreen));
    // window.removeEventListener('scroll', debounce(this.updateScreen));
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
        className={cs({ 'with-scrollbar': this.state.withScrollbar })}
      />
    );
  }
}

export default compose(withScreenSize)(ScreenSize);
