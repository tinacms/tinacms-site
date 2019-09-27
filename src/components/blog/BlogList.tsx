import * as React from 'react'
import { Heading } from 'components/foundations'

interface BlogList_Props {
  posts: any
}

function BlogList(props: BlogList_Props) {
  return (
    <section>
      {props.posts.map(post => <Heading>{post.node.frontmatter.title}</Heading>)}
    </section>
  )
}

export default BlogList

