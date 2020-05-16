import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import store from '../index';
import { getAllToDoList } from '@/services/demo/todoList';

export interface TodoItem {
  id: string;
  content: string;
  isDone: boolean;
}
export interface TodoListState {
  todos: TodoItem[];
}

@Module({ dynamic: true, store, name: 'todoListModule' })
class TodoListModule extends VuexModule implements TodoListState {
  public todos: TodoItem[] = [
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

  //创建todo
  @Mutation
  createTodoItem(todoItem: TodoItem) {
    this.todos.push(todoItem);
  }
  //删除todo
  @Mutation
  deleteTodoItem(id: string) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    }
  }
  //改变任务状态
  @Mutation
  changeTodoItemStatus(id: string) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.isDone = !todo.isDone;
    }
  }
  //初始化todos
  @Mutation
  initTodos(payload: TodoItem[]) {
    this.todos = payload;
  }
  //获取当前的todoList
  @Action({ commit: 'initTodos' })
  async getAllTodoItems() {
    const rap2Obj = await getAllToDoList();
    if (rap2Obj) {
      return rap2Obj.data;
    } else {
      return [];
    }
  }
}
export default getModule(TodoListModule);
