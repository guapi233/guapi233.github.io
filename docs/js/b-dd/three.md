# 第 3 章 闭包和高阶函数

虽然JavaScript是一门完整的面向对象的编程语言，但这门语言同时也拥有许多函数式语言的特性。

函数式语言的鼻祖是LISP，JavaScript在设计之初参考了LISP的两大方言之一的Scheme，引入了Lambda表达式、闭包、高阶函数等特性。



## 3.0 预览

。。。。。。



## 3.1 闭包

对于JavaScript程序员来说，闭包（closure）是一个难懂又必须征服的概念。闭包的形成与变量的作用域以及变量的生存周期密切相关。



### 3.1.1 变量的作用域

变量的作用域，就是指变量的有效范围。我们常谈到的是函数中声明的变量作用域。

```js
var func = function () {
    var a = 1;
    console.log(a); // 1
};

func();
console.log(a); // Uncaught ReferenceError: a is not defined
```

在JavaScript中，函数可以用来创造函数作用域。此时的函数像一层透明的玻璃，在里面可以看到外面的变量，而在外面则无法看到函数里面的变量。关于作用域链可以参考[这里](/js/b-hd/four.html#_4-2-执行环境及作用域)。

下面展示一段嵌套函数的代码，加深对变量搜索过程的理解：

```js
var a = 1;

var func = function () {
    var b = 2;
    var func1 = function () {
        var c = 3;
        console.log(b); // 2
        console.log(a); // 1
    };
    
    func2();
    console.log(c); // c is not defined
};
```



### 3.1.2 变量的生存周期

除了变量的作用域之外，另外一个跟闭包有关的概念是变量的生存周期。

一般情况下，JavaScript函数中的变量会随着函数的结束而被打上销毁，等待下一次[垃圾回收机制](/js/b-hd/four.html#_4-2-执行环境及作用域)时被回收。

现在来看看先这段代码：

```js
var func = function () {
    var a = 1;
    return function () {
        a++;
        console.log(a);
    };
};

var f = func();

f(); // 2
f(); // 3
f(); // 4
```

这是因为当执行`var f = func();`时，f返回了一个匿名函数的引用，它可以访问到`func()`被调用时产生的环境，而局部变量`a`一直处在这个环境里。在这里产生了一个闭包结构，局部变量的声明看起来被延续了。

利用闭包可以完成许多奇妙的工作，例如：

```html
<html>
    <body>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
    </body>
    <script>
    	var nodes = document.getElementsByTagName("div");
        
        for (var i = 0, len = nodes.length; i < len; i++) {
            nodes[i].onclick = function () {
                console.log(i);
            };
        };
    </script>
</html>
```

通过这段代码我们发现，无论点击哪个div，最后弹出的结果都是5。这是因为div节点的`onclick`事件是异步触发的，当时间被触发的时候，for循环早已结束，此时的变量`i`的值已经是5，所以在`div`的`onclick`事件沿着作用域链寻找变量`i`时，找到的总是5。

通过闭包解决上述问题：

```js
for (var i = 0, len = nodes.length; i < len; i++) {
  (function (i) {
      nodes[i].onclick = function () {
          console.log(i);
  	  };
  })(i)          
};
```

根据同样的道理，我们还可以：

```js
var Type = {};

for (var i = 0, type; type = ["String", "Array", "Number"][i++];) {
  (function (type) {
    Type["is" + type] = function (obj) {

      return Object.prototype.toString.call(obj) === "[object " + type + "]";
    }
  })(type)
};

console.log(Type.isArray([]));// true
console.log(Type.isString("")); // true
```

<font color="eb2f06">🤔：如果将立刻执行函数部分去掉，再次访问Type身上的方法时发现，`type`为undefined，这是因为for循环结束后`type`变量已经超过了数组`["String", "Array", "Number"]`的有效下标。</font>



### 3.1.3 闭包的更多作用

**1. 封装变量**

闭包可以帮助把一些不需要暴露在全局的变量封装成“私有变量“：

```js
var mult = function () {
    var a = 1;
    for (var i = 0, l = arguments.length; i < l; i++) {
        a *= arguments[i];
    }
    return a;
};
```

`mult`函数接受一些Number类型的参数，并返回这些参数的成绩。现在我们觉得对于那些相同的参数来说，每次都进行计算是一种浪费，我们可以加入缓存机制来提高这个函数的性能：

```js
var cache = {};

var mult = function () {
    var args = Array.prototype.join.call(arguments, ",");
    
    if (cache[args]) {
        return cache[args];
    }
    
    var a = 1;
    for (var i = 0, l = arguments.length; i < l; i++) {
        a *= arguments[i];
    }
    
    return cache[args] = a;
}

console.log(mult(1, 2, 3)); // 6
console.log(mult(1, 2, 3)); // 6
```

我们看到`cache`这个变量不仅仅在`mult`函数中被使用，与其让`cache`变量跟`mult`函数一起平行地暴露在全局变量作用域下，不如把它封装在`mult`函数内部：

```js
var mult = (function () {
  var cache = {};

  return function () {
    var args = Array.prototype.join.call(arguments, ",");

    if (cache[args]) {
      return cache[args];
    }

    var a = 1;
    for (var i = 0, l = arguments.length; i < l; i++) {
      a *= arguments[i];
    }

    return cache[args] = a;
  }
})();

console.log(mult(1, 2, 3))
```

提炼函数是代码重构中的一种常见技巧。如果在一个大函数中有一些代码块能够独立出来，我们常常把这些代码块封装在独立的小函数里面。独立出来的小函数有助于代码复用，如果这些小函数有一个良好的命名，它们本身也起到了注释的作用：

```js
var mult = (function () {
  var cache = {};
  // 将计算过程封装为calculate函数
  var calculate = function () {
    var a = 1;
    for (var i = 0, l = arguments.length; i < l; i++) {
      a *= arguments[i];
    }

    return a;
  };

  return function () {
    var args = Array.prototype.join.call(arguments, ",");
    if (args in cache) {
      return cache[args];
    }

    return cache[args] = calculate.apply(null, arguments);
  }
})();
```

**2. 延续局部变量的寿命**

`img`对象经常用于进行数据上报，如下所示：

```js
var report = function (src) {
    var img = new Image();
    img.src = src;
};

report("http://xxx.come");
```

但是通过查询后台的记录我们得知，因为一些低版本浏览器的实现存在bug，存在着数据丢失的问题。原因是因为`img`对象是`report`函数中的局部变量，当`report`函数的调用结束后，`img`局部变量随即被销毁，而此时或许还没来得及发出HTTP请求，所以此次请求就会丢失掉。

利用闭包解决上述问题：

```js
var report = (function () {
    var imgs = [];
    
    return function (src) {
        var img = new Image();
        imgs.push(img);
        img.src = src;
    };
})();
```



### 3.1.4 闭包和面向对象设计

过程与数据的结合是形容面向对象中的“对象”时经常使用的表达。对象以方法的形式包含的过程，而闭包则是在过程中以环境的形式包含了数据。通过用面向对象思想能实现的功能，用闭包也能实现。

例如下面这段代码：

```js
var extent = function () {
    var value = 0;
    
    return {
        call: function () {
            value++;
            console.log(value);
        }
    };
};

var extent = extent()

extent.call(); // 1
extent.call(); // 2
extent.call(); // 3
```

如果用面向对象的写法，就是：

```js
var extent = {
    value: 0,
    call: function () {
        this.value++;
        console.log(this.value);
    }
};

extent.call(); // 1
extent.call(); // 2
extent.call(); // 3
```

或者：

```js
var Extent = function () {
    this.value = 0;
};

Extent.prototype.call = function () {
    this.value++;
    console.log(this.value);
};

var extent = new Extent();
extent.call(); // 1
extent.call(); // 2
extent.call(); // 3
```



### 3.1.5 用闭包实现命令模式

在完成闭包实现的命令模式之前，我们先用面向对象的方式来编写一段命令模式的代码。虽然还没有进入设计模式的学习，但这个作为演示作用的命令模式结构非常简单：

```html
<html>

<body>
  <button id="execute">点击我执行命令</button>
  <button id="undo">点击我执行命令</button>
</body>
<script>
  // receiver
  var Tv = {
    open: function () {
      console.log("打开电视机");
    },
    close: function () {
      console.log("关闭电视机");
    }
  };

  // middle module
  var OpenTvCommand = function (receiver) {
    this.receiver = receiver;
  };

  OpenTvCommand.prototype.execute = function () {
    this.receiver.open(); // 执行命令，打开电视机
  };

  OpenTvCommand.prototype.undo = function (){
    this.receiver.close(); // 撤销命令，关闭电视机
  };

  var setCommand = function (command) {
    document.getElementById("execute").onclick = function () {
      command.execute(); // 打开电视机
    };

    document.getElementById("undo").onclick = function () {
      command.undo(); // 关闭电视机
    };
  }

  setCommand(new OpenTvCommand(Tv));

</script>

</html>
```

命令模式的意图是把请求封装为对象，从而分离请求的发起者和请求的接受者（执行者）之间的耦合关系。在命令被执行前，可以预先往命令对象中植入命令的接收者。

但在JavaScript中，函数作为一等对象，本身就可以四处传递，用函数对象而不是普通对象来封装请求显得更加简单和自然。如果需要往函数对象中预先植入命令的接收者，那么闭包可以完成这个工作。在面向对象版本的命令模式中，预先植入的命令接收者被当成对象的属性保存起来；而在闭包版本的命令模式中，命令接收者会被封闭在闭包形成的环境中，代码如下：

```js
var Tv = {
    open: function () {
        console.log("打开电视机");
    },
    close: function () {
        console.log("关闭电视机");
    }
};

var createCommand = function (receiver) {
    var execute = function () {
        return receiver.open(); // 执行命令，打开电视机
    }
    
    var undo = function () {
        return receiver.close(); // 撤销命令，关闭电视机
    }
    
    return {
        execute,
        undo
    }
};

var setCommand = function (command) {
    document.getElementById("execute").onclick = function () {
        command.execute(); // 打开电视机
    }
    
    document.getElementById("undo").onclick = function () {
        command.undo(); // 关闭电视机
    }
};

setCommand(createCommand(Tv));
```



### 3.1.6 闭包与内存管理

闭包是一个非常强大的特性，但人们对其也有诸多误解。一种耸人听闻的说法是闭包会造成内存泄露，所以要尽量介绍闭包的使用。

闭包确实会使垃圾回收机制无法回收部分变量，但也不能说是内存泄露。如果需要回收，手动将变量设为null即可。



## 3.2 高阶函数

高阶函数是指至少满足下列条件之一的函数：

* 函数可以作为参数被传递；
* 函数可以作为返回值输出。

JavaScript语言中的函数显然满足高阶函数的条件，在实际开发中，无论是将函数当做参数传递，还是让函数的执行结果返回另一个函数，都有很多应用场景。



### 3.2.1 函数作为参数传递

把函数当做参数传递，这代表我们可以抽离出一部分容易变化的业务逻辑，把这部分业务逻辑放在函数参数中，这样一来可以分离业务代码中变化与不变的部分。其中一个重要应用场景就是回调函数。

**1. 回调函数**

比如ajax请求：

```js
var getUserInfo = function (userId, callback) {
	$.ajax("http://xxx.com/get?" + userId, function (data) {
		if (typeof callback === "function") {
			callback(data);
		}
	});
}

getUserInfo(13125, function (data) {
	console.log(data.userName);
})
```

当一个函数不适合执行一些请求时，我们也可以把这些请求封装成一个函数，并把它作为参数传递给另外一个函数，“委托”给另一个函数来执行。

比如，我们想在页面创建100个div节点，然后把这些div节点都设置为隐藏，下面是一种编码方式：

```js
var appendDiv = function () {
    for (var i = 0; i < 100; i++) {
        var div = document.createElement("div");
        div.innerHTML = i;
        document.body.appendChild(div);
        div.style.display = "none";
    }
};

appendDiv();
```

把`div.style.display = "none";`的逻辑硬编码在`appendDiv`中显然是不合理的，`appendDiv`未免有点个性化，成为了一个难以复用的函数，并不是每个人创建了节点之后就希望它们立刻被隐藏。

于是我们可以这样：

```js
var appendDiv = function (callback) {
    for (var i = 0; i < 100; i++) {
        var div = document.createElement("div");
        div.innerHTML = i;
        document.body.appendChild(div);
        
        if (typeof callback === "function") {
            callback(div);
        }
    }
};

appendDiv(function (node) {
    node.style.display = "none";
})
```

**2. Array.prototype.sort**

`Array.prototype.sort`接收一个函数当做参数，这个函数里面封装了数组元素的排序规则。我们的目的是对数组进行排序，这是不变的部分；而使用什么规则去排序，则是可变的部分。

```js
// 从小到大排列, 1 3 4
[1, 4, 3].sort(function (a, b) {
    return a - b;
})

// 从大到小排列, 4 3 1
[1, 4, 3].sort(function (a, b) {
    return b - a;
})
```



### 3.2.2 函数作为返回值输出

让函数继续返回一个可执行的函数，意味着运算过程是可延续的。

**1. 判断数据的类型**

下面是一段判断数据类型的代码：

```js
var isString = function (obj) {
    return Object.prototype.toString.call(obj) === "[object String]";
};

var isArray = function (obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
};

var isNumber = function (obj) {
    return Object.prototype.toString.call(obj) === "[object Number]";
};
```

这些函数的大部分实现都是相同的，不同的只是`Object.prototype.toString.call(obj)`返回的字符串。我们可以这样修改：

```js
var isType = function (type) {
    return function (obj) {
        return Object.prototype.toString.call(obj) === `[object ${type}]`;
    }
};

var isString = isType("String");

console.log(isString("崔永杰")); // true
```

我们还可以用循环语句，来批量注册这些`isType`函数：

```js
var Type = {};

for (var i = 0, type; type = ["String", "Array", "Number"][i++];) {
    (function (type) {
        Type["is" + type] = function (obj) {
            return Object.prototype.toString.call(obj) === `[object ${type}]`;
        }
    })(type)
};

console.log(Type.isArray([])); // true
```

**2. getSingle**

下面是一个单例模式的例子，在第三部分设计模式中，我们将进行更深入的讲解：

```js
var getSingle = function (fn) {
    var ret;
    
    return function () {
        return ret || (ret = fn.apply(this, arguments));
    };
};
```

这个高阶函数的例子，既把函数当做参数传递，又让函数执行后返回了另外一个函数。我们可以看看`getSingle`函数的效果：

```js
var getScript = getSingle(function () {
    return document.createElement("script");
});

var script1 = getScript();
var script2 = getScript();

console.log(script1 === script2); // true
```



### 3.2.3 高阶函数实现AOP

AOP（面向切面编程）的主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来，这些跟业务逻辑无关的功能通常包括日志统计、安全控制、异常处理等。把这些功能抽离出来之后，在通过“动态织入”的方式掺入业务逻辑模块中。这样做的好处首先是可以保持业务逻辑模块的纯净和高内聚性，其次是可以很方便地复用日志统计等功能模块。

在Java语言中，可以通过反射和动态代理机制来实现AOP技术。而在JavaScript这种动态语言中，AOP的实现更加简单，这是JavaScript与生俱来的能力。

通常，在JavaScript中实现AOP，都是指把一个函数“动态织入”到另外一个函数之中，具体实现技术有很多，本节我们通过拓展`Function.prototype`来做到这一点。代码如下：

```js
Function.prototype.before = function (beforefn) {
    var _self = this; // 保存原函数的引用
    
    // 返回包含了原函数和新函数的“代理”函数
    return function () {
        beforefn.apply(this, arguments); // 执行新函数，修正this
        
        return _self.apply(this, arguments); // 执行原函数
    }
};

Function.prototype.after = function (afterfn) {
    var _self = this;
    
    return function () {
        var ret = _self.apply(this, arguments);
        afterfn.apply(this, arguments);
        
        return ret;
    }
};

var func = function () {
    console.log(2);
};

func = func.before(function () {
    console.log(1);
}).after(function () {
    console.log(3);
});

func();
```

这种使用AOP的方式来给函数添加职责，也是JavaScript语言中一种非常特别和巧妙的装饰者模式实现。



### 3.2.4 高阶函数的其他应用

**1. currying**

函数柯里化（function currying）。currying的概念最早由俄国数学家发明。又称部分求值，一个currying的函数首先会接受一些参数，接收了这些参数之后，该函数不会立即求值，而是继续返回另外一个函数，刚才传入的参数在函数形成的闭包中被保存起来。待到函数被真正需要求值时，之前传入的所有参数都会被一次性用于求值。

假如我们要编写一个计算每月开销的函数。在每天结束之前，我们都要记录每天花掉了多少钱，代码如下：

```js
var monthlyCost = 0;

var cost = function (money) {
    monthlyCost += money;
};

cost(100); // 第1天开销
cost(200); // 第2天开销

console.log(monthlyCost); // 300
```

通过这段代码可以看到，每天结束后我们都会记录并计算到今天为止花掉的钱。但我们其实并不太关心每天花掉多少钱，而只想知道到月底的时候会花掉多少钱。也就是说，实际上只需要在月底计算一次。

```js
var cost = (function () {
    var args = [];
    
    return function () {
        if (arguments.length === 0) {
            var money = 0;
            
            for (var i = 0, l = args.length; i < l; i++) {
                money += args[i];
            }
            
            return money;
        } else {
            [].push.apply(args, arguments);
        }
    }
})();

cost(100); // 第1天开销
cost(200); // 第2天开销

console.log(cost()); // 300
```

接下来我们编写一个通用的`currying`函数，它接收一个参数，即将要被`currying`的函数。在这个例子中，这个函数的作用遍历本月每天的开销并求出它们的总和。

代码如下：

```js
var currying = function (fn) {
    var args = [];
    
    return function () {
        if (arguments.length === 0) {
            return fn.apply(this, args);
        } else {
            [].push.apply(args, arguments);
            
            return arguments.callee;
        }
    }
};

var cost = (function () {
    var money = 0;
    
    return function () {
        for (var i = 0, l = args.length; i < l; i++) {
            money += arguments[i];
        }
        
        return money;
    }
})();

var cost = currying(cost); // 转化成currying函数

cost(100); // 第1天开销
cost(200); // 第2天开销

console.log(cost()); // 300
```



**2. uncurrying**

uncurrying的话题来自JavaScript之父——Brendan Eich在2011年发表的一篇Twitter。以下是uncurrying的实现方式之一 ：

```js
Function.prototype.uncurrying = function () {
    var self = this;
    
    return function () {
        var obj = Array.prototype.shift.call(arguments);
        
        return self.apply(obj, arguments);
    };
};
```

我们先来看看这段代码的作用：

```js
// 在类数组对象arguments借用Array.prototype的方法之前，先把Array.prototype.push.call这句代码转换为一个通用的push函数
var push = Array.prototype.push.uncurrying();

(function () {
    push(arguments, 4);
    console.log(arguments); // 1 2 3 4
})(1, 2, 3);
```

通过uncurrying的方式，`Array.prototype.push.call`变成了一个通用的push函数。

此外，我们还可以一次性将Array原型上的方法一次性“复制”到Array对象上：

```js
;

Function.prototype.uncurrying = function () {
  var self = this;
  
  return function () {
      var obj = Array.prototype.shift.call(arguments);
      
      return self.apply(obj, arguments);
  };
};

for (var i = 0, fn, ary = ["push", "shift", "forEach"]; fn = ary[i++];) {
  Array[fn] = Array.prototype[fn].uncurrying();
};

var obj = {
  "length": 3,
  "0": 1,
  "1": 2,
  "2": 3
}

Array.push(obj, 4);
console.log(obj.length); // 4

var first = Array.shift(obj);
console.log(first, obj); // 1 {"0": 2, "1": 3, "2": 4, "lenght": 3}

Array.forEach(obj, function (i, n) {
  console.log(n); // 0 1 2
})
```

甚至`Function.prototype.call`和`Function.prototype.apply`也可以被uncurrying，不过没啥实际价值，只是使得对函数的调用看起来更像JavaScript语言的前身Scheme：

```js
var call = Function.prototype.call.uncurrying();
var fn = function (name) {
    console.log(name)
};

call(fn, window, "name"); // name

var apply = Function.prototype.apply.uncurrying();
var fn = function (name) {
    console.log(name, arguments)
};

apply(fn, {name: "name"}); // name
```

现在，我们来分析一下`Array.prototype.push.uncurrying()`里面到底发生了什么：

```js
Function.prototype.uncurrying = function () {
    var self = this; // self此时是Array.prototype.push
    
    return function () {
        var obj = Array.prototype.shift.call(arguments);
        /*
        *	obj是 {
        *		"length": 1,
        *		"0": 1
        *	}
        */
        
        // arguments对象的第一个元素被截去，剩下[2]
        return self.apply(obj, arguments);
        // 相当于Array.prototype.push.apply(obj, 2)
    };
};

var push = Array.prototype.push.uncurrying();
var obj = {
    "length": 1,
    "0": 1
};

push(obj, 2);
console.log(obj); // {0: 1, 1: 2, length: 2}
```

除了上面提供的代码实现，下面的代码时uncurrying的另一种实现方式：

```js
Function.prototype.uncurrying = function () {
    var self = this;
    
    return function () {
        return Function.prototype.call.apply(self, arguments);
    }
}
```

