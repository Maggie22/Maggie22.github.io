---
title: Leetcode刷题之动态规划
date: 2022-04-03 22:43:22
updated: 2022-04-03 22:43:22
categories:
tags:
---

终于开始动态规划啦！啊好难的动态规划~目前做了一些题，持续更新！

<img src="https://forlwq.oss-cn-hangzhou.aliyuncs.com/emoji/braveDog.jpg" alt="braveDog" style="zoom:50%;" />

<!--more-->

- 状态压缩：留个档https://zhuanlan.zhihu.com/p/131585177
- 题单：[花花酱 LeetCode Problem List 题目列表](https://zxi.mytechroad.com/blog/leetcode-problem-categories/)
- [代码随想录](https://programmercarl.com/%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E7%90%86%E8%AE%BA%E5%9F%BA%E7%A1%80.html)

# 背包问题

什么问题适合用背包来解决呢？

我认为是给了**一组元素（数字、字符、字符串）**（放进背包的东西），让你使用其中的元素，来**满足一定的要求**（背包容量）。这些元素可以是每个只能最多用一次（01背包），也可以是每个可以用无数次（完全背包）。这一类问题可以考虑背包。

## 01背包

有n件物品和一个最多只能背w重量的背包，每件物品只能用一次，求怎么放才能使背包内物品价值最大。

解决问题的关键在于：

1. 当然是想到问题可以用背包来解~然后把问题转换为背包问题，我觉得这一步是最难的，因为题目形式千变万化
2. 设计背包。

### 中等

#### [416. 分割等和子集](https://leetcode-cn.com/problems/partition-equal-subset-sum/)

把问题转换为：数组中是否有一组数字，它们的和为sum/2。

#### [1049. 最后一块石头的重量 II](https://leetcode-cn.com/problems/last-stone-weight-ii/)

把问题转换为：把石头分成两堆，这两堆和的差尽可能接近。

或者可以看成：把石头重量加上正负号，求这些数列出式子后，和最接近零的。（其实也是在找一堆数字相加可以尽量等于sum/2。）

#### [494. 目标和](https://leetcode-cn.com/problems/target-sum/)

416、1049、494这三道题比较类似。

特别和第1049题很像。

#### [474. 一和零](https://leetcode-cn.com/problems/ones-and-zeroes/)

和上面三道题不一样的地方是，**背包有两个容量（1的数量和0的数量）**。

想了半天用二维dp如何表示，也没想出来。参考题解用三维，然后进一步优化为二维。

`dp[i][j][k]`表示在下标`0-i`中选择字符串，字符串中`0`的数量不超过`j`，`1`的数量不超过`k`。状态转移有两种情况，当不选择第`i`个字符串时，`dp[i][j][k] = dp[i-1][j][k]`时；当选择第`i`个字符串时，`dp[i][j][k] = dp[i-1][j-zero[i]][k-one[i]]`。

考虑初始化：多设置一行，第一行为空串也不选择，整行为0。

## 完全背包

### 中等

#### [518. 零钱兑换 II](https://leetcode-cn.com/problems/coin-change-2/)

相当于求组合数，需要注意的是每种硬币不能重复选择，即(1, 5)和(5, 1)只能出现其中一种。这个体现在双重for循环求解时，外层for循环对硬币面额的循环，内层for循环对硬币总和的循环。而如果反过来，就会产生重复了，列表也可以看出来。

#### [377. 组合总和 Ⅳ](https://leetcode-cn.com/problems/combination-sum-iv/)

这道题虽然标题叫求组合的总和，实际上看一下测试用例就知道在找排列数。跟518思路差不多，就是518的两层循环内外交换一下。

PS. 我感觉这样求组合数、排列数的用动态规划（背包）即可解决，如果需要具体的排列组合方式，就需要回溯。

#### [322. 零钱兑换](https://leetcode-cn.com/problems/coin-change/)

518在求组合数，这道题求最少的硬币个数，状态转移方程不同一点。在求`dp[i][j]`时，518题的状态转移方程为：`dp[i][j]=dp[i-1][j] + dp[j-1][j-coins[i]]`。

在这道题中，状态转移方程为：`dp[i][j] = min(dp[i-1][j], dp[i-1][j-coins[i]]+1)`。然后考虑初始化，dp数组的大小为`dp[m+1][n+1]`， `dp[0][0]`表示一个硬币也不取，总和为0时需要的硬币个数（注意不是组合数，组合数即取法为1），即 `dp[0][0] = 0`。其他的先初始化成取不到的数字，用`Integer.MAX_VALUE`即可。

# 简单

## [70. 爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/) ☆

> 有一个人学DP不会爬楼梯的我都会伤心的OK？

递归方法容易想到，但是会超时。分析一下，先想到可以用一个长度为N的数组来保存每一次结果。再进一步分析一下可以想到其实保存两个数字就够啦。

**动态规划 vs 递归**（[参考](https://leetcode-cn.com/problems/climbing-stairs/solution/cong-zhi-jue-si-wei-fen-xi-dong-tai-gui-hua-si-lu-/)）

将原问题分为子问题来解决的，通常有两种思路：自顶向下和自底向上。递归就是自顶向下的思想，再层层向上返回结果，递归会出现重复解决子问题的情况因此效率较低。而动态规划是自底向上的思想。

虽然动态规划看上去更好用，但是递归也有其优势。比如动态规划一般只保存结果，而不保存路径；但递归用回溯可以得到路径。

变形体：[746. 使用最小花费爬楼梯](https://leetcode-cn.com/problems/min-cost-climbing-stairs/)

## [746. 使用最小花费爬楼梯](https://leetcode-cn.com/problems/min-cost-climbing-stairs/)

和爬楼梯解决方法类似。在读题的时候卡了一下emm，然后在计算代价的时候稍微卡了一下。还是自底向上的思路，令f(i)为爬到第i个台阶时需要的代价。$f(i)=min(f(i-1)+cost(i-1), f(i-2)+cost(i-2))$，得到这个公式之后就比较清晰了。

## [1137. 第 N 个泰波那契数](https://leetcode-cn.com/problems/n-th-tribonacci-number/)

这叫泰波那契数，还不是斐波那契数，哈哈，但是解法是类似的。

来点不一样的方法看看叭：[矩阵快速幂](https://leetcode-cn.com/problems/n-th-tribonacci-number/solution/gong-shui-san-xie-yi-ti-si-jie-die-dai-d-m1ie/)

## [303. 区域和检索 - 数组不可变](https://leetcode-cn.com/problems/range-sum-query-immutable/)

用前缀和。

来点不一样的方法看看叭：[分块算法](https://leetcode-cn.com/problems/range-sum-query-immutable/solution/ni-yong-yuan-ke-yi-xiang-xin-fen-kuai-su-ugou/)

# 中等

## [300. 最长递增子序列](https://leetcode-cn.com/problems/longest-increasing-subsequence/)

详见二分篇

## [139. 单词拆分](https://leetcode-cn.com/problems/word-break/)

参考题解：[「手画图解」剖析三种解法: DFS, BFS, 动态规划 |139.单词拆分 - 单词拆分 - 力扣（LeetCode）](https://leetcode-cn.com/problems/word-break/solution/shou-hui-tu-jie-san-chong-fang-fa-dfs-bfs-dong-tai/)

**方法1-DFS**

将问题进行拆分，以leetcode为例，拆分为：1. `l`是否在单词表中，剩余子串是否能分解；2. `le`是否在单词表中，剩余子串是否能分解；3. ...

用DFS回溯即可。



## [198. 打家劫舍](https://leetcode-cn.com/problems/house-robber/)

发现做了一些dp题目之后有点思路了！

<img src="https://forlwq.oss-cn-hangzhou.aliyuncs.com/emoji/large.jpg" alt="gejvOpen" style="zoom: 25%;" />

题目关键点：不能连续偷。

设`dp[i]`表示前i家能取得的最高金额。尝试写一下状态转移公式，既然是求最大，应该是一些状态来比较。如果不偷第i家，就是`dp[i-1]`；如果偷第i家，那就不能偷第`i-1`家，但是第`i-2`家要偷，那就前`i-2`家取得的最高金额加上第`i`家取得的金额，也就是`dp[i-2]+nums[i]`。状态转移方程：`dp[i] = max(dp[i-1], dp[i-2]+nums[i])`。

再考虑初始化，这里初始化需要i=0时，即一家也不偷，显然为0。再看状态转移方程中，其实当前状态`dp[i]`只跟`dp[i-1]`和`dp[i-2]`有关，所以只需要两个变量来保存中间结果就可以了。

## [213. 打家劫舍 II](https://leetcode-cn.com/problems/house-robber-ii/)

跟212题差别在于首尾两家是相连的。

我想了一会没有想出来怎么解决。像这样**环**的有点不会处理，之前还做到过一个[503. 下一个更大元素 II](https://leetcode-cn.com/problems/next-greater-element-ii/)，这道题中是对**数组循环遍历**，这道题目里对数组遍历两次就可以。

题解：拆成偷第一家和偷最后一家两种情况，分别求出两种情况下能取得的最大金额，两者之中更大的那个就是答案。

## [337. 打家劫舍 III](https://leetcode-cn.com/problems/house-robber-iii/)

这道题能想到的解题思路：对于当前节点，如果我偷当前节点，那就不能偷它的左右节点；如果我不偷，那就左右节点最大金额之和。但是我WA了... 联想到动态规划的思想：记忆化来减少搜索时间。我们可以保存已经求过的节点的值。

再更进一步，我们可以保存两种情况的值（我想到了，但是没有想到有什么方法来保存。提醒自己一下：**不是作为值保存在节点中，而是作为函数返回值来传递**！）。也就是保存偷当前节点能取到的最大金额和不偷当前节点能取到的最大金额。

看了题解又有种思路打开的感觉，我觉得很妙，记一笔。

## [剑指 Offer 14- I. 剪绳子](https://leetcode-cn.com/problems/jian-sheng-zi-lcof/)

和[343. 整数拆分](https://leetcode-cn.com/problems/integer-break/)是同一道题

好神奇，没有太理解！

**DP**

dp[i]为长度为i的绳子，切割后的最大乘积。状态转移公式：`dp[i]=max(j*(i-j), j*dp[i-j])`。

**贪心**

尽量切成三段。
