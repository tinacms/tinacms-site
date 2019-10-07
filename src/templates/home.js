import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { useJsonForm } from '@tinacms/react-tinacms-json'

import IndexLayout from 'layouts'
import { Heading, Paragraph } from 'components/foundations'
import Button from 'components/foundations/Button'
import { colors, dimensions, space, breakpoints } from 'utils/variables'

const Wrapper = styled('div')`
  padding:
    ${dimensions.heights.header}px
    ${space.smallMobile}px
    ${space.xSmallMobile}px
    ${space.smallMobile}px;
  @media(min-width: ${breakpoints.lg}px) {
    padding:
      ${dimensions.heights.header}px
      ${space.smallDesktop}px
      ${space.xSmallDesktop}px
      ${space.smallDesktop}px;
  }
`
const HeroSection = styled('section')`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${colors.hunterOrange};
  text-align: center;
  aside#base {
    background-color: ${colors.seafoam};
    width: 100%;
    height: 65vh;
    min-height: 400px;
    max-height: 500px;
    z-index: -2;
    position: absolute;
    top: 0;
    left: 0;
  }
  aside#white-ellipse {
    width: 120%;
    height: 10vh;
    background-color: #fff;
    z-index: -1;
    position: absolute;
    bottom: -5vh;
    left: -10%;
    clip-path: ellipse();
  }
  h1 {
    max-width: 320px;
    margin-top: ${space.medMobile}px;
  }
  figure {
    display: block;
    max-width: 90%;
    margin-top: ${space.medMobile}px;
    img, video {
      margin: 0 auto;
      filter: drop-shadow(0 24px 24px #aeaeae);
      border-radius: 10px;
    }
  }
  @media(min-width: ${breakpoints.iphonePlus}px) {
    figure {
      width: 85%;
    }
  }
  @media(min-width: ${breakpoints.md}px) {
    aside#base {
      height: 85vh;
      max-height: 700px;
      min-height: 600px;
    }
    h1 {
      max-width: 800px;
      margin-top: ${space.lrgDesktop}px;
    }
    figure {
      margin-top: ${space.lrgDesktop}px;
    }
  }
  @media(min-width: ${breakpoints.lg}px) {
    aside#base {
      background: radial-gradient(circle at bottom center,#E6FAF8 50%,#F2FCFB);
    }
  }
  @media(min-width: ${breakpoints.desktop}px) {
    aside#base {
      min-height: 700px;
      max-height: 800px;
    }
    aside#white-ellipse {
      height: 20vh;
      bottom: -10vh;
    }
    h1 {
      margin-top: ${space.medDesktop}px;
    }
    figure {
      margin-top: ${space.medDesktop}px;
    }
  }
`

const InfoSection = styled('section')`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1000px;
  margin: ${space.medMobile}px auto;
  h2 {
    max-width: 450px;
    text-align: center;
  }
  a {
    margin-top: ${space.smallMobile}px;
  }
  span#dotted-line {
    margin-top: ${space.smallMobile}px;
    height: 35px;
    border-left: dotted 3px ${colors.mintChocoChip};
  }
  @media(min-width: ${breakpoints.lg}px) {
    margin: ${space.lrgMobile}px auto;
    h2 {
      max-width: 570px;
    }
  }
  @media(min-width: ${breakpoints.desktop}px) {
    max-width: 1150px;
    margin: ${space.lrgDesktop}px auto;
    a {
      margin-top: ${space.smallDesktop}px;
    }
    span#dotted-line {
      margin-top: 28px;
      height: 45px;
    }
  }
`
const ThreePoints = styled('ul')`
  margin: 0;
  list-style: none;
  padding-left: 0;
  text-align: center;
  margin-top: ${space.smallMobile}px;
  li {
    margin-top: 38px;
  }
  li:first-child {
    margin-top: ${space.smallMobile - 2}px;
  }
  p {
    display: none;
  }
  @media(min-width: ${breakpoints.lg}px) {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 66px;
    margin-top: ${space.lrgDesktop}px;
    li {
      text-align: left;
      margin-top: 0;

    }
    li:first-child {
      margin-top: 0;
    }
    h3 {
      text-align: center;
    }
    p {
      margin-top: ${space.smallDesktop}px;
      padding-left: 12px;
      display: block;
      color: ${colors.grey};
    }
  }
  @media(min-width: ${breakpoints.desktop}px) {
    p {
      padding-left: 18px;
    }
  }
`

const SetupSection = styled('section')`
  width: 100%;
  background-color: ${colors.seafoam};
  padding:
    ${space.medMobile}px
    ${space.smallMobile}px
    ${space.lrgMobile}px
    ${space.smallMobile}px;
  color: ${colors.hunterOrange};
  @media(min-width: ${breakpoints.lg}px) {
    padding:
      90px
      ${space.smallDesktop}px
      ${space.xlMobile}px
      ${space.smallDesktop}px;
  }
`
const SetupWrapper = styled('div')`
  max-width: 500px;
  margin: 0 auto;
  h1 {
    margin-bottom: ${space.smallDesktop}px;
    text-align: center;
  }
  figure {
    display: none;
    font-family: "Inconsolata", Courier, monospace;
  }
  a {
    margin: 0 auto;
  }
  @media(min-width: ${breakpoints.md}px) {
    max-width: 650px;
  }
  @media(min-width: ${breakpoints.lg}px) {
    max-width: 1000px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: ${space.lrgMobile}px;
    h1 {
      text-align: left;
    }
    figure {
      display: block;
      margin-top: ${space.smallDesktop}px;
    }
    a {
      margin: 0;
    }
  }
  @media(min-width: ${breakpoints.desktop}px) {
    max-width: 1150px;
    grid-template-columns: 1fr 1.2fr;
  }
`

const SetupSteps = styled('ol')`
  margin: 0;
  list-style: none;
  padding-left: 0;
  color: ${colors.darkPurple};
  li {
    margin-bottom: ${space.smallMobile}px;
  }
  li:last-child {
    margin-bottom: ${space.smallDesktop}px;
  }
  @media(min-width: ${breakpoints.lg}px) {
    padding-left: ${space.xs}px;
  }
`


const HomeTemplate = (props) => {
  // seeing empty sidebar group or file
  const [ dataJson ] = useJsonForm(props.data.dataJson)
  // const dataJson = props.data.dataJson
  return (
    <IndexLayout>
        <Wrapper>
          <Helmet>
            <meta property="og:title" content="Home" />
          </Helmet>
          <HeroSection>
            <aside id="base">
              <aside id="white-ellipse" />
            </aside>
            <Heading as="h1" size="h1">
              <span dangerouslySetInnerHTML={{__html: `${dataJson.headline}`}}>
              </span>
            </Heading>
            <figure><img src={dataJson.hero_video} alt={dataJson.hero_alt} /></figure>
          </HeroSection>
          <InfoSection>
            <Heading as="h2" size="h2" color={colors.darkPurple}>{dataJson.description}</Heading>
            <Button to="/docs/getting-started/introduction" bgColor={colors.hunterOrange} textColor={colors.seafoam}>
              Get Started
            </Button>
            <ThreePoints>
              {dataJson.three_points.map( point => {
                return (
                  <li>
                    <Heading as="h3" size="h3" color={colors.hunterOrange}>{point.main}</Heading>
                    <Paragraph as="p" size="body">{point.supporting}</Paragraph>
                  </li>
                )
              })}
            </ThreePoints>
          </InfoSection>
        </Wrapper>
        <SetupSection>
          <SetupWrapper>
          <span>
            <Heading as="h1" size="h1">{dataJson.setup.headline}</Heading>
            <SetupSteps>
              {dataJson.setup.steps.map( item => (
                <li>
                  <Paragraph as="p" size="body">- {item.step}</Paragraph>
                </li>
              ))}
            </SetupSteps>
            <Button to="/docs/getting-started/introduction" bgColor={colors.hunterOrange} textColor={colors.seafoam}>
              Get Started
            </Button>
          </span>
          <figure><img src={dataJson.setup.code_ex} alt="Tina-Code-Setup-Example" /></figure>
          </SetupWrapper>
        </SetupSection>
    </IndexLayout>
  )
}

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
    dataJson(fileRelativePath: {eq: "/data/home.json"}) {
      fields {
        fileRelativePath
      }
      headline
      description
      hero_video
      hero_alt
      three_points {
        main
        supporting
      }
      setup {
        headline
        steps {
          step
        }
        code_ex
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      fileRelativePath
      rawFrontmatter
      rawMarkdownBody
      htmlAst
      excerpt
    }
  }
`

export default HomeTemplate
