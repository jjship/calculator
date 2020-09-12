import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import { setClassName } from '../utils/setClassName';

const initialState = {
  inputStore: '0',
  firstNum: null,
  operator: null,
  waitingForSecondNum: false,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function handleInput(value) {
    const type = setClassName(value);
    console.log(type);
    console.log(value);
    if (type === 'digit') {
      dispatch({
        type: 'HANDLE_DIGIT',
        payload: value,
      });
    }
    if (type === 'point') {
      dispatch({
        type: 'HANDLE_POINT',
        payload: value,
      });
    }
    if (type === 'operator') {
      dispatch({
        type: 'HANDLE_OPERATOR',
        payload: value,
      });
    }
    if (type === 'C') {
      dispatch({
        type: 'HANDLE_CLEAR',
        payload: null,
      });
    }
    if (type === 'AC') {
      dispatch({
        type: 'HANDLE_ALLCLEAR',
        payload: null,
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        inputStore: state.inputStore,
        firstNum: state.firstNum,
        operator: state.operator,
        waitingForSecondNum: state.waitingForSecondNum,
        handleInput,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
