# 第 3 章 基本概念

## 3.0 预览

......



## 3.1 语法

ECAMScript的语法大量借鉴了C以及其他类C语言（如Java和Perl）的语法。



### 3.1.1 区分大小写

ECMAScript中的一切（变量、函数名和操作符）都区分大小写，变量名`test`和`Test`是两个不同的变量。



### 3.1.2 标识符

ECMAScript中的标识符可以是按照下列格式规则组合起来的一个或多个字符：

* 第一个字符必须是一个字母、下划线（_）或一个美元符号（$）；
* 其他字符可以是字母、下划线、美元符号或数字。

> 不能把关键字、保留字、true、false和null用作标识符。[3.2节](./three.html#_3-2-关键字和保留字)将介绍更多相关内容。



### 3.1.3 注释

ECMAScript使用C风格的注释，包括单行注释和块级注释。单行注释以两个斜杠开头，如下所示：

```javascript
// 单行注释
```

块级注释以一个斜杠和一个星号（/\*）开头，以一个星号和一个斜杠（\*/）结尾，如下所示：

```javascript
/*
*	这是一个多行
*  （块级）注释
*/
```

虽然上面注释中的第二和第三行都以一个星号开头，但这不是必需的。之所以添加那两个星号纯粹是为了提高注释的可读性（这种格式在企业及应用级应用得比较多）。



### 3.1.4 严格模式

ECMAScript5引入了严格模式（strict mode）的概念。严格模式是为JavaScript定义了一种不同的解析与执行模型。在严格模式下，ECMAScript3中一些不确定的行为会得到处理，同时一些不安全的操作也会抛出错误。严格模式的启动方式如下：

```javascript
// 如果要在整个脚本中启用严格模式，可以在顶部添加如下代码
"use strict"

// 只在某个函数中启用严格模式
function doSomething () {
    "use strict"
    
    // some code...
}
```



### 3.1.5 语句

ECMAScript中的语句以一个分号结尾；

> 虽然语句结尾的分号不是必需的，但我们建议任何时候都不要省略它。

<font color="#eb2f06">🤔：上述为书籍原话，但是在当今的js开发中，因为有足够优秀的ASI（分号自动插入机制），所以加不加分号完全可以靠个人爱好来决定，但是需要注意下方的几个例子会导致js引擎错误解析。
</font>

例子1

```javascript
a = b
// 以“(”开头的情况
(function() {
    
})()

// javascript会解释成：
a = b(function() {
    
})();
```

例子2

```javascript
a = function() {

}
// 以“[“开头的情况
[1,2,3].forEach(function(item) {
    
});

// javascript会解释成：
a = function() {
}[1,2,3].forEach(function(item) {
    
});
```

例子3

```javascript
a = 'abc'
// 以“/”开头的情况
/[a-z]/.test(a)

// 期望的结果为true，但是javascript会解释成：
a = ‘abc’/[a-z]/.test(a);
```

例子4

```javascript
a = b
// 以“+”或“-”开头的情况
+c // -c

// javascript会解释成：
a = b + c; // a = b - c
```

同时需要注意

```
// 如果在return、break、continue、throw等关键字后面换行，javascript会在换行处填补分号。如：
return
{
    a: 1
}

// 会解释成：
return;
{
    a: 1
}

// 如果“++”或“--”运算符作为表达式的后缀时，表达式应该写在同一行，否则也会解释有误,例如：
x
++
y

// 会解释成：
x;
++y;

// 而不是
x++;
y;
```

上述的几个例子都是极小概率的情况下才可能出现的错误，正常的开发几乎不会去这么写，所以加不加分号在现在的开发中真的取决于你是不是强迫症了。



## 3.2 关键字和保留字

关键字（带*号为第5版新增）

|      |        |  |  |
| --------- | -------- | ---------- | ------ |
| break     | do       | instanceof | typeof |
| case      | else     | new        | var    |
| catch     | finally  | return     | void   |
| continue  | for      | switch     | while  |
| debugger* | function | this       | with   |
| default   | if       | throw      | delete |
| in        | try      |            |        |

第3版保留字

|  |        |        |         |
| -------- | ---------- | --------- | ------------ |
| abstract | enum       | int       | short        |
| boolean  | export     | interface | static       |
| byte     | extends    | long      | super        |
| char     | final      | native    | synchronized |
| class    | float      | package   | throws       |
| const    | goto       | private   | transient    |
| debugger | implements | protected | volatile     |
| double   | import     | public    |              |

第5 版把在非严格模式下运行时的保留字缩减为下列这些：

|  |    |  |  |
| ----- | ------ | ------- | ----- |
| class | enum   | extends | super |
| const | export | import  |       |

在严格模式下，第5 版还对以下保留字施加了限制：

|  |  |  |  |
| ---------- | ------- | ------ | --------- |
| implements | package | public | interface |
| private    | static  | let    | protected |
| yield      |         |        |           |



### 3.3 变量

讲解了JavaScript声明变量的方式、JavaScript是松散类型，局部变量。

省略变量声明关键字会将变量声明至全局对象身上（浏览器是window，Node是global）。



## 3.4 数据类型

ECMAScript5中有5种简单数据类型（也称为基本数据类型）：

- Undefined
- Null
- Boolean
- Number
- String

<font color="eb2f06">🤔：ECAMScript2015中，新增了一种简单数据类型——Symbol，所以目前为止，JavaScript一共有六种简单数据类型。</font>

以及一种复杂数据类型——Object。



### 3.4.1 typeof操作符

鉴于ECMAScript是松散类型，需要一种手段来检测给定变量的数据类型——typeof，以下是typeof可能返回的值：

* "undefined"——如果这个值未定义；
* "boolean"——如果这个值是布尔值；
* "string"——如果这个值是字符串；
* "number"——如果这个值是数值；
* "object"——如果这个值是对象或null；
* "function"——如果这个值是函数；
* <font color="eb2f06">"symbol——如果这个值是Symbol；"</font>



### 3.4.2 Undefined类型

Undefined类型只有一个值，即特殊的undefined。在声明变量但未赋值时，变量为undefined，例如：

 ```js
var message;
console.log(message); // undefined

// 等价于
var message = undefined;
 ```

注意：未声明和声明未赋值这两种变量是不同的，前者在被调用时会抛出异常，但是在typeof操作符中，二者却会返回同样的值：

```js
var message;

console.log(typeof messgae); // undefined
console.log(typeof age); // undefined
```



### 3.4.3 Null类型

Null类型也只有null一个值，它通常被用来作为对象变量的初始化。

实际上，undefined值是派生自null值的，因此ECMA-262规定二者在做相等运算时要返回true，即

```javascript
console.log(undefined == null); // true
```

不过这里其实进行了隐式转换，在本章的后面会提及。



### 3.4.4 Boolean类型

Boolean类型只有两个值：true和false

下表为各类型转换Boolean类型的规则：

| 数据类型  | 转换为true的s值              | 转换为false的值 |
| --------- | ---------------------------- | --------------- |
| Boolean   | true                         | false           |
| String    | 任何非空字符串               | ""（空字符串）  |
| Number    | 任何非零数字值（包括无穷大） | 0和NaN          |
| Object    | 任何对象                     | null            |
| Undefined | /                            | undefined       |
| Symbol    | /                            | /               |



### 3.4.5 Number类型

**1.  浮点数值**

JavaScript的数字类型使用IEEE754格式来表示整数和浮点数值，下面为js中的数字示例：

```javascript
var num1 = 66; // 整数
var num2 = 066; // 八进制
var num3 = 0x66; // 十六进制
var num4 = 1.1; // 浮点数
var num5 = .1; // 浮点数，解析为0.1
var num6 = 1.0; // 整数，解析为1
var num7 = 3.125e7; // 整数，科学记数法，解析为31250000
```

因为IEEE754格式的痛病，JavaScript中同样存在浮点数计算精度丢失问题：

```js
console.log(0.1 + 0.2); // 0.30000000000000004
```

**2. 数值范围**

由于内存的限制，JavaScript在大多浏览器中，数值的最小值为5e-324，最大值为1.7976931348623157e+308，如果超出，负值会被转换为-Infinity（负无穷），正值会被转换为Infinity（正无穷），被转换为无穷的值将无法参与下次的计算 。

<font color="eb2f06">🤔：任何含有Infinity的计算最终结果只会返回Infinity或NaN。</font>

**3. NaN**

NaN，即非数值（Not a Number），大部分是异常计算后的结果。

NaN本身有两个非同寻常的特点，首先任何涉及NaN的操作（例如NaN/10）都会返回NaN；其次，NaN是唯一一种不与自身相等的值，换句话说，NaN与任何值都不相等。

```js
console.log(NaN == NaN); // false
```

针对这一特性，ECMAScript为我们提供了`isNaN()`全局方法，这个函数会帮我们确定某一个值是否“**不是数值**”。

```js
isNaN(NaN); // ture
isNaN('A String'); // ture
isNaN(undefined); // ture
isNaN({}); // ture
```

<font color="eb2f06">🤔：在ES6中，Number对象身上新增了一个isNaN方法，该方法用于检测某一个值是否为NaN，更加符合方法名的含义。</font>

```js
Number.isNaN(NaN); // ture
Number.isNaN('A String'); // false
Number.isNaN(undefined); // false
Number.isNaN({}); // false
```

**4. 数值转换**

有3个函数可以将非数值转换为数值：`Number()`、`parseInt()`、`parseFloat()`.

`Number()`函数的转换规则如下：

* 如果是Boolean值，true和false分别转换为1和0；
* 如果是数字值，只是简单的传入和返回；
* 如果是null，返回0；
* 如果是undefined，返回NaN；
* 如果是字符串，遵循下列规则：
  * 如果字符串只包含数字（包括前面带正号或负号的情况），则将其转换为十进制数值；
  * 如果字符串是一个有效的十六进制，则将其转换为十六进制数值；
  * 如果字符串是空的，返回0；
  * 如果字符串包含除了上述格式之外的字符，则返回NaN。
* 如果是对象，则调用对象的`valueOf()`方法，然后依照前面的规则转换返回的值。如果转换的结果为NaN，则调用对象的`toString()`方法，然后再次依照前面的规则转换返回的字符串。

下面是上述规则的例子

```js
var num1 = Number("hello world"); // NaN
var num2 = Number(""); // 0
var num3 = Number("011"); // 11
var num4 = Number("true"); // 1
```

`parseInt()`会找到第一个非空格字符，如果其不是正负号或数字，直接返回NaN，反之则继续向后解析，直到遇到一个非数字值或者结束，并将解析到的值转换为数字返回。

```js
var num1 = parseInt("123blue"); // 123
var num2 = parseInt(""); // NaN
var num3 = parseInt("0xA"); // 10（十六进制数）
var num4 = parseInt("22.5"); // 22
var num5 = parseInt("070"); // 56（八进制数）
var num6 = parseInt("70"); // 70（十进制数）
var num7 = parseInt("0xf"); // 15（十六进制数）
```

在ES3和ES5中，"070"的解析存在分歧，ES3认为是56（八进制），ES5认为是70（十进制），为了消除分歧，`parseInt()`方法新增了第二个参数，用于设置返回值的进制格式。

```js
var num = parseInt("AF", 16); // 175
var num = parseInt("AF"); // NaN，默认为10进制
```

`parseFloat()`在`parseInt()`的基础上新增了对浮点数的识别。



### 3.4.6 String类型

JavaScript的字符串用`''`和`""`包裹是等价的，但是要保证两边的引号相同。

String 数据类型包含一些特殊的字符字面量，也叫转义序列，用于表示非打印字符，或者具有其他用途的字符

| 字面量 | 含义                                                         |
| ------ | ------------------------------------------------------------ |
| \n     | 换行                                                         |
| \t     | 制表                                                         |
| \b     | 空格                                                         |
| \r     | 回车                                                         |
| \f     | 进纸                                                         |
| \\\    | 斜杠                                                         |
| \\'    | 单引号（'），在用单引号表示的字符串中使用。例如：'He said, \'hey.\'' |
| \\"    | 双引号（"），在用双引号表示的字符串中使用。例如："He said, \"hey.\"" |
| \xnn   | 以十六进制代码nn表示的一个字符（其中n为0～F）。例如，\x41表示"A" |
| \unnnn | 以十六进制代码nnnn表示的一个Unicode字符（其中n为0～F）。例如，\u03a3表示希腊字符Σ |

注意：这些转义字符表示1个字符。

数值、布尔值、对象和字符串值（没错，每个字符串也都有一个toString()方法，该方法返回字符串的一个副本）都有toString()方法。但null 和undefined 值没有这个方法。

toString()方法可以传递一个参数：输出数值的基数，例如：

```javascript
var num = 10;
alert(num.toString()); // "10"
alert(num.toString(2)); // "1010"
alert(num.toString(8)); // "12"
alert(num.toString(10)); // "10"
alert(num.toString(16)); // "a"
```

转型函数String()能够将任何类型的值转换为字符串，转换规则：

- 如果值有toString()方法，则调用该方法（没有参数）并返回相应的结果
- 如果值是null，则返回"null"
- 如果值是undefined，则返回"undefined"



### 3.4.7 Object类型

ECMAScript中的对象其实就是一组数据和功能的集合。

```javascript
var o = new Object();
var o = new Object; // 有效，但不推荐省略圆括号
```

Object 的每个实例都具有下列属性和方法：

- constructor：保存着用于创建当前对象的函数。对于前面的例子而言，构造函数（constructor）就是Object()；
- hasOwnProperty(propertyName)：用于检查给定的属性在当前对象实例中（而不是在实例 的原型中）是否存在。其中，作为参数的属性名（propertyName）必须以字符串形式指定（例如：o.hasOwnProperty("name")）；
- isPrototypeOf(object)：用于检查传入的对象是否是传入对象的原型（第5 章将讨论原型）；
- propertyIsEnumerable(propertyName)：用于检查给定的属性是否能够使用for-in 语句（本章后面将会讨论）来枚举。与hasOwnProperty()方法一样，作为参数的属性名必须以字符串形式指定；
- toLocaleString()：返回对象的字符串表示，该字符串与执行环境的地区对应；
- toString()：返回对象的字符串表示；
- valueOf()：返回对象的字符串、数值或布尔值表示。通常与toString()方法的返回值相同。

> 从技术角度讲，ECMA-262中对象的行为不一定适用于JavaScript中的其他对象，比如BOM和DOM，都属于宿主对象，因为它们是由宿主实现提供和定义的。ECMA-262不负责定义宿主对象，因此宿主对象可能会也可能不会继承Object。

