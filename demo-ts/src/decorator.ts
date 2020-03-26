//装饰器
//意味着装饰器本身是一个函数，装饰对象作为参数
function addAge(constructor: Function) {
  constructor.prototype.age = 18;
}

// 声明装饰器修饰方法/属性
function method(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log(target);
  console.log("prop " + propertyKey);
  console.log("desc " + JSON.stringify(descriptor) + "\n\n");
  descriptor.writable = false;
};

@addAge
class Person {
  name: string;
  age!: number;
  constructor() {
    this.name = 'person';
  }
  @method
  say() {
    return 'instance method';
  }

  @method
  static run() {
    return 'static method';
  }
}

let person = new Person();

console.log(person.age);

const xmz = new Person();

// 修改实例方法say
xmz.say = function () {
  return 'edit'
}

// 打印结果,检查是否成功修改实例方法
console.log(xmz.say());