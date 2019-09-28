import React from 'react'
import { Link, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

import { Page } from 'components/layout/Page'
import { breakpoints, space } from 'utils/variables'
import { Container } from 'components/layout/Container'
import { DocsWrapper } from 'components/docs/DocsWrapper'
import MarkdownContent from 'components/page/Markdown/MarkdownContent'
import { Heading } from 'components/foundations'
import BlogMetaData from 'components/blog/BlogMetaData'
import { Pagination } from 'components/ui/Pagination'
import { Footer, FooterWrapper } from 'components/layout/Footer'
import IndexLayout from 'layouts'
import renderAst from 'utils/renderAst'


function BlogTemplate(props) {
  const blogPostData = props.data.markdownRemark
  const paginationData = props.data.allMarkdownRemark.edges
  const { next, previous } = getNextPrevPost(paginationData, blogPostData.fields.slug)

  function getNextPrevPost(paginationData, thisPostSlug) {
    const currentPost = paginationData.filter(post => post.node.fields.slug === thisPostSlug)[0]
    return currentPost
  }

  return (
    <IndexLayout>
      <Page singleBlogPage>
        <Helmet>
          <meta property="og:title" content={`Blog | ${blogPostData.frontmatter.title}`}/>
        </Helmet>
        <StyledBlogPost>
            <Container>
              <Heading>{blogPostData.frontmatter.title}</Heading>
              <BlogMetaData author={blogPostData.frontmatter.author} date={blogPostData.frontmatter.date} />
              <MarkdownContent>
                {renderAst(blogPostData.htmlAst)}
              </MarkdownContent>
            </Container>
            <FooterWrapper>
              <Footer>
                {(previous || next) && <Pagination prevPage={previous && previous} nextPage={next && next} />}
              </Footer>
            </FooterWrapper>
        </StyledBlogPost>
      </Page>
    </IndexLayout>
  )
}


export default BlogTemplate

const StyledBlogPost = styled(DocsWrapper)`
  @media( min-width: ${breakpoints.md}px) {
    margin: ${space.xl}px auto;
  }
`

export const query = graphql`
  query BlogQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      frontmatter {
        author
        title
        date(formatString: "MMMM DD, YYYY")
      }
      htmlAst
    }
    allMarkdownRemark(filter: {
      fileRelativePath: {glob: "/content/blog/**/*.md"}},
      sort: {fields: frontmatter___date})
      {
        edges {
          next {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
          previous {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
          node {
            fields {
              slug
            }
          }
        }
      }
  }
`
