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
  public todos: TodoItem[] = [];

  //创建todo
  @Mutation
  private createTodoItem(todoItem: TodoItem) {
    this.todos.push(todoItem);
  }
  //删除任务
  @Mutation
  private deleteTodoItem(id: string) {
    this.todos = this.todos.filter((item) => item.id !== id);
  }
  //改变任务状态
  @Mutation
  private changeTodoItemStatus(id: string) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.isDone = !todo.isDone;
    }
  }
  @Mutation
  private initTodos(payload: TodoItem[]) {
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
