import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import { remarkForm } from '@tinacms/react-tinacms-remark'

import { Page } from 'components/layout/Page';

import { Container } from 'components/layout/Container';
import { DocsWrapper } from 'components/docs/DocsWrapper';
import { DocsHeader } from 'components/docs/DocsHeader';
import MarkdownContent from 'components/page/Markdown/MarkdownContent';

import { Footer, FooterWrapper } from 'components/layout/Footer';
import IndexLayout from 'layouts';
import renderAst from 'utils/renderAst';
// import FooterWrapper from 'components/old-layout/FooterWrapper';
// import Footer from 'components/old-layout/Footer';

const PageTemplate = ({ data }) => {
  const { markdownRemark } = data;
  console.log(markdownRemark)
  return (
    <IndexLayout>
      <Page docsPage>
        <Helmet>
          <meta property="og:title" content="Home" />
        </Helmet>
        <DocsWrapper>
          <Container>
            <DocsHeader title="Welcome to Grundgesetz!" />
            <MarkdownContent>{renderAst(markdownRemark.htmlAst)}</MarkdownContent>
            <FooterWrapper>
              <Footer />
            </FooterWrapper>
          </Container>
        </DocsWrapper>
      </Page>
    </IndexLayout>
  );
};

const PageTemplateForm = () => {
  fields: [
    {
      label: 'Title',
      name: 'frontmatter.title',
      component: 'text'
    },
    {
      label: 'body',
      name: 'rawMarkdownBody',
      component: 'textarea',
    }
  ]
}

export default remarkForm(PageTemplate, PageTemplateForm);


export const query = graphql`
  query HomeTemplateQuery($slug: String!) {
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
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      fields {
        fileRelativePath
      }
      rawMarkdownBody
      htmlAst
      excerpt
      frontmatter {
        id
        title
        prev
        next
      }
    }
  }
`;
