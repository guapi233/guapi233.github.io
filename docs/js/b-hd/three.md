# 第 3 章 基本概念

## 3.0 预览

本章节主要讲解了ECMAScript中的基本要素：

* ECMAScript中的基本数据类型包括Undefined、Null、Boolean、Number、String以及Symbol；
* 与其他语言不通，ECMAScript没有整数和浮点数分别定义不同的数据类型，Number类型可用于表示所有数值；
* ECMAScript中也有一种复杂的数据结构，即Object类型，该类型是这门语言中所有对象的基础类型；
* 严格模式为这门语言容易出错的地方施加了限制；
* ECMAScript提供了很多与C以及其他类C语言中相同的基本操作符，包括算术操作符、布尔操作符、关系操作符、相等操作符及赋值操作符等；
* ECMAScript从其他语言中借鉴了很多流控制语句，例如if语句、for语句和switch语句等。ECMAScript中的函数与其他语言中的函数有诸多不同之处；
* 无需指定函数的返回值，因为任何ECMAScript函数都可以在任何时候返回任何值；
* 实际上，未指定返回值的函数返回的是一个特殊的undefined值；
* ECMAScript中也没有函数签名的概念，因为其函数参数是以一个包含零或多个值的数组的形式传递的；
* 可以向ECMAScript函数传递任意数量的参数，并且可以通过`arguments`对象来访问这些参数；
* 由于不存在函数签名的特性，ECMAScript函数不能重载；
* <font color="eb2f06">ECMAScript中函数的参数只有值传递形式，不存在引用传递。</font>



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

```javascript
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



## 3.5 操作符

ECMAScript操作符的与众不同之处在于，它们能够使用与很多值。不过，在应用于对象时，相应的操作符通常都会调用对象的`valueOf()`或`toString()`方法，以便取得可以操作的值。



### 3.5.1 一元操作符

只能操作一个值的操作符叫做一元操作符

**1. 递增和递减操作符**

++和--，前置和后置

**2. 一元加和减操作符**

+1和-1

**3.位操作符**

二进制的每一位都表示2的幂，幂大小从右向左依次递增，左右边为0

```js
   1		  0			  0			  1			  0
(2^4*1)  + (2^3*0)  +  (2^2*0)  +  (2^1*1)  +  (2^0*0)
  16	 +    0	    +	  0     +     2     +     0  = 18
```

负数同样以二进制码存储，但使用的格式是**二进制补码**，计算一个数值的二进制补码，需要经过下列3个步骤：

- 求这个数值绝对值的二进制码（例如，要求-18的二进制补码，先求18的二进制码）；
- 求二进制反码，即将0替换为1，将1替换为0；
- 得到的二进制反码加1。

例如

```js
// 18
0000	0000	0000	0000	0000	0000	0001	0010

// 求18的二进制反码
1111	1111	1111	1111	1111	1111	1110	1101

// 得到的二进制反码加1
1111	1111	1111	1111	1111	1111	1111	1110
```

**1. 按位非（NOT）**

按位非由一个波浪线`~`表示，其效果就是返回数值的**反码**：

```js
var num = 25
var num1 = ~num;
console.log(num1); // -26，本质就是操作数的负值减1，只不过底层操作更快一点
```

**2. 按位与（AND）**

按位与由一个和号字符`&`表示，其效果是将两个数转为二进制后，每一位对齐，然后在每一位上执行AND操作：

| 第一个数值的位 | 第二个数值的位 | 结果 |
| -------------- | -------------- | ---- |
| 1              | 1              | 1    |
| 1              | 0              | 0    |
| 0              | 1              | 0    |
| 0              | 0              | 0    |

按位与只在两个数位的值都为1时才返回1，否则返回0。

**3. 按位或（OR）**

按位或由一个竖线符号`|`表示，执行方法类似于按位与，只不过条件不同：

| 第一个数值的位 | 第二个数值的位 | 结果 |
| -------------- | -------------- | ---- |
| 1              | 1              | 1    |
| 1              | 0              | 1    |
| 0              | 1              | 1    |
| 0              | 0              | 0    |

按位或只要两个数位中有一个值为1就返回1，两个都为0才返回0。

**4. 按位异或（XOR）**

按位异或由一个插入符号`^`表示，效果如下：

| 第一个数值的位 | 第二个数值的位 | 结果 |
| -------------- | -------------- | ---- |
| 1              | 1              | 0    |
| 1              | 0              | 1    |
| 0              | 1              | 1    |
| 0              | 0              | 0    |

按位异或要求两个数的数位不可以相同，只有在一个为1，另一个为0时才返回1，否则为0。

**5. 左移**

左移由两个小于号`<<`表示，这个操作符会将数值的所有位向左移动指定的位数：

```js
0000	0000	0000	0000	0000	0000	0000	0010

// << 5，向左移动5个位数，空出来的补0
0000	0000	0000	0000	0000	0000	0100	0000
```

注意，左移不会影响操作数的符号位。比如-2左移5位是-64，依旧为负数。

**6. 有符号的右移**

有符号的右移由两个大于号`>>`表示，有符号的右移操作与左移正好相反：

```js
0000	0000	0000	0000	0000	0000	0100	0000

// >> 5，向右移动5个位数，空出来的补符号位（是1补1，是0补0）

0000	0000	0000	0000	0000	0000	0000	0010
```

**7. 无符号的右移**

无符号的右移由三个大于号`>>>`表示，其与有符号的右移不同的是，如果操作数为负数，因为无符号右移不会补符号位，而是直接补0，会导致负数无符号右移后变成一个很大的正数

```js
1111	1111	1111	1111	1111	1111	1110	0000

// >>> 5, 向右移动5个位数，空出来的补0
0000	0111	1111	1111	1111	1111	1111	1111
```



### 3.5.3 布尔操作符

**1. 逻辑非**

无论数值是什么数据类型，这个操作符都会返回一个布尔值，遵循下列规则：

- 如果操作数是一个对象，返回false；
- 如果操作数是一个空字符串，返回true；
- 如果操作数是一个非空字符串，返回false；
- 如果操作数是数值0，返回true；
- 如果操作数是任意非0 数值（包括Infinity），返回false；
- 如果操作数是null或NaN或undefined，返回true。

**2. 逻辑与**

逻辑与操作可以应用于任何类型的操作数，而不仅仅是布尔值。

在有一个操作数不是布尔值的情况下，逻辑与操作就不一定返回布尔值，逻辑与规则如下：

- 如果第一个操作数是对象，则返回第二个操作数；
- 如果第二个操作数是对象，则只有在第一个操作数的求值结果为true 的情况下才会返回该对象；
- 如果两个操作数都是对象，则返回第二个操作数；
- 如果有一个操作数是null，则返回null；
- 如果有一个操作数是NaN，则返回NaN；
- 如果有一个操作数是undefined，则返回undefined。

逻辑与操作属于短路操作，即如果第一个操作数能够决定结果，那么就不会再对第二个操作数求值

```javascript
var found = false;
var result = (found && someUndefinedVariable); // 因为found为false，所以不会执行后面的函数
alert(result); // 会执行（"false"）
```

**3. 逻辑或**

与逻辑与操作相似，如果有一个操作数不是布尔值，逻辑或也不一定返回布尔值

逻辑或规则：

- 如果第一个操作数是对象，则返回第一个操作数；
- 如果第一个操作数的求值结果为false，则返回第二个操作数；
- 如果两个操作数都是对象，则返回第一个操作数；
- 如果两个操作数都是null，则返回null；
- 如果两个操作数都是NaN，则返回NaN；
- 如果两个操作数都是undefined，则返回undefined。

同样，逻辑或也是一个短路操作符。



### 3.5.4 乘性操作符

**1. 乘法**

乘法操作符遵循下列特殊的规则：

- 如果操作数都是数值，执行常规的乘法计算；
- 如果有一个操作数是NaN，则结果是NaN；
- 如果有一个操作数是NaN，则结果是NaN；
- 如果是Infinity 与非0 数值相乘，则结果是Infinity 或-Infinity，取决于有符号操作数的符号；
- 如果是Infinity 与Infinity 相乘，则结果是Infinity；
- 如果有一个操作数不是数值，则在后台调用Number()将其转换为数值，然后再应用上面的规则。

**2. 除法**

除法操作符对特殊的值也有特殊的处理规则：

- 如果操作数都是数值，执行常规的除法计算；
- 如果有一个操作数是NaN，则结果是NaN；
- **如果是Infinity 被Infinity 除，则结果是NaN**；
- **如果是零被零除，则结果是NaN；**
- **如果是非零的有限数被零除，则结果是Infinity 或-Infinity，取决于有符号操作数的符号；**
- 如果是Infinity 被任何非零数值除，则结果是Infinity 或-Infinity，取决于有符号操作数的符号；
- 如果有一个操作数不是数值，则在后台调用Number()将其转换为数值，再应用上面的规则。

**3. 求模**

求模操作符会遵循下列特殊规则来处理特殊的值：

- 如果操作数都是数值，执行常规的除法计算，返回除得的余数；
- 如果被除数是无穷大值而除数是有限大的数值，则结果是NaN；
- 如果被除数是有限大的数值而除数是零，则结果是NaN；
- 如果是Infinity 被Infinity 除，则结果是NaN；
- 如果被除数是有限大的数值而除数是无穷大的数值，则结果是被除数；
- 如果有一个操作数不是数值，则在后台调用Number()将其转换为数值，然后再应用上面的规则。



### 3.5.5 加性操作符

**1. 加法**

加法操作符规则：

- 如果有一个操作数是NaN，则结果是NaN；
- 如果是Infinity 加Infinity，则结果是Infinity；
- 如果是-Infinity 加-Infinity，则结果是-Infinity；
- **如果是Infinity 加-Infinity，则结果是NaN；**
- 如果两个操作数都是字符串，则将第二个操作数与第一个操作数拼接起来；
- 如果只有一个操作数是字符串，则将另一个操作数转换为字符串，然后再将两个字符串拼接起来；
- 如果有一个操作数是对象、数值或布尔值，则调用它们的toString()方法取得相应的字符串值，然后再应用前面关于字符串的规则；
- 对于undefined 和null，则分别调用String()函数并取得字符串"undefined"和"null"。

**2. 减法**

减法操作符规则：

- 如果两个操作符都是数值，则执行常规的算术减法操作并返回结果；
- 如果有一个操作数是NaN，则结果是NaN；
- 如果是Infinity 减Infinity，则结果是NaN；
- 如果是-Infinity 减-Infinity，则结果是NaN；
- 如果是Infinity 减-Infinity，则结果是Infinity；
- 如果是-Infinity 减Infinity，则结果是-Infinity；
- 如果有一个操作数是字符串、布尔值、null 或undefined，则先在后台调用Number()函数将其转换为数值，然后再根据前面的规则执行减法计算；
- 如果有一个操作数是对象，则调用对象的valueOf()方法以取得表示该对象的数值。



### 3.5.6 关系操作符

- 如果两个操作数都是数值，则执行数值比较；
- 如果两个操作数都是字符串，则比较两个字符串对应的字符编码值；
- 如果一个操作数是数值，则将另一个操作数转换为一个数值，然后执行数值比较；
- 如果一个操作数是对象，则调用这个对象的valueOf()方法，如果对象没有valueOf()方法，则调用toString()方法，并用得到的结果根据前面的规则执行比较；
- 如果一个操作数是布尔值，则先将其转换为数值，然后再执行比较。



### 3.5.7 相等操作符

**1. 相等和不相等**

这两个操作符都会先转换操作数（通常称为强制转型），然后再比较它们的相等性。

在转换不同的数据类型时，相等和不相等操作符遵循下列基本规则：

- 如果有一个操作数是布尔值，则在比较相等性之前先将其转换为数值——false 转换为0，而true 转换为1；
- 如果一个操作数是字符串，另一个操作数是数值，在比较相等性之前先将字符串转换为数值；
- 如果一个操作数是对象，另一个操作数不是，则调用对象的valueOf()方法，用得到的基本类型值按照前面的规则进行比；
- **null 和undefined 是相等的；**
- 要比较相等性之前，不能将null 和undefined 转换成其他任何值；
- 如果有一个操作数是NaN，则相等操作符返回false，而不相等操作符返回true；
- 如果两个操作数都是对象，则比较它们是不是同一个对象。如果两个操作数都指向同一个对象，则相等操作符返回true；否则，返回false。

**2. 全等和不全等**

全等和不全等在比较之前，不对操作数进行强制转型。

由于相等和不相等操作符存在类型转换问题，而为了保持代码中数据类型的完整性，我们推荐使用全等和不全等操作符。



### 3.5.8 条件操作符

条件操作符应该算是ECMAScript 中最灵活的一种操作符了。

```javascript
variable = boolean_expression ? true_value : false_value;
```

如果boolean_expression结果为true，则给变量variable 赋true_value 值；如果boolean_expression结果为false，则给变量variable 赋false_value 值。

合理利用三元条件操作符，能极大简化代码。



### 3.5.9 赋值操作符

在等于号（=）前面再添加乘性操作符、加性操作符或位操作符，就可以完成复合赋值操作：

- 乘/赋值（*=）；
- 除/赋值（/=）；
- 模/赋值（%=）；
- 加/赋值（+=）；
- 减/赋值（-=）；
- 左移/赋值（<<=）；
- 有符号右移/赋值（>>=）；
- 无符号右移/赋值（>>>=）。



### 3.5.10 逗号操作符

使用逗号操作符可以在一条语句中执行多个操作：

```javascript
var num1=1, num2=2, num3=3;
```

逗号操作符还可以用于赋值，返回表达式中的最后一项：

```javascript
var num = (5, 1, 4, 8, 0); // num 的值为0
```



## 3.6 语句

ECMA-262 规定了一组语句（也称为流控制语句）定义了ECMAScript 中的主要语法，语句通常使用一或多个关键字来完成给定任务。语句可以很简单，例如通知函数退出，也可以比较复杂，例如指定重复执行某个命令的次数。

![](./three/statement.png)



### 3.6.1 if语句

大多数编程语言中最为常用的一个语句就是if 语句

```javascript
if (i > 25)
	alert("Greater than 25."); // 单行语句
else {
	alert("Less than or equal to 25."); // 代码块中的语句
}
```

> 业界普遍推崇的最佳实践是始终使用代码块



### 3.6.2 do-while语句

do-while 语句是一种后测试循环语句，即只有在循环体中的代码执行之后，才会测试出口条件。

像do-while 这种后测试循环语句最常用于循环体中的代码至少要被执行一次的情形。

```javascript
var i = 0;
do {
    i += 2;
} while (i < 10);

console.log(i);
```



### 3.6.3 while语句

while 语句属于前测试循环语句，也就是说，在循环体内的代码被执行之前，就会对出口条件求值.

```js
var i = 0;
while (i < 10) {
    i += 2;
}

console.log(i);
```



### 3.6.3 for语句

for 语句也是一种前测试循环语句，但它具有在执行循环之前初始化变量和定义循环后要执行的代码的能力

```javascript
for (initialization; expression; post-loop-expression){
  // code...
}
```

for 语句存在极大的灵活性，因此它也是ECMAScript 中最常用的一个语句。



### 3.6.4 for-in语句

for-in 语句是一种精准的迭代语句，可以用来枚举**对象的属性**

```javascript
for (property in expression){
  statement
}
```

示例

```javascript
for (var propName in window) {
    document.write(propName);
}
```

> 使用for-in 循环来显示了BOM 中window 对象的所有属性。每次执行循环时，都会将window 对象中存在的一个属性名赋值给变量propName

如果表示要迭代的对象的变量值为null 或undefined，for-in 语句会抛出错误，ECMAScript 5 更正了这一行为，对这种情况不再抛出错误，而只是不执行循环体，建议在使用for-in 循环之前，先检测确认该对象的值不是null 或undefined。



### 3.6.7 break和continue语句

break 和continue 语句用于在循环中精确地控制代码的执行

break 语句会立即退出循环，强制继续执行循环后面的语句

continue 语句虽然也是立即退出循环，但退出循环后会从循环的顶部继续执行

break 和continue 语句都可以与label 语句联合使用：

```javascript
var num = 0;
outermost:
for (var i=0; i < 10; i++) {
    for (var j=0; j < 10; j++) {
        if (i == 5 && j == 5) {
            break outermost;
        }
        num++;
    }
}
alert(num); //55
```

> 添加outermost标签的结果将导致break 语句不仅会退出内部的for 语句（即使用变量j 的循环），而且也会退出外部的for 语句（即使用变量i 的循环）

```javascript
var num = 0;
outermost:
for (var i=0; i < 10; i++) {
    for (var j=0; j < 10; j++) {
        if (i == 5 && j == 5) {
            continue outermost;
        }
        num++;
    }
}
alert(num); //95
```

> 在这种情况下，continue 语句会强制继续执行循环——退出内部循环，执行外部循环



### 3.6.8 with语句

with 语句的作用是将代码的作用域设置到一个特定的对象中。

```javascript
var qs = location.search.substring(1);
var hostName = location.hostname;
var url = location.href;
```

上面几行代码都包含location 对象。如果使用with 语句：

```javascript
with(location){
    var qs = search.substring(1);
    var hostName = hostname;
    var url = href;
}
```

with 语句关联了location 对象，在with 语句的代码块内部，每个变量首先被认为是一个局部变量，如果在局部环境中找不到该变量的定义，就会查询location 对象中是否有同名的属性。

**严格模式下不允许使用with 语句，否则将视为语法错误。**

由于大量使用with 语句会导致性能下降，同时也会给调试代码造成困难，因此在开发大型应用程序时，**不建议使用with 语句**。



### 3.6.9 switch语句

switch 语句与if 语句的关系最为密切，而且也是在其他语言中普遍使用的一种流控制语句。

switch 语句在比较值时使用的是**全等操作符**，不会发生类型转换：

```javascript
switch (expression) {
    case value: statement
        break;
    case value: statement
        break;
    case value: statement
        break;
    case value: statement
        break;
    default: statement
        break;
}
```

假如确实需要混合几种情形，不要忘了在代码中添加注释：

```javascript
switch (i) {
    case 25:
    /* 合并两种情形 */
    case 35:
        alert("25 or 35");
        break;
    case 45:
        alert("45");
        break;
    default:
        alert("Other");
}
```

JavaScript中的switch也有自己的特色，首先，可以在switch 语句中使用任何数据类型，无论是字符串，还是对象都没有问题。

其次，每个case 的值不一定是常量，可以是变量，甚至是表达式。请看下面这个例子：

```javascript
switch ("hello world") {
    case "hello" + " world":
        alert("Greeting was found.");
        break;
    case "goodbye":
        alert("Closing was found.");
        break;
    default:
        alert("Unexpected message was found.");
}
```

使用表达式：

```javascript
var num = 25;
switch (true) {
    case num < 0:
        alert("Less than 0.");
        break;
    case num >= 0 && num <= 10:
        alert("Between 0 and 10.");
        break;
    case num > 10 && num <= 20:
        alert("Between 10 and 20.");
        break;
    default:
        alert("More than 20.");
}
```



## 3.7 函数

函数的基本语法：

```javascript
function functionName(arg0, arg1,...,argN) {
    statements
}
```

> 推荐要么让函数始终都返回一个值，要么永远都不要返回值。否则，如果函数有时候返回值，有时候有不返回值，会给调试代码带来不便。

严格模式对函数有一些限制：

- 不能把函数命名为eval 或arguments
- 不能把参数命名为eval 或arguments
- 不能出现两个命名参数同名的情况



### 3.7.1 理解参数

JavaScript 中的参数在内部是用一个数组来表示的，在函数体内可以通过arguments 对象来访问这个参数数组

arguments 对象只是与数组类似（它并不是Array 的实例），可使用length 属性来确定传递进来多少个参数

arguments 对象可以与命名参数一起使用：

```javascript
function doAdd(num1, num2) {
    if(arguments.length == 1) {
        alert(num1 + 10);
    } else if (arguments.length == 2) {
        alert(arguments[0] + num2);
    }
}
```

arguments 的值永远与对应命名参数的值保持同步

```javascript
function doAdd(num1, num2) {
    arguments[1] = 10;
    alert(arguments[0] + num2);
}
```

**ECMAScript 中的所有参数传递的都是值，不可能通过引用传递参数。**

<font color="eb2f06">🤔：关于这句话，可以参考[这里](https://github.com/mqyqingfeng/Blog/issues/10)，有非常好的解释和讨论，贴上一个我认为很通俗的解释。</font>

A、**变量名**与**变量值**的关系好比**快捷方式**与**真实文件**的关系

B、**值类型**类比为**文件** ，**引用类型**类比为**文件夹**

```js
//1、2 
var obj = {value: 1}; 

//4 
function foo(o) {
	//5 
    o = 2; console.log(o); 
} 

//3 foo(obj); 
console.log(obj.value)
```

1. 创建文件夹`“{value: 1}”`；
2. 创建一个快捷方式`obj`；
3. 实参：步骤2创建的快捷方式；
4. 形参：创建`o`快捷方式，但`o`不指向`obj`指向的文件夹，却指向了快捷方式`obj`本身（快捷方式的快捷方式叫**高阶快捷方式**？哈哈，应该就是就是共享传递的意思吧）；
5. 修改`o`快捷方式的指向，改为指向文件`“2”`。



### 3.7.2 没有重载

如果在ECMAScript 中定义了两个名字相同的函数，则该名字只属于后定义的函数。

```javascript
function addSomeNumber(num){
    return num + 100;
}
function addSomeNumber(num) {
    return num + 200;
}
var result = addSomeNumber(100); //300
```

如前所述，通过检查传入函数中参数的类型和数量并作出不同的反应，可以**模仿**方法的重载。