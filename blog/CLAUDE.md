# Blog

`blog/index.html` lists posts (one `.post-item` each, newest first) and each post is its own `blog/<slug>.html`. These are standalone pages that duplicate the homepage `<head>`, header, and footer with `../` paths and `aria-current="page"` on the Blog nav link — so a change to the shared head/nav/footer has to be made in `index.html` *and* every blog page.

To add a post: copy `blog/hello-world.html`, change `<title>`, the meta description, `<h1>`, `<time>` (both `datetime` and text), and `.post-body`, then add a `.post-item` at the top of `blog/index.html`. Prose styles (`.post-body` paragraphs, `h2`, lists, links, `code`/`pre`, images) are in the Blog block of `styles.css`. Don't use `<header>` inside a post — the global `header` rule makes it the fixed nav bar. Blog links are directory URLs (`../`, `./`), so preview with `python3 -m http.server` rather than `open`.

## Writing guidelines

Cross-check every post against these before publishing:
- A personal opinion piece, not an academic article. Fairly short: 1,000 to 1,500 words if possible.
- Do not bury the lede: the first sentence is strong and carries the key message of the whole piece. End strong, with a takeaway if possible.
- Audience: mostly software engineering academics and educators, who all know the discourse on AI and how it disrupts the field. Some practitioners read too, so do not assume a purely academic audience.
- The audience has a low attention span: clear structure, and key phrases or concepts in **bold**.
- Personal style: "I" and clear opinions are fine. No academic "we" for the author. Do not address the reader as "you" (that includes imperatives like "think about…").
- Informal references and inline links over traditional citations. No further-reading or reference list at the end: the inline links are enough.
- No abbreviations outside parentheses, including "e.g." and contractions ("can't", "it's"). As applied so far: spell out teaching assistant, Carnegie Mellon, United States, language model, configuration; "AI" and "Andrew ID" are fine; "FERPA" only inside parentheses.
- Shrey's own voice: plain, first person, conversational, no em dashes.
