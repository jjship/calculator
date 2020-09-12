import { calculate } from '../utils/calculate';

export default (state, action) => {
  const { firstNum, inputStore, waitingForSecondNum, operator } = state;
  switch (action.type) {
    case 'HANDLE_DIGIT':
      if (!firstNum && inputStore === '0') {
        return {
          ...state,
          inputStore: String(action.payload),
        };
      }
      if (waitingForSecondNum) {
        return {
          ...state,
          inputStore: String(action.payload),
          waitingForSecondNum: false,
        };
      }
      return {
        ...state,
        inputStore: state.inputStore + String(action.payload),
      };
    case 'HANDLE_POINT':
      if (inputStore.includes(action.payload)) return state;
      return {
        ...state,
        inputstore: (state.inputStore += action.payload),
      };
    case 'HANDLE_OPERATOR':
      if (!firstNum || waitingForSecondNum) {
        if (action.payload === '-' && inputStore === '0') {
          return { ...state, inputStore: String(action.payload) };
        } else {
          return {
            ...state,
            operator: action.payload,
            waitingForSecondNum: true,
            firstNum: parseFloat(inputStore),
          };
        }
      } else if (operator === '/' && inputStore === '0') {
        alert('not able to divide by 0');
        return {
          ...state,
          waitingForSecondNum: true,
        };
      } else {
        const result = calculate(operator, firstNum, parseFloat(inputStore));
        return {
          ...state,
          inputStore: String(result),
          firstNum: result,
          operator: action.payload,
          waitingForSecondNum: true,
        };
      }
    case 'HANDLE_CLEAR':
      if (waitingForSecondNum) {
        return {
          ...state,
          operator: null,
          waitingForSecondNum: false,
        };
      } else {
        return {
          ...state,
          inputStore: inputStore.slice(0, -1),
        };
      }
    case 'HANDLE_ALLCLEAR':
      return {
        ...state,
        inputStore: '0',
        firstNum: null,
        operator: null,
        waitingForSecondNum: false,
      };
    default:
      return state;
  }
};
