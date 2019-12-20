import React, { useState } from 'react'
import { graphql, Link, navigate } from 'gatsby'
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
  const prevPage = currentPage - 1 === 1 ? '/blog/' : `/blog/page/${(currentPage - 1).toString()}`
  const nextPage = `/blog/page/${(currentPage + 1).toString()}`
  const [ selectValue, setSelectValue ] = useState(currentPage)
  function handleSelectChange(e) {
    e.preventDefault()
    const pageNumber = e.target.value
    setSelectValue(pageNumber)
    if (pageNumber === '1')
      return navigate('/blog')

    navigate(`blog/page/${pageNumber}`)
  }
  return (
    <IndexLayout>
      <Helmet>
        <meta property="og:title" content="Blog" />
      </Helmet>
      <BlogList posts={data.allMarkdownRemark.edges} />
      <FooterWrapper>
        <Pagination>
          <div class="prev-next">
          {!isFirst && (
            <Link to={prevPage} rel="prev">
              <p>← Newer</p>
            </Link>
          )}
          {!isLast && (
            <Link to={nextPage} rel="next">
              <p>Older →</p>
            </Link>
          )}
          </div>
          <div class="list-numbers">
            <ul>
              <PaginationSelect>
                <p>Page</p>
                  <div class="select">
                    <select aria-label="Pagination Dropdown" value={selectValue} onChange={handleSelectChange}>
                      {Array.from({length: numPages}, (_, i) => (
                        <option arial-label={`Go to Page ${i + 1}`} aria-current={i + 1 === currentPage ? true : false} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                    <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24">
                      <path d="M11.178,19.569C11.364,19.839,11.672,20,12,20s0.636-0.161,0.822-0.431l9-13c0.212-0.306,0.236-0.704,0.063-1.033 C21.713,5.207,21.372,5,21,5H3C2.628,5,2.287,5.207,2.114,5.536C1.941,5.865,1.966,6.263,2.178,6.569L11.178,19.569z"/>
                    </svg>
                  </div>
                <p> of {numPages}</p>
              </PaginationSelect>
            </ul>
          </div>
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
  div.prev-next {
    display: flex;
    align-items: center;
    p {
      margin-right: 24px;
    }
  }
  p {
    margin-bottom: 0;
  }
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
    padding: 3px 8px 6px 8px;
    border-radius: 5px;
    margin-right: 8px;
    a {
      text-decoration: none;
    }
  }

  li:first-of-type {
    margin-left: 8px;
  }

  span.page-dots {
    align-self: flex-end;
    padding-bottom: 6px;
    color: rgba(0,0,0,0.3);
  }
  li.current-li {
    a {
      color: ${colors.hunterOrange};
    }
  }
 }
 @media(min-width: 704px) {
   padding: 0;
 }
`

const PaginationSelect = styled.div`
  display: flex;
  div.select {
    border: 1px solid ${colors.seafoam};
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 2px 5px 3px 5px;
    margin: 0 8px;
    position: relative;
  }
  select {
    margin-right: 3px;
    padding-right: 6px;
    -moz-appearance: none;
    border: medium none;
    font-size: 18px;
  }
  option {
    color: inherit;
    padding: 8px;
    font-family: sans-serif;
  }
  svg {
    width: 8px;
    position: absolute;
    right: 8px;
    pointer-events: none;
  }
  p {
    padding-top: 2px;
    margin-bottom: 0;
  }
`
