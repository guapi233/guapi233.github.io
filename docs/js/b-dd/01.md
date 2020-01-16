# 第 1 章    面向对象的JavaScript
## 1.0 预览

本章是第一部分——基础知识三章中的第一章，为读者介绍了**动态类型语言的特点**、面向对象中的**多态**和**封装**两大特性，并从而引出了本书要介绍得第一个设计模式，同时在JavaScript中占有非常重要位置的**原型模式**



## 1.1 动态类型语言和鸭子类型

* 从类型检测和业务实现上描述了静态类型和动态类型的优缺点

* 动态类型建立于鸭子类型之上，关于鸭子类型的通俗说法是：“如果它走起路来像鸭子，叫起来也是鸭子，那么它就是鸭子。”，这句话可以通过一个小故事和一段代码来映照：

  故事

  > 从前在JavaScript王国中，有一个国王，他觉得世界上最美妙的声音就是鸭子的叫声，于是国王召集大臣，要组建一个1000只鸭子组成的合唱团。大臣们找遍了全国，找到了999只鸭子，但是始终还差一只，最后大臣发现有一只非常特别的鸡，它的叫声跟鸭子一模一样，于是这只鸡就成为了合唱团的最后一员。

  代码

  ```javascript
  var duck = {
  	duckSinging: function () {
  		console.log("嘎嘎嘎");
  	}
  };
  
  var chicken = {
  	duckSinging: function () {
  		console.log("嘎嘎嘎");
  	}
  };
  
  var choir = []; // 合唱团
  
  var joinChoir = function (animal) {
  	if (animal && typeof animal.duckSinging === "function") {
  		choir.push(animal);
  		console.log("恭喜加入合唱团");
  		console.log("合唱团已有成员数量：" + choir.length);
  	}
  }
  ```

  鸭子类型的思想在于注重对象的行为而非对象本身，例如，一个对象如果有length属性，也可以依照下标来存取属性，并且有着和数组同样的行为，那么它就可以被当做一个数组来用。



## 1.2 多态

多态的实际含义是：同一操作作用于不同的对象上面，可以产生不同的解释和不同的执行结果。换句话说，给不同的对象发送同一个消息的时候，这些对象会根据这个消息分别给出不同的反馈。

用例子阐述上面的话

> 主人家里养了两只动物，分别是一只鸭和一只鸡，当主人向他们发出“叫”的命令时，鸭会“嘎嘎嘎“地叫，而鸡会”咯咯咯“地叫。这两种动物都会以自己的方式来发出叫声。他们同样”都是动物，并且可以发出叫声“，但根据主人的指令，它们会各自发出不同的叫声。



### 1.2.1 一段“多态”的JavaScript代码

```javascript
var makeSound = function (animal) {
    if (animal instanceof Duck) {
        console.log("嘎嘎嘎");
    } else if (animal instanceof Chicken) {
        console.log("咯咯咯");
    }
};

var Duck = function () {};
var Chicken = function () {};

makeSound(new Duck()); // “嘎嘎嘎”
makeSound(new Chicken()); // “咯咯咯”
```

这段代码确实体现了”多态性“，但是这样的”多态“是无法令人满意的，如果后面又增加了一种动物，比如狗，狗的叫声是”汪汪汪“，此时我们必须得改动`makeSound`函数，才能让狗也发出叫声。

多态背后的思想是将“做什么”和“谁去做以及怎样去做”分离开来，也就是将“不变的事物”与“可能改变的事物”分离开来。



### 1.2.2 对象的多态性

下面是根据上述提到的思想修改后的代码

```javascript
// 不变的部分
var makeSound = function (animal) {
	animal.sound && animal.sound();
};

// 可变的部分
var Duck = function () {};
Duck.prototype.sound = function () {
	console.log("嘎嘎嘎");
};

var Chicken = function () {};
Chicken.prototype.sound = function () {
	console.log("咯咯咯");
}

makeSound(new Duck()); // 嘎嘎嘎
makeSound(new Chicken()); // 咯咯咯

// 如果需要增加一名动物，我们只需要添加一些代码即可
var Dog = function () {};
Dog.prototype.sound = function () {
	console.log("rua!");
}

makeSound(new Dog()); // rua!
```



### 1.2.3 类型检查和多态

类型检查会使静态类型语言的多态无法像动态类型语言的多态一样简单直观的表现出来。

拿java语言为例，重新实现鸭子和鸡叫唤的代码

```java
// 鸭子类
public class Duck {
    public void makeSound () {
        System.out.println("嘎嘎嘎");
    }
}

// 鸡类
public class Chicken {
    public void makeSound () {
        System.out.println("咯咯咯");
    }
}

public class AnimalSound {
    public void makeSound(Duck duck) {
        duck.makeSound();
    }
}

public class Test {
    public static void main (String args[]) {
        AnimalSound animalSound = new AnimalSound();
        Duck duck = new Duck();
        Chicken chicken = new Chicken();
        
        animalSound.makeSound(duck); // 嘎嘎嘎
        animalSound.makeSound(chicken); // 报错，只能接受Duck类型的参数
    }
}
```

为了解决这一问题，静态类型的面向对象语言通常被设计为可以向上转型：当给一个类变量赋值时，这个变量的类型即可以使用这个类本身，也可以使用这个类的超类。例如：可以将“一只麻雀在飞”和“一只喜鹊在飞”的具体类型省略，可以说“一只鸟在飞”。



### 1.2.4 使用继承得到多态效果

通过继承机制修改的java代码

```java
// 抽象类
public abstract class Animal {
	abstract void makeSound(); // 抽象方法
}

public class Chicken extends Animal {
    public void makeSound () {
        System.out.println("咯咯咯");
    }
}

public class Duck extends Animal {
    public void makeSound () {
        System.out.println("嘎嘎嘎");
    }
}

public class AnimalSound {
    public void makeSound (Animal animal) {
        animal.makeSound();
    }
}

public class Test {
    public static void main (String args[]) {
        AnimalSound animalSound = new AnimalSound();
        Animal duck = new Duck();
        Animal chicken = new Chicken();
        
        animalSound.makeSound(duck); // 嘎嘎嘎
        animalSound.makeSound(chicken); // 咯咯咯
    }
}
```



### 1.2.5 JavaScript的多态

多态的思想实际上是把”做什么“和”谁去做“分离开来，要实现这一点，归根到底先要消除类型之间的耦合关系。如果类型之间的耦合关系没有被消除，那么我们的`makeSound`方法就不可能被两种不同的对象调用，在java中，可以通过向上转型来实现多态。

而JavaScript的变量类型在运行期是可变的，这意味着JavaScript对象的多态性是与生俱来的。所以，在JavaScript中，某一种动物是能发出叫声，只取决于它有没有`makeSound`方法，而不取决于它是否是某种类型的对象。



### 1.2.6 多态在面向对象程序中的作用

> 多态的最根本好处在于，你不必再向对象询问“你是什么类型”而后根据得到的答案调用对象的某个行为——你只管调用该行为就是了，其他一切多态机制都会为你安排妥当。
>
> <p align="right">— Martin Fowler 《重构：改善既有代码的设计》</p>

换句话说，多态最根本的作用就是通过把过程化的条件分支语句转化为对象的多态性，从而消除这些条件分支语句，Martin Fowler的话可以用下面的例子很好地诠释：

> 在电影的拍摄现场，当导演喊出“action”时，主角开始背台词，照明师负责打灯光，后面的群众演员假装中枪倒地，道具师往镜头里撒上雪花。在得到同一个消息时，每个对象都知道自己应该做什么。如果不利用对象的多态性，而是用面向过程的方式来编写这一段代码，那么相当于在电影开始拍摄之后，导演每次都要走到每个人的面前，确认他们的职业分工（类型），然后告诉他们要做什么。如果映射到程序中，那么程序中将充斥着条件分支语句。



例子：地图API的调用

```javascript
var googleMap = {
	show: function () {
		console.log("开始渲染谷歌地图");
	}
};

var baiduMap = {
	show: function () {
		console.log("开始渲染百度地图");
	}
};

var renderMap = function (mapType) {
	if (mapType === "google") {
		googleMap.show();
	} else if (mapType === "baidu") {
		baiduMap.show();
	}
};

renderMap("google"); // 开始渲染谷歌地图
renderMap("baidu"); // 开始渲染百度地图
```

通过多态特性将`renderMap`函数进行修改

```javascript
var renderMap = function (map) {
	if (map.show && map.show instanceof Function) {
		map.show();
	}
}

renderMap(googleMap); // 开始渲染谷歌地图
renderMap(baiduMap); // 开始渲染百度地图
```

这个例子中假设每个地图API提供的展示地图的方法名都是`show`，在实际开发中也许不会如此顺利，这时候可以借助[适配器模式](/js/b-dd/seventeen.html)来解决问题。 



### 1.2.7 设计模式与多态

本小节强调了多态在设计模式中的重要性，并针对后面章节所讲的部分设计模式举例，可跳过学习完涉及的设计模式后再返回来阅读。

拿[命令模式](/js/b-dd/nine.html)来说，请求被封装在一些命令对象中，这使得命令的调用者和命令的接受者可以完全解耦开来，当调用命令的`execute`方法时，不同的命令会做不同的事情，从而会产生不同的执行结果。而做这些事情的过程是早已经被封装在命令对象内部的，作为调用命令的客户，根本不必去关心命令执行的具体过程。

在[组合模式](/js/b-dd/ten.html)中，多态性使得客户可以完全忽略组合对象和叶节点对象之前的区别，这正是组合模式最大的作用所在。对组合对象和叶节点对象发出同一个消息的时候，它们会各自做自己应该做的事情，组合对象把消息继续转发给下面的叶节点对象，叶节点对象则会对这些消息作出真实的反馈。

在[策略模式](/js/b-dd/five.html)中，`Context`并没有执行算法的能力，而是把这个职责委托给了某个策略对象。每个策略对象负责的算法已被各自封装在对象内部。当我们对这些策略对象发出“计算”的消息时，它们会返回各自不同的计算结果。

在JavaScript这种将函数作为一等对象的语言中，函数本身也是对象，函数用来封装行为并且能够被四处传递。当我们对一些函数发出“调用”的消息时，这些函数会返回不同的执行结果，这是“多态性”的一种体现，也是**很多设计模式在JavaScript中可以用高阶函数来代替实现的原因**。



## 1.3 封装

封装的目的是将信息隐藏。一般而言，我们讨论的封装式是装数据和封装实现。



### 1.3.1 封装数据

在许多语言的对象系统中，封装数据是由语法解析来实现的，这些语言也许提供了`private`、`public`、`protected`等关键字来提供不同的访问权限。

但JavaScript中没有这些，所以除了ES6中的`let/const`，我们一般通过函数的作用域来做封装：

```js
var myObject = (function () {
    var _name = "崔永杰"; // 私用（private）变量
    return {
        getName: function () {
            return _name;
        }
    }
})();

console.log(myObject.getName()); // 崔永杰
console.log(myObject._name); // undefined
```

另外，ES6中的[Symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)类型也可以实现属性私有化。



### 1.3.2 封装实现

封装的目的是将信息隐藏，封装应该被视为“任何形式的封装”，也就是说，封装不仅仅是隐藏数据，还包括隐藏细节、设计细节以及隐藏对象的类型等。

对象之间只通过暴露的API接口来通信。但我们修改一个对象时，可以随意地修改它的内部实现，只要对外的接口没有变化，就不会影响到程序的其他功能。



### 1.3.3 封装类型

封装类型是静态类型语言中一种重要的封装方式。一般而言，封装类型是通过抽象类和接口来进行的（[Animal示例](#_1-2-4-使用继承得到多态效果)），当然在JavaScript中，我们没有能力，也没有必要做得更多。



### 1.3.4 封装变化

从设计模式的角度出发，封装在更重要的层面体现为封装变化。

> “考虑你的设计中哪些地方可能变化，这种方式与关注会导致重新设计的原因相反。它不是考虑什么时候会迫使你的设计改变，而是考虑你怎样才能够在不重新设计的情况下进行改变。这里的关键在于封装发生变化的概念，这里是许多设计模式的主题。”

通过封装变化的方式，把系统中稳定不变的部分和容易变化的部分隔离开来，在系统的演变过程中，我们只需要替换那些容易变化的部分，如果这些部分是已经封装好的，替换起来也相对容易。这可以最大程度的保证程序的稳定性和可拓展性。



## 1.4 原型模式和基于原型继承的JavaScript对象系统

在以类为中心的面向对象编程语言中，类和对象的关系可以想象成铸模和铸件的关系，对象总是从类中创建而来。而在原型编程的思想中，类并不是必需的，对象为必需要从类中创建而来，一个对象是通过克隆另外一个对象所得到的。就像电影《第六日》一样，通过克隆可以创造一个一模一样的人，而且本体和克隆体看不出任何区别。



### 1.4.1 使用克隆的原型模式

假设我们在编写一个飞机大战的网页游戏。某种飞机拥有分身技能，如果不使用原型模式，那么在创建分身之前，无疑必须先保存该飞机的当前信息，随后将这些信息设置到新飞机上，才能得到一架一模一样的新飞机。

而如果使用原型模式，我们只需要调用负责克隆的方法即可。

```js
var Plane = function () {
    this.blood = 100;
    this.attackLevel = 1;
    this.defenseLevel = 1;
};

var plane = new Plane();
plane.blood = 500;
plane.attackLevel = 10;
plane.defenseLevel = 7;

var clonePlane = Object.create(plane);
console.log(clonePlane.blood); // 500
console.log(clonePlane.attackLevel); // 10
console.log(clonePlane.defenseLevel); // 7
```

在不支持`Object.create`方法的浏览器中，则可以使用以下代码：

```js
Object.create = Object.create || function (obj) {
    var Fn = function () {};
    Fn.prototype = obj;
    
    return new Fn();
}
```



### 1.4.2 克隆是创建对象的手段

原型模式提供了另外一种创建对象的方式，通过克隆对象，我们就不用再关心对象的具体类型名字。这就像一个仙女要送给三岁小女孩生日礼物，虽然小女孩可能还不知道飞机或者船怎么说，但她可以指着商店橱柜里的飞机模型说“我要这个”。



### 1.4.3 体验Io语言

Io语言在2002年由Steve Dekorte发明。[Io语言解释器](http://iolanguage.com/)

Io语言同样以原型来构建面向对象系统。



### 1.4.4 原型编程范型的一些规则

* 所有的数据都是对象；
* 要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它；
* 对象会记住它的原型；
* 如果对象无法响应某个请求，他会把这个请求委托给他自己的原型。



### 1.4.5 JavaScript中的原型继承

**1. 所有的数据都是对象**

JavaScript在设计的时候，模仿Java引入了两套类型机制：基本类型和对象类型。

按照JavaScript设计者的本意，除了undefined之外，一切都应该是对象。而这些对象最上层的根对象便是`Object.prototype`。

```js
var obj1 = new Object();
var obj2 = {};

console.log(Object.getPrototypeOf(obj1) === Object.getPrototypeOf(obj2)); // true
```

**2. 要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它**

在IO语言中，clone的动作非常明显，如下：

```io
Dog := Animal clone
```

但在JavaScript中，我们不需要关心克隆的细节，因为这是引擎内部负责实现的。

```js
// 使用new运算符从构造器中得到一个对象
function Person (name) {
    this.name = name;
};

Person.prototype.getName = function () {
    return this.name;
};

var cyj = new Person("崔永杰");

console.log(cyj.name); // 崔永杰
console.log(cyj.getName()); // 崔永杰
console.log(Object.getPrototypeOf(cyj) === Person.prototype); // true
```

注意这里`Person`并不是类，而是函数构造器，JavaScript的函数既可以作为普通函数被调用，也可以作为构造器被调用。当时用`new`运算符来调用函数，此时的韩束就是一个构造器。用`new`运算符来创建对象的过程，实际上也只是先克隆`Object.prototype`对象，在进行一些其他额外操作的过程。

<font color="eb2f06">🤔：JavaScript实际上并不是每次都真正地克隆了一个新的对象。从内存方面的考虑出发，JavaScript还作了一些额外的处理，具体细节可以参阅周爱民老师编著的《JavaScript语言精髓与变成实践》。</font>

在Chrome和Firefox等向外暴露了对象`_proto_`属性的浏览器下，我们可以通过下面这段代码来理解`new`运算的过程：

```js
function Person (name) {
  this.name = name;
};

Person.prototype.getName = function () {
  return this.name;
};

var objectFactory = function () {
  var obj = new Object(); // 从Object.prototype上克隆一个空的对象

  var Constructor = [].shift.call(arguments); // 取得外部传入的构造器，此例是Person

  obj.__proto__ = Constructor.prototype; // 指向正确的原型

  var ret = Constructor.apply(obj, arguments); // 借用外部传入的构造器给obj设置属性

  return typeof ret === "object" ?ret :obj; // 确保构造器总是会返回一个对象
};

var cyj = objectFactory(Person, "崔永杰");

console.log(cyj.name); // 崔永杰
console.log(cyj.getName()); // 崔永杰
console.log(Object.getPrototypeOf(cyj) === Person.prototype); // true
```

<font color="eb2f06">😭：\_\_proto\_\_两边分别有两条下划线。</font>

**3. 对象会记住它的原型**

目前我们一直在讨论“对象的原型“，就JavaScript的真正实现来说，其实并不能说对象有原型，而只能说对象的构造器有原型。对于”对象把请求委托给它自己的原型“这句话，更好的说话是把请求委托给它的构造器的原型。

JavaScript给对象提供了一个名为`__proto__`的隐藏属性，某个对象的`__proto__`属性默认会指向它的构造器的原型对象，即`构造器.prototype`。在一些浏览器中，`__proto__`被公开出来，我们可以在Chrome或者Firefox上用这段代码来验证：

```js
var a = new Object();
console.log(a.__proto__ === Object.prototype); // true
```

实际上，`__proto__`就是对象跟“对象构造器的原型”联系起来的纽带。正因为对象要通过`__proto__`属性来记住它的构造器的原型，所以我们用上一节的`objectFactory`函数来模拟用`new`创建对象时，需要手动给`obj`对象设置正确的`__proto__`指向。

```js
// 通过这句代码，我们让obj的__proto__不再指向Object.prototype，而是指向Constructor.prototype
obj.__proto__ = Constructor.prototype;
```

**4. 如果对象无法响应某个请求，它会把这个请求委托给它的构造器的原型**

JavaScript的对象最初都是由`Object.prototype`对象克隆来的，但对象构造器的原型并不限于`Object.prototype`上，而是可以动态指定其他对象。

```js
var obj = {name: "崔永杰"};

var A = function () {};
A.prototype = obj;

var a = new A();
console.log(a.name); // 崔永杰
```

执行上面这段代码时，引擎做了以下操作：

* 首先，尝试遍历对象`a`中的所有属性，但没有找到`name`属性；
* 查找`name`属性的这个请求被委托给对象`a`的构造器的原型，它被`a.__proto__`记录着并且指向`A.prototype`，而`A.prototype`被设置为对象`obj`；
* 在对象`obj`中找到了`name`属性，并返回它的值。

这样，当我们期望一个“类”继承另一个“类”的特性时，可以这样：

```js
var A = function () {};
A.prototype = {name: "崔永杰"};

var B = function () {};
B.prototype = new A();

var b = new B();
console.log(b.name); //崔永杰
```

执行上面这段代码时，引擎做了以下操作：

* 首先，尝试遍历对象`b`中的所有属性，但没有找到`name`属性；
* 查找`name`属性的这个请求被委托给对象`b`的构造器的原型，它被`b.__proto__`记录着并且指向`B.prototype`，而`B.prototype`被设置为一个通过`new A()`创建出来的对象；
* 在该对象中依然没有找到`name`属性，于是请求被继续委托给这个对象的构造器的原型`A.prototype`；
* 在`A.prototype`中找到了`name`属性，并返回它的值。

<font color="eb2f06">🤔：需要注意的是，原型链并不是无限长的，因为`Object.prototype`是最上层的对象，并且它的`__proto`为`null`，所以如果请求委托到了`Object.prototype`这里还没有找到，那么这次请求将会在此打住，并返回`undefined`。</font>



### 1.4.6 原型继承的未来

设计模式在很多时候其都体现了语言的不足之处。Peter Norving曾说，设计模式是对语言不足的补充，如果要使用设计模式，不如去找一门更好的语言。这句话非常正确。不过，作为Web前端开发者，相信JavaScript在未来很长一段时间内都是唯一的选择。虽然我们没有办法换一门语言，但语言本身也在发展，说不定哪天某个模式在JavaScript中就已经是天然的存在，不再需要拐弯抹角来实现。如果`Object.create`就是原型模式的天然实现。

美中不足的是，`Object.create`存在一些性能不足。以及通过`Object.create(null)`可以创建出没有原型的对象。

另外，ES6带来了新的Class语法。这让JavaScript**看起来像**是一门基于类的语言，但其背后仍是通过原型机制来创建对象。以下是一段简单的代码实例：

```js
class Animal {
    constructor (name) {
        this.name = name;
    }
    
    getName () {
        return this.name;
    }
}

class Dog extends Animal {
    constructor (name) {
        super(name);
    }
    
    speak () {
        return "rua!";
    }
}

var dog = new Dog("ywwuyi");
console.log(dog.getName() + " says：" + dog.speak());
```



### 1.4.7 小节

本节讲述了本书的第一个设计模式——原型模式。原型模式是一种设计模式，也是一种编程泛式，它构成了JavaScript这门语言的根本。本届首先通过更加简单的Io语言来引入原型模式的概念，随后学习了JavaScript中的原型模式。原型模式十分重要，和JavaScript开发者的关系十分密切。通过原型来实现的面向对象系统虽然简单，但能力同样强大。