---
title: Java核心技术卷1笔记-1
date: 2021-11-30 21:57:26
categories: Java
---

# String

- String变量既可以存放空串，也可以存放null。区分两者，空串是一个对象，有长度（0）和内容（空）。检查时，先检查是否为空，再检查长度是否为0.

## String的长度

String的长度涉及到码点与码元。以下对比几种方法：

- String.length()与String.codePointCount()：str.length()返回字符串str的码元数量，str.codePointCount(0, str.length())返回字符串str的码字数量。
- String.charAt()与String.codePointAt()：str.charAt(n)返回字符串str的码元；获取码字需要和String.offsetByCodePoints()配合使用，`int index = str.offsetByCodePoints(n); int cp = str.codePointAt(index)`，注意是返回int。

之所以会有区别，是因为辅助字符是有两个码元的。

遍历字符串码元的方法：codePoints()；判断一个码点是否为辅助字符：isSupplementaryCodePoint(int codePoint)；判断一个码元是否对应辅助字符的码元：isSurrogate(char)

## 输入输出

输入Scanner不多说，在输密码需要不显示的时候可以用console.readPassword()

### 格式化输出printf

**输出数字**

`%8.2f`：8表示宽度，.2表示小数，f是转换符

在%之后可以加入标志（控制输出格式，如对齐方式、分组分隔符等）

`%,+.2f`：,表示分组（如1000写作1,000），+表示输出正负号

**输出日期**

以t开头，后跟转换符

`%tc`：输出完整的时间如`周二 11月 30 20:48:29 CST 2021`

可以对同一个Date对象操作，输出时需要指出被格式化的参数索引，有两种写法。<是一种标志，表示格式化前一个的数值。

```java
System.out.printf("%tB %<te, %<tY", new Date());
System.out.printf("%1$tB %1$te, %1$tY", new Date());
```

PS：输出日期有java.text.SimpleDateFormat，可以方便表示。[java 日期格式化-- SimpleDateFormat 的使用](https://blog.csdn.net/qq_27093465/article/details/53034427)

### 文件输入输出

```java
Scanner scanner = new Scanner(Paths.get("input.txt"), StandardCharsets.UTF_8);
PrintWriter printWriter = new PrintWriter("output.txt", StandardCharsets.UTF_8);
```

# 数组

- 直接new一个数组：数字数组初始化为0，boolean数组初始化为false，对象数组初始化为null。

- 数组创建后不能改变大小，ArrayList可以改变大小。

**数组初始化**方法：

```java
int[] a = new int[] {1,2,3};	// new int[] {1,2,3}是匿名数组

int[] b = {1, 2, 3};

int[] c = new int[3];
for(int i=0;i<3;i++)
    c[i] = i+1;
```

**数组拷贝**

记住，数组是引用类型，除了基本数据类型（整型，浮点型，布尔型，字符型）都是引用类型

```java
int[] a = new int[] {1,2,3};
int[] b = a;	// b和a指向同一个数组
b[0]=5;			// 此时a[0]也为5
```

如果要复制到一个新数组应该是这样：

```java
int[] a = new int[] {1,2,3};
int[] b = Array.copyOf(a, a.length);
//可以用来增加数组长度
a = Array.copyOf(a, a.length*2);	//多余的地方填0
//Array.copyOfRange(a, 0, a.length*2);
```

**数组排序**：Array.sort(a);

**二维数组（多维数组）**

- Java中的二维数组，如`a[10][10]`，a是包含10个元素的数组，而其中每个元素又是包含10个元素的数组。我认为正是这个特性，使得Java可以定义不规则的二维数组，即`a[10][]`，其中每一行上的数组大小可以不同。C++中也有这种定义方式，不过会自动补全为0.

```java
int[][] a = new int[10][];
for(int i=0;i<10;i++)
    a[i] = new int[i+1];
System.out.println(a[0][0]);	// 输出a[0][1]就会报数组越界的错误
```



# 其他

## 大数值

BigInteger和BigDecimal可以处理任意精读的运算。但是不能用+*符号，只能用类的静态方法来实现。

转换方法：`BigInteger big = BigInteger.valueOf(2);`



## 关于编码、码元、码字等：

一个有效的 Unicode 字符的二进制代码值被称作一个码点，也就是一个字符意味着一个码点。

[**Unicode_and_Character_Sets**](https://github.com/acmerfight/insight_python/blob/master/Unicode_and_Character_Sets.md)

[**java——char类型、码点和代码单元详解**](https://blog.csdn.net/so_geili/article/details/105477780)

