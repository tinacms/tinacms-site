'use strict'

const fs = require('fs')
const path = require('path')
const { GraphQLBoolean } = require('gatsby/graphql')
const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // Sometimes, optional fields tend to get not picked up by the GraphQL
  // interpreter if not a single content uses it. Therefore, we're putting them
  // through `createNodeField` so that the fields still exist and GraphQL won't
  // trip up. An empty string is still required in replacement to `null`.

  switch (node.internal.type) {
    case 'MarkdownRemark': {
      const { permalink, layout } = node.frontmatter
      const { relativePath } = getNode(node.parent)

      let slug = permalink

      if (!slug) {
        if (relativePath === 'index.md') {
          // If we have homepage set in docs folder, use it.
          slug = '/'
        } else if (relativePath.endsWith('index.md')) {
          // Use `index.md` as directory index
          slug = `/${relativePath.replace('index.md', '')}`
        } else {
          slug = `/${relativePath.replace('.md', '')}/`
        }
      }

      let section
      const sectionMatch = /^\/?([\w-]+)\//.exec(relativePath)
      if (sectionMatch && sectionMatch[1]) {
        section = sectionMatch[1]
      } else {
        section = 'home'
      }

      // Used to generate URL to view this content.
      createNodeField({
        node,
        name: 'slug',
        value: slug || '',
      })

      // used to determine default page layout
      createNodeField({
        node,
        name: 'section',
        value: section,
      })

      // use to override default page layout
      createNodeField({
        node,
        name: 'layout',
        value: layout || '',
      })
    }
  }
  if (node.internal.type.includes('Json')) {
    let pathRoot = process.cwd()
    let parent = getNode(node.parent)
    createNodeField({
      name: `fileRelativePath`,
      node,
      value: parent.absolutePath.replace(pathRoot, ''),
    })
    //   // console.log(getNode(node.parent))
    //   const { relativePath } = getNode(node.parent)
    //   console.log(relativePath)
    //   createNodeField({
    //     node,
    //     name: 'fileRelativePath',
    //     value: relativePath
    //   })
  }
}

exports.setFieldsOnGraphQLNodeType = ({ type }) => {
  // if the node is a markdown file, add the `published` field
  if ('MarkdownRemark' === type.name) {
    return {
      published: {
        type: GraphQLBoolean,
        resolve: ({ frontmatter }) => {
          /*
          `published` is always true in development
              so both drafts and finished posts are built
          */
          if (process.env.NODE_ENV !== 'production') {
            return true
          }
          /*
          return the opposite of the `draft` value,
          i.e. if draft = true : published = false
          */
          console.log(frontmatter.draft)
          return !frontmatter.draft
        },
      },
    }
  }
  return {}
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  await generateConsumerMatrix(graphql)

  const { createPage } = actions

  const allMarkdown = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            published
            fields {
              layout
              slug
              section
            }
          }
        }
      }
    }
  `)

  if (allMarkdown.errors) {
    console.error(allMarkdown.errors)
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const blogPosts = allMarkdown.data.allMarkdownRemark.edges.filter(
    ({ node }) => node.fields.section === 'blog'
  )
  const postsPerPage = 8
  const numPages = Math.ceil(blogPosts.length / postsPerPage)
  console.log(Array.from({ length: numPages }))
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/page/${i + 1}`,
      component: path.resolve("./src/templates/blog-list.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  allMarkdown.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const { slug, layout, section } = node.fields
    // if unpublished return, to prevent the page from being created
    if (!node.published) return

    // otherwise, create the `published` page
    createPage({
      path: slug,
      //
      // This will automatically resolve the template to a corresponding
      // layout according to the following hierarchy:
      //
      // - first, it will attempt to use the `layout` value in the content's front matter
      // - if not found, it will use a layout matching the content's section (top-level directory) if it exists.
      //   + note: content without a top-level directory defaults to the 'home' section
      // - finally, if no corresponding layout is found, it will use the layout defined in `page.js`
      //
      component: firstFound([
        path.resolve(`./src/templates/${layout}.js`),
        path.resolve(`./src/templates/${section}.js`),
        path.resolve(`./src/templates/page.js`),
      ]),
      context: {
        // Data passed to context is available in page queries as GraphQL variables.
        slug,
      },
    })
  })
}

// generate a JSON file that identifies which libraries a given document depends on
async function generateConsumerMatrix(graphql) {
  const allMarkdown = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fileRelativePath
            frontmatter {
              consumes {
                file
                details
              }
            }
          }
        }
      }
    }
  `)
  let consumerMatrix = allMarkdown.data.allMarkdownRemark.edges.reduce((consumers, { node }) => {
    if (!node.frontmatter.consumes || node.frontmatter.consumes.length <= 0) return consumers
    consumers[node.fileRelativePath] = node.frontmatter.consumes
    return consumers
  }, {})
  if (!consumerMatrix) consumerMatrix = {}
  fs.writeFileSync('./static/consumers.json', JSON.stringify(consumerMatrix))
}

const firstFound = paths =>
  paths.reduce((found, path) => {
    if (found) return found
    if (fs.existsSync(path)) return path
    return null
  }, null)
