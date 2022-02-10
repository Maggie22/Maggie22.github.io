---
title: Leetcode刷题之模拟
date: 2022-01-11 11:17:44
updated: 2022-01-11 11:17:44
categories: 刷题
tags: 模拟
---



模拟类型题目，持续更新

<!--more-->

参考网站：

[模拟 · SharingSource/LogicStack-LeetCode Wiki](https://github.com/SharingSource/LogicStack-LeetCode/wiki/%E6%A8%A1%E6%8B%9F)

Tips：

- 其实一直不太理解模拟是什么意思...个人理解是模拟人碰到这个会怎么做（模拟“怎样才能得到答案”这个过程）
- 哈希映射
- 这个类型的题很明显地反映我Java用得不熟练.........

# **简单**

## [1. 两数之和](https://leetcode-cn.com/problems/two-sum/)

- 咱就是说，经典题目
- 除了暴力求解，就是用哈希表，但是哈希表的空间复杂度会高一些

## [14. 最长公共前缀](https://leetcode-cn.com/problems/longest-common-prefix/)

- String的一些方法：int indexOf(char ch)找元素下标，char charAt(int i)找下标对应的元素
- 字符串可以相加。如果要加上一个字符可以写作：`str += String.valueOf('a')`
- 我先求了最短字符串的长度，再循环的，可以在循环中判断不要超出长度。
- 还有一种思路是从最后开始看，即判断字符串1是否在字符串2中，不存在就减小字符串1（另外设置一个变量）

## [58. 最后一个单词的长度](https://leetcode-cn.com/problems/length-of-last-word/)

- 比较简单。
- 用while比起用for，代码会更好看（三叶的回答真的，又能给出题解又能给出漂亮的代码）。

## [66. 加一](https://leetcode-cn.com/problems/plus-one/)

- 模拟加法过程

- 注意最后可能要加一位。至于最后加一位，直接这样写就可以了（Wow~）：

  ```java
  digits = new int[len + 1];
  digits[0] = 1;
  ```

  为什么这样可以呢，不是复制了，而是取巧！因为最后要加一位的情况只有999到1000这一类，这个时候除了第一位都是0，而Java的int数组在初始化的时候就默认初始化为0！我靠！

## [136. 只出现一次的数字](https://leetcode-cn.com/problems/single-number/)

- 和第268题很像，不过268是固定范围内的数字，所以可以先相加再减出结果
- 用位运算，异或即可

## [168. Excel表列名称](https://leetcode-cn.com/problems/excel-sheet-column-title/)

- 思路参考了二进制、十六进制的转换方法，但是这里从1而不是从0开始，验算的时候发现需要先减1。
- 另外要注意`for`循环中`n1`和`n2`的前后关系！

## [171. Excel表列序号](https://leetcode-cn.com/problems/excel-sheet-column-number/)

- 和十进制一样

## [263. 丑数](https://leetcode-cn.com/problems/ugly-number/)

- 2、3、5每个都除一下，每个都要除到不能再除为止（即余数不为零）
- 我设了一个变量保存余数，发现直接写在while条件里面会更好看，代码还是得看三叶姐姐：[【宫水三叶】简单的分情况讨论题](https://leetcode-cn.com/problems/ugly-number/solution/gong-shui-san-xie-jian-dan-de-fen-qing-k-dlvg/)

## [268. 丢失的数字](https://leetcode-cn.com/problems/missing-number/)

- 我是**相加然后求差**~

- 先排序后求。排序方法：Arrays.sort(nums)

- 找缺失数、找出现一次数都是**异或**的经典应用。 ——三叶姐姐

  异或性质：$0 \oplus x=x$，$x\oplus x=0$

  所以如果要找缺失数，就把完整序列和0异或一次，再和当前序列异或一次，得到的就是缺失数啦！

## [383. 赎金信](https://leetcode-cn.com/problems/ransom-note/)

- 因为字符串由26个小写字母组成，所以只要先统计magazine里的字母，再减去ransomNote里的字母出现次数就可以了
- 注意magazine的字符只能用一次，**当然也可以不用**（谁想当然了？我想当然了）

## [415. 字符串相加](https://leetcode-cn.com/problems/add-strings/)

也是需要关注代码更优雅的一个写法

- 因为想要用到字符串反转，所以得用StringBuilder不用String，StringBuilder可以直接append数字。
- 更简洁明了的表示：三元运算符；超出数字的部分就是0。
- 注意最后的进位
- 做完这一题就可以去做[43. 字符串相乘](https://leetcode-cn.com/problems/multiply-strings/)



# **中等**

## [2. 两数相加](https://leetcode-cn.com/problems/add-two-numbers/)

- 模拟两式相加的过程
- 注意点见链表部分：[Leetcode刷题之链表 | StrayInCosmos](https://cosmos227.top/2021/12/29/Leetcode%E5%88%B7%E9%A2%98%E4%B9%8B%E9%93%BE%E8%A1%A8/#%E4%B8%AD%E7%AD%89)



## [5. 最长回文子串](https://leetcode-cn.com/problems/longest-palindromic-substring/)

经典题，但我不会（只能想到暴力循环）

[详细通俗的思路分析，多解法 - 最长回文子串 - 力扣（LeetCode）](https://leetcode-cn.com/problems/longest-palindromic-substring/solution/xiang-xi-tong-su-de-si-lu-fen-xi-duo-jie-fa-bao-gu/)

- 动态规划

先定义**状态S(i, j)**表示从i到j的子字符串，是否为回文串表示为P(i,j)。**如果一个字符串是回文串，它去掉两端还是一个回文串**，这就有了**状态转移方程**，$P(i,j)=P(i+1,j-1) \and (S_i == S_j)$。边界条件，长度为1的子字符串为回文串，长度为2的子字符串若字符相等也为回文串。

- 最长公共子串（回文就是正着反着读都一样，把原始字符串倒置后找两者最长公共子字符串）

用动态规划的思想做，同时在找到最长公共子串的时候也要确定下标是不是匹配（只需要看结尾下标是不是匹配）。

- 中心扩展法

列举所有可能的回文中心并向两边进行拓展。注意字符串长度为奇数和偶数两种情况，奇数时以一个字符作中心，偶数以两个字符作为中心。

- Manacher算法

只有O(n)的算法复杂度。插入#符号来考虑偶回文串，利用对称性。

只能处理回文串问题，一般面试不考，略过。



## [6. Z 字形变换](https://leetcode-cn.com/problems/zigzag-conversion/)

- 利用好StringBuilder类
- 设置标志位，确定是否需要变换行索引
- 对String对象做遍历的时候，可以用：`for(char c: str.toArray()) ...`



## [8. 字符串转换整数 (atoi)](https://leetcode-cn.com/problems/string-to-integer-atoi/)

- Integer.MAX_VALUE和Integer.MIN_VALUE
- 我用了long类型来保存，从而可以判断是否越界，return的时候再换回去就行。
- 但是保持用int类型会更好，判断的方法是在**把result乘十之前**，判断一下**result有没有大于Integer.MAX_VALUE/10**，或者**如果等于Integer.MAX_VALUE/10时，当前位置的数字有没有大于Integer.MAX_VALU%10**



## [38. 外观数列](https://leetcode-cn.com/problems/count-and-say/)

这道题目理解题意都花了会时间（doge

- 找重复序列的方法需要更优雅一点，一开始自己想的越想越复杂，简洁明了的才是好办法~
- 设置双指针，一个在标记点，另一个移动直到和标记点不同的索引为止。
- 另外整数合并到字符串上，用Integer.toString()或者直接加到字符串上，但是要注意的是直接数字加字符会出错（比如`1+'a'`)，这个时候加上一个空字符串即可（比如`1+""+'a'`）



## [43. 字符串相乘](https://leetcode-cn.com/problems/multiply-strings/)

- [415. 字符串相加](https://leetcode-cn.com/problems/add-strings/)的下一题
- 我自己用的是模拟列竖式手算然后两个字符串相加的过程，和415这题一样要注意**进位**的问题！同时要注意补零，以及判断是否有字符串为"0"，这时只要输出一个"0"而不是"0000"
- 看了几个题解都提到优化竖式，方法比较巧妙，讲解可以看：[优化版竖式(打败99.4%)](https://leetcode-cn.com/problems/multiply-strings/solution/you-hua-ban-shu-shi-da-bai-994-by-breezean/)；代码我更喜欢三叶写的：[只要你会手算乘法，这题能能过 ~](https://leetcode-cn.com/problems/multiply-strings/solution/zhi-yao-ni-hui-shou-suan-cheng-fa-zhe-ti-ainl/)



## [59. 螺旋矩阵 II](https://leetcode-cn.com/problems/spiral-matrix-ii/)

- 看到这个[题解](https://leetcode-cn.com/problems/spiral-matrix-ii/solution/spiral-matrix-ii-mo-ni-fa-she-ding-bian-jie-qing-x/)的时候，我只会"Wow~~"



## [71. 简化路径](https://leetcode-cn.com/problems/simplify-path/)

- 用**栈**。注意考虑边界条件，栈为空的时候返回"/"；另外用好条件判断（if，else if）；可以用split来划分出目录名。

- Java中的**Deque**，对Queue的拓展，实现了头尾都可以进出。Deque是一个接口，可以用LinkedList或ArrayDeque来实现（两者区别，ArrayDeque是不能用索引操作的，因此如果只用到头尾，ArrayDeque的效率更高）

- pollLast和removeLast，都是删除最后元素，但是后者不允许数组为空，前者允许，为空时返回null。



## [73. 矩阵置零](https://leetcode-cn.com/problems/set-matrix-zeroes/)

- 某行或某列有零，该行或列全为零，利用这个特点来记录标志
- 需要设置标志，表示该位置是否需要置零。除了额外m+n的空间，直接在当前数组上设置标记，会使额外空间更小。
- 注意特殊情况的记录，即第一行、第一列上有为零的情况。



## [89. 格雷编码](https://leetcode-cn.com/problems/gray-code/)

- 直接看答案了，记住得了
- 没有理解为什么求第几个数的格雷码就是$g(i) = b(i)\oplus b(i/2) $。先搁着，真遇到了就用对称来求解。



## [165. 比较版本号](https://leetcode-cn.com/problems/compare-version-numbers/)

- 直接按序比较即可，本来想说用栈，其实是把简单问题复杂化了。对于前导零，和别的数字一样计算即可。
- 可以用split对字符串分组，此时注意要用`split("\\.")`，因为split是利用正则来分割的，对于`.`之类的特殊符号前面要加`\\`转义符。
- 也可以直接用while，到字符`.`为止即可。



## [166. 分数到小数](https://leetcode-cn.com/problems/fraction-to-recurring-decimal/)

- 模拟手算除法的过程，如果遇到已经出现过的余数，循环就开始了，所以要**记录余数以及出现的位置**。可以用哈希表来记录。
- 注意模拟除法手算的过程，一直都是和余数有关的。
- 另外，要避免计算溢出，因此要把int转换为long来计算。注意在加负号之后，需要把分子和分母取绝对值。
- 参考题解：[【宫水三叶】模拟竖式计算（除法）](https://leetcode-cn.com/problems/fraction-to-recurring-decimal/solution/gong-shui-san-xie-mo-ni-shu-shi-ji-suan-kq8c4/)



## [137. 只出现一次的数字 II](https://leetcode-cn.com/problems/single-number-ii/)

- 朴素方法用哈希表

- 常数空间复杂度的用位运算。因为除了一个数字出现一次以外，别的数字出现三次，利用这一点取余数操作。具体而言，首先统计每一位上的数（求和），如果统计得到的数可以被3整除，说明多出来的那个数字为0（其余为1或0的相加结果都会被3整除）；若统计得到的数不能被3整除，说明多出来的那个数字为1。由此可以保存这个数字每一位的值，再从二进制转为十进制返回即可。

- 从操作上来看，由于数字是int类型，所以用int[32] cnt的数组保存每一位上的值即可。在统计时，外循环是对nums中的每个数，内循环是对每一位（一共32位）统计到cnt中去。这里可以用右移操作与1比较，从而得到每一位上的值，当与1相等时，cnt对应位的值++。而在从二进制数组返回得到十进制值时，可以用左移操作来加。

- 另外还有有限状态自动机，这个看得一知半解，也先搁着了~（可参考[只出现一次的数字 II（有限状态自动机 + 位运算，清晰图解）](https://leetcode-cn.com/problems/single-number-ii/solution/single-number-ii-mo-ni-san-jin-zhi-fa-by-jin407891/)）

  

## [260. 只出现一次的数字 III](https://leetcode-cn.com/problems/single-number-iii/)

- 朴素方法用哈希表来保存出现过的数字，但题目要求空间复杂度是常数的，能想到用位运算，但是不会了
- 位运算看了一会才有点理解。首先所有数字异或，得到的结果一定不为零（因为有两个只出现一次的数字）。拿这个异或结果，取任意一个有效位（即值为1的位）（这个位表示这两个数字在这一位上是不一样的，一个在这一位上为1另一个为0），得到一个mask（比如第二位有效则mask是`0010`)（这里有一种简洁的方法，取最低有效位LSB）。再用这个mask去和所有数字异或，就可以把数字们分成两组了，即这个位为1的是一组，这个位为0的是另一组，因为其他数字都是出现两次的，所以每组异或出来的结果就是我们想要找的数字。

- 异或：`^`；与：`&`；或：`|`（注意和逻辑判断区分开）
- 哈希表方法`getOrDefault(key, defaultValue)`：获取指定 key 对应对 value，如果找不到 key ，则返回设置的默认值

>  参考题解：
>
> [采用分治的思想将问题降维](https://leetcode-cn.com/problems/single-number-iii/solution/cai-yong-fen-zhi-de-si-xiang-jiang-wen-ti-jiang-we/)
>
> [【宫水三叶】一题双解 :「哈希表」&「异或」](https://leetcode-cn.com/problems/single-number-iii/solution/gong-shui-san-xie-yi-ti-shuang-jie-ha-xi-zgi4/)

# 困难

## [233. 数字 1 的个数](https://leetcode-cn.com/problems/number-of-digit-one/)

- tmd看不懂
- 我可以理解**数位DP**，引用咱们[K神的话](https://leetcode-cn.com/problems/1nzheng-shu-zhong-1chu-xian-de-ci-shu-lcof/solution/mian-shi-ti-43-1n-zheng-shu-zhong-1-chu-xian-de-2/)就是说 1~ n 的个位、十位、百位、...的 1 出现次数相加，即为 1 出现的总次数。
- 于是我们可以按位循环。令第i位上的数值$n^i=b$，位数为${10} ^ i =m$（i从零开始）。思想就是固定这一位，然后看它左边（高位）的数字和右边（低位）的数字，来得到此时的个数。我们再令高位数字为a，低位数字为b。比如原始数字为56219，再比如我们现在循环到千位上了，也就是b=2，m=100，a=56，c=19。现在呢我们要找的数字是1，由于这一位上的2是大于1的，**那么我们现在可以另它为1，左半部分变化一下就会让1出现次数加一次，右半部分变化一下也会让1的出现次数加一次**。而因为2大于1，左边数字取的只要不大于高位部分，右边数字可以随便取都能保证可以取到的。所以这个时候，1出现在千位上的次数只和a有关，是$(a+1)*m$。换个角度理解一下：可以把高位和低位拼起来，不超过5699就可以，即可以取到0~5699，即$(a+1)*m$

- 为了好理解，我还是拿千分位的数字做例子，所以把原始数字换成56119，现在b=1，其他还是不变的m=100，a=56，c=19。那么现在b和要找的数字1一样大了，我们看看会左右部分可以怎么变了：右边还是一样，只要不大于a就行，但是左边就不是，当a=56的时候，左边不能超过19了。这个时候我们还是把千位拿掉，看看高位拼低位能取到多少，最大应该是5619，最小还是可以到0，所以可以取到的数字0~5619。即$a*m+c+1$
- 然后就剩最后一种情况了，即把原始数字换成56019，现在b=0，其他还是不变的m=100，a=56，c=19。现在b小于1了，那如果还是想统计千位为1的出现次数，那就左边不能大于56了，最多取到55即a-1，这样才能让千位取到1，然后这个时候，咱们的低位又可以随便取啦！所以此时只和左边的数字有关，即$a*m$。我们再千位拿掉，把高位低位拼起来，最大是多少相信你也会了：5599，所以这个时候的范围是0~5599，即$a*m$

- 扩展一下：[P1980 [NOIP2013 普及组] 计数问题 - 洛谷](https://www.luogu.com.cn/problem/P1980)
  
