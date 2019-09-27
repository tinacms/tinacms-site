import * as React from 'react'
import styled from 'styled-components';
import { Link } from 'gatsby'

import { Heading } from 'components/foundations'
import { DocsWrapper } from 'components/docs/DocsWrapper'
import { breakpoints, colors, space } from 'utils/variables';

interface BlogList_Props {
  posts: any
}


function BlogList(props: BlogList_Props) {
  return (
    <StyledBlogList>
      <section>
      {props.posts.map(post => {
        const blogPost = post.node
        return (
          <Link key={blogPost.fileRelativePath} to={blogPost.fields.slug}>
            <article>
              <Heading>{blogPost.frontmatter.title}</Heading>
              <div>
              <p>By: {blogPost.frontmatter.author}</p>
                <p>{blogPost.frontmatter.date}</p>
              </div>
              <span dangerouslySetInnerHTML={{__html: `${blogPost.excerpt}`}}></span>
            </article>
            <aside />
          </Link>
        )
      })}
      </section>
    </StyledBlogList>
  )
}

export default BlogList

const StyledBlogList = styled(DocsWrapper)`
  section {
    width: 100%;
    a {
      h2 {
        transition: color 250ms ease;
      }
      color: inherit;
      &:hover,
      &:focus {
        h2 {
          color: ${colors.darkMustardYellow};
          transition: color 250ms ease;
        }
        aside {
          transform: scale3d(1.2, 1, 1);
          transform-origin: left;
          transition: transform 250ms ease;
        }
        text-decoration: none;
      }
      aside {
        width: 15vw;
        background-color: ${colors.liteMintGreen};
        height: 2px;
        transform: scale3d(1, 1, 1);
        transition: transform 250ms ease;
        transform-origin: left;
      }
    }
    a:not(:first-child) {
      margin-top: ${space.lg}px;
      display: block;
    }
    article {
      max-width: 704px;
      div {
        width: 100%;
        justify-content: space-between;
        display: flex;
        flex-grow: 1;
        p {
          margin: ${space.sm}px 0 ${space.xs}px 0;
        }
        p {
          color: ${colors.liteGreyPurple};
        }
      }
    }
  }
  @media( min-width: ${breakpoints.md}px) {
    margin-top: ${space.xl}px;
    section {
      width: unset;
      margin: 0 auto;
      a:not(:first-child) {
        margin-top: ${space.xl}px;
      }
      a {
        aside {
          width: 8vw;
        }
      }
    }
  }
`
