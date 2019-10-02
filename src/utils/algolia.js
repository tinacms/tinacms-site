const pageQuery = `{
  blog: allMarkdownRemark(
    filter: {
      fileAbsolutePath: { regex: "/blog/" }
    }
  ) {
    edges {
      node {
        objectID: id
        frontmatter {
          title
          author
          date(formatString: "MMM D, YYYY")
        }
        excerpt(pruneLength: 5000)
      }
    }
  }
}`

const postQuery = `{
  docs: allMarkdownRemark(
    filter: { fileAbsolutePath: { regex: "/docs/" } }
  ) {
    edges {
      node {
        objectID: id
        frontmatter {
          title
        }
        excerpt(pruneLength: 5000)
      }
    }
  }
}`

const flatten = arr =>
  arr.map(({ node: { frontmatter, ...rest } }) => ({
    ...frontmatter,
    ...rest,
  }))
const settings = { attributesToSnippet: [`excerpt:20`] }

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => flatten(data.blog.edges),
    indexName: `Blog`,
    settings,
  },
  {
    query: postQuery,
    transformer: ({ data }) => flatten(data.docs.edges),
    indexName: `Docs`,
    settings,
  },
]

module.exports = queries
