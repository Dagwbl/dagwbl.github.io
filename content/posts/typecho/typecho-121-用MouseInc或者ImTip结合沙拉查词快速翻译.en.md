---
title: Quick Translation with MouseInc or ImTip Combined with Saladict
date: '2022-10-26T20:14:32Z'
slug: '121'
tags: []
categories:
  - typecho
---

Sometimes, frequent translation between Chinese and English is necessary. The only translation tools on my personal computer are the Eudic dictionary and the Saladict browser extension.  

Eudic always feels sluggish when launching, making it a bit unpleasant to use. On the other hand, Saladict works seamlessly in the browser, providing a much smoother experience. Although Saladict supports clipboard reading with a global hotkey (I set mine to `ALT+T`), it still requires an extra `CTRL+C` press each time, which feels inconvenient.  

![image-20221026195957505](https://dagwbl.oss-cn-chengdu.aliyuncs.com/picture/obsidian/image-20221026195957505.png)  

The official tutorial suggests integrating Saladict with tools like Quicker or UTools for faster lookups. However, installing additional software isn’t ideal for me—I’ve tried both before, and while they offer rich customization, I simply don’t prefer them.  

Later, I experimented with AutoHotKey, but again, running an extra program wasn’t to my liking.  

Then, I glanced at my taskbar icons:  

![image-20221026193940313](https://dagwbl.oss-cn-chengdu.aliyuncs.com/picture/obsidian/image-20221026193940313.png)  

I noticed that both **MouseInc** and **ImTip** offer powerful hotkey customization, making them perfect for achieving what I needed.  

### **MouseInc**  

This is a mouse gesture tool—once you get used to it, there’s no going back. The documentation can be found here: [MouseInc Manual (shuax.com)](https://docs.shuax.com/MouseInc/#/).  

Here’s how I configured it: I replaced the built-in "Baidu Search" gesture (`S`) with a shortcut for Saladict.  

![image-20221026194425643](https://dagwbl.oss-cn-chengdu.aliyuncs.com/picture/obsidian/image-20221026194425643.png)  

That’s it! Here’s a demo of how it works:  

![GIF 2022-10-26 20-12-59](https://dagwbl.oss-cn-chengdu.aliyuncs.com/picture/obsidian/GIF%202022-10-26%2020-12-59.gif)  

### **ImTip**  

This is an input method indicator. Since I frequently switch between Chinese and English input—and I usually hide my taskbar—it’s hard to tell whether I’m in full-width or half-width mode. ImTip solves this problem perfectly. The small floating window following the cursor in the GIF above is from this tool.  

Documentation here: [ImTip (Input Method Tracker) - Official Site (aardio.com)](https://imtip.aardio.com/).  

ImTip also provides a "Super Hotkey" feature, allowing me to skip the copy step and look up words instantly.  

Just enable **Super Hotkey** and add the following configuration:  

```c
// Saladict Hotkey  
["Alt+T"] = function(hFocus){  
    key.up("ALT");  
    key.combine("CTRL","C"); // Copy  
    //key.up("CTRL");  
    key.combine("ALT","T"); // Look up  
};
```  

Now, pressing `ALT+T` directly triggers the translation lookup.

Actually, when Old Niu's keyboard broke before, this method could also have been used—achieving the blocking effect through hotkey mapping.
