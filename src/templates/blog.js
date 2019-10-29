import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { liveRemarkForm } from 'gatsby-tinacms-remark'
import { TinaField } from '@tinacms/form-builder'
import { Wysiwyg } from '@tinacms/fields'
import { Container } from 'components/layout/Container'
import { DocsWrapper } from 'components/docs/DocsWrapper'
import MarkdownContent from 'components/page/Markdown/MarkdownContent'
import { Heading } from 'components/foundations'
import BlogMetaData from 'components/blog/BlogMetaData'
import { Pagination } from 'components/ui/Pagination'
import { FooterWrapper } from 'components/layout/Footer'
import IndexLayout from 'layouts'
import { colors, breakpoints } from 'utils/variables'
import renderAst from 'utils/renderAst'
import { useSidebar } from 'tinacms'

function BlogTemplate(props) {
  const blogPostData = props.data.markdownRemark
  const paginationData = props.data.allMarkdownRemark.edges
  const { next, previous } = getNextPrevPost(paginationData, blogPostData.fields.slug)
  //for liveRemarkForm
  const { isEditing, setIsEditing } = props
  const sidebar = useSidebar()

  function getNextPrevPost(paginationData, thisPostSlug) {
    const currentPost = paginationData.filter(post => post.node.fields.slug === thisPostSlug)[0]
    return currentPost
  }

  return (
    <IndexLayout>
      <Helmet>
        <meta property="og:title" content={`TinaCMS - Blog | ${blogPostData.frontmatter.title}`} />
        <meta name="twitter:title" content={`TinaCMS - Blog | ${blogPostData.frontmatter.title}`} />
      </Helmet>
      <BlogHero>
        <Heading as="h1" size="h1">
          {blogPostData.frontmatter.title}
        </Heading>
      </BlogHero>
      <StyledBlogPost>
        <Container>
          {blogPostData.frontmatter.draft && <DraftIndicator>Draft</DraftIndicator>}
          <BlogMetaData author={blogPostData.frontmatter.author} date={blogPostData.frontmatter.date} />
          <MarkdownContent>
            <TinaField name="rawMarkdownBody" Component={Wysiwyg}>
              {renderAst(blogPostData.htmlAst)}
            </TinaField>
          </MarkdownContent>
        </Container>
        <FooterWrapper>
          {!sidebar.hidden && <button onClick={() => setIsEditing(p => !p)}>{isEditing ? 'Preview' : 'Edit'}</button>}
          {(previous || next) && <Pagination prevPage={previous && previous} nextPage={next && next} />}
        </FooterWrapper>
      </StyledBlogPost>
    </IndexLayout>
  )
}

const BlogTemplateOptions = {
  fields: [
    {
      label: 'Title',
      name: 'rawFrontmatter.title',
      component: 'text',
    },
    {
      name: "frontmatter.draft",
      component: "toggle",
      label: "Draft",
    },
    {
      label: 'Date Posted',
      name: 'rawFrontmatter.date',
      component: 'date',
      dateFormat: 'MMMM DD YYYY',
      timeFormat: false,
    },
    {
      label: 'Author',
      name: 'rawFrontmatter.author',
      component: 'text',
    },
    {
      label: 'Body',
      name: 'rawMarkdownBody',
      component: 'markdown',
    },
  ],
}

export default liveRemarkForm(BlogTemplate, BlogTemplateOptions)

const DraftIndicator = styled.h2`
  color: ${colors.hunterOrange};
  border: ${colors.hunterOrange} 2px solid;
  width: 100px;
  height: 40px;
  text-align: center;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const BlogHero = styled.div`
  position: relative;
  color: ${colors.hunterOrange};
  text-align: center;
  padding-top: 40px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 60px;
  margin-bottom: 40px;

  &:before {
    content: '';
    display: block;
    position: absolute;
    top: -100px;
    left: 0;
    right: 0;
    bottom: -25px;
    background-image: url('/img/header-bg.svg');
    background-size: ${breakpoints.md}px 100%;
    background-position: center;
    background-repeat: no-repeat;
    z-index: -1;
  }

  @media (min-width: ${breakpoints.md}px) {
    padding-top: 50px;
    padding-bottom: 100px;
    margin-bottom: 50px;
    h1 {
      max-width: 706px;
      margin: 0 auto;
    }
    &:before {
      background-size: 100% 100%;
      bottom: -2vw;
    }
  }
  @media (min-width: ${breakpoints.lg}px) {
    padding-top: 70px;
    padding-bottom: 120px;
    margin-bottom: 70px;
  }
`

const StyledBlogPost = styled(DocsWrapper)`
  padding-top: 0;
  padding: 0 24px;
  div aside {
    margin: 0 auto;
    max-width: 704px;
  }
  @media (min-width: ${breakpoints.md}px) {
    min-width: 650px;
    margin: 0 auto;
  }
  @media (min-width: ${breakpoints.xl}px) {
    min-width: 768px;
  }
`

export const query = graphql`
  query BlogQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      fileRelativePath
      rawMarkdownBody
      rawFrontmatter
      fields {
        slug
      }
      frontmatter {
        author
        title
        date(formatString: "MMMM DD, YYYY")
        draft
      }
      htmlAst
    }
    allMarkdownRemark(
      filter: { published: { eq: true }, fileRelativePath: { glob: "/content/blog/**/*.md" } }
      sort: { fields: frontmatter___date }
    ) {
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
