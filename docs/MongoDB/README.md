## 启动

* 执行`mongod`，启动MongoDB服务器
  * `--dbpath`：数据库存储路径
  * `--port`：设置数据库服务端口

* 执行`mongo`，启动MongoDB客户端



## 基础概念

* 数据库（database）：数据库是一个仓库，仓库中可以存放集合
* 集合（collection）：集合类似于数组，在集合中可以存放文档
* 文档（document）：文档数据库中的最小单位，我们存储和操作的内容都是文档

当创建**文档**时，如果该文档所在的**集合**和**数据库**不存在，则自动创建



## 基本操作

### 数据库操作

- `show dbs/databases`：展示所有数据库
- `use [数据库名称]`：切换至目标数据库
- `db`：变量，表示当前所在到的数据库
- `show collections`：展示数据库中的所有集合
- `ObjectId()`：创建一个`_id`标识



### 插入

* `db.[集合名].insert(文档)`：向集合中插入一个文档或多个文档（多个文档传数组）
* `db.[集合名].insertOne(文档)`：向集合中插入一个文档
* `db.[集合名].insertMany(文档)`：向集合中插入多个文档



### 查询

* `db.[集合名].find()`：查询集合中的所有文档
* `db.[集合名].count()`：查询集合中的所有文档的数量
* `db.[集合名].find({要求键：要求值})`：查询集合中的目标文档
* `db.[集合名].find({要求键：要求值}, {投影键: 1展示, 0隐藏})`：查询集合中的目标文档，第二个参数用于查找结果集合中的某些字段（`_id`默认为1，其他字段默认为0）
* `db.[集合名].findOne({要求键：要求值})`：查询一个目标文档
* `db.[集合名].find().limit(数量)`：查询指定数量的文档
* `db.[集合名].find().skip(数量 ).limit(数量)`：跳过指定数量的文档，查询指定数量的文档
* `db.[集合名].find().sort({要求键: 1升序，-1降序})`：按指定顺序查找





### 更新

* `db.foo.update({yy: 5}, {$set: {xx: 2}}, {multi: true})`：更新多个，不添加`multi`只会更新一个
* $set：设置属性
* $unset：删除属性
* $push：往数组中添加属性
* $addToSet：往一个不允许重复的集合中添加属性



### 删除

* `db.dropDatabase()`：删除数据库

* `db.[集合名].drop()`：删除集合，如果该集合为最后一个，则同时删除数据库
* `db.[集合名].remove({})`：删除当前集合中的所有数据
* `db.[集合名].remove({要求键：要求值})`：删除指定的数据



### 操作符

* $gt：大于
* $gte：大于等于
* $eq：相等
* $lt：小于
* $lte：小于等于
* \$or：或运算，用法：`$or: [{name: "ccc"}, {name: "xxx"}]`
* $inc：数值自增





## Mongoose

* Schema（模式对象）：定义约束了数据库中的文档结构
* Model：表示集合中的所有文档的表示，相当于MongoDB数据库中的集合collection
* Document：表示集合中的具体文档，相当于集合中的一个具体的文档



### 操作

* 安装：`npm i mongoose`

* 引入：`const mongoose = require("mongoose")`

* 连接：`mongoose.connect("mongodb://数据库IP地址:端口号/数据库名", {useMongoClient: true})`，默认端口27017可以省略

* 断开：`mongoose.disconnect()`：断开连接

* 监听事件：`mongoose.connection.once("open/close", 回调)`，监听连接/断开

* 创建Schema（约束）：`let xxx = new mongoose.Schema({属性: 要求})`

  ```js
  // 例子
  // 创建 Schema
  let stuSchema = new Schema({
    name: String,
    age: Number,
    gender: {
      type: String,
      default: "female",
    },
  });
  ```

* 通过Schema创建 Model：`let StuModel = mongoose.model(映射的集合名, Schema约束对象);`，**注意：MongoDB会自动将集合名转为复数**

* 插入数据：mongoose中插入文档的方法为`model.create({}, 回调)`

* 查询（mongoose回调参数遵守Node规范，第一个为err，后续为返回数据）

  * `model.find({}, 投影字符串 ,回调)`

    * ```js
      model.find({name: 崔永杰}, "name age -_id", () => {
          // 第二个参数可有可无，意思为显示name和age，不要_id
          // 下面的方法规则类似
      })
      ```

  * `model.findById(id, 回调)`

  * `model.findOne({}, 回调)`

* 修改

  * `model.update(条件, 修改后的对象, 配置对象, 回调)`
  * `model.updateMany`
  * `model.updateOne`

* 删除

  * `model.remove(条件, 回调)`
  * `model.deleteOne`
  * `model.deleteMany`

* 创建Document：`let document = new 模型()`;

* 将document插入model中：`document.save()`

* 通过document修改自身

  * `document.update(修改后的对象)`

  * ```js
    doucment.age = 18;
    document.save()
    ```

* 通过document删除自身：`document.remove(回调)`

* document其他方法

  * equals(document)：判断两个文档是否相同
  * id：与直接`document._id`一个效果
  * isNew：是不是新文档
  * toJSON()：转换为JSON
  * toObject()：将document对象转换为普通JS对象，转化后就失去document的一切属性与方法了