const { createContext, useReducer, useContext } = require("react");

// 1. 초기값
const initialState = {
  theme: "white",
  fontSize: 14,
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
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = {
    theme: state.theme,
    fontSize: state.fontSize,
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
