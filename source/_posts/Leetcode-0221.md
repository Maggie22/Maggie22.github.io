---
title: Leetcode0221
date: 2021-02-21 23:02:58
tags: 
- 刷题
- Leetcode简单题
categories: DailyCode
---

回文数、罗马字符转数字
<!--more-->

## 9. 回文数

题目链接：[LeetCode链接](https://leetcode-cn.com/problems/palindrome-number/)

没有用字符串的方法来做。

### 我的思路

1. 依次取第一位和最后一位上的数字进行比较。后面的数字是好取，第一位数字不好取，问题复杂化了。
2. 从后面开始取数字，得到翻转过来的数字，然后比较一下是否相等。考虑到溢出：如果出现溢出，那么也肯定不是回文数，但是需要把翻转过来的数字类型定义为long。

代码用时20ms，击败38.53%；内存消耗5.8MB，击败80.43%：

```c++
class Solution {
public:
    bool isPalindrome(int x) {
        if (x<0)
            return false;
        int x_tmp = x;
        long tmp = 0;
        while(x_tmp)
        {
            tmp = tmp * 10 + x_tmp % 10;
            x_tmp /= 10;
        }
        if (x == tmp)
            return true;
        else
            return false;
    }
};
```

### 官解

第一，考虑特殊情况，分别是负数和最后一位为0。第二，只要判断一半就够。对于如何鉴别这个一半的位置，只要对上面的代码稍作改动就可以。

```c++
class Solution {
public:
    bool isPalindrome(int x) {
        if (x<0)   
            return false;
        if (x!=0 && x%10 ==0)   // 加入另一种特殊情况
            return false;
        int tmp = 0;    // 这个时候int就够了
        while(x > tmp)
        {
            tmp = tmp * 10 + x % 10;
            x /= 10;
        }
        // 第一种条件是位数为偶数，一分为二；第二种情况是位数为奇数
        if (x == tmp || x == tmp/10)
            return true;
        else
            return false;
    }
};
```

评论里说得好哇：

“简单的题效率完全比不上题解，复杂的题完全不会 -.-”  by wanwenx

😣

## 13. 罗马数字转整数

题目链接：[13. 罗马数字转整数 - 力扣（LeetCode）]( https://leetcode-cn.com/problems/roman-to-integer/submissions/)

### 我的思路

1. 定义一个函数，输入罗马字符，返回对应的数值；
2. 分析罗马数字的规则：如果是正常计算的话，一个字符对应一个数，加起来就可以了；特殊情况只有后一位比当前位对应数值要大。那么，只要当前位置不是最后一位，就比较当前位置大小和下一位置大小。

注：switch语句里要用break做当前分支的结束。不然即使满足条件，也还是会进入下一分支。

代码用时12ms，击败66.55%；内存消耗5.9MB，击败89.62%：

```c++
class Solution {
public:
    int romanToInt(string s) {
        int len = s.length();
        int i=0;
        int now=0, next=0, result=0;
        while(i<len)
        {
            now = trans(s[i]);
            if(i == len-1)
            {
                result += now;
                break;
            }
            next = trans(s[i+1]);
            if(now<next)
            {
                result += next - now;
                i += 2;
                continue;                
            }
            result += now;
            i++;
        }
        return result;
    }
    int trans(char ch)
    {
        int a=0;
        switch(ch)
        {
            case 'I':
                a = 1;
                break;
            case 'V':
                a = 5;
                break;
            case 'X':
                a = 10;
                break;
            case 'L':
                a = 50;
                break;
            case 'C':
                a = 100;
                break;
            case 'D':
                a = 500;
                break;
            case 'M':
                a = 1000;
        }
        return a;
    }
};
```

### 题解

基本思路和我的方法差不多，有把switch函数换成哈希表的。

```c++
unordered_map<string, int> m = {{"I", 1}, {"IV", 3}, {"IX", 8}, {"V", 5}, {"X", 10}, {"XL", 30}, {"XC", 80}, {"L", 50}, {"C", 100}, {"CD", 300}, {"CM", 800}, {"D", 500}, {"M", 1000}};
```

一个作者说明得比我更清楚写，小数在左大数在右，则做减法，即IV中的I对应-1.



