import { VuexModule, Module, Mutation } from 'vuex-module-decorators';

export interface TodoItem {
  id: string;
  content: string;
  isDone: boolean;
}
export interface TodoListState {
  todos: TodoItem[];
}

@Module
export class TodoListModule extends VuexModule implements TodoListState {
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
      todo.isDone = true;
    }
  }
}
