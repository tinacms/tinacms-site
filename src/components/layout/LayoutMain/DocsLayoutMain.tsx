import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { SkipNavContent } from '@reach/skip-nav'

import { NavigationContext, NavigationActionTypes } from '../Navigation/NavigationContext'
import { Header, HeaderInner } from '../Header'
import { NavButton } from '../Navigation'
import { Edge, HeaderMenuItem } from 'interfaces/nodes'

import { breakpoints, dimensions, colors, textSizes, space } from 'utils/variables'
import { isActive } from 'utils/helpers'
import { determineFontDimensions, Heading } from 'components/foundations'
import { Wordmark } from 'components/foundations/icons'
import Search from '../../search'

const searchIndices = [
  { name: `Tina-Docs`, title: `Docs`, hitComp: `DocHit` },
  { name: `Tina-Blog`, title: `Blog`, hitComp: `BlogHit` },
]

interface DocsLayoutMainInnerProps {
  className?: string
  isNavigationOpen?: boolean
}

interface DocsLayoutMainProps extends DocsLayoutMainInnerProps {
  title: string
  headerMenus?: Edge<HeaderMenuItem>[]
}

interface FontSizeProps {
  size: ReturnType<typeof determineFontDimensions>
}

const StyledDocsLayoutMain = styled('div')<DocsLayoutMainInnerProps>`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  position: relative;
  transition: margin-left 0.3s ease;

  @media (min-width: ${breakpoints.lg}px) {
    margin-left: ${dimensions.widths.sidebar.lg}px;
  }
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
    font-size: ${textSizes[400].fontSize}px;
    line-height: ${textSizes[400].lineHeight}px;
    font-weight: 600;

    &:hover,
    &:focus,
    &.active {
      color: ${colors.hunterOrange};
      text-decoration: none;
      outline: none;
    }

    &:not(:first-child) {
      margin-left: 24px;
    }
  }
`

const HomepageLink = styled(Link)<FontSizeProps>`
  color: ${colors.grey09};
  font-size: ${props => props.size.fontSize};
  line-height: ${props => props.size.lineHeight};
  font-weight: ${props => props.size.fontWeight};
  display: flex;
  height: 15px;

  &:hover,
  &:focus {
    color: ${colors.grey09};
    text-decoration: none;
  }
  svg {
  }
`

const HeaderCta = styled.div`
  margin-left: ${space.sm}px;
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

const DocsLayoutMain: React.SFC<DocsLayoutMainProps> = ({ children, title, className, headerMenus }) => {
  const { state, dispatch } = React.useContext(NavigationContext)

  return (
    <StyledDocsLayoutMain className={className} isNavigationOpen={state.isOpen}>
      <Header fixed>
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
              <Wordmark color={`${colors.lightPurple}`} />
            </HomepageLink>
          </LogoWrapper>
        </HeaderInner>
        <HeaderInner hideOnMobile contents="flex-end">
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
                  <Link key={node.id} getProps={isActive} to={node.href}>
                    <Heading as="h1" size={100}>
                      {node.label}
                    </Heading>
                  </Link>
                )
              })}
          </DocumentationMenu>
          <Search collapse indices={searchIndices} />
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
      <SkipNavContent>{children}</SkipNavContent>
    </StyledDocsLayoutMain>
  )
}

export default DocsLayoutMain
