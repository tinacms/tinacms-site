import React from 'react'

function BlogTemplate(props) {

  console.log(props.data)
  return (
    <section>
      {props.data.markdownRemark.frontmatter.title}
    </section>
  )
}


export default BlogTemplate



export const query = graphql`
  query BlogQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {

      frontmatter {

        title

      }
    }
  }
`
