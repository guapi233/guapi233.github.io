# JEST 自测

使用jest必须要在代码中引入**模块**这个概念。

jest可以做单元测试和集成测试



## 基础语法

`test`：创建一个测试用例

* 参数：`(测试名，测试函数)`

`test.only`：只跑这一个用例

`expect`：创建一个测试部件

* 参数：`(测试函数)`

`toBe`：期待一个测试部件的返回值（测不了引用类型）

* 参数：`(返回值)`

`expect.assertions`：断言一个测试用例中需要完成的`expect`数量

* 参数：`(number)`
* 加入一个测试用例为空，那么它默认为通过，但是如果在里面加入`expect.assertions(1)`，该测试用例将无法通过，因为它没法通过一个`expect`。

`describe`：分组

* 参数：`(组名， 回调函数)`



### 匹配器

没法链式调用

* `toBe`：上面说了

* `toEqual`：用来对比引用类型

* `toBeNull`：是`null`

* `toBeUndefined`：是`undefined`

* `toBeDefined`：不是`undefined`

* `toBeTruthy`：隐式转换后为`true`

* `toBeFalsy`：隐式转换后为`false`

* `not`：将后面的匹配器反转过来`expect(0).not.toBe(9)  // 不是9`

* `toBeCloseTo`：用来计算小数，防止出现`0.1 + 0.2 !== 0.3`的情况

* `toMatch`：接收一个正则，用于匹配字符串

* `toContain`：判断一个数组或集合中是否包含某一项

  

### 钩子函数

* `beforeAll / afterAll`：全部测试用例执行之前 / 之后
* `beforeEach / afterEach`：每个测试用例执行之前 / 之后

钩子函数存在作用域，一个`describe`一个作用域，最外面声明的钩子会影响所有



### Mock

* `let xxx = jest.fn(基准函数)`：按照基准函数生成一个模拟函数，可以配合`expect(xx).toBeCalled`检测是否被调用
* `xxx.mock`中记录着模拟函数被调用的相关信息



## 配置

### 初始化配置

```shell
npx jest --init
```



### 和babel结合

1. 安装`@babel/core`和`@babel/preset-env`俩个库

2. 在项目根目录下创建`.babelrc`文件

3. 配置`.babelrc`文件：

   ```js
   {
     "presets": [
       ["@babel/preset-env", {
         "targets": {
           "node": "current"
         }
       }]
     ]
   }
   ```

这样就可以了，原因是因为jest内部集成了一个jest-babel插件，它会在运行jest时自动检测项目中是否包含bebel，如果包含就去找`.babelrc`文件并对项目做转换。



## 启动测试

```shell
npx jest // 或在package.json中配置script脚本
```



### 监听测试

```shell
npx jest --watchAll // 或 --watch
```

启动后，可以通过按键开启不同的模式，其中`o`模式遇到git配合来记录变化的文件。

* `f`：只跑没通过的
* `a`：一有改变全跑一遍
* `o`：哪里改变跑哪里（需要git配合）
* `p`：只测**指定测试文件**里的所有用例
* `t`：只测**指定测试用例名**的用例 



 

## 测试异步函数

* `test`第二个参数回调可以拿到一个`done`参数，执行该函数代表该测试用例的结束
* 如果异步函数返回是一个Promise，可以在测试用例里直接`then`，不过要将`then`返回的结果`return`出去
* 如果是要测Promise的`catch`语句，需要在用例上方添加`expect.assertions(1)`
* Promise还可以通过`return expect(异步Promise).resolves/rejectes.toBe(xx)`
* Promise还可以通过将`test`第二个回调函数改为async函数的方法，利用`await`测试