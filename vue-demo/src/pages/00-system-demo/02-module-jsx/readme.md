## 什么是 jsx

jsx 是一个 JavaScript 的语法扩展，我的理解是可以视为在 js 函数中编写 html 代码。

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

使用 createElement 创建一个 VNode 对象，而使用渲染函数最后返回的就是 VNode。

关于 createElement

```
// @returns {VNode}
createElement(
  // {String | Object | Function}
  // 一个 HTML 标签名、组件选项对象，或者
  // resolve 了上述任何一种的一个 async 函数。必填项。
  'div',

  // {Object}
  // 一个与模板中 attribute 对应的数据对象。可选。
  {
    // (详情见下一节)
  },

  // {String | Array}
  // 子级虚拟节点 (VNodes)，由 `createElement()` 构建而成，
  // 也可以使用字符串来生成“文本虚拟节点”。可选。
  [
    '先写一些文字',
    createElement('h1', '一则头条'),
    createElement(MyComponent, {
      props: {
        someProp: 'foobar'
      }
    })
  ]
)
```

createElement 第二个参数对象

```
{
  // 与 `v-bind:class` 的 API 相同，
  // 接受一个字符串、对象或字符串和对象组成的数组
  'class': {
    foo: true,
    bar: false
  },
  // 与 `v-bind:style` 的 API 相同，
  // 接受一个字符串、对象，或对象组成的数组
  style: {
    color: 'red',
    fontSize: '14px'
  },
  // 普通的 HTML attribute
  attrs: {
    id: 'foo'
  },
  // 组件 prop
  props: {
    myProp: 'bar'
  },
  // DOM property
  domProps: {
    innerHTML: 'baz'
  },
  // 事件监听器在 `on` 内，
  // 但不再支持如 `v-on:keyup.enter` 这样的修饰器。
  // 需要在处理函数中手动检查 keyCode。
  on: {
    click: this.clickHandler
  },
  // 仅用于组件，用于监听原生事件，而不是组件内部使用
  // `vm.$emit` 触发的事件。
  nativeOn: {
    click: this.nativeClickHandler
  },
  // 自定义指令。注意，你无法对 `binding` 中的 `oldValue`
  // 赋值，因为 Vue 已经自动为你进行了同步。
  directives: [
    {
      name: 'my-custom-directive',
      value: '2',
      expression: '1 + 1',
      arg: 'foo',
      modifiers: {
        bar: true
      }
    }
  ],
  // 作用域插槽的格式为
  // { name: props => VNode | Array<VNode> }
  scopedSlots: {
    default: props => createElement('span', props.text)
  },
  // 如果组件是其它组件的子组件，需为插槽指定名称
  slot: 'name-of-slot',
  // 其它特殊顶层 property
  key: 'myKey',
  ref: 'myRef',
  // 如果你在渲染函数中给多个元素都应用了相同的 ref 名，
  // 那么 `$refs.myRef` 会变成一个数组。
  refInFor: true
}
```

正如官网展示的那样，如果每次编写组件都是用 createElemnt 来创建 VNode，那么就太痛苦了。所以 vue 集成了将 jsx 语法转换成 createElement 函数的插件，在每次编译的时候就会进行转换。

## 怎么编写一个 jsx 组件

vue-cli4 已经默认支持 jsx 语法,可以直接创建后缀是 jsx 的文件或者是 vue 的文件。

```
import styles from './index.less'; //采用了css module，需要进行一定的配置
//导出一个组件对象
export default {
  name: 'ComB',
  props: {
    prop1: {
      type: String,
    },
  },
  methods: {
    handleClick() {
      this.$emit('click', '组件自定义事件触发了');
    },
  },

  //除了需要声明一个render函数，其余用法同vue组件的<script>标签的用法一致

  render() {
    console.log('插槽', this, this.$scopedSlots);
    return (
      <div class={styles.container}>
        <header>jsx组件</header>
        <button onClick={this.handleClick}>测试事件</button>
        {this.$scopedSlots.scopeA && this.$scopedSlots.scopeA({ name: 'scopeA params value: test' })}
      </div>
    );
  },
};
```

## 问题

我不清楚使用 jsx 方式编写组件如何传递参数，为什么要这么传递？
衍生问题：
为什么要用 jsx 编写组件，模板方式编写组件的缺陷在哪？

## 为什么要用 jsx

## 解析

> vue 如何解析 jsx 文件和.vue 文件，解析成了什么，解析之后子组件何如挂载到根组件上

class:class 类名，给组件绑定 class 会直接在组件根节点创建对应的类名

style:行内样式，给组件绑定 style 会直接在组件根节点创建对应的行内样式

attrs:组件中未声明是 props，父组件又绑定的属性(class 和 style 除外)

props:对应的属性会赋值给组件定义好的 props

domProps:DOM 对象的属性，例如 innerHTML

on：事件的触发

nativeOn:组件根元素的原生事件

directives:自定义指令

scopedSlots:作用域插槽

slot:组件作为其他组件的子组件，需要为该组件的插槽提供名字，也就是具名插槽

key: 赋值为组件的 key

ref:节点的实例的引用，和 template 的 ref 相同

refInFor: 如果同一个节点设置了该值，会导致该节点 ref 变成数组

指令相关，除了 v-show 可以使用

事件修饰符：舍弃

if/map

v-model:支持

修饰符

动态赋值

怎么引入组件：不需要绑定
vue 组件引入 jsx 组件，jsx 组件引入 vue 组件,驼峰
