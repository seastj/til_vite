import { useTodos } from "../../contexts/todos/useTodos";
import TodoItem from "./TodoItem";

const TodoList = () => {
  // js 자리
  const { todos } = useTodos();
  console.log(todos);

  // jsx 자리
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold">할일 목록</h2>
        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          총 {todos.length}개
        </span>
      </div>
      <div className="w-full relative">
        <ul className="space-y-2">
          {todos.map(item => (
            <TodoItem key={item.id} todo={item} />
          ))}
          {todos.length === 0 && (
            <li className="rounded-xl border border-dashed border-neutral-300 p-6 text-center text-sm text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
              아직 등록된 할 일이 없습니다.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
