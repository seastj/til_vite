# react-router-dom

## 1. 설치

- vercel 에 배포 예정이므로 안정버전 설치
- v6.x 설치

```bash
npm i react-router-dom@6.30.1
```

## 폴더 및 파일 구조

- `/src/pages 폴더` 생성
- /src/pages/TodoReadPage.jsx 파일 생성

```jsx
import { useNavigate, useParams } from "react-router-dom";
import { useTodos } from "../contexts/todos/useTodos";
import { useEffect, useState } from "react";

function TodoReadPage() {
  const { id } = useParams();
  const { findTodo } = useTodos();
  const [todo, setTodo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const result = findTodo(id);
      setTodo(result);
    }
  }, [id]);
  if (!todo) {
    return <div>잘못된 아이디 입니다.</div>;
  }

  return (
    <div>
      <h2>상세보기</h2>
      <div className="flex items-center gap-3 rounded-xl border px-3 py-2 transition border-neutral-200 bg-white shadow-sm hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
        <span
          className={[
            "flex-1 text-sm transition",
            todo.completed
              ? "line-through text-neutral-400"
              : "text-neutral-500 dark:text-neutral-100",
          ].join(" ")}
        >
          {todo.title}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/todos/${todo.id}/edit`)}
            className="rounded-lg border border-neutral-300 px-3 py-1.5 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
          >
            수정
          </button>
          <button
            onClick={() => navigate(`/todos`)}
            className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
          >
            목록
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoReadPage;
```

- /src/pages/TodoEditPage.jsx 파일 생성

```jsx
import { useParams } from "react-router-dom";
import TodoEdit from "../components/todos/TodoEdit";
import { useTodos } from "../contexts/todos/useTodos";
import { useEffect, useState } from "react";

function TodoEditPage() {
  // js 자리
  const { id } = useParams();
  const { findTodo } = useTodos();
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    if (id) {
      const result = findTodo(id);
      setTodo(result);
    }
  }, [id]);

  if (!todo) {
    return <div>잘못된 아이디 입니다.</div>;
  }

  // jsx 자리
  return (
    <div>
      <h2>편집창</h2>
      {todo ? <TodoEdit todo={todo} /> : <div>자료가 없습니다.</div>}
    </div>
  );
}

export default TodoEditPage;
```

- /src/pages/TodoListPage.jsx 파일 생성

```jsx
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
```

- /src/pages/TodoWritePage.jsx 파일 생성

```jsx
import TodoWrite from "../components/todos/TodoWrite";

function TodoWritePage() {
  return (
    <div>
      <section className="mb-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-card transition dark:border-neutral-800 dark:bg-neutral-950">
        <h2 className="mb-3 text-base font-semibold">새 할일 추가</h2>
        <TodoWrite />
      </section>
    </div>
  );
}

export default TodoWritePage;
```

- /src/pages/NotFound.jsx 파일 생성

- /src/pages/Home.jsx 파일 생성

## 3. Vite 프로젝트에서 Route 세팅하기

- CRA 버전은 index.js 등등이 존재함.
- Vite 버전은 main.jsx 가 있음.
- App.jsx 에 세팅을 권장함.
