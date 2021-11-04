---
title: Leetcode-0106
date: 2021-01-11 18:43:43
tags: 
- 刷题
- Leetcode简单题
categories: DailyCode
---

两数之和与整数反转

<!--more-->

## 两数之和

### 我的思路

先排序，找到小于等于target的最大数，索引为idx。然后用双指针，start=0，end=idx。如果两个相加等于target就break，小于target就start++，大于target就end--，这样循环。把找到的数在原数组中进行搜索，找到索引再返回。

然后我遇到一个问题，如果数字相同（如3+3=6），返回索引会有重复。

看了题解发现自己把问题想复杂了。嵌套循环就行了啊！

### 题解

1. 双层循环，$O(n^2)$
2. 用哈希表，$O(1)$。除掉自身搜索哈希表，搜完了再把自己放进去，可以避免重复的问题（这个比较巧妙）。

第二种思路的代码：

```c++
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> hashmap;
        for(int i=0;i<nums.size();i++)
        {
            auto it = hashmap.find(target-nums[i]);
            if(it != hashmap.end())
            {
                return {it->second, i};
            }
            hashmap[nums[i]] = i;
        }
        return {};
    }
};
```

## 整数反转

### 我的思路

想把整数转为字符串，然后字符串用reverse函数就能翻转，再把字符串转为整数。这个问题关键在于如何判断溢出。我的方法是用stol()转为long，再和INT_MAX作比较。代码如下：

```c++
int reverse(int x) {
    string str = to_string(abs(x));
    std::reverse(str.begin(), str.end());

    double result = stol(str);
    if(result>INT_MAX)
        return 0;
    if(x<0)
        result = -result;
    return result;
}
```

PS: int最大值用INT_MAX就可以，我先试了pow(2, 32)算出来很奇怪。
PS2: INT_MAX和INT_MIN在头文件limits.h中，int类型的范围是$-2^{31}~2^{31}-1$。之所以上界要减一，下界不用是因为大于零时有符号位占一个；而下届是因为规定第一位为1，其余为0的是$-2^n$，不然这个编码就用不上了。

### 题解

官方题解的思路没有想到，是通过比较`x/10`和`INT_MAX/10`。若两者相等，那么再比较最后一位的大小。若前者大于后者，直接得到x溢出。要注意的是，有**向上溢出**还有**向下溢出**！！

具体实现来说，由`pop=x%10`每次取x的最后一位，rev则从0开始，形成`rev*10+pop`来与INT_MAX和INT_MIN作比较。

代码如下：

```c++
int reverse(int x) {
    int rev=0;
    int pop=0;
    while(x)
    {
        pop=x%10;
        if(rev > INT_MAX/10 || rev==INT_MAX/10 & pop>INT_MAX%10) return 0;
        if(rev < INT_MIN/10 || rev == INT_MIN / 10 & pop < INT_MIN%10) return 0;
        x = x/10;
        rev = rev * 10 + pop;
    }
    return rev;
}
```

## 写在最后

从简单题开始练起，静下心来去消化题目。加油！💪💪