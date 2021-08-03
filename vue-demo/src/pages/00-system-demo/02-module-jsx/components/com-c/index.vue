<template>
  <div class="c-container">
    <header>
      vue组件
    </header>
    <ComB
      :class="classObj"
      :attr="attr"
      :style="styleObj"
      :prop1="prop1"
      innerHTML="domProps"
      @click="handleClick"
      key="1"
      ref="ref"
    >
      <template v-slot:scopeA="slotProp">
        <div>
          {{ slotProp.name }}
        </div>
      </template>
    </ComB>
  </div>
</template>
<script>
  import ComB from '../com-b/index';
  export default {
    name: 'ComC',
    components: {
      ComB,
    },
    data() {
      return {
        classObj: {
          calss1: true,
          class2: true,
        },
        styleObj: {
          color: 'blue',
          fontSize: '14px',
        },
        attr: {
          attrTest: 'attr2',
        },
        prop1: 'prop1',
      };
    },
    methods: {
      handleClick(msg) {
        console.log(msg);
      },
    },
  };
</script>
<style lang="less" scoped src="./index.less" />
