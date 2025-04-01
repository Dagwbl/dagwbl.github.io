---
title: "网站和数据库突然莫名奇妙出了问题"
date: "2022-07-07T11:54:45Z"
slug: "88"
tags: []
---
从发现问题到现在折腾了好久，一直没有找到问题的根源所在，下面是临时使用的方案，下次再出问题，全部重新更换系统和数据库了。
```bash
./mysqld_safe --user=root --basedir=/usr/local/lighthouse/softwares/mariadb/data --datadir=/usr/local/lighthouse/softwares/mariadb/data
```
