---
title: "一团乱麻"
date: "2022-04-27T10:23:27Z"
slug: "65"
tags: []
---
## 捋捋

今天似乎又捋不清了，该做什么，优先做什么，乱糟糟的。

要做的事情依旧很多，而且每样都需要花费很多时间。

梳理一下吧

- 还有3篇没有写完的论文
- PHP接口开发没有完成
- 相应客户端也没有写完
- 物端单元盒的整合设计
  - PCB设计
  - 外壳模型设计及制作
- 专利撰写

目前的主要任务就这些，专利比较简单一些，留在周末做吧，那么今天就写接口。一天想做很多往往是啥都没有干成。

## VBA批量修改字体格式

```vba
Sub ChangeTextFont()
 Set pages = ActivePresentation.Slides.Range
 pageCount = pages.Count

 '第一页和最后一页跳过
 For i = 2 To pageCount - 1
  DoEvents
  ActiveWindow.View.GotoSlide Index:=i
  shapeCount = ActiveWindow.Selection.SlideRange.Shapes.Count

  For j = 1 To shapeCount
   ActiveWindow.Selection.SlideRange.Shapes(j).Select
   shapeType = ActiveWindow.Selection.SlideRange.Shapes(j).Type

   '1  - 自选图形
   '7  - 公式
   '13 - 图片
   '14 - 占位符
   '15 - 艺术字
   '17 - 文本框
   '19 - 表格
   'Debug.Print shapeType
   Select Case shapeType
   Case 1, 14, 17
    Set txtRange = ActiveWindow.Selection.ShapeRange.TextFrame.TextRange
    txtRange.Select

    If txtRange.Text <> "" Then
     '设置字体为宋体, 24号
     With txtRange.Font
      .Name = "宋体"
      .Size = 24
     End With

     '设置段落格式为1.3倍行距
     With txtRange.ParagraphFormat
      .SpaceWithin = 1.3
     End With
    End If
   Case 7, 13, 15
   Case 19
   End Select
  Next j
 Next i
End Sub

```
