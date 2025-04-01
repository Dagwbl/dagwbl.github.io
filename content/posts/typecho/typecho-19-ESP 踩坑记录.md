---
title: ESP 踩坑记录
date: '2022-03-03T21:15:17Z'
slug: '19'
tags: []
categories:
  - typecho
---
![image-20220303201018944](https://gitee.com/Dagwbl/cloudPicture/raw/master/typora/image-20220303201018944.png)

烧写ESP32C3-mini-1 的时候，烧写起始地址应该从0x0000开始，否则一直报错，并且采用without usb 的固件

而烧写ESP32-D0WDQ6 的时候应该从0x1000开始。
