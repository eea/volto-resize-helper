export const detectTouchScreen = () => {
  let hasTouchScreen = false;
  if ('maxTouchPoints' in navigator) {
    hasTouchScreen = navigator.maxTouchPoints > 0;
  } else if ('msMaxTouchPoints' in navigator) {
    hasTouchScreen = navigator.msMaxTouchPoints > 0;
  } else {
    // fallback
    if ('ontouchstart' in window || window.TouchEvent) {
      hasTouchScreen = true;
    } else {
      hasTouchScreen = /Mobi|Android/i.test(navigator.userAgent);
    }
  }
  return hasTouchScreen;
};

export const getBrowserToolbarWidth = () => {
  return (
    window.screen.height -
    window.screen.availHeight +
    window.outerHeight -
    window.innerHeight
  );
};
