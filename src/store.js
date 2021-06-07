const initialState = {};

export default function screen(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_SCREEN':
      return {
        ...action.screen,
      };

    case 'UPDATE_SCREEN':
      return {
        ...state,
        ...action.screen,
      };

    default:
      return state;
  }
}
