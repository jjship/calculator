import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import { updateDisplay } from '../utils/updateDisplay';

const initialState = {
  inputStore: '0',
  firstNum: null,
  operator: null,
  waitingForSecondNum: false,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function handleDigit(value) {
    dispatch({
      type: 'HANDLE_DIGIT',
      payload: value,
    });
  }

  function handlePoint(value) {
    dispatch({
      type: 'HANDLE_POINT',
      payload: value,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        inputStore: state.inputStore,
        firstNum: state.firstNum,
        operator: state.operator,
        waitingForSecondNum: state.waitingForSecondNum,
        handleDigit,
        handlePoint,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
