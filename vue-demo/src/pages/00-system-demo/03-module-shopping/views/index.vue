<template>
  <div class="container">
    <div class="header">
      <div class="title">购物天堂</div>
      <div class="operate">
        <div class="cart">
          <button>购物车{{ `${totalCount > 0 ? '(' + totalCount + ')' : ''}` }}</button>
          <Cart class="cartContent" :goods="shoppingGoods" @removeGood="removeGood" />
        </div>
        <div class="radios">
          <div>
            <input @change="changeView" type="radio" id="net" name="net" value="net" :checked="showType === 'net'" />
            <label for="net">网格</label>
          </div>

          <div>
            <input
              @change="changeView"
              type="radio"
              id="list"
              name="list"
              value="list"
              :checked="showType === 'list'"
            />
            <label for="list">列表</label>
          </div>
        </div>
      </div>
    </div>
    <div class="content-card" v-if="showType === 'net'">
      <CardGood v-for="good in goods" :key="good.id" :good="good" @addGood="addGood" />
    </div>
    <div class="content-li" v-else>
      <LiGood v-for="good in goods" :key="good.id" :good="good" @addGood="addGood" />
    </div>
  </div>
</template>
<script>
  import CardGood from '../components/card-good';
  import LiGood from '../components/li-good';
  import Cart from '../components/shopping-cart';

  export default {
    name: 'home',
    components: {
      CardGood,
      LiGood,
      Cart,
    },
    data() {
      return {
        showType: 'list',
        goods: [
          { id: 1, name: '苹果', price: '10.99' },
          { id: 2, name: '橘子', price: '6.88' },
          { id: 3, name: '香蕉-广西特产(限价处理)', price: '30.00' },
          { id: 4, name: '榴莲', price: '200.00' },
          { id: 5, name: '苹果', price: '10.99' },
          { id: 6, name: '橘子', price: '6.88' },
          { id: 7, name: '香蕉-广西特产(限价处理)', price: '30.00' },
          { id: 8, name: '榴莲', price: '200.00' },
        ],
        shoppingGoods: [],
      };
    },
    computed: {
      totalCount() {
        let count = 0;
        this.shoppingGoods.forEach((item) => {
          count += item.count;
        });
        return count;
      },
    },
    methods: {
      changeView(e) {
        this.showType = e.target.value;
      },
      addGood(good) {
        console.log('addGood', good);
        const shoppingGood = this.shoppingGoods.find((item) => item.id === good.id);
        if (!!shoppingGood) {
          shoppingGood.count += 1;
        } else {
          this.shoppingGoods.push({ ...good, count: 1 });
        }
      },
      removeGood(good) {
        const shoppingGood = this.shoppingGoods.find((item) => item.id === good.id);
        if (!!shoppingGood) {
          if (shoppingGood.count > 1) {
            shoppingGood.count -= 1;
          } else {
            const goodIndex = this.shoppingGoods.findIndex((item) => item.id === good.id);
            this.shoppingGoods.splice(goodIndex, 1);
          }
        }
      },
    },
  };
</script>
<style lang="less" scoped src="./index.less" />
