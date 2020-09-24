import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from './index';

type TodoItem = {
  id: string;
  content: string;
  isDone: boolean;
};
type TodoListState = {
  todos: TodoItem[];
};
const todos: TodoItem[] = [
  {
    id: '0',
    content: 'todo-item1',
    isDone: false,
  },
  {
    id: '1',
    content: 'todo-item2',
    isDone: true,
  },
  {
    id: '2',
    content: 'todo-item3',
    isDone: false,
  },
];
@Module({ dynamic: true, store, name: 'todoListModule' })
class TodoListModule extends VuexModule implements TodoListState {
  todos: TodoItem[] = [];

  //获取当前的todoList
  @Action
  async getAllTodoItems() {
    const data = await new Promise<TodoItem[]>((resolve) => {
      setTimeout(resolve, 1000, todos);
    });
    this._saveTodos(data);
  }

  @Mutation
  private _saveTodos(data: TodoItem[]) {
    this.todos = data;
  }
}
export default getModule(TodoListModule);
