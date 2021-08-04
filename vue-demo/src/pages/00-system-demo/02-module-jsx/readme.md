## 什么是 jsx

jsx 是一个 JavaScript 的语法扩展。vue 组件中使用 jsx，是为了避免写过于复杂的 createElement 函数。

## 虚拟 DOM 和 createElement

无论是 react 还是 vue 框架，都使用了虚拟 DOM 的技术。虚拟 DOM 是对真实 DOM 的 js 表示。虚拟 DOM 由是虚拟节点组成，vue 中使用 VNode 抽象了这个对象。

```
export default class VNode {
  tag: string | void;
  data: VNodeData | void;
  children: ?Array<VNode>;
  text: string | void;
  elm: Node | void;
  ns: string | void;
  context: Component | void; // rendered in this component's scope
  key: string | number | void;
  componentOptions: VNodeComponentOptions | void;
  componentInstance: Component | void; // component instance
  parent: VNode | void; // component placeholder node

  // strictly internal
  raw: boolean; // contains raw HTML? (server only)
  isStatic: boolean; // hoisted static node
  isRootInsert: boolean; // necessary for enter transition check
  isComment: boolean; // empty comment placeholder?
  isCloned: boolean; // is a cloned node?
  isOnce: boolean; // is a v-once node?
  asyncFactory: Function | void; // async component factory function
  asyncMeta: Object | void;
  isAsyncPlaceholder: boolean;
  ssrContext: Object | void;
  fnContext: Component | void; // real context vm for functional nodes
  fnOptions: ?ComponentOptions; // for SSR caching
  devtoolsMeta: ?Object; // used to store functional render context for devtools
  fnScopeId: ?string; // functional scope id support

  constructor (
    tag?: string,
    data?: VNodeData,
    children?: ?Array<VNode>,
    text?: string,
    elm?: Node,
    context?: Component,
    componentOptions?: VNodeComponentOptions,
    asyncFactory?: Function
  ) {
    this.tag = tag
    this.data = data
    this.children = children
    this.text = text
    this.elm = elm
    this.ns = undefined
    this.context = context
    this.fnContext = undefined
    this.fnOptions = undefined
    this.fnScopeId = undefined
    this.key = data && data.key
    this.componentOptions = componentOptions
    this.componentInstance = undefined
    this.parent = undefined
    this.raw = false
    this.isStatic = false
    this.isRootInsert = true
    this.isComment = false
    this.isCloned = false
    this.isOnce = false
    this.asyncFactory = asyncFactory
    this.asyncMeta = undefined
    this.isAsyncPlaceholder = false
  }

  // DEPRECATED: alias for componentInstance for backwards compat.
  /* istanbul ignore next */
  get child (): Component | void {
    return this.componentInstance
  }
}
```

使用 createElement（通常别名为 h） 创建一个 VNode 对象，而使用渲染函数最后返回的就是 VNode。

`createElement（renderElement：String | Component，define：Object，children：String | Array）`
createElement 第二个参数对象

```
{
  class:class 类名，给组件绑定 class 会直接在组件根节点创建对应的类名

  style:行内样式，给组件绑定 style 会直接在组件根节点创建对应的行内样式

  attrs:组件中未声明是 props，父组件又绑定的属性(class 和 style 除外)

  props:对应的属性会赋值给组件定义好的 props

  domProps:DOM 对象的属性，例如 innerHTML

  on：事件的触发

  nativeOn:组件根元素的原生事件

  directives:自定义指令

  scopedSlots:作用域插槽,具名插槽也可以访问到，所以用这个就能满足需求

  slot:组件作为其他组件的子组件，需要为该组件的插槽提供名字，也就是具名插槽

  key: 赋值为组件的 key

  ref:节点的实例的引用，和 template 的 ref 相同

  refInFor: 如果同一个节点设置了该值，会导致该节点 ref 变成数组
}
```

正如官网展示的那样，如果每次编写组件都是用 createElemnt 来创建 VNode，那么就太痛苦了。所以 vue 集成了将 jsx 语法转换成 createElement 函数的插件，在每次编译的时候就会进行转换。

## 怎么编写一个 jsx 组件

vue-cli4 已经默认支持 jsx 语法,可以直接创建后缀是 jsx 的文件或者是 vue 的文件。

JSX 映射到 JavaScript，也就是编译成 createElement 函数，我们需要传递 vNode 的顶层字段。

```
import Vue from 'vue';
import { Input } from 'ant-design-vue';
import ComA from '../com-a/index.vue';
import styles from './index.less';
Vue.directive('my-bold', {
  inserted: function(el) {
    el.style.fontWeight = 900;
  },
});
//导出一个组件对象
export default {
  name: 'ComB',
  props: {
    prop1: {
      type: String,
    },
  },
  data() {
    return {
      list: [1, 2, 3],
      newTodoText: '',
      newTodoText1: '',
    };
  },
  methods: {
    handleClick() {
      console.log('触发事件');
    },
    handleCustomEvent() {
      console.log('触发自定义事件');
    },
    handleNativeEvent() {
      console.log('触发原生事件');
    },
  },
  render() {
    console.log('comb插槽', this.$slots, this.$scopedSlots);
    console.log('ref', this.$refs);
    const props = { props: { firstName: '前端', lastName: '开发' } };
    return (
      <div class={styles.container}>
        <header>jsx组件comB</header>
        <div
          // normal attributes or prefix with on props.
          id="foo"
          domPropsInnerHTML="<div style='color:blue'>bar</div>"
          class={{ foo: true, bar: false }}
          style={{ color: 'red', fontSize: '14px' }}
          key="key"
          ref="ref"
          // assign the `ref` is used on elements/components with v-for
          refInFor
        ></div>
        {true ? <div>true</div> : <div>false</div>}
        {true && <div>true</div>}
        {[1, 2, { item: 3 }].map((item) => (
          <span style="color:red">{item}</span>
        ))}
        <ComA
          nativeOnClick={this.handleNativeEvent}
          onCustomEvent={this.handleCustomEvent}
          title="attr"
          scopedSlots={{
            test: (param) => {
              return <div>{param.name}</div>;
            },
          }}
          on={{
            '~keyup': this.handleClick,
          }}
          {...props}
        >
          <div slot="content">content</div>
          <div>default</div>
        </ComA>
        <input vModel={this.newTodoText} />
        <Input vModel_trim={this.newTodoText1} />
        <div ref="t" class="test" v-show={true} v-my-bold>
          test
        </div>
        {this.$scopedSlots.scopeA && this.$scopedSlots.scopeA({ name: 'scopeA params value: test' })}
      </div>
    );
  },
};

```

指令相关，内置的指令只有 v-show 可以使用,但是可以使用自定义指令

事件修饰符：目前仅支持.passive、.capture、.once 三个，其余需要自己代码实现。不建议使用,因为少而且容易导致代码可读性较差

绑定变量：`<div>{param}</div>`，如果 param 是一个 boolean，那么不会渲染内容；如果是一个对象会返回一个 undefined。

if/map：if 实现条件渲染；map 实现遍历渲染

v-model:支持,也可以自己实现 value 和 input 事件来手动控制 value 改变

动态赋值：支持动态赋值 props、attrs 等顶级属性,使用 ... 作为扩展操作符来传递整个属性对象。这种方式需要注意的就是属性对象的定义需要遵守数据对象的约定格式

怎么引入组件
vue 组件引入 jsx 组件：同引入 vue 组件
jsx 组件引入 vue 组件：不需要注册到 components

## 解析

[jsx 解析](https://zhuanlan.zhihu.com/p/59434351)

## 为什么要用渲染函数(jsx)来编写组件

正如官网介绍的那样，如果我们需要获取 JavaScript 的完全编程的能力，或者 react 和 vue 中都在使用的，为了保持统一使用 jsx

例如需要动态的给组件赋值 props 或者 attrs、例如规避大量的 v-if（这需要编写 createElement 函数，jsx 也无法规避）、模版调试麻烦
