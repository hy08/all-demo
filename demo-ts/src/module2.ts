import { moduleName } from "./module1";

console.log(moduleName);

export class Dog {

  constructor(name: string, age: number) {
    this._name = name;
    this._age = age;
  }


  private _name: string;
  private _age: number;

  /**
   * Getter name
   * @return {string}
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Getter age
   * @return {number}
   */
  public get age(): number {
    return this._age;
  }

  /**
   * Setter age
   * @param {number} value
   */
  public set age(value: number) {
    this._age = value;
  }

  /**
   * Setter name
   * @param {string} value
   */
  public set name(value: string) {
    this._name = value;
  }

}

let dog = new Dog('金毛', 2);
dog.name = '特朗普';
dog.age = 10;