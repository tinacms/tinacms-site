import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { remarkForm } from '@tinacms/react-tinacms-remark'

import IndexLayout from 'layouts'
import { Heading, Paragraph } from 'components/foundations'
import { colors, space, breakpoints } from 'utils/variables'
import { TeamsForm } from 'components/foundations'

function TeamsTemplate(props) {
  const frontmatter = props.data.markdownRemark.frontmatter
  return (
    <IndexLayout page="teams">
      <Helmet>
        <meta property="og:title" content="Teams" />
      </Helmet>
      <BgColor />
      <Wrapper>
        <StyledInfoSection>
          <Heading as="h2" size="h2" color={`${colors.mintChocoChip}`}>
            {frontmatter.headline}
          </Heading>
          <span id="dotted-line" />
          <StyledPoints>
            {frontmatter.supporting_points.map(item => (
              <li key={item.point.trim()}>
                <Paragraph as="p" size="body" color="white">
                  {item.point}
                </Paragraph>
              </li>
            ))}
          </StyledPoints>
          <Heading as="h2" size="h2" color={`${colors.hunterOrange}`} className="coming-soon">
            Coming Soon...
          </Heading>
        </StyledInfoSection>
        <StyledFormSection>
          <Heading as="h5" size="label" color={colors.hunterOrange}>
            Teams Private Beta
          </Heading>
          <TeamsForm hubspotFormID={process.env.GATSBY_HUBSPOT_FORM_ID} />
        </StyledFormSection>
      </Wrapper>
    </IndexLayout>
  )
}

const TeamsTemplateOptions = {
  fields: [
    {
      label: 'Headline',
      name: 'rawFrontmatter.headline',
      description: 'Enter the main headline here',
      component: 'textarea',
    },
    {
      label: 'Supporting Points',
      name: 'rawFrontmatter.supporting_points.point',
      description: 'Edit the points here',
      component: 'text',
    },
  ],
}

export default remarkForm(TeamsTemplate, TeamsTemplateOptions)

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

const BgColor = styled('aside')`
  background-color: ${colors.darkPurple};
  width: 100vw;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -10;
`

const Wrapper = styled('div')`
  @media (min-width: ${breakpoints.lg}px) {
    max-width: 1150px;
    margin: 0 auto;
    display: flex;
  }
`

const StyledInfoSection = styled('section')`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 38px ${space.smallMobile}px 20px ${space.smallMobile}px;
  span#dotted-line {
    display: block;
    width: 60px;
    height: 1px;
    border-bottom: 3px dotted ${colors.mintChocoChip};
    margin: 20px 0 32px 1px;
  }
  h2.coming-soon {
    display: none;
  }
  @media (min-width: ${breakpoints.lg}px) {
    padding: ${space.lrgDesktop}px ${space.smallDesktop}px 0 ${space.smallDesktop}px;
    max-width: 560px;
    margin: 0 ${space.lrgDesktop}px 100px 0;
    h2.coming-soon {
      display: block;
    }
    ul {
      max-width: 500px;
    }
  }
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
  background-color: ${colors.lightPurple};
  padding: 38px ${space.smallMobile}px;
  width: 100%;
  h5 {
    font-size: 18px;
    text-transform: uppercase;
    margin: 0 auto;
    width: max-content;
  }
  @media (min-width: ${breakpoints.lg}px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 72px 32px 100px 0;
    padding: unset;
    border-radius: 60px;
  }
`
