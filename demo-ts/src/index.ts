let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;

function f({ a = "", b = 0 } = {}): void {
  // ...
  console.log('a: ' + a + ', b: ' + b)
}

f();