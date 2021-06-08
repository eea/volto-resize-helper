export const setScreen = (screen = {}) => {
  return {
    type: 'SET_SCREEN',
    screen,
  };
};

export const updateScreen = (screen = {}) => {
  return {
    type: 'UPDATE_SCREEN',
    screen,
  };
};
