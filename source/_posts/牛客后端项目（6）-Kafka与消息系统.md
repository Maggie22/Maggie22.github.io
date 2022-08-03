---
title: 牛客后端项目（6）-Kafka与消息系统
date: 2022-08-02 17:39:30
updated: 2022-08-03 14:57:04
categories: 项目开发笔记
tags: 牛客网后端
---

系统通知功能

<!--more-->

# Kafka

简介：分布式的流媒体平台。主要应用于消息系统。
特点：
1. 高吞吐量
2. 消息持久化。存在硬盘上，从而可以处理海量数据。硬盘如果顺序存储并读取的话，其实效率非常高，而Kafka也是利用了这一点。
3. 高可靠性。因为是分布式的
4. 高扩展性

术语：
Zookeeper

消息队列的两种方式：
1. 点对点。eg. 生产者消费者的。一个数据被一个消费者使用
2. 发布-订阅式。一个数据被多个消费者使用。Kafka使用这种。

Topic：存放消息的位置
Partition：对Topic分区，提高并发能力
Offset：在Partition中按照索引（offset）读数据

Leader Replica：主副本。可以从主副本读取数据。
Follower Replica：从副本。只做备份，备份主副本的内容，当主副本丢失了，就由从副本来恢复。

![Img](https://forlwq.oss-cn-hangzhou.aliyuncs.com/ProjectNowCoder/img-20220729235448.png)

# 发送系统通知

三种需要发通知的：点赞、评论、关注

分为**触发事件**和**处理事件**两部分。封装事件对象，围绕事件来进行处理。

## 事件封装

事件封装了用户、实体类型与实体id、topic。为了使事件类可以适应不同的情况，加入一个Map对象来保存额外信息。
在消息系统中处理的就是事件。

数据持久化：保存到mysql的message数据表中，message数据表见之前帖子模块开发中的[私信](https://cosmos227.top/2022/07/25/%E7%89%9B%E5%AE%A2%E5%90%8E%E7%AB%AF%E9%A1%B9%E7%9B%AE%EF%BC%884%EF%BC%89-%E5%B8%96%E5%AD%90%E6%A8%A1%E5%9D%97%E5%BC%80%E5%8F%91/#%E7%A7%81%E4%BF%A1)部分。

## 触发事件

即生产者，将Event对象作为参数进行传入，在send时，将对象转为json字符串。

在评论、点赞、关注对应的Controller方法中，加入消息发送的动作。

上述三种事件分别需要的额外信息：
评论：链接到评论的帖子id
点赞：点赞的帖子或点赞的评论对应的帖子
关注：点关注的用户id

## 处理事件

即消费者，将event从ConsumerRecord中转出来，代码是`JSONObject.parseObject(record.value().toString(), Event.class)`。

然后将event中的信息保存到Message对象中，从而保存到Mysql数据库中。

# 显示系统通知

根据前端页面设计需要的视图对象。

## notice.html

- 显示系统通知的列表，包含评论、点赞、关注三类消息。
- 每类消息展示最新的消息
- 每类消息需要展示未读消息数量，以及三类消息的总未读数

## notice-detail.html

- 分页展示该类消息的内容
- 每条消息包括触发事件的用户，此外，评论和点赞需要包括对应的帖子
- 每类消息需要根据topic分别处理，但是可以归为同一种方法。

# 问题解决

> 用户导航栏的消息需要显示未读消息，我使用了拦截器进行处理，在拦截器中添加参数，但是参数会显示在url中，如下图：
> ![Img](https://forlwq.oss-cn-hangzhou.aliyuncs.com/ProjectNowCoder/img-20220803105420.png)

没有找到什么解决办法...应该是跟重定向的源码有关系，最后把unreadCount放到user对象中一起传，就不会有这个问题

只找到一篇相同问题的，从源码角度来解释：[拦截器postHandle添加参数，会在地址栏显示-csdn](https://blog.csdn.net/doctor_tardis/article/details/109676956)

**下面两个问题是后续待改进的**

> 点赞和关注可能会有连续多次的情况，这样可能会向目标用户发送多次通知，这种该怎么处理？

延迟队列。

> 高并发点赞