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
