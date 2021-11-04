---
title: 在用hexo和github搭建个人博客中遇到的问题及解决办法
date: 2018-04-16 19:04:53
tags: 搭建博客
categories: 问题解决SolvedProblems
---
博客搭建前前后后遇到了不少问题，挺花时间的。现在做个总结和记录，或许也能帮到后来的人。
<!--more-->
---
## **博客部署问题**
> **部署莫名失败**

当时Git的local无法使用，错误大致显示为这样：
![deploy][1]
最后发现是因为我换了一个管理员登录，无法部署。再换回来就好啦。




## __博客评论功能__
> **友言评论无法显示**

之前试过__友言__，在手机端以及本地博客都能正常显示，可是__在PC端远程网站上无法显示__。最后发现可能是因为友言__不支持https__，只能作罢。另外，据说畅言也不支持https。
解决办法是**换一个**！目前使用的是来必力，但是加载比较慢，其他都好。
之后或许能尝试一下自己搭建一个评论功能。

## __安全证书失效__
> **无法进入自己的博客，Chrome显示“您的连接不是私密连接”**

本来还以为自己的网站被黑了呢之类的，后来知道了像我这样的静态网页是不存在这种问题的，不太需要考虑安全问题。最后发现是github颁发给我的证书过期了。
去网上搜索了一下，说通常过两天就自动更新了（我过期五天了）；有说直接找github客服解决，几小时就好；有说是http和https的问题
解决办法是更新域名解析。方法跟当初绑定域名的一样。ping一下自己的blog，返回的一个IP值，就是github主机的IP值
![ping][3]
然后去域名解析的地方设置一下这个IP：
![resolve][4]
关于这些记录类型和主机记录的含义，参见阿里云的[帮助文档](https://help.aliyun.com/document_detail/29716.html)

## __更换电脑__
> 适用于保留原文件夹的情况

前提是安装了nodejs，hexo，然后只要在原来的文件夹下面npm install 就可以啦。

## __更换域名__
> 用阿里云上买的域名

之前的cosmos227.xyz过期啦，一看续费要69，索性换了一个.top的~
买完域名之后，你只要上阿里云的控制台上，给你购买的域名添加记录值就可以了。添加什么值，见上面那个设置IP的图~

## 链接已重置

遇到这个问题已经有两周了。本来以为等等就好，但是一直没好！目前网上的方法有：

1. Chrome的问题。在`chrome://net-internals/#hsts`里加入需要的域名。参考[chrome无法访问此网站 - 知乎](https://zhuanlan.zhihu.com/p/71261322)
2. 修改host，加入github相关的解析。（地址是`C:\Windows\System32\drivers\etc\host`，host文件保存域名和IP的映射，可以直接访问IP，就不用等待域名服务器的解析了，参见[windows下的host文件在哪里，有什么作用?](https://blog.csdn.net/xifeijian/article/details/15660185)）

但是都不行，而且换个设备也登不上去。应该是网站本身的问题。

连接已重置的根本原因？[浏览器显示“连接已重置”的根本原因是什么？ - 知乎](https://www.zhihu.com/question/61870898)

什么是TLS？[SSL/TLS协议运行机制的概述 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2014/02/ssl_tls.html)

找到这个[GitHub Pages (*.github.io) TLS劫持和连接重置问题 | Heary's Blog](https://heary.cn/posts/GitHub-Pages-github-io-TLS%E5%8A%AB%E6%8C%81%E5%92%8C%E8%BF%9E%E6%8E%A5%E9%87%8D%E7%BD%AE%E9%97%AE%E9%A2%98/)，但是依然没有解决我的问题，我的证书没有问题啊~

感觉我网站也不是被墙了，搭了梯子访问也还是访问不了

## 小结

>遇到问题的时候，不能放过任何一个可能的错误并且找到对应解决方法。

PS0:拖延如我，在时隔两个月之后找到了当初写的这篇草稿...已经忘了不少了，不够全面，先挖个坑等我记起来来填！（不会了...
PS1:更于0719，添加了安全证书的问题
PS2:更于20190215，添加了更换电脑后如何继续更新博客
PS3:更于20190327，添加了如何更换域名

PS4:更于20210607，添加了如何解决连接已重置

[1]: https://forlwq.oss-cn-hangzhou.aliyuncs.com/conblog1.jpg
[2]: https://help.aliyun.com/document_detail/29716.html
[3]: https://forlwq.oss-cn-hangzhou.aliyuncs.com/conblog2.jpg
[4]: https://forlwq.oss-cn-hangzhou.aliyuncs.com/conblog3.jpg