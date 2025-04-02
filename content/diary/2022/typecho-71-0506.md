---
title: '0506'
date: '2022-05-06T22:15:00Z'
slug: '71'
tags: []
categories:
  - typecho
  - diary
---
# Footprints and Insights

php接口开发所有的增删改查已经基本完成，接下来需要对接客户端，另外，打火机已经买回来了，对热电偶进行实验已经可以采集到初步的数据了。

### 梳理一下

 > 1. 客户端开发
 > 2. 热电偶采集数据
 > 3. 专利撰写

今天碰到一个坑，就是在烧录程序的时候，需要断开，是因为GPIO0烧录的时候需要拉低

> For instance, the D3 pin of NodeMCU V1 connects to the GPIO0 of ESP8266. This strapping pin decides the mode on reset - download mode is entered if pulled low. I see you are connecting RX from GPS to this pin.

### 刷写固件的代码剪藏


```shell
python -m esptool --port COM4 erase_flash
python -m esptool --port COM4   --baud 115200 write_flash --flash_size=detect -fm dio 0  E:\\Downloads\\esp8266-20220117-v1.18.bin
```

### 关于ADC

#### 分辨率

10位分辨率的ADC，也就是$2^{10}$ ,可以获得介于0到1023之间的值。

#### 输入电压

如果使用**裸芯片**，ESP8266 ADC 引脚输入电压范围为 0 至 1V。但是，ESP8266 **开发板**都配有内部分压器，因此输入范围为 0 至 3.3V。

- ESP8266 开发板中的 ADC 电压范围：0 至 3.3V（例如：ESP8266 12-E NodeMCU 套件、WeMos D1 Mini、...）
- ESP8266 芯片中的ADC电压范围：0至1V（例如：ESP-07芯片、ESP-12E芯片等）

#### 计算公式

$$
T=adc \\frac {3.3}{1024}
$$

#### 误差

通过万用表测量实际电压，得到电压为3.22，因此上述公式修正为
$$
T=adc \\frac {3.3^2}{1024\\times3.22}
$$


### 记录一个错误

在使用urequest向本地服务器post一个请求的时候，如果使用localhost则会抛出错误。

```shell
[Errno 103] ECONNABORTED
```

换成具体局域网ip后，错误解决。

今天还发现了一个萤火虫，难得，另外今天参加了一个五四表彰会，今天又少了一个小时。
