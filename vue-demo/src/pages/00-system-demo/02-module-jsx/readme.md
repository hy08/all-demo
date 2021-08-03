## 问题

我不清楚使用 jsx 方式编写组件如何传递参数，为什么要这么传递？
衍生问题：
为什么要用 jsx 编写组件，模板方式编写组件的缺陷在哪？

## jsx 组件和单文件写法的差异

- class 和 style
- 条件和循环
- 事件处理，修饰符
- props，attrs，domProps
- v-model
- 插槽
- 自定义指令

## 为什么要用 jsx

## 解析

> vue 如何解析 jsx 文件和.vue 文件，解析成了什么，解析之后子组件何如挂载到根组件上，怎么跑生命周期
> VNode 顶层字段:class,style,attrs,props,domProps,on,nativeOn,directives,scopedSlots,slot,key,ref,refInFor
> vue 应用：根组件和子组件

class:class 类名，给组件绑定 class 会直接在组件根节点创建对应的类名

style:行内样式，给组件绑定 style 会直接在组件根节点创建对应的行内样式

attrs:组件中未声明是 props，父组件又绑定的属性(class 和 style 除外)

props:定义组件的属性

domProps:DOM 对象的属性，例如 innerHTML、title

on：事件的触发

nativeOn:原生事件

directives:自定义指令

scopedSlots:作用域插槽

slot:不知道什么作用

key: 赋值为组件的 key

ref:不知道什么作用

refInFor:不知道什么作用
