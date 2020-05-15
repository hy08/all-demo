<template>
  <div class="container">
    <h2>{{ title }}</h2>
    <el-input
      v-model="content"
      placeholder="请输入代办事项"
      @keyup.enter="addTodoItem"
    ></el-input>
    <ul class="todo-list">
      <li
        v-for="(todo, index) in todos"
        :key="todo.id"
        :class="{ isDone: todo.isDone }"
      >
        {{ index + 1 }}: {{ todo.content }}
      </li>
    </ul>
    <div class="operate">
      <el-radio-group v-model="selectedStatus">
        <el-radio :label="status.all">全部</el-radio>
        <el-radio :label="status.finished">已完成</el-radio>
        <el-radio :label="status.noFinished">未完成</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import TodoListModule from '@/modules/demo/todoList';
  import { v4 as uuid } from 'uuid';
  enum Status {
    all,
    finished,
    noFinished,
  }
  @Component
  export default class TodoList extends Vue {
    @Prop() title!: string;
    content = '';
    status = Status;
    selectedStatus = Status.all;
    get todos() {
      return TodoListModule.todos;
    }
    private addTodoItem(e: KeyboardEvent) {
      console.log('addTodoItem', uuid(), e);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .container {
    margin: 40px 20px;
    .todo-list {
      padding-left: 0;
      li {
        margin: 10px 0;
        list-style: none;
        text-align: left;
        &.isDone {
          text-decoration: line-through;
        }
      }
    }
  }
</style>
