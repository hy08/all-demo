<template>
  <div class="home">
    <TodoList title="Demo:TodoList" />
  </div>
</template>

<script>
  import { Component, Vue } from 'vue-property-decorator';
  // import TodoListModule from '@/modules/demo/todoList';
  import TodoList from '../components/todo-list/index.vue';

  @Component({
    components: { TodoList },
  })
  export default class Home extends Vue {
    created() {
      //vuex
      // TodoListModule.getAllTodoItems();
    }
  }
</script>
