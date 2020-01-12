# 第 1 章    面向对象的JavaScript
## 1.0 预览

。。。



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