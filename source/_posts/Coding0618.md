---
title: Coding0618
date: 2019-06-18 16:19:48
categories: DailyCode
---


CodeWars 第1天

<!--more-->

---


## 第一题：Jaden Casing Strings

> 句子的每个单词首字母转为大写

```
# My Solution
def toJadenCase(string):
    item = string.strip().split(' ')
    for i in range(len(item)):
        fir = item[i][0]
        if 'a' <= fir <= 'z':
            item[i]=chr(ord(fir)-32)+item[i][1:]
    return ' '.join(item)
```

```
# Rank One Solution
def def toJadenCase(string):
    return " ".join(w.capitalize() for w in string.split())
```

(str是字符串类型)
1. ord(char)：将字符串转为ASCII码；
chr(integer)：将整型转为字符
1. str.capitalize()
    将字符串首字母转为大写字母
2. str = sring.capwords(str)
    将字符串中各个单词的首字母转为大写字母
3. 列表/字典构建器
（本来以为是for的省略形式/高级用法）
（早就接触到了但是不知道该怎么用）
```
# 列表的基本用法
>>>[a*a for a in range(5)]
[0, 1, 4, 9, 16]

# 但是这个有点消耗内存，下面可以用多少取多少
>>>it = (a*a for a in range(5))
>>>next(it)
0
>>>next(it)
1
>>>next(it)
4

# 双重循环嵌套
>>>[a+b for a in 'abc' for b in 'xyz' ]
['ax', 'ay', 'az', 'bx', 'by', 'bz', 'cx', 'cy', 'cz']

# 字典(下面将原来的dict的key和value位置互换)
>>>dict = {'a':1,'b':2,'c':3}
>>>{a:b for b,a in dict.items()}
{1: 'a', 2: 'b', 3: 'c'}

#还可以直接把这个用在函数调用中
>>>a = 'I am here for you.'
>>>" ".join(w.capitalize() for w in a.split())
'I Am Here For You.'
```

## 第二题：Ones and Zeros

> 二进制列表[1,0,0,1]转十进制9

```
# My Solution
def binary_array_to_number(arr):
  l = len(arr)
  result = 0
  for i in range(l):
      result += pow(2, l-i-1)*arr[i]
  return result
```

int函数
int(data, base)
base表示进制，于是可以这样写：
```
def binary_array_to_number(arr):
    return int(''.join((map(str, arr))), 2)
```

还看到了一种方法，太强了！简单分析了一下，有点递归思想。看不懂的可以把s = s * 2 + digit拆开：
s4 = s3 \* 2 + d4 = (s2\*2+d3) \* 2 + d4 ···
```
def binary_array_to_number(arr):
    s = 0
    for digit in arr:
        s = s * 2 + digit
    return 
```


另外学到了一招，算时间的，可以看到我的方法慢很多...
```
>>> s1 = """
... def binary_array_to_number(arr):
...     return int(''.join((map(str, arr))), 2)"""
>>> timeit.timeit("binary_array_to_number([1,0,0,1,1,0,1,0,1,1,0,0])", setup=s1, number=100000)
0.3919008289994963

>>> s2 = """
... def binary_array_to_number(arr):
...     l = len(arr)
...     result=0
...     for i in range(l):
...             result += pow(2, l-i-1)*arr[i]
...     return result"""
>>> timeit.timeit("binary_array_to_number([1,0,0,1,1,0,1,0,1,1,0,0])", setup=s2, number=100000)
1.0104243380001208
```


## Others

### reversed函数

传入元组、列表、字符串等，返回一个反转的迭代器。
打个栗子：

```
>>>str = 'Beautiful'
>>>list(reversed(str))
['l', 'u', 'f', 'i', 't', 'u', 'a', 'e', 'B']
```

### enumerate函数

返回索引和数据
打个栗子：
```
>>>l = ['美丽', '可爱', '大方', '善良']
>>>list(enumerate(l))
[(0, '美丽'), (1, '可爱'), (2, '大方'), (3, '善良')]
>>>for index,data in enumerate(l):
...     print(index,data)
0 美丽
1 可爱
2 大方
3 善良
```


## Daily Thoughts

你觉得简单的题，有人就只用一行代码解决。太强了！！绝了，我觉得我就是一纯Python小白！学到很多。
另，效率有点低，明天多刷几题~