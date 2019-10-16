import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { useJsonForm } from '@tinacms/gatsby-tinacms-json'
import { GithubIcon } from 'components/foundations/icons'

import IndexLayout from 'layouts'
import { Heading, Paragraph } from 'components/foundations'
import Button from 'components/foundations/Button'
import { colors, space, breakpoints } from 'utils/variables'

const HomeTemplate = props => {
  // seeing empty sidebar group or file
  //const [ dataJson ] = useJsonForm(props.data.dataJson)
  const dataJson = props.data.dataJson
  return (
    <IndexLayout>
      <Wrapper>
        <Helmet>
          <meta property="og:title" content="TinaCMS - Home" />
          <meta name="twitter:title" content="TinaCMS - Home" />
        </Helmet>
        <HeroSection>
          <aside id="base">
            <aside id="white-ellipse" />
          </aside>
          <Heading as="h1" size="h1">
            <span dangerouslySetInnerHTML={{ __html: `${dataJson.headline}` }}></span>
          </Heading>
          <HeroVideo>
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={`https://res.cloudinary.com/forestry-demo/video/upload/so_0/${dataJson.hero_video}.jpg`}
            >
              <source
                src={`https://res.cloudinary.com/forestry-demo/video/upload/q_100/${dataJson.hero_video}.webm`}
                type="video/webm"
              />
              <source
                src={`https://res.cloudinary.com/forestry-demo/video/upload/${dataJson.hero_video}.mp4`}
                type="video/mp4"
              />
            </video>
          </HeroVideo>
        </HeroSection>
        <InfoSection>
          <Heading as="h2" size="h2" color={colors.darkPurple}>
            {dataJson.description}
          </Heading>
          <InfoCta>
            <Button to="/docs/getting-started/introduction" bgColor={colors.hunterOrange} textColor={colors.seafoam}>
              Get Started
            </Button>
            <a className="github" href="https://github.com/tinacms/tinacms" target="_blank">
              <GithubIcon color={`${colors.hunterOrange}`} />
            </a>
          </InfoCta>
          <ThreePoints>
            {dataJson.three_points.map(point => {
              return (
                <li key={point.main}>
                  <Heading as="h3" size="h3" color={colors.hunterOrange}>
                    {point.main}
                  </Heading>
                  <Paragraph as="p" size="body">
                    {point.supporting}
                  </Paragraph>
                </li>
              )
            })}
          </ThreePoints>
        </InfoSection>
      </Wrapper>
      <SetupSection>
        <SetupWrapper>
          <div>
            <Heading as="h1" size="h1">
              {dataJson.setup.headline}
            </Heading>
            <span id="dotted-line" />
            <SetupSteps>
              {dataJson.setup.steps.map(item => (
                <li key={item.step.trim()}>
                  <p>{item.step}</p>
                </li>
              ))}
            </SetupSteps>
            <Button to="/docs/getting-started/introduction" bgColor={colors.hunterOrange} textColor={colors.seafoam}>
              Get Started
            </Button>
          </div>
          <CodeExample>{`yarn add @tinacms/gatsby-plugin-tinacms

module.exports = {
  // ...
  plugins: [
    '@tinacms/gatsby-plugin-tinacms',
    // ...
  ],
};

export WithTina( Component );
`}</CodeExample>
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
    dataJson(fileRelativePath: { eq: "/data/home.json" }) {
      id
      fileRelativePath
      rawJson
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

const CodeExample = styled.code`
  border-radius: 50px;
  background-color: #d4f0ee;
  color: #241748;
  padding: 50px;
  font-size: 20px;
  line-height: 1.2;
  font-family: Consolas, 'Andale Mono WT', 'Andale Mono', 'Lucida Console', 'Lucida Sans Typewriter', 'DejaVu Sans Mono',
    'Bitstream Vera Sans Mono', 'Liberation Mono', 'Nimbus Mono L', Monaco, 'Courier New', Courier, monospace;
  white-space: pre;
  filter: drop-shadow(rgba(104, 120, 125, 0.2) 0px 7px 8px);
  align-self: flex-start;
  span {
    color: #ec4815;
  }
`

const Wrapper = styled('div')`
  padding: 0 ${space.smallMobile}px ${space.xSmallMobile}px ${space.smallMobile}px;
  @media (min-width: ${breakpoints.lg}px) {
    padding: 0 ${space.smallDesktop}px ${space.xSmallDesktop}px ${space.smallDesktop}px;
  }
`

const HeroVideo = styled.div`
  display: block;
  max-width: 90%;
  margin-top: ${space.medDesktop}px;
  img,
  video {
    margin: 0 auto;
    filter: drop-shadow(rgba(104, 120, 125, 0.3) 0px 14px 16px);
    border-radius: 10px;
    max-width: 934px;
    width: 100%;
  }
  @media (min-width: ${breakpoints.md}px) {
    margin-top: ${space.lrgDesktop}px;
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
    max-width: 290px;
    margin-top: ${space.medMobile}px;
  }
  @media (min-width: ${breakpoints.iphonePlus}px) {
    figure {
      width: 85%;
    }
  }
  @media (min-width: ${breakpoints.md}px) {
    aside#base {
      height: 85vh;
      max-height: 700px;
      min-height: 600px;
    }
    h1 {
      max-width: 550px;
      margin-top: ${space.lrgDesktop}px;
    }
    figure {
      margin-top: ${space.lrgDesktop}px;
    }
  }
  @media (min-width: ${breakpoints.lg}px) {
    aside#base {
      background: radial-gradient(circle at center bottom, #cbeef3, #e6faf8 50%);
    }
  }
  @media (min-width: ${breakpoints.desktop}px) {
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

const InfoCta = styled.div`
  display: flex;
  justify-content: center;
  a {
    margin-top: 0;
    flex: 0 0 auto;
  }
  a:not(:first-child) {
    margin-left: 20px;
  }
  .github {
    display: inline-block;
    width: 41px;
    &:hover,
    &:focus {
      text-decoration: none;
      transform: translate3d(-1px, -2px, 2px);
      transition: transform 150ms ease-out;
    }
    &:focus,
    &:active {
      outline: none;
    }
    &:active {
      filter: none;
    }
    @media (min-width: ${breakpoints.lg}px) {
      display: none;
    }
  }
  svg {
    height: auto;
    width: 100%;
    padding: 0;
    position: relative;
    display: block;
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
  @media (min-width: ${breakpoints.lg}px) {
    margin: ${space.lrgMobile}px auto;
    h2 {
      max-width: 570px;
    }
  }
  @media (min-width: ${breakpoints.desktop}px) {
    max-width: 1150px;
    margin: ${space.lrgDesktop}px auto;
    a {
      margin-top: ${space.smallDesktop}px;
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
  @media (min-width: ${breakpoints.lg}px) {
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
  @media (min-width: ${breakpoints.desktop}px) {
    p {
      padding-left: 18px;
    }
  }
`

const SetupSection = styled('section')`
  width: 100%;
  background-color: ${colors.seafoam};
  padding: ${space.medMobile}px ${space.smallMobile}px ${space.lrgMobile}px ${space.smallMobile}px;
  color: ${colors.hunterOrange};
  @media (min-width: ${breakpoints.lg}px) {
    padding: 90px ${space.smallDesktop}px ${space.xlMobile}px ${space.smallDesktop}px;
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
    font-family: 'Inconsolata', Courier, monospace;
  }
  a {
    margin: 0 auto;
  }
  @media (min-width: ${breakpoints.md}px) {
    max-width: 650px;
  }
  @media (min-width: ${breakpoints.lg}px) {
    max-width: 1000px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: ${space.lrgMobile}px;
    h1 {
      text-align: left;
      margin-bottom: 20px;
    }
    span#dotted-line {
      display: block;
      width: 70px;
      height: 1px;
      border-bottom: 3px dotted ${colors.hunterOrange};
      margin: 0 0 28px 5px;
    }
    figure {
      display: block;
      margin-top: ${space.smallDesktop}px;
    }
    a {
      margin: 0;
    }
  }
  @media (min-width: ${breakpoints.desktop}px) {
    max-width: 1150px;
    grid-template-columns: 1fr 1.2fr;
  }
`

const SetupSteps = styled('ul')`
  margin: 0;
  list-style: none;
  padding-left: 0;
  color: ${colors.darkPurple};
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
