### **✔️ Diary & To-do**
```dataview
CALENDAR file.ctime
from "content/diary"
```
```dataview
task
from "content"
where !completed
limit 10
```

**New:** `button-new-article`  `button-new-note`   `button-new-diary`    `button-new-letter`

**Sync to GitHub:** `button-push`     `button-pull`

### 📝 **Draft Box**
```dataview
table title AS "Title",date AS "Time"
from "content"
where draft=true
sort date desc
limit 10
```


### **📁 Article Box**
```dataview
table title AS "Title",date AS "Time"
from "content"
where draft=false
sort date desc
limit 10
```

### **📈 Statistics**
```dataviewjs
let la = ["Published", "Draft", "Article", "Note", "Diary", "Letter"];
let da = [];

// 计算非草稿数量
const notDraftPage = dv.pages('"content"').filter(p => !p.draft).length;
// 计算草稿数量
const draftPage = dv.pages('"content"').filter(p => p.draft).length;
const articleNum = dv.pages('"content/posts"').filter(p => !p.draft).length;
const noteNum = dv.pages('"content/posts/learn"').filter(p => !p.draft).length;
const diaryNum = dv.pages('"content/diary"').filter(p => !p.draft).length;
const letterNum = dv.pages('"content/letter"').filter(p => !p.draft).length;

// 计算草稿数量
const articleDraftNum = dv.pages('"content/posts"').filter(p => p.draft).length;
const noteDraftNum = dv.pages('"content/posts/learn"').filter(p => p.draft).length;
const diaryDraftNum = dv.pages('"content/diary"').filter(p => p.draft).length;
const letterDraftNum = dv.pages('"content/letter"').filter(p => p.draft).length;

da[0] = notDraftPage;
da[1] = draftPage;
da[2] = articleNum;
da[3] = noteNum;
da[4] = diaryNum;
da[5] = letterNum;
// 记录对应草稿数量
da[6] = articleDraftNum;
da[7] = noteDraftNum;
da[8] = diaryDraftNum;
da[9] = letterDraftNum;

// 对应打印la和da
let result = "";
result += "| Type | Published | Draft |\n";
result += "| --- | --- | --- |\n";
result += `| ${la[0]} | ${da[0]} | ${da[1]} |\n`;
result += `| ${la[2]} | ${da[2]} | ${da[6]} |\n`;
result += `| ${la[3]} | ${da[3]} | ${da[7]} |\n`;
result += `| ${la[4]} | ${da[4]} | ${da[8]} |\n`;
result += `| ${la[5]} | ${da[5]} | ${da[9]} |\n`;

// 展示信息
dv.paragraph(result);


```



### 🅰️ Shortcuts

```button
name 📃Article
type command
action QuickAdd: New Article (Without Hugo)
color blue
```
^button-new-article

```button
name 📓 Diary
type command
action QuickAdd: New Diary
color green
```
^button-new-diary

```button
name 🗒️ Note
type command
action QuickAdd: New Note
color AliceBlue
```
^button-new-note

```button
name 💌 Letter
type command
action QuickAdd: New Letter
customColor #F54545
customTextColor #000
```
^button-new-letter

```button
name 🆙 Push
type command
action QuickAdd: Push
color purple
```
^button-push

```button
name 🔃 Pull
type command
action QuickAdd: Pull
color yellow
```
^button-pull