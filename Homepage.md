```dataview
task
from "content"
where !completed
limit 10
```
 
 `button-new-article`  `button-new-note`   `button-new-diary`    `button-new-letter`

**Sync to GitHub**: `button-push`     `button-pull`

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


### Published
```dataviewjs
let la = ["未发布","已发布"]
let da = []

const draftPage = dv.pages(`"content/posts"`).filter(p => p.draft).length
const notDraftPage = dv.pages(`"content/posts"`).filter(p => !p.draft).length

da[0] = notDraftPage
da[1] = draftPage

dv.paragraph(`
\`\`\`chart
type: pie
labels: ["已发布","未发布"]
series:
    - title: none
      data: [${da}]
width: 50%
legendPosition: left
labelColors: true
\`\`\`
`);
```
### Shortcuts

```button
name New Article
type command
action QuickAdd: New Article (Without Hugo)
color blue
```
^button-new-article

```button
name New Diary
type command
action QuickAdd: New Diary
color green
```
^button-new-diary

```button
name New Note
type command
action QuickAdd: New Note
color AliceBlue
```
^button-new-note

```button
name New Letter
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