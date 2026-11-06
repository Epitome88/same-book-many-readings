# Same Book, Many Readings

A free, open-source Bible study app that shows how thirteen Christian traditions read, interpret, and teach the Bible, side by side.

**[Open the app →](https://epitome88.github.io/same-book-many-readings/)**

It's a single web page that works on phones and computers, with no sign-up, no tracking, and no server.

> I hope this helps. I use it all the time, and I figured I'd share it with everyone.

## What's in it

- **Compare**: how each tradition answers key questions (authority, salvation, baptism, communion, end times, and more)
- **Churches**: a clickable family tree of how churches split over 2,000 years, plus a profile of each tradition
- **Verses**: look up any verse, see how churches read disputed passages, and open the verse in the NABRE
- **Find**: every verse where a name, word, or parable appears, plus a word counter for the whole Bible
- **Lineage**: the family line of Jesus from Matthew and Luke, and every relative Scripture names for each apostle
- **Angels**: the angelic orders and fallen angels, with every reference
- **Saints**: lives, feast days, and canonization details
- **Other Books**: books left out of most Bibles, why, and where to read them
- **Notes**: private notes that link to the verses they're about

### Bible versions

Pick a version from the **Bible** menu (Verses tab, Find tab, or Settings):

| Version | Notes |
|---|---|
| Douay-Rheims (Challoner revision) | All 73 books of the Catholic Bible, built in. Public domain. |
| King James Version | The 66-book Protestant canon, built in. Public domain in the US. |
| NABRE | Copyrighted, so not built in. Each verse links to it on Bible.com. |

The app uses modern chapter and verse numbering (Psalm 23 is "The Lord is my shepherd"). When the Douay-Rheims numbers a verse differently, the app shows its numbering too, for example "In the Douay-Rheims: Psalm 22:1".

### Settings

Light, dark, or match-your-device appearance; Keel Sans, a dyslexia-friendly font made for this app; and adjustable text size.

## Running it

Open `index.html` in any modern browser. Nothing to install or build.

To host it, turn on **GitHub Pages** for this repository (Settings → Pages → Deploy from branch → `main` / root).

Notes are saved in the browser you use. Clearing site data deletes them.

## Contributing

Corrections are welcome, especially from members of the traditions described. Please open an issue or pull request with a source for the change. The app tries to describe each church as its own official teaching does, and to note where sources disagree.

`tools/` holds the scripts used to build the Douay-Rheims text: `parse_dr.py` reads the source files, `build_dr.py` maps them to modern verse numbering, and `check.py` compares every verse with the King James text to catch misalignments.

## Licenses

- **Code**: MIT License (see `LICENSE`).
- **Written content** (descriptions, summaries, and explanations): [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/). You can reuse it with credit.
- **Third-party material**: see `NOTICE.md`.

These summaries describe each tradition's mainstream teaching. Individual congregations and members often hold a range of views.
