---
title: '0320'
date: '2022-03-20T22:44:14Z'
slug: '37'
tags: [thesis]
categories:
  - typecho
  - diary
---
### Day planner

The especially things I have to do today have the following

- [x] 背单词
- [x] 开发api

### Today’s footprints and insights

今天想到绝妙的将简单的api转换为从数据库调用并进行控制的方法，明天只要让esp通过网页读取到数据库中的命令即可。
![image-20220320224303583](https://gitee.com/Dagwbl/cloudPicture/raw/master/typora/image-20220320224303583.png)

```php
$sql = "SELECT sensorid,switch,cmd FROM switches where sensorid = 4";

if ($result = $conn->query($sql)) {
    while ($row = $result->fetch_assoc()) {
        $row_sensorid = $row["sensorid"];
        $row_switch = $row["switch"];
        $row_cmd = $row["cmd"];
        if ($row["cmd"]==0){
            $switch_status="off";
        }
        else{
            $switch_status="on";
        }
        echo "The switch: (".$row_switch.") at the coordinate: (".$row_sensorid.") current status is ".$switch_status.".\\n";
    }
    $result->free();
}
else{
    echo "\\n No corresponding switch was found!\\n";
}

$conn->close();
```
