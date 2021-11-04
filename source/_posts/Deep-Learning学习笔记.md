---
title: Deep Learning学习笔记-1
date: 2020-07-29 16:17:07
categories: 学习Learning
---

还没拿到学校的录取通知书，学校先开了暑期班的课程。选了深度学习和智能计算基础。先记个DL里PyTorch的操作。

<!--more-->

## PyTorch的基本操作使用

在PyTorch中，基本的数据类型是Tensor（类似于Numpy中的Array）。Tensor除了存储和变换数据等基本功能外，还提供了GPU计算和自动求梯度等功能。

### 创建Tensor

1. torch.empty(): 创建一个未初始化的Tensor
2. torch.rand()/torch.randn():创建一个随机数的Tensor。rand的随机数从均匀分布，randn的随机数从标准正态分布。
3. torch.normal(mean,std)/torch.uniform(from, to):正态分布/均匀分布
3. torch.ones():创建一个都是1的Tensor
4. torch.zeros():创建一个都是0的Tensor
5. torch.tensor():直接赋值创建
6. torch.randn_like(tensor):创建size和其他类型都同tensor的Tensor
7. tensor.new_ones():创建一个都是1的Tensor，并且数据类型和设备等都同tensor
8. tensor.arange(s, e, step): s到e(不包括e)，步长为e
9. tensor.linspace(s, e, steps):s到e（包括e），均匀分成e-1段
```python
b = torch.arange(1, 7, 2)
c = torch.linspace(1, 7, 2)
d = torch.linspace(1, 7, 4)
print(b)
print(c)

# output
# tensor([1, 3, 5])
# tensor([1., 7.])
# tensor([1., 3., 5., 7.])
```

###  算术操作

三种方法：
1. 直接使用运算符
2. torch.add()函数
3. Tensor.add_()函数

```python
a = torch.ones(2,3)
b = torch.ones(2,3)
print(a + b)
print(torch.add(a, b))
a.add_(b) # 类似于add_的操作，称为原地操作。原地操作的函数名都带个_
print(a)

'''
output
tensor([[2., 2., 2.],
        [2., 2., 2.]])
tensor([[2., 2., 2.],
        [2., 2., 2.]])
tensor([[2., 2., 2.],
        [2., 2., 2.]])
'''
```

### 选择Tensor的一部分

#### 索引

Attention: 索引提取的部分张量与原张量共享内存（即一个变了，另一个也变了）

```python
print(x)
y = x[0, :]
print(y)
y += 1
print(x)
x += 1 
print(y)

'''
output
tensor([[6, 6, 4],
        [2, 2, 5]])
tensor([6, 6, 4])
tensor([[7, 7, 5],
        [2, 2, 5]])
tensor([8, 8, 6])
'''
```

#### 选择函数

torch.index_select(input, dim, index)
Tensor.index_select(dim, index)
input：输入Tensor
dim：选择维度，0为选择行，1为选择列
index：Tensor类型的行向量，表示选择的范围

torch.gather(input, dim, index)
Tensor.gather(input, dim, index)
```python
y = torch.tensor([[0.1205, 0.1205, 0.1205],
                  [0.6966, 0.6966, 0.6966]])
index = torch.tensor([[0, 0, 0], 
                      [0, 0, 0]])
z = y.gather(1, index)
print(z)

'''
output
tensor([[0.1205, 0.1205, 0.1205],
        [0.6966, 0.6966, 0.6966]])
'''
```

### 改变形状

view()
共享内存。（就跟它函数名一样，他只是给了你一个不同的视角来看数组而已。）

reshape()
view()函数只能对连续存储的tensor进行操作。reshape在能进行view()的时候，返回view（即共享内存）；在不能进行view()的时候（对tensor进行），即存储空间不连续（如，y=x.permute(*dims)），返回一个新的副本。
因此reshape()不能保证得到的是一个副本。

为了得到真正的新副本（不共享内存），如果连续存储则先进行clone再使用view，如果不连续就用reshape()。

### 广播机制

对形状不同的tensor按元素运算时，会触发广播机制(broadcasting)。

```python
a = torch.arange(1, 3).view(1, 2)
b = torch.arange(2, 5).view(3, 1)

print(a)
print(b)
print(a+b)

'''
output
tensor([[1, 2]])
tensor([[2],
        [3],
        [4]])
tensor([[3, 4],
        [4, 5],
        [5, 6]])
'''
```

### array与tensor的相互转换

#### array->tensor

torch.from_numpy(array) （PS. 共享内存）

torch.tensor(array) （PS. 数据拷贝，不共享内存）

#### tansor->array

Tensor.numpy() （PS. 共享内存）

### 转移数据位置

```python
if torch.cuda.is_available():
    device = torch.device("cuda")
    tensor.to(device)

```


## 其他

> ```x = x + 1```与```x += 1```的区别

在学习view()共享内存的时候发现。
前者其实是创建了一个新的对象x，并进行赋值。而后者是在原先的x上进行+1操作。