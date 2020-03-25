// let foo = (x: number, y: number) => { };
// let bar = (x?: number, y?: number) => { };
// let bas = (...args: number[]) => { };
// let bar1 = (x?: number, y?: number, z?: number) => { };
// //问题一：rest参数究竟是什么？rest参数为什么不能赋值给可选参数
// foo = bar;
// foo = bas;
// bar = foo;
// bas = foo;
// bar = bas;
// bas = bar;


// let x = (a: number) => 0;
// let y = (b: number, s: string) => 0;

// y = x; // OK

// //为什么这两变量可以相互赋值
// let a: number | undefined;
// let b: undefined = undefined;
// a = b;
// b = a;

interface IAnyObject {
  [prop: string]: any
}

function mixin<T extends IAnyObject, U extends IAnyObject>(first: T, second: U): T & U {
  const result = <T & U>{};
  for (let id in first) {
    (<T>result)[id] = first[id];
  }
  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      (<U>result)[id] = second[id];
    }
  }

  return result;
}

const x = mixin({ a: 'hello' }, { b: 42 });

//为什么c类型是never
var c: number & string;

