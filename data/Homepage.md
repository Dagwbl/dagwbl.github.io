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
labels: ["未发布","已发布"]
series:
    - title: none
      data: [${da}]
width: 50%
legendPosition: left
labelColors: true
\`\`\`
`);
```

`button-new`     `button-push`     `button-pull`

#### Draft Box
```dataview
table title AS "标题",date AS "创建时间"
from "content/posts"
where draft=true
sort date desc
```
### Published

### Shortcuts
```dataview
table title AS "标题",date AS "创建时间"
from "content/posts"
where draft=false
sort date desc
```

```button
name 🆕 New Article
type command
action QuickAdd: New Article (Without Hugo)
color blue
```
^button-new

```button
name 🆙 Publish
type command
action Obsidian Git: Push
color purple
```
^button-push

```button
name 🔃 Pull
type command
action Obsidian Git: Pull
color yellow
```
^button-pull