---
title: Python学习-Day4
date: 2020-02-12 22:08:45
categories: 学习Learning
---

函数式编程

<!--more-->

---

什么是**函数式编程（Functional Programming）**？
是一种抽象程度很高的编程范式。纯粹的函数式编程语言编写的函数没有变量，一个函数的输入就对应了一个固定的输出。

## 高阶函数（Higher-order Function）

函数名就是一个变量，只是它恰好指向了一个函数。

* abs函数定义在builtins模块中，要修改```abs```变量的指向在其他模块中也生效，需要```builtins.abs = xxx```才可以

什么是**高阶函数**？
一个函数接收另一个函数作为参数，折中函数就称为高阶函数。

### map/reduce

**map函数：**
接收两个参数，第一个是函数f，第二个```Iterable```对象i。map函数就是将f作用于i的每一个元素上，并返回一个迭代器。
用法如下：

```python
>>> list(map(int, '123456'))
[1, 2, 3, 4, 5, 6]
```

**reduce函数**（需要从**functools**模块中导入）：
接收两个参数，第一个是函数f，第二个是Iterable对象i，返回iterator对象。reduce函数结果继续和序列的下一个元素做累积计算，即：

```
reduce(f, [x1, x2, x3, x4]) = f(f(f(x1, x2), x3), x4)
```

练习题解答：

> 1.利用map()函数，把用户输入的不规范的英文名字，变为首字母大写，其他小写的规范名字。输入：['adam', 'LISA', 'barT']，输出：['Adam', 'Lisa', 'Bart']：

```python
def trans(ch):
    if 'a'<= ch <= 'z':
        return ch
    else:
        return chr(ord(ch)+32)
        
def normalize(name):
    s = name[0]
    if 'a' <= name[0] <= 'z':
        s = chr(ord(s) - 32)
    return s + ''.join(list(map(trans, name[1:])))

# 测试:
L1 = ['adam', 'LISA', 'barT']
L2 = list(map(normalize, L1))
print(L2)
```

注：不用map函数的话，字符串有一个capitalize()函数，一句到位。见下：

```python
def normalize(name):
    return name.capitalize()

# 测试:
L1 = ['adam', 'LISA', 'barT']
L2 = list(map(normalize, L1))
print(L2)
```

> 2.请编写一个prod()函数，可以接受一个list并利用reduce()求积：

```python
from functools import reduce
def multi(a, b):
    return a * b

def prod(L):
    return reduce(multi, L)
```

### filter

过滤序列。函数接受一个函数和一个序列。函数作用于每一个元素，若函数返回结果为True则保留元素，反之删除。

教程中举例子用[埃式筛法][1]求素数，算法很简洁，值得学习。

### sorted

排序。接收一个**key函数**来实现自定义的排序。key函数作用于每一个元素，返回的结果再进行排序。
另一个参数**reverse**，设置为True时，进行反向排序（从大到小）。

## 返回函数

函数作为返回值在函数中return。~~（套娃）~~

这样的函数会在调用它的时候才执行。

当函数被返回的时候，相关参数和变量都保存在这个函数中。这种程序结构被称为**闭包（closure）**。

由于函数在返回的时候才保存相关的参数和变量。因此，如果保存循环变量，可能无法获得想要的效果。
如下例：

```python
In [1]:
def count():
    fs = []
    for i in range(3):
        def f():
            return i * i
        fs.append(f)
    return fs
In [2]:
f1, f2, f3 = count()
In [5]:
print(f1(), f2(), f3())
4 4 4
```

在编写代码中，应尽量避免返回循环变量，你非要返回就这样写。要返回的函数中再定义一个函数，把循环变量和这个函数绑定起来。

```python
In [10]:
def count2():
    fs = []
    def f(j):
        def g():
            return j * j
        return g
    for i in range(3):
        fs.append(f(i))
    return fs
In [11]:
f1, f2, f3 = count2()
In [12]:
print(f1(), f2(), f3())
0 1 4
```

练习题：

> 利用闭包返回一个计数器函数，每次调用它返回递增整数：

```python
def createCounter():
    s = [0]
    def counter():
        s[0] = s[0] + 1
        return s[0]
    return counter
```

自己居然没有解决...参考了[这里][2]


## 小结

1. 什么是“函数式编程”
1. 高阶函数的含义
2. map和reduce函数的用法
3. filter函数的用法
4. sorted函数的用法（参数含义）
5. “闭包”结构？

  [1]: https://baike.baidu.com/item/%E5%9F%83%E6%8B%89%E6%89%98%E8%89%B2%E5%B0%BC%E7%AD%9B%E9%80%89%E6%B3%95
  [2]: https://www.cnblogs.com/cccmon/p/7930550.html