---
title: Leetcode刷题之链表
date: 2021-12-29 19:30:31
updated: 2021-12-29 19:30:31
categories: 刷题
---

链表类型，持续更新

<!--more-->

一些学习和总结的文章：

[算法面试题 | 链表问题总结 - 掘金](https://juejin.cn/post/6882370280946302983)

[链表算法面试问题？看我就够了！_吴师兄学编程](https://www.cxyxiaowu.com/1400.html)



Tips

- **双指针（快慢指针）**在链表中是一个比较重要的方法。

- 可以设置一个没有意义的头节点（**虚拟头节点**）。没有意义的头节点可以避免一些特殊情况。

- 在next之前，注意一下当前有没有可能为null，要判断一下是否为null才可以next。

- 链表方法基本都能用**递归**。推荐阅读：https://lyl0724.github.io/2020/01/25/1/

反转链表的递归解法，要多理解几遍

```java
class Solution {
    public ListNode reverseList(ListNode head) {
        if(head == null || head.next == null)
            return head;
        ListNode new_head = reverseList(head.next);
        head.next.next = head;
        head.next = null;
        return new_head;
    }
}
```



# 简单

## [141. 环形链表](https://leetcode-cn.com/problems/linked-list-cycle/)



## [160. 相交链表](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/)

用双指针，想到了但是不知道怎么用。

[题解](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/solution/tu-jie-xiang-jiao-lian-biao-by-user7208t/)的评论太惊艳：

走到尽头见不到你，于是走过你来时的路，等到相遇时才发现，你也走过我来时的路。——@sylin

## [203. 移除链表元素](https://leetcode-cn.com/problems/remove-linked-list-elements/)

迭代方法很简单

还有递归方法：（1）先设置递归结束条件（head为null）；（2）再设置递归（相当于压栈），直到最后一个节点；（3）设置返回值（相当于出栈）

Tips：

- 迭代方法设置虚拟头结点
- 递归方法的时间和空间复杂度都为O(n)

## [206. 反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)

企业面试的高频题！要掌握递归写法和迭代写法。

迭代的思路：

第一种，我想到的。设置一个指向head的指针pre，每次将head.next插入pre和pre.next之间，然后移动head。这里要注意换next的时候不要出错。

第二种，在题解中看到的。双指针，cur指向head，pre指向cur.next，每次将pre.next换成cur，然后pre和cur都向后移动一位。

**递归**的思路：

首先一直递归到最后一个节点进行返回，让他变成头节点。然后对于每一个节点node，使node.next.next=node.next，从而从后往前进行反向。

## [234. 回文链表](https://leetcode-cn.com/problems/palindrome-linked-list/)

## [237. 删除链表中的节点](https://leetcode-cn.com/problems/delete-node-in-a-linked-list/)

删除链表这里记一笔关于Java的语法：Java中除了基本数据类型以外都是引用数据类型（包括自己定义的类）。引用类型和C里面的指针也不一样。这题里直接`ListNode node=node.next`是不行的，node这个名字指向了node.next，但是存储空间没有变，也就是原来node的地方，还是node，而不会替换成node.next。如果用C++的指针，定义为`ListNode *node`，可以写成：`*node=node->next;`

## [876. 链表的中间结点](https://leetcode-cn.com/problems/middle-of-the-linked-list/)

这里记一笔关于快慢指针之间差多少。我想到一个走1步，另一个走2步，但是没法确定是否快指针走到底，慢指针就在中间，这里我想错了，想成x+1和x+2的关系，事实上是x\*1和x\*2的关系，所以最后慢指针会停在中间。

# 中等

## [2. 两数相加](https://leetcode-cn.com/problems/add-two-numbers/)

Tips：

- 两个链表**长度可以不同**
- **移动l1和l2指针**的时候，也要记得判断是否为null
- 别忘了最后可能进位！（按位相加一定要记得进位，**特别是会多出来一位**）

## [24. 两两交换链表中的节点](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)

Tips：

- 经典递归

## [61. 旋转链表2](https://leetcode-cn.com/problems/rotate-list/)

Tips：

- 先计算长度，求出真正需要移动的k会比较省时，这样可以同时得到链表长度和真正需要移动的k次。（我一直在移动emm..）

## [142. 环形链表 II](https://leetcode-cn.com/problems/linked-list-cycle-ii/)

做过一次环形链表但这次遇到还是不懂，我来推导一遍过程！



# 困难

## [23. 合并K个升序链表](https://leetcode-cn.com/problems/merge-k-sorted-lists/)

Tips：

- **归并**（数组内归并）加递归
- 优先堆（这个还不是很懂，还要看看）

