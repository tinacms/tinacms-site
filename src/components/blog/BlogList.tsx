import * as React from 'react'
import styled from 'styled-components';
import { Link } from 'gatsby'

import { Heading } from 'components/foundations'
import { DocsWrapper } from 'components/docs/DocsWrapper'
import BlogMetaData from 'components/blog/BlogMetaData'
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
              <BlogMetaData
                author={blogPost.frontmatter.author}
                date={blogPost.frontmatter.date}
              />
              <p>{blogPost.excerpt}</p>
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
    margin-bottom: ${space.smallMobile}px;
    a {
      h2 {
        max-width: 80%;
        transition: color 250ms ease;
        margin-bottom: ${space.xSmallDesktop}px;
      }
      color: inherit;
      &:hover,
      &:focus {
        h2 {
          color: ${colors.hunterOrange};
          transition: color 250ms ease;
        }
        aside {
          transform: scale3d(1.1, 1, 1);
          transform-origin: left;
          transition: transform 250ms ease;
        }
        text-decoration: none;
      }
      aside {
        width: 15vw;
        /* background-color: ${colors.liteMintGreen}; */
        height: 2px;
        border-bottom: dotted 3px ${colors.mintChocoChip};
        transform: scale3d(1, 1, 1);
        transition: transform 250ms ease;
        transform-origin: left;
      }
    }
    a:not(:first-child) {
      margin-top: ${space.medMobile}px;
      display: block;
    }
    article {
      max-width: 704px;
    }
    p {
      color: ${colors.darkGrey};
      margin-bottom: ${space.smallMobile}px;
    }
  }
  @media( min-width: ${breakpoints.md}px) {
    margin: ${space.lg}px 0 ${space.lrgDesktop}px 0;
    section {
      width: unset;
      margin: 0 auto;
      a:not(:first-child) {
        margin-top: ${space.medDesktop}px;
      }
      a {
        h2 {
          margin-bottom: 0;
        }
        aside {
          width: 8vw;
        }
      }
      p {
        margin-bottom: ${space.smallDesktop}px;
      }
    }
  }
`
