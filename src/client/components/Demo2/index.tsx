import "./demo.css";
import * as React from "react";
const { useContext, Suspense } = React;
import { observer } from "mobx-react-lite";
import DemoStore from "./DemoStore";
import TodoList from "./TodoList";
import Footer from "./Footer";
import { useFetch } from "react-hooks-fetch";
import { RouteComponentProps } from "react-router-dom";

const DisplayRemoteData = () => {
  const { error, data } = useFetch("http://...");
  if (error) return <span>Error:{error.message}</span>;
  if (!data) return null; // this is important
  return <span>RemoteData:{data}</span>;
};
interface HomeRouterProps {
  id: string;
}
const Demo = observer((routerProps: RouteComponentProps<HomeRouterProps>) => {
  console.log("传参", routerProps.match.params.id);
  const store = useContext(DemoStore);
  return (
    <div>
      <Suspense fallback={<span>Loading...</span>}>
        <DisplayRemoteData />
      </Suspense>
      <TodoList todos={store.todos} toggleTodo={store.toggleTodo} />
      <Footer remaining={store.remainingTodos} total={store.todos.length} />
      <h3>{store.id}</h3>
      <input type="button" value="测试异步请求" onClick={() => store.test()} />
    </div>
  );
});
export default Demo;
