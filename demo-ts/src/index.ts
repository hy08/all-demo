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