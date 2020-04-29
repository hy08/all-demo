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

// interface IAnyObject {
//   [prop: string]: any
// }

// function mixin<T extends IAnyObject, U extends IAnyObject>(first: T, second: U): T & U {
//   const result = <T & U>{};
//   for (let id in first) {
//     (<T>result)[id] = first[id];
//   }
//   for (let id in second) {
//     if (!result.hasOwnProperty(id)) {
//       (<U>result)[id] = second[id];
//     }
//   }

//   return result;
// }

// const x = mixin({ a: 'hello' }, { b: 42 });

// //为什么c类型是never
// var c: number & string;

// type Direction = 'North' | 'East' | 'South' | 'West';

// function move(distance: number, direction: Direction) {
//   // ...
// }

//类型转换
enum Color {
  Red,
  Yellow,
  Blue
}
let red: number = Color.Red;

interface Person {
  name: string;
  age: number;
  location?: string;
}

type mixin = { name: string } & { age: number };

const human: mixin = { name: '张三', age: 14 };

type T = Exclude<1 | 2, 1 | 3>


const todoInputDefaultProps = {
  inputSetting: {
    maxlength: 20,
    placeholder: '请输入todo',
  }
}

const createPropsGetter = <DP extends object>(defaultProps: DP) => {
  return <P extends Partial<DP>>(props: P) => {
    type PropsExcludingDefaults = Omit<P, keyof DP>
    type RecomposedProps = DP & PropsExcludingDefaults

    return (props as any) as RecomposedProps
  }
}
const getProps = createPropsGetter(todoInputDefaultProps)
const { inputSetting } = getProps({})
//空对象可以赋值给Partial类型变量
type optional = Partial<typeof todoInputDefaultProps>;
const props: optional = { inputSetting };

export enum ActionTodoConstants {
  ADD_TODO = 'todo/add',
  TOGGLE_TODO = 'todo/toggle'
}
let id = 0
const addTodo = (name: string) => ({
  payload: {
    todo: {
      done: false,
      id: id++,
      name,
    }
  },
  type: ActionTodoConstants.ADD_TODO,
})
type AddTodoAction = ReturnType<typeof addTodo>


// type K3 = keyof { [x: string]: string, name: boolean };
// const p: K3 = 1;

class Images {
  public src: string = 'https://www.google.com.hk/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
  public alt: string = '谷歌'
  public width: number = 500
}

type propsNames = keyof Images

type propsType = Images[propsNames]

function pick<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n]);
}
const user = {
  username: 'Jessica Lee',
  id: 460000201904141743,
  token: '460000201904141743',
  avatar: 'http://dummyimage.com/200x200',
  role: 'vip'
}
const res = pick(user, ['token', 'id'])

interface User {
  username: string
  id: number
  token: string
  avatar: string
  role: string
}
type partial<T> = { [K in keyof T]?: T[K] }
type partialUser = partial<User>

declare function f<T extends boolean>(x: T): T extends true ? string : number;

const x = f(Math.random() < 0.5)
const y = f(false)
const z = f(true)

type WrappedUsage<T> = [T] extends [boolean] ? "YES" : "NO";
type NotDistributed = WrappedUsage<number | boolean>

type Filter<T, U> = T extends U ? T : never;
type R1 = Filter<string | number | (() => void), Function>;

interface Part {

  id: number;
  name: string;
  subparts: Part[];
  updatePart(newName: string): void;
}
type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]
type R = FunctionPropertyNames<Part>;

interface People {
  id: string
  name: string
  age?: number
  from?: string
}
type NullableKeys<T> = { [K in keyof T]: undefined extends T[K] ? K : never }[keyof T];
type RR = Exclude<NullableKeys<People>, undefined>;


class BeeKeeper {
  hasMask: boolean;
}

class ZooKeeper {
  nametag: string;
}

class Animal {
  numLegs: number;
}

class Bee extends Animal {
  keeper: BeeKeeper;
}

class Lion extends Animal {
  keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;  // typechecks!
createInstance(Bee).keeper.hasMask;   // typechecks!


type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

type Result = UnionToIntersection<{ a: string } | { b: number }>;

//什么鬼！！！
// function handler(arg: string) {
//   // ....
// }

// function doSomething(callback: (arg1: string, arg2: number) => void) {
//   callback('hello', 42);
// }

// // 很多人的预期是这里会报错,因为doSomething要求的回调函数是有两个参数的,但是handler只有一个参数
// doSomething(handler);


function doSomething(): number {
  return 42;
}

function callMeMaybe(callback: () => void) {
  callback();
}

// 有人认为这里会报错,原因是doSomething返回的是number,而callback返回的是void
callMeMaybe(doSomething);