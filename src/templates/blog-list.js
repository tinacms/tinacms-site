import React from 'react'
import { graphql, Link } from 'gatsby'
import { Helmet } from 'react-helmet'
import { withPlugin } from 'react-tinacms'
import { createRemarkButton } from 'gatsby-tinacms-remark'
import styled from 'styled-components'

import IndexLayout from 'layouts'
import BlogList from 'components/blog/BlogList'
import { FooterWrapper } from 'components/layout/Footer'
import { colors } from 'utils/variables'

const BlogPage = ({ data, ...props } )=> {
  const { currentPage, numPages } = props.pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? '/blog/' : `/blog/${(currentPage - 1).toString()}`
  const nextPage = `/blog/${(currentPage + 1).toString()}`
  return (
    <IndexLayout>
      <Helmet>
        <meta property="og:title" content="Blog" />
      </Helmet>
      <BlogList posts={data.allMarkdownRemark.edges} />
      <FooterWrapper>
        <Pagination>
          {!isFirst && (
            <Link to={prevPage} rel="prev">
              ← Previous
            </Link>
          )}
          <div class="list-numbers">
            <ul>
              {Array.from({ length: numPages }, (_, i) => (
                <li
                  key={`pagination-number${i + 1}`}
                  class={`${i === currentPage - 1 && 'current-li'}`}
                >
                  <Link
                    to={`/blog/${i === 0 ? '' : i + 1}`}
                  >
                    {i + 1}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {!isLast && (
            <Link to={nextPage} rel="next">
              Next →
            </Link>
          )}
        </Pagination>
      </FooterWrapper>
    </IndexLayout>
  )
}

const CreateBlogPlugin = createRemarkButton({
  label: 'Add New Blog',
  fields: [
    {
      name: 'title',
      label: 'Title',
      component: 'text',
    },
  ],
  filename: ({ title }) => {
    const slug = title.replace(/\s+/g, '-').toLowerCase()

    return `content/blog/${slug}.md`
  },
  frontmatter: ({ title }) => ({
    title,
    date: new Date(),
    draft: true,
  }),
  body: () => `Speak your mind.`,
})

export default withPlugin(BlogPage, CreateBlogPlugin)

export const data = graphql`
    query BlogListPageQuery($skip: Int!, $limit: Int!) {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { published: {eq: true}, fileRelativePath: { glob: "/content/blog/**/*.md" } }
        limit: $limit
        skip: $skip
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              author
              date(formatString: "MMMM DD, YYYY")
            }
            excerpt(format: PLAIN, pruneLength: 150, truncate: true)
            fields {
              slug
            }
          }
        }
      }
    }
  `

const Pagination = styled.div`
  max-width: 704px;
  margin: 0 auto;
  display: flex;
  padding: 0 32px;
  justify-content: space-between;
  align-items: center;
  div.list-numbers {
    display: flex;
    align-items: center;
  }
 ul {
  display: flex;
  justify-content: space-evenly;
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    margin-right: 8px;
    padding: 3px 8px 6px 8px;
    border-radius: 5px;
  }
  li.current-li {
    background-color: ${colors.mintChocoChip};
    a {
      color: ${colors.hunterOrange};
      text-decoration-color: ${colors.hunterOrange};
    }
  }
 }
 @media(min-width: 704px) {
   padding: 0;
 }
`
