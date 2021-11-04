---
title: Colab运行python代码找不到路径
date: 2021-03-31 11:11:54
tags: 
- Colab
- Python
categories: 问题解决SolvedProblems
---

因为要修改工作路径！

<!--more-->

已经有两次碰到这个问题了。原因是我在谷歌云盘中新建了colab笔记本，同一目录下放了想要运行的代码，但是给我报错`No such file or directory`。但是colab文件的工作目录跟他文件放的位置没关系，如果要运行云盘中的文件，需要**挂载谷歌云盘**然后**修改工作路径**。

![run-error](https://forlwq.oss-cn-hangzhou.aliyuncs.com/SolvedProblems/colab-run-python-codes/image-20210331104255484.png)

先给出**解决方法**：

```python
from google.colab import drive
drive.mount('/content/gdrive')	// 挂载谷歌云盘
import os
os.chdir('/content/gdrive/MyDrive/Codes')	// 设置工作路径
```

挂载的时候需要进行授权，输入授权码。这样就把colab和谷歌云盘链接起来了，下图的gdrive就是。PS：如果直接在colab这里上传文件有可能会丢失的。

<img src="https://forlwq.oss-cn-hangzhou.aliyuncs.com/SolvedProblems/colab-run-python-codes/image-20210331103818864.png" alt="directories" style="zoom:50%;" />

**os模块**

官方文档：[os --- 多种操作系统接口 — Python 3.9.2 文档](https://docs.python.org/zh-cn/3/library/os.html)

`os.chdir(path)`：修改当前工作目录为path

`os.getcwd()`：返回当前工作目录的字符串

`os.listdir(path='.')`：返回一个列表，包括path目录下的条目名称。



