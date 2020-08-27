class MyClass {
  static myStaticProp = 42;

  constructor() {
    console.log(MyClass.myStaticProp); // 42
  }
}
const myClass = new MyClass();

console.log(MyClass.myStaticProp);
