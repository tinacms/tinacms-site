import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

import IndexLayout from 'layouts'
import { Heading, Paragraph } from 'components/foundations'
import Button from 'components/foundations/Button'
import { TwitterIcon, GithubIcon, SlackIcon } from 'components/foundations/icons'
import { colors, space, breakpoints } from 'utils/variables'
import { EmailForm } from  'components/layout/Footer'

const Wrapper = styled('div')`
  padding:
    0
    ${space.smallMobile}px
    ${space.xSmallMobile}px
    ${space.smallMobile}px;
  @media(min-width: ${breakpoints.lg}px) {
    padding:
      0
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
  @media (min-width: ${breakpoints.md}px) {
    aside#base {
      height: 85vh;
      max-height: 700px;
      min-height: 600px;
    }
    h1 {
      max-width: 800px;
      margin-top: ${space.lrgDesktop}px;
    }
  }
  @media (min-width: ${breakpoints.lg}px) {
    aside#base {
      background: radial-gradient(circle at center bottom,#CBEEF3 ,#E6FAF8 50%);
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
  }
`

const SocialSection = styled('section')`

`

const SocialItem = styled('div')`

`

const InfoSection = styled('section')`

`

const NewsletterSection = styled('section')`

`


function CommunityTemplate ({data}) {
  const frontmatter = data.markdownRemark.frontmatter
  const metaData = data.site.siteMetadata
  return (
    <IndexLayout>
      <Wrapper>
        <HeroSection>
          <aside id="base">
            <aside id="white-ellipse" />
          </aside>
          <Heading as="h1" size="h1">
            <span>{frontmatter.headline}</span>
          </Heading>
        </HeroSection>
        <SocialSection>
          <SocialItem>
            <TwitterIcon color={`${colors.hunterOrange}`} />
              <Heading as="h5" size="label" color={`${colors.hunterOrange}`}>
                Tweet us
              </Heading>
          </SocialItem>
          <span className="dotted-line"/>
          <SocialItem>
            <GithubIcon color={`${colors.hunterOrange}`} />
              <Heading as="h5" size="label" color={`${colors.hunterOrange}`}>
                Fork us
              </Heading>
          </SocialItem>
          <span className="dotted-line"/>
          <SocialItem>
            <SlackIcon color={`${colors.hunterOrange}`} />
              <Heading as="h5" size="label" color={`${colors.hunterOrange}`}>
                Slack us
              </Heading>
          </SocialItem>
        </SocialSection>
        <InfoSection>
          <figure>
            <img src={frontmatter.gif[0].src} alt={frontmatter.gif[0].gif_alt}/>
          </figure>
          <Heading as="h2" size="h2" color={`${colors.hunterOrange}`}>
            {frontmatter.supporting_headline}
          </Heading>
          <Paragraph>{frontmatter.supporting_body}</Paragraph>
          <Button
            to="/docs/contributing/guidelines"
            bgColor={`${colors.seafoam}`}
            textColor={`${colors.hunterOrange}`}
          >
            Contribute
          </Button>
          <Button
            to={`${metaData.roadmapUrl}`}
            bgColor={`${colors.seafoam}`}
            textColor={`${colors.hunterOrange}`}
            isExternal={true}
          >
            View Roadmap
          </Button>
        </InfoSection>
        <NewsletterSection>
          <EmailForm />
        </NewsletterSection>
      </Wrapper>
    </IndexLayout>
  )
}

export const query = graphql`
  query CommunityTemplateQuery($slug: String!) {
    site {
      siteMetadata {
        title
        description
        siteUrl
        roadmapUrl
        keywords
        social {
          twitter
          github
          slack
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      fileRelativePath
      rawFrontmatter
      rawMarkdownBody
      htmlAst
      excerpt
      frontmatter {
        headline
        gif {
          src
          alt
        }
        supporting_headline
        supporting_body
      }
    }
  }
`

export default CommunityTemplate
