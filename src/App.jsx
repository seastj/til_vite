import { CounterProvider } from "./contexts/counter/context";
import { useCounter } from "./contexts/counter/useCounter";
import { useTheme } from "./contexts/theme/ThemeContext";

const Popup = () => {
  const { theme, fontSize } = useTheme();
  return <div className={`bg-${theme}-500 font-[${fontSize}px]`}>팝업창</div>;
};

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
