"use strict";

class BaseBuilder {
  constructor(value) {
    this.value = value;
  }

  plus(...args) {
    this.value = args.reduce((acc, v) => acc + v, this.value);
    return this;
  }

  get() {
    return this;
  }
}

// ES6 style child class of BaseBuilder
class IntBuilder extends BaseBuilder {
  constructor(integer) {
    super(integer || 0);
  }

  minus(...int) {
    this.value = Math.abs(int.reduce((acc, v) => acc - v, this.value));
    return this;
  }

  multiply(n) {
    this.value = n * this.value;
    return this;
  }

  divide(n) {
    this.value = Math.floor(this.value / n);
    return this;
  }

  mod(n) {
    this.value = this.value % n;
    return this;
  }

  static random(from, to) {
    this.value = Math.abs(Math.floor(Math.random() * (to - from)));
    return this;
  }
}

const intBuilder = new IntBuilder(10);
intBuilder.plus(2, 3, 2).minus(1, 2).multiply(2).divide(4).mod(3).get();
console.log(intBuilder.value);

//additional requirements check
const r = IntBuilder.random(10, 100);
console.log(r.value);
const intBuilder2 = new IntBuilder().plus(6).get();
console.log(intBuilder2.value);

// ES5 style child class of BaseBuilder
function StringBuilder(str) {
  Object.assign(this, new BaseBuilder());
  this.value = str || "";
}

StringBuilder.prototype = Object.create(BaseBuilder.prototype);
StringBuilder.prototype.constructor = StringBuilder;
StringBuilder.prototype.minus = function (n) {
  this.value = this.value.slice(0, -n);
  return this;
};
StringBuilder.prototype.multiply = function (int) {
  this.value = this.value.repeat(int);
  return this;
};
StringBuilder.prototype.divide = function (n) {
  var k = Math.floor(this.value.length / n);
  this.value = this.value.substring(0, k);
  return this;
};
StringBuilder.prototype.remove = function (str) {
  this.value = this.value.split(str).join(" ");
  return this;
};
StringBuilder.prototype.sub = function (from, n) {
  this.value = this.value.substring(from, n + 1);
  return this;
};

const strBuilder = new StringBuilder("Hello");
strBuilder.plus(" all", "!").minus(4).multiply(3).divide(4).remove("l").sub(1, 1).get();
console.log(strBuilder.value);

//additional requirements check
const strBuilder2 = new StringBuilder("").plus(" all", "!").get();
console.log(strBuilder2.value);