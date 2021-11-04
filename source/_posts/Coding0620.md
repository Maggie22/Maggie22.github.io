---
title: Coding0620
date: 2019-06-20 16:05:44
categories: DailyCode
photo: https://forlwq.oss-cn-hangzhou.aliyuncs.com/DailyCode/2.jpg
---


CodeWars第二天

<!--more-->

---

## 第一题 Decode the Morse code/1

```
# My Solution
def decodeMorse(morse_code):
    # ToDo: Accept dots, dashes and spaces, return human-readable message
    str = ''
    words = morse_code.strip().split('   ')
    for word in words:
        w = [w.replace(w, MORSE_CODE[w]) for w in word.split(' ')]
        str = str + ''.join(w)+' '
    return str.strip()
```
(其实我觉得比起第一天的好多了。用到了第一天学到的join和列表构建)
这个解法不错，算得上有点clever~~
rank one的解法依然只用了一行，一行代码两个join
有个改进的地方。
单词可以放在一个list里，然后再return' '.join(list)就好了。

## 第二题 Find the missing letter
给一个字符列表，找出按顺序确少的字母。
如['a','b','c','e']，返回'd'
```
# My Solution
def find_missing_letter(chars):
    for i in range(1, len(chars)):
        if ord(chars[i]) - ord(chars[i-1]) > 1:
            break
    return chr(ord(chars[i])-1)
```

另一个解法是匹配字符串。然后一个一个匹配。第一个没匹配上的就是错的。

## 第三题 

将字符串中的字母代替为其在字母表中对应的位置（数字）
```
# My Solution
def alphabet_position(text):
    alphabet = {}
    result = []
    for i in range(26):
        alphabet[chr(i+97)] = str(i+1)
    text = list(text.replace(' ','').lower())
    for i in range(len(text)):
        if text[i] in alphabet.keys():
            result.append(alphabet[text[i]])
    return ' '.join(result)
```
**Points：**
1. lower() ：将字符串中的所有字母转为小写字母
2. str(): 如果被定义了的话，这个函数就用不了了
3. 把string转为list：用list()

**他山之石：**
1. 字母表中的位置其实就是这个字母的ASCII码 - a的ASCII码（97） + 1（即直接减96）
2. 可以不构建字典，直接用"abcdefg..."的字符串，再用index函数就可以找到位置了
3. 判断字符是否是字母，有函数:isalpha()
4. 之前讲到的list构造中，还可以加上条件判断
5. 要遍历字符串中的每一个字符，直接for c in str即可，不用转为列表再操作~
PS: 但是我去计算了一下时间（time.clock()），先转为list再操作，用时会短一些。当然，差的不是很多。

```
# 验证运算时间
import time

def alphabet_position_1(text):
    return ' '.join(str(ord(x)-96) for x in text.lower() if x.isalpha())

def alphabet_position_2(text):
    return ' '.join(str(ord(x)-96) for x in list(text.lower()) if x.isalpha())

s = 'iuyfsvbdutg iaef'
start = time.clock()
alphabet_position_1(s)
end = time.clock()

print("运行时间：", str(end-start))

start = time.clock()
alphabet_position_2(s)
end = time.clock()
print("运行时间：", str(end-start))
-----------------------------
结果：
运行时间： 5.759999999999099e-05
运行时间： 4.394700000000251e-05
```

```
# 一行代码的解法
def alphabet_position(text):
    return ' '.join(str(ord(x)-96) for x in text.lower() if x.isalpha())
```


## 后记
有点进步（主要是会用了一些python函数）。题目本身也不难，主要要想到一个好的解法。希望来点难度更大的题啦~
