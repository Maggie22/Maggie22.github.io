---
title: Leetcode刷题之双指针
date: 2022-02-10 15:22:34
updated: 
categories: 刷题
tags: 双指针
---

双指针类型题目，持续更新

<!--more-->

Tips：

- 双指针来**减小搜索空间**

- 双指针可以分为对撞指针和快慢指针。对撞指针一般从序列的两端向中间进行遍历。而快慢指针从同一侧开始遍历但以不同的策略进行移动，直到两个指针的值相等或满足其他特殊条件（比如快指针走到序列底了）为止。

- 和滑动窗口相辅相成。

- 一个双指针模板（by[负雪明烛](https://leetcode-cn.com/problems/longest-repeating-character-replacement/solution/fen-xiang-zhen-cang-de-shuang-zhi-zhen-m-fdsk/)）（感觉说是滑动窗口模板更合适）

  

# Easy

## [27. 移除元素](https://leetcode-cn.com/problems/remove-element/)

方法一：双指针，把不符合条件的数字移到后面

方法二：遍历数组，如果不等于val就保留。

## [88. 合并两个有序数组](https://leetcode-cn.com/problems/merge-sorted-array/)

- 从后向前合并，利用num1的空余位置

## [345. 反转字符串中的元音字母](https://leetcode-cn.com/problems/reverse-vowels-of-a-string/)

- 一个指针从前往后，一个指针从后往前，都去找元音字母，我用一个set保存元音，要注意的是大小写都考虑到。
- String2Array：str.toCharArray(); Array2String：String.valueOf(ch)

## [455. 分发饼干](https://leetcode-cn.com/problems/assign-cookies/)

贪心。先满足胃口小的孩子。

这里记一笔：我在判断大小的时候先相减，在判断减的结果是否小于零，这样可能会因为越界产生错误，所以直接判断大小就可以了。所以在做题的时候先要保证思路（代码框架和逻辑）正确（这里需要练习与随之而来的自信），然后再确定细节（比如越界、超时等等）（当然这里也需要很多练习与随之而来的经验）

## [485. 最大连续 1 的个数](https://leetcode-cn.com/problems/max-consecutive-ones/)

简单题重拳出击。

- 我的方法是每次循环找到第一个为1的位置，然后再找到第一个为0的位置
- 也可以在对数组进行遍历，遇到1的时候，找0的位置；遇到0的时候，i++

## [1446. 连续字符](https://leetcode-cn.com/problems/consecutive-characters/)

- 设置两个指针，第一个固定，第二个移动到与第一个指向的字符不同的位置。



# Medium

## [3. 无重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)

双指针，也是滑动窗口题

用到了双指针的思想（一个指向首字母，一个指向尾字母）。

1. 设置指针start和end，用哈希表map来保存出现的字符和出现次数
2. end指向的字符如果不在map中，加入map并使value+1
3. 当value大于1时，说明之前出现过这个字符
4. 移动start，并使map中对应字符value-1（即不出现在当前字符串中），直到end指向字符的value等于1（即只出现在刚才加入的地方），此时字符串中又没有重复字符了
5. 比较当前字符串长度（end-start+1）和之前保留结果maxLen，取大的那个值

## [11. 盛最多水的容器](https://leetcode-cn.com/problems/container-with-most-water/)

双指针来减小搜索空间

- 注意容器面积只取决于两边的板
- 移动两者其中的短板，才有可能使面积变大；若移动长板，面积不变或变小；从而可以减小搜索空间

## [15. 三数之和](https://leetcode-cn.com/problems/3sum/)

也是用双指针来减小搜索空间（固定一个元素，移动两个元素，两个指针往固定的方向移动，可以更好控制搜索空间的变化）

1. 先讲数组排序，可以更好处理重复的情况
2. 固定一个指针k，从第一个元素开始
3. 设置双指针left和right，分别在k+1和数组最后一个元素
4. 如果nums[k]>0，三者之和一定大于零
5. 如果nums[k]==nums[k-1]，避免重复，直接跳过
6. 三者之和小于0，说明数太小，left往右移；大于0，则说明数太大，right往左移

变形题：

[16. 最接近的三数之和](https://leetcode-cn.com/problems/3sum-closest/)

[18. 四数之和](https://leetcode-cn.com/problems/4sum/)

## [45. 跳跃游戏 II](https://leetcode-cn.com/problems/jump-game-ii/)

维护一个最大边界（maxPosition），保存这次跳跃能到达的最远位置。

当小人移动到本次跳跃的最远边界（end）时，就进入下一次跳跃，所以step++。

初始状态下，end为0。

## [395. 至少有 K 个重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-with-at-least-k-repeating-characters/)

三叶的题解有点没看懂，有条件的滑动窗口。

[【宫水三叶の相信科学系列】为什么不能用「滑动窗口」？以及如何发掘题目性质 ](https://leetcode-cn.com/problems/longest-substring-with-at-least-k-repeating-characters/solution/xiang-jie-mei-ju-shuang-zhi-zhen-jie-fa-50ri1/)

为什么三叶的第一反应是二分？我猜测一下，找到不满足条件的字符，将字符串一分为二，再接着找。

为什么这就不满足二段性了啊？为什么这里双指针不具有单调性啊？

假如说我现在用双指针来维护一个区间，让他满足左边界左侧的字符和右边界右侧的字符都不出现在子字符串内。如果我把右指针往右移，他有可能满足也可能不满足，那只要判断一下就行了呀，如果这个字符出现在里面，那就移，如果不出现就不移。

或者如果不出现，那就移到出现为止，但是这样的话，移动不是单调的，就是说一直移动还是可能不满足条件的。

为什么第三题可以用滑动窗口来做呢？如果我现在用双指针来维护一个区间，让他里面的字符不重复。如果我把右指针往右移，也是可能满足可能不满足。如果这个字符出现在里面，我就移动，然后让左指针移到原来出现的位置。

但是这道题他不行。因为我右指针移动的话，左指针要怎么移呢。窗口内子字符串的”包含字符的数量“这一属性一直在变化，也就导致窗口内子字符串“满足每个字符出现次数大于等于k”这一属性也一直变化。因此说他是非单调的。

我们换一个思路，换一个移动条件。那就是固定窗口内字符类型：比如说只有一种字符，aa满足条件；只有两种字符，aabb满足条件。这样一来的话，只要外层加个26个字母的循环即可。维护一个区间，让他满足区间内出现的字符类型为x。

## [424. 替换后的最长重复字符](https://leetcode-cn.com/problems/longest-repeating-character-replacement/)

可变长度的滑动窗，我在建模的时候出了一点问题。可以将题目转换成：寻找一个区间，使得这个区间内出现次数最多的字母+k小于区间长度。

思路好理解，但是加上一个优化的话这理解就在大气层了emm

需要再做一遍的。

Tips：

- 滑动窗，右指针主动移动一个，左指针被动移动。
- 窗口只可变大或不变。



## [438. 找到字符串中所有字母异位词](https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/)

总是考虑得不太对，唉。



## [443. 压缩字符串](https://leetcode-cn.com/problems/string-compression/)

做出了空间复杂度为O(n)的方法，主要是在数字填入字符串的部分。

Tips：

* 一般能做出O(n)但是要用O(1)的，需要时间换空间，不要觉得太复杂什么的就不写了，尝试一下。
* 现在做题很难一次AC，需要根据错误的测试用例来debug，这样一来在不提供错误测试用例的笔试就会比较头疼，之前也都是这种情况。
* 这道题目里，碰到的情况是：忘记覆盖无用字符了！也就是**["a","a","a","b","b","a","a"]**会返回**["a","3","a","b","2","a","2"]**的情况，第三个字符没有被覆盖，也是在做题最初的时候没有考虑到的。没想好，着急了



记一个有点奇怪的事情

这是我写的代码，最后一个测试用例过不了。。问题发现在哪里了！第九行应该是大于等于！！不然如果出现重复值的heater它就不会后移了！！！就检查不到后面的heater了！

```java
class Solution {
    public int findRadius(int[] houses, int[] heaters) {
        int res = 0;
        int i=0, j=0;
        Arrays.sort(houses);
        Arrays.sort(heaters);
        while(i<houses.length){
            int len = Math.abs(heaters[j] - houses[i]);
            while(j+1<heaters.length && Math.abs(heaters[j] - houses[i]) > Math.abs(heaters[j+1]- houses[i])){
                j++;
                len = Math.min(len, Math.abs(heaters[j]- houses[i]));
            }
            res = Math.max(res, len);
            i++;
        }
        return res;
    }
}
```

## [519. 随机翻转矩阵](https://leetcode-cn.com/problems/random-flip-matrix/)

感觉和数据结构的关系更大，见：XX

## [524. 通过删除字母匹配到字典里最长单词](https://leetcode-cn.com/problems/longest-word-in-dictionary-through-deleting/)

这道题，咱们先来学习一下JAVA中的排序。

[Java8中Comparable和Comparator区别小结 - Java开发 - 程序喵](http://www.ibloger.net/article/2773.html)

Arrays.sort用于对数组排序，Collections.sort用于对集合排序。这两种方法默认是升序，都可以自定义实现，即通过**重写比较器**来自定义对象排序。

> **数组和集合的区别**
>
> 数组是静态的，声明之后就无法改变容量；而集合是动态的。
>
> 数组：array；集合：set，list
>
> 数组->集合：Arrays.asList(arr)；集合->数组：list.toArray()

唉思路对了，可是比较的时候居然又出问题了。逻辑没想清楚，容易出错。

原来的写法：

```java
for(String item:dictionary){
    int i=0, j=0;
    while(j<item.length()){
        char ch = item.charAt(j);
        while(i<s.length() && s.charAt(i++)!=ch);
        if(i==s.length()) break;	// ！如果正好i在最后一个位置相等，造成j没有++而出错
        j++;					
    }
    if(j==item.length()){
        res = item;
        break;
    }
}
```

参考题解后的写法：

```java
 for(String item:dictionary){
     int i=0, j=0;
     while(j<item.length() && i<s.length()){
         if(item.charAt(j) == s.charAt(i)) j++;		// 一个指针指向item，一个指针指向s，相等就都前进，不等就只有i前进。不提前break，程序可能更不易出错。
         i++;
     }
     if(j==item.length()){
         res = item;
         break;
     }
 }
```



## [581. 最短无序连续子数组](https://leetcode-cn.com/problems/shortest-unsorted-continuous-subarray/)

看题解确实技巧性比较强。

我的思路：从前往后找到第一个不满足nums[i]<=nums[i+1]的索引，作为不符合升序的begin位置，再从后往前找到第一个不满足nums[j]>=nums[j-1]的索引，作为不符合升序的end位置。遍历begin到end，找到区间[begin, end]内的最大值maxNum和最小值minNum。

从begin-1往前找到第一个nums[i] <= minNum的索引i，从end+1往后找到第一个nums[j] >= maxNum的索引，j-i-1就是答案。这个算法最多扫描两次数组，算法复杂度为O(n)。

题解：从前往后找最大值，并且找到最后一个小于最大值的索引。从后往前找最小值，并且找到最后一个大于最小值的索引。

## [611. 有效三角形的个数](https://leetcode-cn.com/problems/valid-triangle-number/)

我只会暴力解法（表面：呜呜呜我好菜；内心：暴力yyds！

咳，可以优化一下。仔细看看，三重循环事实上固定两个最小的，找大的边。转换一下思路，**固定最大边**，找剩下两个小的，运用双指针。这也是双指针减小搜索空间的应用。

题解里还有数学解法的，没有仔细看。

## [825. 适龄的朋友](https://leetcode-cn.com/problems/friends-of-appropriate-ages/)

先要把题意分析清楚，可以发送请求的用户年龄在一个区间内。

一个比较明显的思路：只要找到这个区间的左右端点即可。将数组排序后，左端点是第一个满足要求的用户的下标，右端点则是最后一个满足要求的用户下标。相减的时候减掉自身即可。这里如果每次左端点从零开始的话，运行会超时，像这样数字连续的序列，可以接着上次的搜索结果继续找。

另外有一个思路，使用的**前缀和**。我们需要统计出在区间`(0.5 * age[x] + 7, age[x]]`之间的人数。就是说，设置一个前缀和数组`p[121]`，`p[i]`保存的就是年龄为`[0, i]`的总人数，那么`p[age[x]] - p[0.5 * age[x] + 7]`就是上述区间内的人数，然后再减去x自身，即减1就是下标x对应的答案。因为年龄小于120，按年龄遍历即可，每个年龄的结果记得乘上这个年龄的人数。

