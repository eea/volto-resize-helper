import { getOSName, detectTouchScreen, getBrowserToolbarWidth } from './utils';

describe('getOSName', () => {
  it('should return correct OS', () => {
    const platforms = [
      { platform: 'MacIntel', expected: 'mac' },
      { platform: 'MacPPC', expected: 'mac' },
      { platform: 'iPhone', expected: 'ios' },
      { platform: 'Win32', expected: 'windows' },
      { platform: 'WinCE', expected: 'windows' },
      { platform: 'Linux', expected: 'linux' },
    ];

    platforms.forEach(({ platform, expected }) => {
      Object.defineProperty(window.navigator, 'platform', {
        value: platform,
        writable: true,
      });
      expect(getOSName()).toEqual(expected);
    });

    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'Android',
      writable: true,
    });
    expect(getOSName()).toEqual('android');

    Object.defineProperty(window.navigator, 'platform', {
      value: '',
      writable: true,
    });

    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'Blackberry',
      writable: true,
    });
    expect(getOSName()).toEqual('mobile');

    Object.defineProperty(window.navigator, 'platform', {
      value: '',
      writable: true,
    });
    Object.defineProperty(window.navigator, 'userAgent', {
      value: '',
      writable: true,
    });
    expect(getOSName()).toEqual('unknown');
  });
});

describe('detectTouchScreen', () => {
  it('should correctly detect touch screen', () => {
    global.window = { ontouchstart: {}, TouchEvent: {} };
    expect(detectTouchScreen()).toBe(true);

    Object.defineProperty(window.navigator, 'msMaxTouchPoints', {
      value: 1,
      writable: true,
    });
    expect(detectTouchScreen()).toBe(true);

    Object.defineProperty(window.navigator, 'msMaxTouchPoints', {
      value: 0,
      writable: true,
    });
    expect(detectTouchScreen()).toBe(false);

    Object.defineProperty(window.navigator, 'maxTouchPoints', {
      value: 1,
      writable: true,
    });
    expect(detectTouchScreen()).toBe(true);

    Object.defineProperty(window.navigator, 'maxTouchPoints', {
      value: 0,
      writable: true,
    });
    expect(detectTouchScreen()).toBe(false);
  });
});

describe('getBrowserToolbarWidth', () => {
  it('should correctly calculate toolbar width', () => {
    Object.defineProperty(window, 'screen', {
      value: {
        height: 800,
        availHeight: 700,
      },
      writable: true,
    });

    Object.defineProperty(window, 'outerHeight', {
      value: 700,
      writable: true,
    });

    Object.defineProperty(window, 'innerHeight', {
      value: 600,
      writable: true,
    });

    expect(getBrowserToolbarWidth()).toBe(200);
  });
});
