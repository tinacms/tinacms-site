import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

import IndexLayout from 'layouts'
import { Heading, Paragraph } from 'components/foundations'
import Button from 'components/foundations/Button'
import { TwitterIcon, GithubIcon, SlackIcon } from 'components/foundations/icons'
import { colors, space, breakpoints } from 'utils/variables'
import { EmailForm } from 'components/foundations'

function CommunityTemplate({ data }) {
  const frontmatter = data.markdownRemark.frontmatter
  const metadata = data.site.siteMetadata
  return (
    <IndexLayout>
      <Helmet>
        <meta property="og:title" content="Community" />
      </Helmet>
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
            <a href={`${metadata.social.twitter}`} target="_blank">
              <TwitterIcon color={`${colors.hunterOrange}`} />
              <Heading as="h5" size="label" color={`${colors.hunterOrange}`}>
                Tweet us
              </Heading>
            </a>
            <span className="dotted-line" />
          </SocialItem>
          <SocialItem>
            <a href={`${metadata.social.github}`} target="_blank">
              <GithubIcon color={`${colors.hunterOrange}`} />
              <Heading as="h5" size="label" color={`${colors.hunterOrange}`}>
                Fork us
              </Heading>
            </a>
            <span className="dotted-line" />
          </SocialItem>
          <SocialItem>
            <a href={`${metadata.social.slack}`} target="_blank">
              <SlackIcon color={`${colors.hunterOrange}`} />
              <Heading as="h5" size="label" color={`${colors.hunterOrange}`}>
                Slack us
              </Heading>
            </a>
          </SocialItem>
        </SocialSection>
        <InfoSection>
          <figure>
            <img src={frontmatter.gif[0].src} alt={frontmatter.gif[0].gif_alt} />
          </figure>
          <span id="info-wrap">
            <Heading as="h2" size="h2" color={`${colors.hunterOrange}`}>
              {frontmatter.supporting_headline}
            </Heading>
            <Paragraph>{frontmatter.supporting_body}</Paragraph>
            <span id="buttons">
              <Button
                to="/docs/contributing/guidelines"
                bgColor={`${colors.seafoam}`}
                textColor={`${colors.hunterOrange}`}
              >
                Contribute
              </Button>
              <Button
                to={`${metadata.roadmapUrl}`}
                bgColor={`${colors.seafoam}`}
                textColor={`${colors.hunterOrange}`}
                isExternal={true}
              >
                View Roadmap
              </Button>
            </span>
          </span>
        </InfoSection>
      </Wrapper>
      <NewsletterSection>
        <Heading as="h2" size="h2" color={colors.hunterOrange}>
          Newsletter ✌️
        </Heading>
        <EmailForm
          cta="We move quick. Stay up to date."
          inputColor="#fff"
          textColor={colors.hunterOrange}
          btnColor={colors.hunterOrange}
          btnTextColor={colors.seafoam}
        />
      </NewsletterSection>
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



const Wrapper = styled('div')`
  padding: 0 ${space.smallMobile}px ${space.xSmallMobile}px ${space.smallMobile}px;
  @media (min-width: ${breakpoints.lg}px) {
    padding: 0 ${space.smallDesktop}px ${space.xSmallDesktop}px ${space.smallDesktop}px;
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
    background: radial-gradient(circle at center bottom, rgb(203, 238, 243, 0.6), #e6faf8 50%);
    width: 100%;
    height: 280px;
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
    margin-top: 57px;
  }
  @media (min-width: ${breakpoints.md}px) {
    aside#base {
      height: 400px;
      min-height: unset;
      max-height: unset;
    }
    h1 {
      max-width: 800px;
      margin-top: ${space.lrgDesktop}px;
    }
  }
  @media (min-width: ${breakpoints.desktop}px) {
    aside#base {
      height: 520px;
    }
    aside#white-ellipse {
      height: 20vh;
      bottom: -10vh;
    }
    h1 {
      margin-top: 110px;
    }
  }
`

const SocialSection = styled('section')`
  display: grid;
  grid-template-rows: repeat(3, auto);
  grid-row-gap: 22px;
  justify-content: center;
  margin: 145px 0 65px 0;
  @media (min-width: ${breakpoints.md}px) {
    margin-top: 260px;
    grid-template-rows: unset;
    grid-template-columns: repeat(3, auto);
    grid-column-gap: 38px;
    width: 600px;
    margin: 260px auto 165px auto;
  }
`

const SocialItem = styled('div')`
  width: 85px;
  display: flex;
  flex-direction: column;
  align-items: center;
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    svg {
      transform: scale3d(1, 1, 1);
      transition: transform 180ms ease-in;
    }
  }
  a:hover,
  a:focus {
    outline: none;
    text-decoration: none;
    svg {
      transform: scale3d(1.1, 1.1, 1.1);
      transition: transform 250ms ease-out;
    }
  }
  a:focus {
    text-decoration: underline;
  }
  svg {
    width: 66px;
    margin-bottom: 15px;
  }
  h5 {
    text-transform: uppercase;
    margin-bottom: 18px;
  }
  span.dotted-line {
    display: block;
    height: 30px;
    border-left: 2px dotted ${colors.hunterOrange};
  }
  @media (min-width: ${breakpoints.md}px) {
    flex-direction: row;
    width: unset;
    align-items: flex-end;
    h5 {
      margin-bottom: 0;
    }
    span.dotted-line {
      height: 1px;
      width: 57px;
      border-left: unset;
      border-top: 3px dotted ${colors.hunterOrange};
      padding-bottom: 8px;
      margin-left: 38px;
    }
  }
`

const InfoSection = styled('section')`
  margin-bottom: ${space.lrgMobile}px;
  text-align: center;
  figure {
    display: flex;
    flex-direction: column;
    grid-area: gif;
    width: 80%;
    margin: 0 auto;
    border-radius: 10%;
    overflow: hidden;
    img {
      object-fit: cover;
      object-position: center;
      width: 100%;
      height: auto;
      min-height: 100%;
    }
  }
  span#info-wrap {
    grid-area: info;
  }
  h2 {
    margin: ${space.medMobile}px auto 0 auto;
    width: 80%;
  }
  p {
    margin: ${space.smallMobile}px 0 ${space.medMobile}px 0;
  }
  span#buttons > a:first-of-type {
    display: none;
  }
  span#buttons {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  a {
    filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.25));
    transform: scale3d(1, 1, 1);
    transition: all 180ms ease-in;
  }
  a:hover {
    filter: drop-shadow(2px 4px 4px rgba(0, 0, 0, 0.35));
    transform: scale3d(1.03, 1.03, 1.13);
    transition: all 250ms ease-out;
  }
  @media (min-width: ${breakpoints.md}px) {
    text-align: left;
    max-width: 1150px;
    margin: 0 auto ${space.lrgDesktop}px auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas: 'info gif';
    grid-column-gap: ${space.smallMobile}px;
    figure {
      flex-direction: row;
    }
    span#info-wrap {
      width: 90%;
      margin: auto;
    }
    span#buttons {
      justify-content: flex-start;
    }
    h2 {
      margin-top: ${space.xs}px;
      width: unset;
    }
  }
  @media (min-width: ${breakpoints.lg}px) {
    margin-bottom: 165px;
    span#info-wrap {
      width: 85%;
      span#buttons {
        display: flex;
      }
    }
    span#buttons > a:first-of-type {
      display: flex;
      margin-right: ${space.smallDesktop}px;
    }
  }
`

const NewsletterSection = styled('section')`
  background-color: ${colors.seafoam};
  padding: ${space.medMobile}px ${space.smallMobile}px;
  form {
    display: flex;
    flex-direction: column-reverse;
    padding: 24px 0 0 0;
    h3 {
      display: none;
    }
    input {
      filter: inset 3px 1px 5px rgba(0, 0, 0, 0.15);
      margin-top: 0;
      margin-bottom: ${space.smallMobile}px;
    }
  }
  @media (min-width: ${breakpoints.md}px) {
    text-align: center;
    form {
      display: grid;
      grid-template-columns: minMax(70%, 1fr);
      grid-column-gap: 40px;
      grid-template-rows: auto;
      grid-row-gap: 38px;
      grid-template-areas:
        'cta cta'
        'input btn';
      max-width: 620px;
      margin: 0 auto;
      padding: 18px 0 24px 0;
      h3 {
        grid-area: cta;
        display: block;
      }
      input {
        grid-area: input;
        margin: 0;
      }
      button {
        grid-area: btn;
      }
    }
  }
  @media (min-width: ${breakpoints.lg}px) {
    padding: ${space.lrgMobile}px ${space.smallDesktop}px;
  }
`
