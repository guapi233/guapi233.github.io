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
* `jest.mock("axios")`配合`axios.mockResolvedValue(假数据)`mock任何axios发出的接口
* `jest.mock("路径")`并在根目录下创建`__mocks__`创建同名文件，并在其中写同名函数，在其中mock数据，因为这种方法会使引入的改文件函数都去找mock函数，如果有的函数没有mock，则需要`jest.requireActual(路径)`来获取源文件中的函数
* jes也可以mock定时器，`jest.useFakeTimers()`，配合`jest.runAllTimers()`，将定时器立刻完成，`runOnlyPendingTimers()`只会将正在等待的定时器立马完成，`advanceTimersByTime(3000)`将时间快进3秒，看看定时器启动没



### 异步

- `test`第二个参数回调可以拿到一个`done`参数，执行该函数代表该测试用例的结束
- 如果异步函数返回是一个Promise，可以在测试用例里直接`then`，不过要将`then`返回的结果`return`出去
- 如果是要测Promise的`catch`语句，需要在用例上方添加`expect.assertions(1)`
- Promise还可以通过`return expect(异步Promise).resolves/rejectes.toBe(xx)`
- Promise还可以通过将`test`第二个回调函数改为async函数的方法，利用`await`测试





### 测试快照

`toMatchSnapshot()`：常用来测试配置文件

第一次测试一定会通过测试，同时每次都会生成一个快照，如果快照不同则测试不通过，如果确定要完成本次修改，则选择模式`u`即可，模式`u`会更新全部待修改快照，如果想一个一个更新，选择模式`i`

如果有一个字段是每次变化的，比如每次动态生成的`time`，使用`toMatchSnapshot({ time: expect.any(Date) })`

`toMatchInlineSnapshot()`：和上面的功能一样，不过上面的快照是存放在单独文件中，这个是存放在这里的测试函数中



### 对DOM进行测试

因为jest在node环境下自己模拟了一套DOM api，所以可以在测试中直接操作dom。



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



 



## 与Vue结合

官方工具：`vue-test-utils`

* `mount`：会渲染子组件，用于集成测试
* `shallowMount`：只会渲染一层组件，用于单元测试
* 可以使用快照测试，测试渲染后的DOM结构
* `find / findAll`：查找元素
* `setValue`：设置输入框文本
* `trigger("keyup.enter")`：触发事件



### 如何测组件

* 组件刚渲染时，数据(data、props)是否为初始化数据
* 执行交互后，数据是否正常，emit是否触发
* 快照测试确保DOM结构不会出问题



## TDD 与 BDD

* TDD：测试驱动开发，`Test Diven Development`，就是在开发功能项时，先将测试代码写出来，然后再写代码满足这个测试项，确保覆盖率
  * 代码质量高
* BDD：用户行为驱动开发，`Behavior Diven Development`，先写代码后进行测试，只关注用户做了什么行为，能产生什么效果
  * 开发速度快



## 单元测试与集成测试

* 单元测试：对每一个表达式的结果以及变量的状态变化进行测试，确保底层逻辑能够正常执行，是白盒测试：
  - 测试覆盖率较高
  - 代码量大，有可能测试代码比业务代码都多
  - 业务耦合度高
  - 过于独立
  - 安全感低，你测试过了，但不一定你逻辑正确
* 集成测试：对一个用户行为以及该行为所带来的效果进行测试，是黑盒测试：
  * 测试覆盖率较低
  * 代码量较少
  * 业务耦合度较低
  * 安全感高，你测试过了，就代表用户行为没问题，至少程序能用

举个例子，比如有一个ToDoList，其中一个功能时**输入框中输入内容，回车添加并添加一条任务**，如果按单元测试来做就是分开测试**输入框**和**任务列表**两项，

* 在输入框测试用例中，回车后要确保输入框本身内容是否情况，而不必关心任务是否添加，因为那是任务列表测试用例需要关心的事
* 在任务列表测试用例中，回车后要确保任务是否添加，而不必关心输入框内容是否情空

如果是集成测试，就将两者串成一条任务流程，先确保输入框清空后，在确保任务是否添加