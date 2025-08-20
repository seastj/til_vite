# 카운터 예제 (Context API / useReducer)

## 1. 기본세팅

- App.jsx

```jsx
function App() {
  return <div>App</div>;
}

export default App;
```

## 2. CounterContext 를 생성 및 관리

- /src/contexts/`counter` 폴더
- 예) /src/contexts/`theme` 폴더
- 예) /src/contexts/`user` 폴더
- 예) /src/contexts/`bucket` 폴더

## 3. CounterContext.jsx 파일 생성

- /src/contexts/counter/CounterContext.jsx

```jsx
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
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
  );
}

// 5. 커스텀 훅
export function useCounter() {
  const ctx = useContext(CounterContext);
  return ctx;
}
```

- App.jsx

```jsx
import { CounterProvider, useCounter } from "./contexts/counter/CounterContext";

const CounterComponent = () => {
  const { v, add } = useCounter();
  return (
    <div>
      {v}카운터
      <button onClick={() => add(5)}>5 증가</button>
    </div>
  );
};

function App() {
  return (
    <CounterProvider>
      <CounterComponent />
    </CounterProvider>
  );
}

export default App;
```

## 4. 파일 분리

- /src/components/counter/initialState.js

```js
// 1. 초기값
export const initialState = {
  count: 0,
};
```

- /src/components/counter/constants.js

```js
export const ACTIONS = {
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT",
  RESET: "RESET",
  ADDNUM: "ADDNUM",
};
```

- /src/components/counter/reducer.js

```js
import { ACTIONS } from "./constants";

// 2. 리듀서 함수
// action : { type: 문자열, payload: 값 }
export function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return { ...state, count: state.count + 1 };
    case ACTIONS.DECREMENT:
      return { ...state, count: state.count - 1 };
    case ACTIONS.RESET:
      return { ...state, count: (state.count = 0) };
    case ACTIONS.ADDNUM:
      return { ...state, count: state.count + action.payload };
    default:
      return state;
  }
}
```

- /src/components/counter/actions.js

```js
import { ACTIONS } from "./constants";

export const incrementAction = () => ({ type: ACTIONS.INCREMENT });
export const decrementAction = () => ({ type: ACTIONS.DECREMENT });
export const resetAction = () => ({ type: ACTIONS.RESET });
export const addNumAction = a => ({ type: ACTIONS.ADDNUM, payload: a });
```

- /src/components/counter/context.jsx

```jsx
import { createContext, useReducer } from "react";
import {
  addNumAction,
  decrementAction,
  incrementAction,
  resetAction,
} from "./actions";
import { initialState } from "./initialState";
import { reducer } from "./reducer";

// 1. 컨텍스트 생성
export const CounterContext = createContext();
// 2. 프로바이더 생성
export function CounterProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = {
    v: state.count,
    increment: () => dispatch(incrementAction()),
    decrement: () => dispatch(decrementAction()),
    reset: () => dispatch(resetAction()),
    add: a => dispatch(addNumAction(a)),
  };
  return (
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
  );
}
```

- /src/components/counter/useCounter.js

```js
import { useContext } from "react";
import { CounterContext } from "./context";

// 5. 커스텀 훅
export function useCounter() {
  const ctx = useContext(CounterContext);
  if (!ctx) {
    throw new Error("에러입니다.");
  }
  return ctx;
}
```

# 테마 설정 예제

- /src/contexts/theme/ThemeContext.jsx

```jsx
import { createContext, useContext, useReducer } from "react";

// 1. 초기값
const initalState = {
  theme: "white",
};
// 2. 리듀서
function reducer(state, action) {
  switch (action.type) {
    case "BLACK":
      return { ...state, theme: "black" };
    case "GREEN":
      return { ...state, theme: "green" };
    case "BASIC":
      return { ...state, theme: "white" };
    default:
      return state;
  }
}
// 3. 컨텍스트
const ThemeContext = createContext();

// 4. 프로바이더
export function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initalState);
  const value = {
    theme: state.theme,
    blackTheme: () => dispatch({ type: "BLACK" }),
    greenTheme: () => dispatch({ type: "GREEN" }),
    basicTheme: () => dispatch({ type: "BASIC" }),
  };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// 5. 커스텀 훅
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("테마 컨텍스트가 없습니다.");
  }
  return ctx;
}
```

- 사용예(Tailwind)

```jsx
const Popup = () => {
  const { theme, fontSize } = useTheme();
  return <div className={`bg-${theme}-500 font-[${fontSize}px]`}>팝업창</div>;
};
```
