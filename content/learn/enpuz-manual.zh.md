---
title: "ENPUZ User Manual"
date: 2024-03-26
series: ["English learning"]
categories: ["English learning"]
tags: [reading, writing, enpuz]
language: [zh]
showToc: false
TocOpen: true
draft: false
math: false
hidemeta: false
comments: false
description: "Some notes about English writing."
canonicalURL: "https://canonical.url/to/page"
disableHLJS: true # to disable highlightjs
disableShare: false
disableHLJS: false
hideSummary: false
searchHidden: true
ShowReadingTime: true
ShowBreadCrumbs: true
ShowPostNavLinks: true
ShowWordCount: true
ShowRssButtonInSectionTermList: true
UseHugoToc: true

---

[使用说明 v2.1.0 - Enpuz](https://enpuz.com/article/user-manual)

### 限定词

#### ■绝大多数单数可数名词前需要添加 a/an/the 等限定词。

限定词在英语句子中起着至关重要的作用。

删除限定词将大大降低句子流畅度，同时影响分析效果。

```
I love dog. ❎
I love the dog. ✅
We find thing. ❎
We find this thing. ✅
We find things. ✅
```

常见的限定词有: a、an、the、this、that、these、those、such、my、your、Tom's、few、little、no、every、other、each、some、any、all、one、two 等

### 标点符号

#### ■建议不要在完整的人名、地名、时间中插入逗号

#### ■连词前通常需要添加逗号，让句子错顿优雅，避免超长单句

#### ■句尾标点符号需与句式相匹配

疑问句不能使用句号（.）或感叹号（!）结尾，需使用问号（?），或可直接省略后交由 Enpuz 自动判断。

### 主谓一致

#### ■主语与谓语动词需要保持人称与数上的一致

```
A boy go swimming every day. ❎
A boy goes swimming every day. ✅
Chinese people loves growing vegetables. ❎
Chinese people love growing vegetables. ✅
```

#### ■主语是并列名词时，谓语动词需要使用复数形式

```
A boy and a girl helps the farmers. ❎
A boy and a girl help the farmers. ✅
```

### 其它

#### ■确保每次分析一个完整的句子

#### ■暂不支持带破折号的句子的分析

破折号 (—) 的使用方式极其灵活，在缺少更多上下文信息的情况下，暂不支持分析。

●如果破折号引出的内容是一个完整的句子，可拆分成两个句子进行分析。
●如果破折号引出的内容是一个名词片段，可替换成冒号后进行分析。

用连接号 (-) 替代破折号将会引入完全错误的分析结果。

#### ■专有名词(如: 人名、地名)需首字母大写

使用规范的格式，可以让 Enpuz 自动识别未收录的专有名词，包括任意人名、地名及领域专有名词。

同时，也将大大降低歧义分析结果的出现概率。

`john`(人名 John)可同时表示 厕所; 盥洗室。
`bill`(人名 Bill)可同时表示 账单; 法案; 广告海报。

#### ■替换冷僻、自创或专业领域的复合名词为普通常用名词

如在中式英语环境中存在把 饭卡、就餐卡 翻译成`eating card` 的情况。

然而在大范围英语语料中，实际上是基本查询不到对这一“复合名词”的引用。

句子中出现这类短语将会较大地影响最后的分析结果。

在遵守主谓一致的前提下，可以根据实际情况将短语替换成：
`the thing`/`things`、`an apple`/`apples`、`the boy`/`the boys` 等简单名词(短语)。

## 分析图介绍

------

在 Enpuz, 当用户输入一个完整的句子后，可以快速获得该句子对应的成份结构分析图。

### 元素含义

分析图由块、画板、连线三种最基本的成份组成。

#### 单词、短语“块”

每个块中或包含一个完整的单词，或包含一个简单短语。

#### 画板

当多个块共同表述某一成份时，通常会放入一个画板中，即画板就是一个复杂的“块”，也可以被其它画板所包含。

#### 连线

块与画板之间，会使用不同样式的连线将他们关联。

#### 示例

##### 例 After that, what happened to the Amber Room remains a mystery.

Afterthat ,sthwhat happenedto the AmberRoom主句remainsa mystery .sth

块：remains、a mystery
画板：After that、what happened to the Amber Room

### 样式准则

Enpuz 句子分析图的样式包括字色、块色、画板背景色、边框类型、连线类型等。

随着句子复杂度的增加，分析图也将变得越来越复杂。

这个时候，只要把握不同样式所遵守的基本准则，就能快速轻松理解任意句子分析图所表达的含义。

#### ■样式准则一：从左向右

Enpuz 句子分析图也是从左向右展开，与句子阅读顺序保持一致。

#### ■样式准则二：颜色越深越重要

对主要成份、重要成份，着色会越鲜艳明亮，反之则会偏浅淡。

例如:

●主句中的核心动词、从句中的核心动词都以“蓝色”块表示，有所区别的是，前者为深蓝色，后者为浅蓝色。

●所有副词都表示在浅色虚线框中，以较淡的颜色暗示它的“辅助”作用。

#### ■样式准则三：无特殊样式则必有小标签

无样式凸显的块、画板，都会在其上方以小标签的方式指明其成份含义。

例如:

名词上方会标注 sth.。
