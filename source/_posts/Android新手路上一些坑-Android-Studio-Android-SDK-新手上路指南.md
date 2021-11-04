---
title: Android新手路上一些坑|Android Studio|Android SDK|新手上路指南
date: 2019-02-15 22:33:01
categories: 问题解决SolvedProblems
---
最近把Android开发环境重新部署了一遍。踩了几个坑，骂了几句娘。网上很多方法都旧了，现在做个总结，也算个新年第一篇。
<!--more-->
---
Android开发需要：Java,Android SDK,Android Studio
**Java**，网上教程一堆。
**SDK**，即Software Development Kit，软件开发工具包。
下载exe/zip都可以，记得保存的路径中**不能有中文和空格**。
**Android Studio**，安卓开发官方IDE，所以比起Eclipse，首推还是Android Studio吧

Android SDK和Android Studio下载方式：
Android Developer这个网站我翻~墙~也上不了，于是放弃。
国内下载地址见下：
[Android Studio中文社区][1]
[AndroidDevTools][2]
## 第一坑：SDK Manager闪退
> 没想到吧，这里就遇到了第一坑。

下载压缩包，解压后打开SDK Manager。然后... 出现了！闪退怪！
网上查的方法，很多都试过了。大家网上都能查到，不多说。

我的原因是JDK版本（11）过高，SDK不能兼容。**换成 JDK8 就OK了。**
另外，如果在安装程序过程中，它告诉你你的工具包版本是1，太低了去重新下个版本更高的。也是这个原因，90%的可能是你用了JDK11，换成JDK8就好。

进入Android Studio，经过一些基本配置之后启动AVD，但是...
## 第二坑：AVD启动报错（ missing a kernel file ）
> ERROR：This AVD's configuration is missing a kernel file 

上网查—> https://code.i-harness.com/en/q/9433dd （第三个回答）

我把Android-sdk/system-images/android-28/google-apis 中的kernel-ranchu-64改名为kernel-qemu（视报错内容而定）
还是不行，再把android-28下其他文件夹中的kernel-ranchu也改一下

这下终于能打开了，但是怎么没有启动画面...
## 第三坑：AVD模拟器打开黑屏
网上查的很多方法都试了，没用。一下是几个：
> 1. 编码问题，修改配置文件（这个很迷，原po地址找不到了）
2. 内存大小设得太大了，调小一点。（这个没什么用）
3. 不说了，你们在网上也能查到，然而有的很旧了，没什么用。

我呢，把AndroidSDK版本从9换到8，__再换到6__ ，终于可以了！
而且 **Android6** 也不会出现上述第二坑。

## 第四坑：R文件报红
> 背景：导入的Android项目，无法解析R文件

奇怪的问题永远不会离开你！！！
R文件报红，资源文件没有构建好，资源文件是Gradle自动生成的。可以在**app/build/generated/source/** 下看到rs的文件夹，有了这个文件夹应该就是R生成成功了。
我在**app/build/generated/source/not_namespaced_r_class_source**下也看到很多R文件，但没有弄明白是什么意思。
另附，网上的方法
> 
1. Run->Clean Project->Rebuild Project
2. Run->Make Module "app"...
3. File->Invalidate and Restart
4. 重新导入Project
5. R文件大小超出默认，Help->Edit Custom Properties 
新建文件后添加下面这行代码：
```idea.max.intellisense.filesize = 5000
```


然后呢，我全部没有成功！！！
**下面开始废话！**
我重复了好几次Gradle重新构建，全！部！没！用！！
所以在这里劝告大家，如果重复好几次重新构建都没有用的话，那你也别指望下一次重构就能成功！！这只是在浪费时间！！听我说，这个时候你虽然相当烦躁，但是要停下来思考一下。越解决不了越烦躁，越烦躁就越不能静下心来，越静不下心就越容易错过解决办法。废话都是想讲给昨天的自己听的。
**废话结束！**
~~是时候考虑重装Android Studio了~~
很简单，你要检查这里
工程文件下的build.gradle
classpath 'com.android.tools.build:gradle:**3.2.0**'
加粗部分是否与你的Android Studio版本一致，我就是因为版本过高了才出现的问题。
正确版本要怎么查看呢：
Help->About

最后一句叨叨：又TM是版本问题！！！

## 后记
以上是我部署环境中卡了比较久的三个问题，而且网上对应的解决方法很多都有点旧了，所以我总结了一篇。
当然还有其他的问题，比如AS的Proxy设置，HAXM与Windows不兼容没法下载，新建模拟器时没有系统镜像，导入项目无法运行（File->Sysn Project with Gradle Files）等等问题，善用搜索引擎的大家一定都能知道~

最后，祝各位新春快乐！万事如意！
回头更一篇新年flag吧~新年正是立flag时！

  [1]: http://www.android-studio.org/
  [2]: https://www.androiddevtools.cn/
  