---
title: How Tina Works
id: /getting-started/how-tina-works
prev: introduction
next: /docs/concepts/forms
---

## Real-Time Feedback

Static sites work by taking structured content from a source, such as markdown files, and processing them through a template to transform them into HTML pages. Tina sits in the middle of this process, exposing this structured content directly to the end user via form fields in the browser, while simultaneously passing the same content through to the templating engine.

The end result is a system that gives editors immediate feedback as they edit content, and gives developers precise control over which fields can be edited and how they are presented in the browser.

## Git-Backed by Default

Tina started as a side project of Forestry.io, and inherits its git-backed approach to persistence by default. Changes made to content in Tina's editor are immediately saved back to their markdown source files, and are committed + pushed to an origin git remote when the save button is pressed.
