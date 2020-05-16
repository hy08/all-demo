<template>
  <div class="container">
    <h2>{{ title }}</h2>
    <el-input
      v-model="content"
      placeholder="请输入代办事项"
      @change="addTodoItem"
    ></el-input>
    <ul class="todo-list">
      <li
        v-for="(todo, index) in todos"
        :key="todo.id"
        :class="{ isDone: todo.isDone }"
      >
        <span class="list-content" @click="changeTodoItemStatus(todo.id)">
          {{ index + 1 }}: {{ todo.content }}
        </span>
        <i class="el-icon-delete" @click="deleteTodoItem(todo.id)"></i>
      </li>
    </ul>
    <div class="operate">
      <el-radio-group v-model="selectedStatus" @change="changeSelectedStatus">
        <el-radio :label="status.all">全部</el-radio>
        <el-radio :label="status.finished">已完成</el-radio>
        <el-radio :label="status.noFinished">未完成</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import TodoListModule from '../../../../../modules/demo/todoList';
  import { TodoItem } from '../../../../../modules/demo/todoList';
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
      if (this.selectedStatus === Status.finished) {
        return TodoListModule.todos.filter((todo) => todo.isDone);
      } else if (this.selectedStatus === Status.noFinished) {
        return TodoListModule.todos.filter((todo) => !todo.isDone);
      } else {
        return TodoListModule.todos;
      }
    }
    addTodoItem(value: string) {
      if (value) {
        const todoItem: TodoItem = {
          id: uuid(),
          content: value,
          isDone: false,
        };
        TodoListModule.createTodoItem(todoItem);
        this.content = '';
      }
    }
    deleteTodoItem(id: string) {
      TodoListModule.deleteTodoItem(id);
    }
    changeSelectedStatus(status: Status) {
      this.selectedStatus === status;
    }
    changeTodoItemStatus(todoId: string) {
      TodoListModule.changeTodoItemStatus(todoId);
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px 0;
        list-style: none;
        &.isDone {
          .list-content {
            text-decoration: line-through;
          }
        }
        .list-content,
        > i {
          cursor: pointer;
        }
        .list-content {
          flex-grow: 1;
          text-align: left;
        }
      }
    }
  }
</style>
