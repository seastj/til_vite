import { createContext, useContext, useReducer } from "react";

// 1. 초기값
const initialState = {
  count: 0,
};

// 2. 리듀서 함수
// action : { type: 문자열, payload: 값 }
function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    case "RESET":
      return { ...state, count: (state.count = 0) };
    case "ADDNUM":
      return { ...state, count: state.count + action.payload };
    default:
      return state;
  }
}

// 3. 컨택스트 생성
const CounterContext = createContext();

// 4. 프로바이더 생성
export function CounterProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = {
    v: state.count,
    increment: () => dispatch({ type: "INCREMENT" }),
    decrement: () => dispatch({ type: "DECREMENT" }),
    reset: () => dispatch({ type: "RESET" }),
    add: a => dispatch({ type: "ADDNUM", payload: a }),
  };
  return (
    <CounterContext.Provider value={ value }>
      {children}
    </CounterContext.Provider>
  );
}

// 5. 커스텀 훅
export function useCounter() {
  const ctx = useContext(CounterContext);
  return ctx;
}
