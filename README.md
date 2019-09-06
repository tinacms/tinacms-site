# Tina Docs
____

This extends the [Grundgesetz Skeleton](https://github.com/kata-ai/grundgesetz-skeleton) created by Resi Respati at [kata ai](https://github.com/kata-ai)

### **Making new doc files**

When creating a new file, enter the full path (not just the title) to put it in a subdir that corresponds with the table of contents. You will also need to add the directory(if its new) and the file to the toc.json to get it to show in the toc component. I know it's annoying but since I couldn't get the jsonForm to work with this array of json objects, we will need to manually add items to that table of contents for now.

### **Frontmatter Weirdness**

The `next` and `prev` frontmatter values for the docs need to match the `id` from toc.json


# Notes from the theme creator

## Project Structure
The project structure of Grundgesetz is specifically designed for easy maintenance of documentation and the site's code.

```
.
|-- docs
|   |-- [path-1]
|   |   |-- [page-1].md
|   |   `-- [page-2].md
|   |-- [path-2]
|   |   |-- [page-3].md
|   |   `-- [page-4].md
|   |-- ...
|   |-- [index.md]
|   `-- toc.json
|-- [static]
|   `-- ...
`-- src
    |-- assets
    |   `-- ...
    |-- components
    |   `-- ...
    |-- layouts
    |   `-- ...
    |-- pages
    |   `-- ...
    |-- styles
    |   |-- theme.ts
    |   `-- ...
    |-- ...
    `-- typings.d.ts
```

### Explanation

- `docs/` - Where the documentation lives. Grundgesetz will read all `.md` files and builds it in a path following the directory tree.
  - `[index.md]` - An optional Index page, if you want it to be written in Markdown. This can be replaced by a customised Index page located at `pages/index.tsx`
  - `toc.json` - The file that holds the table of contents. See [Table of Contents](/writing/table-of-contents) for more information.
- `[static/]` - Holds the static assets of the site.
- `[src/]` - The root folder for the JavaScript source.

## Table of Contents

The `toc.json` file inside the `docs/` folder holds our table of contents. It will be automatically populated on the left-side drawer as a sectioned menu.

```json
[
  {
    "title": "Menu Section 1",
    "items": [
      {
        "id": "page-1",
        "slug": "/section-1/page-1/",
        "title": "Page 1"
      },
      {
        "id": "page-2",
        "slug": "/section-1/page-2",
        "title": "Page 2"
      },
      {
        "id": "page-3",
        "slug": "/section-1/page-3",
        "title": "Page 3"
      }
    ]
  },
  {
    "title": "Menu Section 2",
    "items": [
      {
        "id": "page-1",
        "slug": "/section-2/page-1/",
        "title": "Page 1"
      },
      {
        "id": "page-2",
        "slug": "/section-2/page-2",
        "title": "Page 2"
      },
      {
        "id": "page-3",
        "slug": "/section-2/page-3",
        "title": "Page 3"
      }
    ]
  }
]
```

## Writing in Markdown

Writing documentation in Gatsby is done in Markdown. Grundgesetz uses Remark to parse Markdown files and turn them into HTML.

### Frontmatters

We provide the following Markdown frontmatters in each documentation page.

- `id` - A unique identifier representing the markdown page. This will be referenced in `toc.json` when getting the links for the navigation sidebar, as well as the `prev` and `next` items of the pagination.
- `title` - The title of the page.
- `prev` - Optional. This contains the `id` of the page that appears on the "Previous Page" navigation item.
- `next` - Optional. This contains the `id` of the page that appears on the "Next Page" navigation item.
