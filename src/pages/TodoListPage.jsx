import TodoList from "../components/todos/TodoList";

function TodoListPage() {
  return (
    <div>
      <section className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-card transition dark:border-neutral-800 dark:bg-neutral-950">
        <TodoList />
      </section>
    </div>
  );
}

export default TodoListPage;
