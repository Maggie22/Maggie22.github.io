---
title: Python学习-Day1
date: 2020-02-06 12:45:28
categories: 学习Learning
---
---

只会些毛，现在学些皮，目标是会些皮毛。

<!--more-->

---

## 写在前面
> 
1. Make English as your working language.
2. Practice makes perfect.
3. All experience comes from mistakes.
4. Don't be one of the leeches.
Either stand out or kicked out.
(from [GitHub/Python-100-Days][1])

那些Python能做的事情：
基本任务，网站，后台
那些Python不能做的事情：
操作系统（C），手机应用（Swift/Objective-C或Java），3D游戏（C/C++）
一些Python特性：
1. 一种高级语言，代码少但运行慢。
2. 优雅，简单，明确
Python之父：
Guido van Rossum（吉多·范罗苏姆），荷兰人

Python解释器
CPython，官网安装后自动下载的解释器。

Python是解释型语言（解释器对程序逐行进行解释然后直接运行）（编译型语言）

## 输入与输出

输出
print('Hello', 'World!')
输入
x = input('please input x:')

## 数据类型和变量

Python能直接处理的数据类型有：整数，浮点数，字符串，布尔值，空值（None）等

十六进制表示整数：前面加```0x```
科学记数法：```1.23e9```，```2e-5```
当字符串中要有```'```的时候，字符串用双引号```""```括起来。如果字符串中要有```"```，就用转义符```\```。
```r''``` 表示 ```''``` 内的字符不转义

Python是**动态语言**，即变量本身类型不固定。
变量赋值的过程：在内存中创建变量，并令变量指向相应的数据。
常量通常使用**全部大写**的变量名表示。

## 字符编码

**Unicode编码**：把所有语言都统一到一个编码中去。通常是2个字节。
**ASCII编码**：美国人发明，只给大小写字母、数字和一些符号编了码。1个字节。
**UTF-8编码**：可变长编码。把Unicode字符根据数字不同且使用频率的不同编码得到1-6个字节的UTF-8编码。从而节省空间。

现在计算机系统通用的字符编码工作方式：在内存中通过Unicode编码，当需要存储到硬盘或者传输的时候就转为UTF-8编码。

Python3中，字符串采用的是**Unicode编码**。
```ord()``` 取字符对应的编码。 ```chr()``` 取编码对应的字符。
字符串还可以用十六进制表示：
```'\u6587'``` 即表示'文'
```bytes``` 类型:字符串在传输或者硬盘存储时用字节。
encode('ascii') 函数可以将字符串转换为对应的bytes。decode('ascii')函数可以将网络或者硬盘上读到的bytes转换为对应的字符串
decode加上参数```errors='ignore'```就可以忽略字节流中无法识别的字节。
len()函数统计str中包含多少个**字符**，bytes中包含多少个**字节**

格式化：

%：
```python
>>>print('Hello%s %s %%' % (',', 'World'))
Hello, World%
```

format():
```python
>>>print('Hello,{0}{1:.1f}'.format('World', 3.14))
Hello,World3.1
```


* 在记事本**编辑**时，是**Unicode**编码。文件保存到磁盘时，是**UTF-8编码**。
* 字符串用utf-8编码转为字节流会这样表示：

```python
>>> '中文'.encode('utf-8')
b'\xe4\xb8\xad\xe6\x96\x87'
```

* 在python源码中经常能看到：
```python
# !/usr/bin/env python3
# -*- coding: utf-8 -*-
```
其中，第一句告诉Linux/OS X系统这是一个python可执行程序，Windows系统会自动忽略；第二句是说明要用UTF-8读取源代码


## 小结一下~

今天主要有点复杂的部分就是编码了。另外就是Python的一些特性：解释性，动态性

关于字符与编码：
1. Unicode，ASCII，UTF-8
2. bytes类型
3. encode()和decode()
4. 格式化方法

  [1]: https://github.com/jackfrued/Python-100-Days