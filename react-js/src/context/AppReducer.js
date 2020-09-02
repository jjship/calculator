import { updateDisplay } from '../utils/updateDisplay';

export default (state, action) => {
  const { firstNum, inputStore, waitingForSecondNum, operator } = state;
  switch (action.type) {
    case 'HANDLE_DIGIT':
      if (!firstNum && inputStore === '0') {
        return {
          ...state,
          inputStore: action.payload,
        };
      }
      if (waitingForSecondNum) {
        return {
          ...state,
          inputStore: action.payload,
          waitingForSecondNum: false,
        };
      }
      return {
        ...state,
        inputStore: (state.inputStore += action.payload),
      };
    // case 'HANDLE_POINT':
    //   if (inputStore.includes(action.payload)) return state;
    //   return {
    //     ...state,
    //     inputstore: (state.inputStore += action.payload),
    //   };
    default:
      return state;
  }
};
