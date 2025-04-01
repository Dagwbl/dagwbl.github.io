---
title: "[VBA] 取消EXCEL所有sheet隐藏行列和筛选状态"
date: "2022-05-15T22:52:00Z"
slug: "72"
tags: []
---
```vb
Sub Macro1()
'
' Macro1 Macro
'

'
    Dim c, i As Integer

    Dim s As String

    c = Worksheets.Count

    For i = 1 To c

    s = s & Worksheets(i).Name & Chr(13)

    Worksheets(i).Select
    Selection.AutoFilter
    Cells.Select
    Selection.EntireRow.Hidden = False
    Selection.EntireColumn.Hidden = False
    Next

    MsgBox "已经取消所有筛选和隐藏状态"

End Sub

```
