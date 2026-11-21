# Contributing

Thank you for helping. This app tries to describe each church the way that church describes itself, using its own documents. Corrections from members of the traditions it covers are especially welcome.

## Ways to help

- **Report a mistake.** Open an issue using the **Correction** template. Say where it is (a link like `#John-3-16` or `#saints/francis` is perfect), what's wrong, and give a source. You don't need to know any code.
- **Change the content yourself.** Fork the repository, edit a file in `src/data/`, and open a pull request. Every file in there is plain text.
- **Improve the app.** Code changes go in `src/app.js`, `src/styles.css` and `src/index.html`.

## The source rule

Every claim about what a church teaches, and every date, canonization or Bible reference, needs a source.

- Prefer the church's own documents: its catechism, confession, articles of faith or official website.
- Wikipedia isn't enough on its own. If you start there, confirm the fact in an independent or primary source and cite that instead.
- When sources disagree, say so in the text rather than picking one.
- Describe each tradition fairly, in terms its own members would recognize. Avoid words a church wouldn't use for itself.

## Where things live

| File | What it holds |
|---|---|
| `src/data/traditions.js` | The 19 traditions and their summaries for each Compare topic |
| `src/data/topics.js` | The Compare topics |
| `src/data/passages.js` | Debated passages and how each church reads them |
| `src/data/sources.js` | Each church's official documents, and which sections back each topic |
| `src/data/saints.js` | Saints, with lives, feasts and canonization details |
| `src/data/lineage.js` | The genealogy of Jesus |
| `src/data/apostles.js` | The apostles' families |
| `src/data/angels.js` | Angels and demons named or ranked in Scripture and tradition |
| `src/data/parables.js` | Parables, for the Find tab |
| `src/data/other-books.js` | Books outside the Bible and where to read them |
| `src/data/church-tree.js` | The family tree of churches |
| `data/*.gz` | The Bible texts (built by the scripts in `tools/`; please don't edit by hand) |

Don't edit `index.html`, `sw.js` or the icons in the repository root. They're built from `src/`.

### Adding a debated passage

Add an entry to `src/data/passages.js`:

```js
{ref:"Romans 3:28", tags:"faith alone justification",
 r:[
  {who:"Lutheran", ids:["lutheran"], t:"Plain text describing the reading.",
   s:[["lutheran","ac","IV"]]},
  {who:"Catholic", ids:["catholic"], t:"...", s:[["catholic","ccc","¶¶1987–1995"]]}
 ]},
```

- `ref` must be a real verse, written like `John 3:16` or `John 3:16-18`. The app shows the text from the reader's chosen Bible.
- `ids` are the tradition ids: `catholic`, `eastcath`, `orthodox`, `ethiopian`, `coptic`, `armenian`, `lutheran`, `reformed`, `anabaptist`, `anglican`, `methodist`, `baptist`, `quaker`, `cofc`, `pentecostal`, `nondenom`, `sda`, `lds`, `jw`.
- `s` cites documents listed in `src/data/sources.js` as `[tradition, documentKey, "section"]`. Add the document there first if it's new.
- Write plain text only. HTML isn't allowed, and the check below rejects it.

## Check your change

You need Python 3 and Node.js.

```sh
python3 tools/build.py          # rebuild the website files from src/
node tests/validate.js          # check the content
npm ci && npx playwright install chromium
python3 -m http.server 8765 &   # serve the site
node tests/browser.js           # test it in a real browser
```

To try the app yourself, open http://localhost:8765 after starting the server.

`tests/validate.js` checks that every verse exists, every tradition id and source is real, links use https, there's no HTML or script in the content, and nothing has been removed. The same checks run automatically on every pull request.

## How changes are accepted

- Only the maintainer can change the main copy of this project. Your fork is yours to experiment with, and nothing you do there affects the original.
- Every pull request is checked automatically and then reviewed by the maintainer before it's merged.
- Changes that **remove** content (passages, readings, saints, sources and so on) fail the automatic check. Explain in the pull request why the removal is right, and the maintainer will decide.
- The history of the main branch can't be rewritten or deleted, so any change can always be undone.

## License

By contributing, you agree that your contribution is licensed under this project's [MIT License](LICENSE).
