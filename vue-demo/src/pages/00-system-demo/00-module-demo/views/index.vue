<template>
  <div class="home">hello world</div>
</template>

<script lang="ts">
  import { Vue, Component, Mixins } from 'vue-property-decorator';
  import { Log } from '../decorator.js';
  import { Hello } from '../mixins/hello';

  @Component
  export default class Index extends Mixins(Hello) {
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
