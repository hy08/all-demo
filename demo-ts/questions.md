# TS收纳箱

## 类型兼容性
ts中的类型是针对结构而非声明，意味着哪怕声明是不同的两个类，只要结构一致也能彼此赋值。
因此存在兼容性问题。

```dotnetcli
//问题一：rest参数究竟是什么？rest参数为什么不能赋值给可选参数
let foo = (x: number, y: number) => { };
let bar = (x?: number, y?: number) => { };
let bas = (...args: number[]) => { };
let bar1 = (x?: number, y?: number, z?: number) => { };

foo = bar;
foo = bas;
bar = foo; //error 必填参数（具体类型）不可赋值给可选参数（联合类型）
bas = foo;
bar = bas; //error rest参数也是具体类型，原因同上
bas = bar;

//问题二：为什么这两变量可以相互赋值
//答案，当b赋值给a的时候，a已经是undefined类型，之后自然可以赋值给b
let a: number | undefined;
let b: undefined = undefined;
a = b;
b = a;

//问题三：怎么避免类型声明不同，但是结构相同的兼容问题
interface ScreenCoordinate {
  x: number;
  y: number;
}
interface PrintCoordinate {
  x: number;
  y: number;
}
function sendToPrinter(pt: PrintCoordinate) {
  // ...
}
function getCursorPos(): ScreenCoordinate {
  return { x: 0, y: 0 };
}

sendToPrinter(getCursorPos());
```

## 交叉类型&、联合类型|
交叉类型用于mixins混入。
联合类型表示一个值可以是几种类型之一。
```dotnetcli
//为什么c类型是never
var c: number & string;
```