---
title: "用MouseInc或者ImTip结合沙拉查词快速翻译"
date: "2022-10-26T20:14:32Z"
slug: "121"
tags: []
---
有时候经常会需要进行中文和英文之间的互相翻译，个人电脑里面的翻译工具只有欧陆词典和沙拉查词插件。  

欧陆词典在启动的时候总给人一种迟滞感觉，用起来感觉有些难受；在浏览器里面结合沙拉查词就用的特别舒心了，虽然沙拉查词插件可以通过读取剪贴板结合全局快捷键（我设置的是`ALT+T`）来进行查词，但每次都要多按一下 `CTRL+C`，感觉很不方便。

  ![image-20221026195957505](https://dagwbl.oss-cn-chengdu.aliyuncs.com/picture/obsidian/image-20221026195957505.png)

在官方教程里面有结合quick、UTools等工具进行快捷查词，但毕竟要多安装一个软件，这俩软件我很久之前都尝试过，功能很丰富，自定义也很好，但个人就是不喜欢。
后来尝试了AutoHotKey，但还是需要多运行一个软件，不喜欢。



然后看了看自己的任务栏图标

![image-20221026193940313](https://dagwbl.oss-cn-chengdu.aliyuncs.com/picture/obsidian/image-20221026193940313.png)



发现MouseInc和ImTip都提供很强的热键拓展能力，于是乎便可以方便的利用它们俩来完成我需要的功能。

# MouseInc

这是一个鼠标手势软件，用习惯了就回不去了，相关手册在这儿 [MouseInc 手册 (shuax.com)](https://docs.shuax.com/MouseInc/#/)

直接说怎么配置的吧，我把内置的百度搜索手势 `S` 改为了沙拉查词的快捷方式。

![image-20221026194425643](https://dagwbl.oss-cn-chengdu.aliyuncs.com/picture/obsidian/image-20221026194425643.png)

这样就好了，接下来看看效果演示

![GIF 2022-10-26 20-12-59](https://dagwbl.oss-cn-chengdu.aliyuncs.com/picture/obsidian/GIF%202022-10-26%2020-12-59.gif)

# ImTip

这是个输入法指示器，因为种种原因平时经常在中文输入于英文输入之间切换，个人平时习惯隐藏任务栏，因此不能够及时的得知当前输入法是中文还是英文，是全角还是半角，ImTip很好的解决了我这个问题，上面动图中跟随光标出现的小浮窗就是这个软件。

软件说明在这儿：[ImTip( 输入法状态跟踪提示 ) - 官网 (aardio.com)](https://imtip.aardio.com/)

ImTip提供了超级热键的功能，同样可以做到省略复制的过程快速查词。

只需要启用超级热键同时添加以下配置即可

```c
//沙拉查词快捷键
["Alt+T"]  = function(hFocus){  
	key.up("ALT");
	key.combine("CTRL","C"); //复制
	//key.up("CTRL");
	key.combine("ALT","T"); //查词

};
```

这下 `ALT+T`便能够直接查词了。



之前老牛键盘坏了其实也可以用这个方法，用热键映射达到屏蔽的目的。
