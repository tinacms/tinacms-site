import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { SkipNavContent } from '@reach/skip-nav'

import { NavigationContext, NavigationActionTypes } from '../Navigation/NavigationContext'
import { Header, HeaderInner } from '../Header'
import { NavButton } from '../Navigation'
import { Edge, HeaderMenuItem } from 'interfaces/nodes'
import { FooterWrapper, Footer } from 'components/layout/Footer'

import { breakpoints, colors, textSizes, space } from 'utils/variables'
import { determineFontDimensions, Heading } from 'components/foundations'
import { Llama_Icon, GithubIcon } from 'components/foundations/icons'
import Button from 'components/foundations/Button'

interface LayoutMainInnerProps {
  className?: string
  isNavigationOpen?: boolean
  page?: string
}

interface LayoutMainProps extends LayoutMainInnerProps {
  title: string
  headerMenus?: Edge<HeaderMenuItem>[]
}

interface FontSizeProps {
  size: ReturnType<typeof determineFontDimensions>
}

const LayoutMain: React.SFC<LayoutMainProps> = ({ children, title, className, headerMenus, page }) => {
  const { state, dispatch } = React.useContext(NavigationContext)

  return (
    <StyledLayoutMain className={className} isNavigationOpen={state.isOpen}>
      <Header>
        <HeaderInner hideOnDesktop>
          <NavButton
            icon="hamburger"
            fill={colors.hunterOrange}
            onClick={() => dispatch({ type: NavigationActionTypes.TOGGLE_DRAWER })}
          >
            Toggle Drawer
          </NavButton>
          <LogoWrapper>
            <HomepageLink
              to="/"
              size={determineFontDimensions('heading', 400)}
              onClick={() => dispatch({ type: NavigationActionTypes.CLOSE_DRAWER })}
            >
              <Llama_Icon color={`${colors.hunterOrange}`} />
            </HomepageLink>
          </LogoWrapper>
        </HeaderInner>
        <HeaderInner hideOnMobile contents="center">
          <DocumentationMenu>
            {headerMenus &&
              headerMenus.map(({ node }) => {
                if (node.external) {
                  return (
                    <a key={node.id} href={node.href} target="_blank" rel="noopener noreferrer">
                      <Heading as="h1" size={100}>
                        {node.label}
                      </Heading>
                    </a>
                  )
                }
                return (
                  <Button
                    key={node.id}
                    to={node.href}
                    bgColor={page === 'teams' ? `${colors.darkPurple}` : `${colors.white}`}
                    textColor={`${colors.hunterOrange}`}
                    height="40"
                  >
                    {node.label}
                  </Button>
                )
              })}
          </DocumentationMenu>
          <HeaderCta>
            <iframe
              src="https://ghbtns.com/github-btn.html?user=tinacms&repo=tinacms&type=star&count=true&size=large"
              frameborder="0"
              scrolling="0"
              width="160px"
              height="30px"
            ></iframe>
          </HeaderCta>
        </HeaderInner>
      </Header>
      <StyledMainContent>
        <SkipNavContent>{children}</SkipNavContent>
      </StyledMainContent>
      <FooterWrapper>
        <Footer headerMenus={headerMenus} />
      </FooterWrapper>
    </StyledLayoutMain>
  )
}

export default LayoutMain

const HeaderCta = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  a {
    margin-left: 20px;
    flex: 0 0 auto;
  }
  .github {
    display: inline-block;
    width: 35px;
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
  }
  svg {
    width: 100%;
    height: auto;
    padding: 0;
    position: relative;
    display: block;
  }
`

const StyledLayoutMain = styled('div')<LayoutMainInnerProps>`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  position: relative;
  /* transition: margin-left 0.3s ease; */
`

const LogoWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin: 0 24px;
`

const DocumentationMenu = styled('nav')`
  display: flex;
  flex-direction: row;
  padding: 0 ${space.xs}px;
  a {
    padding: 8px 0;
    color: ${colors.grey07};
    font-size: ${textSizes[300].fontSize}px;
    line-height: ${textSizes[300].lineHeight}px;
    font-weight: 600;

    &:hover,
    &:focus,
    &.active {
      color: ${colors.blue07};
      text-decoration: none;
      outline: none;
    }

    &:not(:first-child) {
      margin-left: ${space.xSmallDesktop}px;
    }
  }
`

const StyledMainContent = styled('section')`
  flex-grow: 1;
`

const HomepageLink = styled(Link)<FontSizeProps>`
  color: ${colors.grey09};
  font-size: ${props => props.size.fontSize};
  line-height: ${props => props.size.lineHeight};
  font-weight: ${props => props.size.fontWeight};
  display: flex;
  padding-top: 10px;
  /* height: 15px; */

  &:hover,
  &:focus {
    color: ${colors.grey09};
    text-decoration: none;
  }
  svg {
    height: 45px;
    @media (min-width: ${breakpoints.lg}px) {
      height: 50px;
    }
  }
  @media (min-width: ${breakpoints.lg}px) {
    height: 50px;
  }
`
