import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import { Page } from 'components/layout/Page'

import { Container } from 'components/layout/Container'
import { DocsWrapper } from 'components/docs/DocsWrapper'
import { DocsHeader } from 'components/docs/DocsHeader'
import MarkdownContent from 'components/page/Markdown/MarkdownContent'

import { Footer, FooterWrapper } from 'components/layout/Footer'
import IndexLayout from 'layouts'
import renderAst from 'utils/renderAst'
import BlogList from 'components/blog/BlogList'

const BlogPage = () => {
  const data = useStaticQuery(graphql`
    query BlogPageQuery {
      allMarkdownRemark(filter: {fileRelativePath: {glob: "/content/blog/**/*.md"}}) {
        edges {
          node {
            frontmatter {
              title
            }
            fileRelativePath
          }
        }
      }
    }
  `)
    console.log(data)
  return (
    <IndexLayout>
      <Page docsPage>
        <Helmet>
          <meta property="og:title" content="Home" />
        </Helmet>
        <BlogList posts={data.allMarkdownRemark.edges} />
      </Page>
    </IndexLayout>
  )
}

export default BlogPage

