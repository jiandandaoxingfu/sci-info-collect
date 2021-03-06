## 科研成果统计系统
这是electron版本，由于生成的软件有100M之大，因此后借助于浏览器，作为浏览器插件使用。
### 功能

#### 输入 

1. 文章标题列表：title1, title2, title3, ...

   两个标题间以逗号隔开。

2. 年份：2018, 2019，...

   用以筛选特定时间内引用这篇文献的论文，不同年份以逗号隔开。

3. 作者姓名：Chen-Jing-Run

   输入姓名拼音，首字母均大写且以短横杠隔开。

#### 输出 

1. 总引用量：每篇文献的总被引量。
2. 2019引用量：每篇文献在2019年的被引量：包含自引和他引。
3. 自引：每篇文献的在2019的自引量。
4. 他引：每篇文献的在2019的他引量。
5. 打印引用文献列表：每篇文献的被引论文列表页面的pdf文件，且已经标记"自引"，"他引"。
6. 打印详情页：每篇文献的详情页面的pdf文件。

### 操作界面及示例

#### 整体如下

![](https://cdn.nlark.com/yuque/0/2020/png/122742/1578901578488-7e64cf1f-b0ad-435a-bad3-3b6bbcb83e06.png)

#### 按钮介绍

1. 开始统计：输入标题列表，年份，作者以后即可点击运行。
2. 重新启动：如果想要暂停/重新统计，或者出现故障，可以点击重新启动。
3. 导出：导出统计表格。

#### 工作界面

![](https://cdn.nlark.com/yuque/0/2020/png/122742/1578902213305-a833097c-b8cc-4aef-ba7e-e6d8021058cb.png)





### 第三方库

1. React：create-react-app.
2. Electron.
3. Antd.
4. 上述库的若干依赖.

### 

### Q&A

1. 软件运行较慢？

   由于数据是从[Web of Science](http://apps.webofknowledge.com/)获取，而其服务器在国外，因此访问速度较慢。此外，软件还受网速的影响。

2. 软件是否可以一直使用？

   不可以。由于数据是从[Web of Science](http://apps.webofknowledge.com/)获取，如果该网站更新系统，则软件可能无法正常使用。


## Todos

1. 登录中科院分区系统，根据杂志名过去分区信息。
2. 添加子窗口，加快信息处理。
3. 增加异常处理和信息反馈。
