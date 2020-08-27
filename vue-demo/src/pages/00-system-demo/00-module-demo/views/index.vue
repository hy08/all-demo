<template>
  <div class="home">hello world</div>
</template>

<script lang="ts">
import { Vue, Component, Mixins } from 'vue-property-decorator';
import { Log } from '../decorator.js';
import { Hello } from '../mixins/hello';
type Info = {
  name: string;
  age: number;
};
@Component
export default class Index extends Mixins(Hello) {
  //data定义，类属性
  message = 'hello world';
  info: Info = { name: 'hy', age: 25 };
  //如果数据的值是undefined,则不会成为响应式数据
  created() {
    this.hello('hello');
    console.log(this.mixinText, this.obj.name);
  }
  @Log
  hello(value) {
    console.log(value);
  }
}
</script>
