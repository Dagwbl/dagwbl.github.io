---
title: "记录一下bug"
date: "2022-03-08T19:59:40Z"
slug: "29"
tags: []
---
在php中数据库插入错误，一般是sql语句中参数不正确，或者参数对应的类型不正确。

```php
$sql = "INSERT INTO SensorData (id, sensor, coords, value1, value2, value3) VALUES ('$id','$sensor', '$coords', '$value1', '$value2', '$value3')";
if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
```

另外在使用dht传感器的过程中，出现ETIMEOUT错误，一般是引脚插错，重新检查换用其他引脚，我这个板子目前只有1号引脚可以正常使用。
![2022-03-08T11:59:16.png][1]

  [1]: http://42.192.117.142/usr/uploads/2022/03/2857179748.png
