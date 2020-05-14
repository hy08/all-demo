import Vue from 'vue';
import Vuex from 'vuex';
import { TodoListState, TodoListModule } from '@/modules/demo/todoList';

Vue.use(Vuex);

export interface RootState {
  todoList: TodoListState;
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<RootState>({
  modules: {
    todoList: TodoListModule,
  },
});
