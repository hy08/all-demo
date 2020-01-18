<template>
  <div>
    <itemcontainer father-component="item"></itemcontainer>
  </div>
</template>
<script>
import itemcontainer from "../../components/itemContainer";
export default {
  name: "item",
  components: {
    itemcontainer
  },
  created() {
    //进入答题页面，计时开始
    this.$store.commit("REMBER_TIME");
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
</style>


