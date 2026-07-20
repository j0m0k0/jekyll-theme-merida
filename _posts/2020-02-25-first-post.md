---
layout: post
title: "Writing Technical Notes With Merida"
date: 2024-02-25 09:00:00 -0600
tags: [Writing, Jekyll, Code]
---

Merida is built for notes that mix prose, equations, and code. This short post demonstrates the default post layout and a few common Markdown patterns.

$$X = Y + 3$$

To add new posts, create a Markdown file in `_posts` that follows the `YYYY-MM-DD-name.ext` convention and includes front matter. Inline math like $E=mc^2$ is handled by MathJax.

Jekyll also offers strong support for code snippets:

```ruby
def print_hi(name)
  puts "Hi, #{name}"
end

print_hi('Tom')
```

Longer examples can include lists, quotes, tables, images, and footnotes while keeping the generated page static and fast.
