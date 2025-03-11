### **✔️ Diary & To-do**

```dataview
CALENDAR date
FROM "content/diary" 
WHERE date OR categories = "diary"
```
```tasks
short mode
hide task count
not done
path includes assist
```

**Record:** `button-record-now` `button-new-todo` `button-jump-1note`

**New:** `button-new-article` `button-new-note`  `button-new-letter`
 `button-new-diary`  

**Sync to GitHub:** `button-push`  `button-pull` `button-hugo-server`

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
limit 15
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
const noteNum = dv.pages('"content/posts/note"').filter(p => !p.draft).length;
const diaryNum = dv.pages('"content/diary"').filter(p => !p.draft).length;
const letterNum = dv.pages('"content/letter"').filter(p => !p.draft).length;

// 计算草稿数量
const articleDraftNum = dv.pages('"content/posts"').filter(p => p.draft).length;
const noteDraftNum = dv.pages('"content/posts/note"').filter(p => p.draft).length;
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

let result = "";
result += "| Type  | " + la[0] + " | " + la[2] + " | " + la[3] + " | " + la[4] + " | " + la[5] + " |\n";
result += "| --- | :-: | :-: | :-: | :-: | :-: |\n";
result += `| Published | ${da[0]} | ${da[2]} | ${da[3]} | ${da[4]} | ${da[5]} |\n`;
result += `| Draft | ${da[1]} | ${da[6]} | ${da[7]} | ${da[8]} | ${da[9]} |\n`;

// 展示信息
dv.paragraph(result);


```

### 🅰️ Shortcuts

```button
name 📃Article
type command
action QuickAdd: New Article
```
^button-new-article

```button
name 📓 Diary
type command
action QuickAdd: New Diary
```
^button-new-diary

```button
name 🗒️ Note
type command
action QuickAdd: New Note
```
^button-new-note

```button
name ✉️ Letter
type command
action QuickAdd: New Letter
```
^button-new-letter

```button
name 🆙 Push
type command
action QuickAdd: Push
```
^button-push

```button
name 🔃 Pull
type command
action QuickAdd: Pull
```
^button-pull

```button
name 🕣 Now
type command
action QuickAdd: Add a Record to Diary
```
^button-record-now

```button
name ☑️ To-do
type command
action QuickAdd: Add a To-do
```
^button-new-todo

```button
name 📤 Jump 1note
type command
action QuickAdd: Jump 1note
```
^button-jump-1note

```button
name 💻 Hugo Server
type command
action QuickAdd: Hugo Server
```
^button-hugo-server





