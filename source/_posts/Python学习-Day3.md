---
title: Python学习-Day3
date: 2020-02-08 21:09:05
categories: 学习Learning
---

函数与高级特性

<!--more-->

---

## 函数

函数是最基本的一种代码抽象的方法。

### 一些内置函数

abs(): 绝对值
max(): 最大值
min(): 最小值
int(),float()等: 数据类型转换
hex() : 将整数转为对应十六进制的字符串

### 定义函数

一个例子：
```python
def my_abs(x):
    if x > 0:
        return x
    else:
        return -x
```
在别的代码文件中引用函数：
from file\_name import function\_name

**pass**: 作为占位符。还不知道怎么写，为了让代码运行起来，pass！

多个返回值时，返回的是一个**tuple**


### 函数的参数

**参数检查**：在函数定义中增加检查参数的环节，合理地提示错误。比如数据类型检查：
```python
if not isinstance(x, (int, float)):
    raise TypeError('bad operand type')
```

**位置参数**：按顺序传入的参数。如```my_func(x, y)```中的x，y是位置参数

**默认参数**：在定义的时候给个默认值。注意：1. 定义时，必要参数在前，默认参数在后。2. **默认参数必须指向不变对象（str,None等）**

> 对于第二点的解释：**函数定义时，默认参数被创建即它的值被计算出来了，指向某一个对象。**如果默认参数指向可变对象（如list），在调用函数时如果改变默认参数，那么可变对象的内容就发生改变，在下一次调用的时候不再是最开始定义的那个值。
（也就是说，默认参数的值在函数定义时就创建了。）

**可变参数**：在调用时，可输入任意个参数，在调用的时候会自动组装为一个tuple。用法如下：
```python
def my_func(*nums):
    s = 0
    for i in nums:
        s += i
    return s

>>> n = [1,2,3]
>>> my_func(*n)
6
```

**关键字参数**：在调用时，可输入任意个包含参数名的参数。用法如下：
```python
def my_func(name, **kw):
    print(name, kw)

>>> my_func('Amy', age=10, country='China')
Amy {'age': 10, 'country': 'China'}

>>> d = {'age':10, 'country':'China'}
>>> my_func('Amy', **d)
Amy {'age': 10, 'country': 'China'}
```

**命名关键字参数**：调用时必须带上参数名传参，用法(定义时用*隔开)：
```python
def my_func(name, *, age, city):
    print(name, age, city)
    
>>> my_func('Amy', age=10, city='Shanghai')
```

* 以上参数的**组合顺序**必须是：必选参数，默认参数，可变参数，命名关键字参数，关键字参数。
* 对于任意函数，都可以通过类似```func(*args, **kw)```的形式调用它

### 函数递归

为了避免递归产生的溢出，使用**尾递归**（即在函数返回的时候，调用函数本身）。

## 高级特性

### 切片

对于list,tuple,string等，可以通过切片来获得部分数据。如下：
```python
>>>l = [1,2,3,4,5,6]
>>>l[:3]
[1, 2 , 3]
>>>l[1:3]
[2, 3]
>>>l[2:-1]
[3, 4, 5]
>>>l[2:]
[3, 4, 5, 6]
>>>l[1:4:2]
[2, 4]
```

### 迭代

什么是**迭代**？
如果给定一个list或tuple，我们可以通过for循环来遍历这个list或tuple，这种遍历我们称为迭代（Iteration）。

什么是**可迭代对象**？
通过collections模块的Iterable类型判断：
```python
>>> from collections import Iterable
>>> isinstance('abc', Iterable) # str是否可迭代
True
```

**enumerate()函数**：将list变成“索引-元素”对：
```python
for i, value in enumerate(['A', 'B', 'C']):
     print(i, value)
```

### 列表生成式

用法：
```python
In [1]: [x * x for x in range(10)]
Out[1]: [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
In [2]: [x * x for x in range(10) if x % 2 == 0]
Out[2]: [0, 4, 16, 36, 64]
In [3]: d = {'a':1,'b':2,'c':3}
[k+str(v) for k, v in d.items()]
Out[3]: ['a1', 'b2', 'c3']
```

### 生成器

**什么是生成器（generator）？**
当某一个列表的元素可以按照某个算法推算出来，那么就不必创建完整的list，而在要用到的时候再推算出来。在python中，这种一边循环一边计算的机制，称为生成器（generator）。

**如何创建生成器？**
**方法一（当算法比较简单时）：**
将列表生成器替换为生成器（把```[]```改为```()```）：
```python
g = (x * x for x in range(6))
for i in g:
    print(i)

g2 = (x + x for x in range(6))
print(next(g2))
```
注意：next()函数计算出下一个数并返回，当取完了再调用next()会报错：```StopIteration```。

**方法二（难以用类似列表生成式的循环实现）**：
将函数写成生成器。在函数体中，加关键字**field**。如下：
```python
def fib(max):
    n, a, b = 0, 0, 1
    while n < max:
        yield b
        a, b = b, a + b
        n = n + 1
    return 'done'

f = fib(6)
next(f)
```
PS: 每次调用next(f)时，函数执行到yield语句返回。下一次调用就从上次field语句的下一句继续执行，直到field。如果没有field语句了，就报```StopIteration```的错误。

### 迭代器

迭代器（Iterator）区别于可迭代对象（Iterable）：后者只要能用于for循环就是，前者可以用next()并产生对应的值。

```list```，```dict```，```str```都是```Iterable```对象，但不是```Iterator```对象。
而```generator```是```Iterator```对象，当然也是```Iterable```对象。

## 小结

1. 参数的类型和顺序
2. 可迭代对象与迭代器
3. 列表生成器
4. 生成器是什么？怎么写？