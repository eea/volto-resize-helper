/* eslint-disable no-extend-native */
import React from 'react';
import cs from 'classnames';
import config from '@plone/volto/registry';
import { BodyClass } from '@plone/volto/helpers';
import { updateScreen } from '../actions';
import { detectTouchScreen } from '../utils';

Number.prototype.toPixel = function toPixel() {
  return `${this}px`;
};

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
    const screen = {
      height: window.screen.availHeight || 0,
      width: window.screen.availWidth || 0,
    };

    const page = {
      height: window.innerHeight || 0,
      width: window.innerWidth || 0,
    };

    const newScreen = {
      ...initialState,
      ...screen,
      page,
      content: {
        offsetTop:
          document.querySelector('div.content-area')?.offsetTop || null,
      },
    };

    if (
      document.body.scrollHeight > document.body.clientHeight &&
      !this.state.withScrollbar
    ) {
      this.setState({ withScrollbar: true });
    } else if (
      document.body.scrollHeight <= document.body.clientHeight &&
      this.state.withScrollbar
    ) {
      this.setState({ withScrollbar: false });
    }

    this.props.dispatch(updateScreen(newScreen));
  }

  componentDidMount() {
    if (__SERVER__) return;
    this.updateScreen({
      hasTouchScreen: detectTouchScreen(),
      browserToolbarHeight: window.outerHeight - window.innerHeight,
    });
    window.addEventListener('resize', debounce(this.updateScreen));
  }

  componentWillUnmount() {
    if (__SERVER__) return;
    window.removeEventListener('resize', debounce(this.updateScreen));
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

export default ScreenSize;
