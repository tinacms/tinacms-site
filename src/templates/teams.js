import React, { useState }from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

import IndexLayout from 'layouts'
import { Heading, Paragraph } from 'components/foundations'
import Button from 'components/foundations/Button'
import { colors, dimensions, space, breakpoints } from 'utils/variables'
import { TeamsForm } from 'components/foundations'

const BgColor = styled('aside')`
  background-color: ${colors.darkPurple};
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -10;
`

const Wrapper = styled('div')`
  /**put max width here */
`

const StyledInfoSection = styled('section')`

`

const StyledPoints = styled('ul')`
  margin: 0;
  list-style: none;
  padding-left: 0;
  color: ${colors.white};
  li {
    position: relative;
    margin-bottom: ${space.smallMobile}px;
    padding-left: 2.5em;
    &:before {
      content: '↳';
      position: absolute;
      font-weight: bold;
      left: 2px;
      top: 0;
      font-size: 1.8em;
      line-height: 1.1;
      color: ${colors.hunterOrange};
    }
  }
  li:last-child {
    margin-bottom: ${space.smallDesktop}px;
  }
`

const StyledFormSection = styled('section')`

`

function TeamsTemplate (props) {
  const frontmatter = props.data.markdownRemark.frontmatter
  return (
    <IndexLayout>
     <Helmet>
        <meta property="og:title" content="Teams" />
        <script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/v2-legacy.js"></script>
        <script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/v2.js"></script>
      </Helmet>
      <BgColor />
      <Wrapper>
        <StyledInfoSection>
          <Heading as="h2" size="h2" color={`${colors.mintChocoChip}`}>{frontmatter.headline}</Heading>
          <span id="dotted-line" />
          <StyledPoints>
            {frontmatter.supporting_points.map(item => <li key={item.point.trim()}>{item.point}</li>)}
          </StyledPoints>
          <Heading as="h2" size="h2" color={`${colors.hunterOrange}`}>Coming Soon...</Heading>
        </StyledInfoSection>
        <StyledFormSection>
          <TeamsForm/>
        </StyledFormSection>
      </Wrapper>
    </IndexLayout>
  )
}


export default TeamsTemplate


export const query = graphql`
  query TeamsTemplateQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      fileRelativePath
      rawFrontmatter
      rawMarkdownBody
      htmlAst
      excerpt
      frontmatter {
        headline
        supporting_points {
          point
        }
      }
    }
  }
`

