
```contributionGraph
title: Contributions
graphType: default
dateRangeValue: 360
dateRangeType: LATEST_DAYS
startOfWeek: 0
showCellRuleIndicators: true
titleStyle:
  textAlign: left
  fontSize: 15px
  fontWeight: normal
dataSource:
  type: PAGE
  value: ""
  dateField: {}
fillTheScreen: false
enableMainContainerShadow: false
cellStyleRules:
  - id: Ocean_a
    color: "#8dd1e2"
    min: 1
    max: 2
  - id: Ocean_b
    color: "#63a1be"
    min: 2
    max: 3
  - id: Ocean_c
    color: "#376d93"
    min: 3
    max: 5
  - id: Ocean_d
    color: "#012f60"
    min: 5
    max: 9999

```

```dataviewjs
dv.span("**✨ Daily Rating**") /* optional ⏹️💤⚡⚠🧩↑↓⏳📔💾📁📝🔄📝🔀⌨️🕸️📅🔍✨ */
const calendarData = {
    year: 2025,  // (可选) 默认为当前年份
    colors: {    // (可选) 默认为绿色
        green:       ["#c6e48b", "#7bc96f", "#49af5d", "#2e8840", "#196127"],
        blue:        ["#8cb9ff", "#69a3ff", "#428bff", "#1872ff", "#0058e2"], // 如果提供了第一个条目，则将其视为默认值
        red:         ["#ff9e82", "#ff7b55", "#ff4d1a", "#e73400", "#bd2a00"],
        orange:      ["#ffa244", "#fd7f00", "#dd6f00", "#bf6000", "#9b4e00"],
        pink:        ["#ff96cb", "#ff70b8", "#ff3a9d", "#ee0077", "#c30062"],
        orangeToRed: ["#ffdf04", "#ffbe04", "#ff9a03", "#ff6d02", "#ff2c01"]
    },
    showCurrentDayBorder: false, // (可选) 默认为true
    defaultEntryIntensity: 4,   // (可选) 默认为4
    intensityScaleStart: 0,    // (可选) 默认为传递给entries.intensity的最低值
    intensityScaleEnd: 5,     // (可选) 默认为传递给entries.intensity的最高值
    entries: [],                // (必填) 在下面的DataviewJS循环中填充
}

//DataviewJS循环
for (let page of dv.pages('"content/diary"').where(p => p.rating)) {
    //dv.span("<br>" + page.file.name) // 用于故障排除时取消注释
    calendarData.entries.push({
        date: page.file.name,     // (必填) 格式为YYYY-MM-DD
        intensity: page.rating, // (必填) 您要跟踪的数据，将自动映射颜色强度
        //content: "🏋️",           // (可选) 在日期单元格中添加文本
        color: "green",          // (可选) 从*calendarData.colors*引用。如果未提供颜色，则使用colors[0]
    })
}

renderHeatmapCalendar(this.container, calendarData)
```

```dataviewjs
dv.span("**📱 Screen Time**") /* optional ⏹️💤⚡⚠🧩↑↓⏳📔💾📁📝🔄📝🔀⌨️🕸️📅🔍✨ */
const calendarData = {
    year: 2025,  // (可选) 默认为当前年份
    colors: {    // (可选) 默认为绿色
        green:       ["#c6e48b", "#7bc96f", "#49af5d", "#2e8840", "#196127"],
        blue:        ["#8cb9ff", "#69a3ff", "#428bff", "#1872ff", "#0058e2"], // 如果提供了第一个条目，则将其视为默认值
        red:         ["#ff9e82", "#ff7b55", "#ff4d1a", "#e73400", "#bd2a00"],
        orange:      ["#ffa244", "#fd7f00", "#dd6f00", "#bf6000", "#9b4e00"],
        pink:        ["#ff96cb", "#ff70b8", "#ff3a9d", "#ee0077", "#c30062"],
        orangeToRed: ["#ffdf04", "#ffbe04", "#ff9a03", "#ff6d02", "#ff2c01"]
    },
    showCurrentDayBorder: false, // (可选) 默认为true
    defaultEntryIntensity: 4,   // (可选) 默认为4
    intensityScaleStart: 0,    // (可选) 默认为传递给entries.intensity的最低值
    intensityScaleEnd: 500,     // (可选) 默认为传递给entries.intensity的最高值
    entries: [],                // (必填) 在下面的DataviewJS循环中填充
}

//DataviewJS循环
for (let page of dv.pages('"content/diary"').where(p => p.stime)) {
    //dv.span("<br>" + page.file.name) // 用于故障排除时取消注释
    calendarData.entries.push({
        date: page.file.name,     // (必填) 格式为YYYY-MM-DD
        intensity: page.stime, // (必填) 您要跟踪的数据，将自动映射颜色强度
        //content: "🏋️",           // (可选) 在日期单元格中添加文本
        color: "orangeToRed",          // (可选) 从*calendarData.colors*引用。如果未提供颜色，则使用colors[0]
    })
}

renderHeatmapCalendar(this.container, calendarData)
```

```dataviewjs
dv.span("**🏂 Release status**") /* optional ⏹️💤⚡⚠🧩↑↓⏳📔💾📁📝🔄📝🔀⌨️🕸️📅🔍✨ */
const calendarData = {
    year: 2025,  // (可选) 默认为当前年份
    colors: {    // (可选) 默认为绿色
        green:       ["#c6e48b", "#7bc96f", "#49af5d", "#2e8840", "#196127"],
        blue:        ["#8cb9ff", "#69a3ff", "#428bff", "#1872ff", "#0058e2"], // 如果提供了第一个条目，则将其视为默认值
        red:         ["#ff9e82", "#ff7b55", "#ff4d1a", "#e73400", "#bd2a00"],
        orange:      ["#ffa244", "#fd7f00", "#dd6f00", "#bf6000", "#9b4e00"],
        pink:        ["#ff96cb", "#ff70b8", "#ff3a9d", "#ee0077", "#c30062"],
        orangeToRed: ["#ffdf04", "#ffbe04", "#ff9a03", "#ff6d02", "#ff2c01"]
    },
    showCurrentDayBorder: false, // (可选) 默认为true
    defaultEntryIntensity: 4,   // (可选) 默认为4
    intensityScaleStart: -2,    // (可选) 默认为传递给entries.intensity的最低值
    intensityScaleEnd: 2,     // (可选) 默认为传递给entries.intensity的最高值
    entries: [],                // (必填) 在下面的DataviewJS循环中填充
}

//DataviewJS循环
for (let page of dv.pages('"content/diary"').where(p => p.release)) {
    //dv.span("<br>" + page.file.name) // 用于故障排除时取消注释
    calendarData.entries.push({
        date: page.file.name,     // (必填) 格式为YYYY-MM-DD
        intensity: page.release, // (必填) 您要跟踪的数据，将自动映射颜色强度
        //content: "🏋️",           // (可选) 在日期单元格中添加文本
        color: "pink",          // (可选) 从*calendarData.colors*引用。如果未提供颜色，则使用colors[0]
    })
}

renderHeatmapCalendar(this.container, calendarData)
```
