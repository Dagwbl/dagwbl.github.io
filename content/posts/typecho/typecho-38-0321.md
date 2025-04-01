---
title: "0321"
date: "2022-03-21T22:39:48Z"
slug: "38"
tags: []
---
## Day planner


The especially things I have to do today have the following

- [ ] 背单词
- [x] 继续完成api的编写

## Today’s footprints and insights

`**kwargs` 是严格的名称对应解包，具有特殊功能的函数一般考虑使用

```vb
Sub format()
'快速重排表格以方便导入数据库
Application.ScreenUpdating = False
Dim r1 As Integer
Dim r2 As Integer
Dim flag As Integer

Dim s1 As String
Dim s2 As String
Dim s3 As String

r2 = 1


For r1 = 4 To 2150
    If Mid(Sheet1.Cells(r1, 1).Value, 1, 4) = "学科门类" Then
        s1 = Sheet1.Cells(r1, 1).Value
        Sheet2.Cells(r2, 1).Value = s1

    ElseIf Not IsNumeric(Sheet1.Cells(r1, 1).Text) Then
        'MsgBox ("NOT numeric")
        Sheet2.Cells(r2, 1).Value = s1
        s2 = Sheet1.Cells(r1, 1).Value
        s3 = Sheet1.Cells(r1, 2).Value
        Sheet2.Cells(r2, 2).Value = s2
        Sheet2.Cells(r2, 3).Value = s3
    Else
        'MsgBox ("numeric")
        Sheet2.Cells(r2, 4).Value = Sheet1.Cells(r1, 1).Value
        Sheet2.Cells(r2, 5).Value = Sheet1.Cells(r1, 2).Value
        Sheet2.Cells(r2, 1).Value = s1
        Sheet2.Cells(r2, 2).Value = s2
        Sheet2.Cells(r2, 3).Value = s3
        r2 = r2 + 1
        End If
Next

Application.ScreenUpdating = True

End Sub

```

原始文件长这个样子

![image-20220321223108005](https://gitee.com/Dagwbl/cloudPicture/raw/master/typora/image-20220321223108005.png)

经过上述VBA代码处理后，就可以变成这个样子了

![image-20220321223231823](https://gitee.com/Dagwbl/cloudPicture/raw/master/typora/image-20220321223231823.png)

然后经过导入数据库，编写一个简单的php查询页面就可以向下面这样的一个网页app了

![image-20220321223500391](https://gitee.com/Dagwbl/cloudPicture/raw/master/typora/image-20220321223500391.png)

查询结果如下

![image-20220321223533676](https://gitee.com/Dagwbl/cloudPicture/raw/master/typora/image-20220321223533676.png)

还是挺好用的，后面得空部署到服务器上去，再顺便收集CSCD，和SCI的。

另外，今天还通过更改代码的方式解决了php file manager 中文编码乱码的问题

![image-20220321223836630](https://gitee.com/Dagwbl/cloudPicture/raw/master/typora/image-20220321223836630.png)

关键代码如下

```php
// input encoding for iconv
$iconv_input_encoding = 'UTF-8';
```

下班
