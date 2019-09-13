import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { getPageById } from 'utils/helpers'
import { TinaField } from '@tinacms/react-tinacms'
import { remarkForm, liveRemarkForm } from '@tinacms/react-tinacms-remark'
import { Wysiwyg } from '@tinacms/fields'
import { Page } from 'components/layout/Page'
import { Container } from 'components/layout/Container'
import { DocsWrapper } from 'components/docs/DocsWrapper'
import { DocsHeader } from 'components/docs/DocsHeader'
import { MarkdownContent } from 'components/page/Markdown'

import { FooterWrapper, Footer } from 'components/layout/Footer'
import { Pagination } from 'components/ui/Pagination'
import { TocWrapper } from 'components/docs/TableOfContents'
import IndexLayout from 'layouts'
import renderAst from 'utils/renderAst'

const PageTemplate = ({ data, setIsEditing, isEditing }) => {
  const [tocIsOpen, setTocIsOpen] = React.useState(false)
  const { markdownRemark, sectionList, site } = data
  const { prev, next } = markdownRemark.frontmatter
  const prevPage = getPageById(sectionList.edges, prev)
  const nextPage = getPageById(sectionList.edges, next)

  return (
    <IndexLayout>
      <Page docsPage>
        <Helmet>
          <title>
            {markdownRemark.frontmatter.title} &middot; {site.siteMetadata.title}
          </title>
          <meta name="description" content={markdownRemark.excerpt} />
          <meta property="og:title" content={markdownRemark.frontmatter.title} />
          <meta property="og:description" content={markdownRemark.excerpt} />
        </Helmet>
        <DocsWrapper hasToc={!!markdownRemark.tableOfContents}>
          {markdownRemark.tableOfContents && (
            <TocWrapper
              isOpen={tocIsOpen}
              onClick={() => setTocIsOpen(!tocIsOpen)}
              dangerouslySetInnerHTML={{ __html: markdownRemark.tableOfContents }}
            />
          )}
          <Container>
            <DocsHeader title={markdownRemark.frontmatter.title} subtitle={markdownRemark.frontmatter.description} />
            <MarkdownContent>
              <TinaField name="rawMarkdownBody" Component={Wysiwyg}>
                {renderAst(markdownRemark.htmlAst)}
              </TinaField>
            </MarkdownContent>
            <FooterWrapper>
              <button onClick={() => setIsEditing(p => !p)}>{isEditing ? 'Preview' : 'Edit'}</button>
              {(prevPage || nextPage) && <Pagination prevPage={prevPage} nextPage={nextPage} />}
              <Footer />
            </FooterWrapper>
          </Container>

          {/* //this button floats over the tina button ---> <TocFloatingButton tocIsOpen={tocIsOpen} onClick={() => setTocIsOpen(!tocIsOpen)} /> */}
        </DocsWrapper>
      </Page>
    </IndexLayout>
  )
}

const PageTemplateForm = {
  fields: [
    {
      label: 'Title',
      name: 'rawFrontmatter.title',
      component: 'text',
    },
    {
      label: 'Post Body',
      name: 'rawMarkdownBody',
      component: 'textarea',
    },
    {
      label: 'Previous Doc',
      name: 'rawFrontmatter.prev',
      component: 'text',
    },
    {
      label: 'Next Doc',
      name: 'rawFrontmatter.next',
      component: 'text',
    },
  ],
}

export default liveRemarkForm(PageTemplate, PageTemplateForm)

export const query = graphql`
  query PageTemplateQuery($slug: String!) {
    site {
      siteMetadata {
        title
        description
        siteUrl
        keywords
        author {
          name
          url
          email
        }
      }
    }
    sectionList: allTocJson {
      edges {
        node {
          title
          items {
            id
            slug
            title
          }
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      fileRelativePath
      rawFrontmatter
      rawMarkdownBody
      htmlAst
      tableOfContents
      excerpt
      frontmatter {
        id
        title
        prev
        next
      }
    }
  }
`
