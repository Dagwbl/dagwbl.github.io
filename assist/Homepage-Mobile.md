### **✔️ [Activity](Heatmap.md) & To-do**


```tasks
short mode
hide task count
not done
path includes assist
```

`button-new-article` `button-new-note`  `button-new-letter`

 `button-new-poem`  `button-new-diary`   `button-record-now` 
 
 `button-new-todo` `button-jump-1note`

**Sync to OSS:** `button-sync` 

### 📝 **Draft Box**
```dataview
table without id
    link(file.path, replace(replace(file.name, ".en", ""),"*.zh","")) AS "File",
    title AS "Title",
    dateformat(date, "yyyy-MM-dd") AS "Date"
from "content"
where draft=true and !contains(file.name, "index")
sort date desc
limit 10
```


### **📁 Article Box**
```dataview
table without id
	link(file.path) AS "File",
	title AS "Title",
	dateformat(date, "yyyy-MM-dd") AS "Date"
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

const container = dv.container;
container.style.overflowX = "hidden";


// 展示信息
dv.paragraph(result);


```

### 🅰️ Shortcuts

```button
name 📃 Article
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
name 🪁 Poem
type command
action QuickAdd: New Poem
```
^button-new-poem

```button
name 🔃 Sync
type command
action QuickAdd: Sync Vault
```
^button-sync

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

