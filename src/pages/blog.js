import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import { Page } from 'components/layout/Page'
import IndexLayout from 'layouts'
import BlogList from 'components/blog/BlogList'

const BlogPage = () => {
  const data = useStaticQuery(graphql`
    query BlogPageQuery {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, filter: {fileRelativePath: {glob: "/content/blog/**/*.md"}}) {
        edges {
          node {
            id
            frontmatter {
              title
              author
              date(formatString: "MMMM DD, YYYY")
            }
            excerpt(format: HTML, pruneLength: 200)
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  return (
    <IndexLayout>
      <Page BlogPage>
        <Helmet>
          <meta property="og:title" content="Blog" />
        </Helmet>
        <BlogList posts={data.allMarkdownRemark.edges} />
      </Page>
    </IndexLayout>
  )
}

export default BlogPage
