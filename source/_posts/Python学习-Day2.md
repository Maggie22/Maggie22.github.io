---
title: Python学习-Day2
date: 2020-02-07 11:36:11
categories: 学习Learning
---

列表、字典等。条件判断和循环基础内容跟其他语言很相似

<!--more-->

---

## list与tuple

list是可变的有序集合，list中的元素类型可以不一样。常见用法有：
```python
l = [1,2,'a']
i = 2
l[-1] # 获取末尾元素
l[-2] # 获取倒数第二个元素
l.pop(i) # 删除指定索引处的元素
l.pop() # 删除末尾元素
l.insert(i, 'b') # 替换指定索引处的元素
l.append('c') # 追加元素到列表末尾
```

tuple是不可变的有序列表，在定义的时候就确定了它长什么样。
tuple要注意这几点：
1.tuple不可变，指的是它的每一个元素指向永远不变。如果tuple中有一个元素是列表，列表本身又是可变的
```python
a = (1,2,[1,2,3])
a[2][2]=1
print(a)
a[2].append(2)
print(a)

结果：
(1, 2, [1, 2, 1])
(1, 2, [1, 2, 1, 2])
```

2.要创建只有一个元素的tuple：
```a = (1,)```区别于```a=(1)```,为了消除小括号的歧义。

## 条件判断

用法：
```python
if xxx:
    ...
elif xxx:
    ...
else:
    ...
```
if后面的条件可以简写为x，当x为非零数值/非空字符串/非空list等情况时为True。

## 循环

for和while
range(i):生成0~i-1的整数序列
善用和慎用continue和break

## dict与set

dict是Python内置的字典类型，使用key-value存储。dict的查找插入速度都很快，是用空间换时间的方法。
dict查找的实现原理：给定key，可以直接计算出对应value的内存地址。
通过key计算位置的算法称为**哈希算法**。
dict的常用函数：
```python
d = {'a':1, 'b':2, 'c':3}
k = 'a'
d.get(k) # keys中有k就返回对应value，反之返回None
d.get(k, -1) # 没有k会返回-1
d.pop(k) # 删除k对应的键值对
```

set可以看作数学意义上的集合（**无序无重复**），set也可以看作是dict的key集合。
set的常用函数：
```python
s = set(['a','b','c'])
k = 'a'
s.remove(k)
s.add('d')
```

对于不变对象（如字符串），调用对象自身的任意方法是不会改变对象自身的内容。

## 小结

1. dict的原理与特点
2. set的特点
3. list的插入、删除
4. tuple的特点