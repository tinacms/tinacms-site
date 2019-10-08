import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'
import { globalHistory } from '@reach/router'

import { MenuNode, Edge, HeaderMenuItem } from 'interfaces/nodes'
import { determineFontDimensions, Heading } from 'components/foundations'
import { colors, layerIndexes, breakpoints, dimensions, space } from 'utils/variables'
import { Llama_Icon } from 'components/foundations/icons'
import { isActive } from 'utils/helpers'

import { NavigationContext, NavigationActionTypes } from './NavigationContext'
import NavigationMenu from './NavigationMenu'
import NavButton from './NavButton'

interface ToggleableProps {
  isOpen?: boolean
}

const Wrapper = styled('aside')<ToggleableProps>`
  position: fixed;
  transition: all 0.3s ease;
  background-color: ${colors.white};

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: ${layerIndexes.dialog};
  overflow-y: auto;

  @media (min-width: ${breakpoints.md}px) and (max-width: ${breakpoints.lg - 1}px) {
    width: ${dimensions.widths.sidebar.sm}px;
    box-shadow: none;
  }

  @media(min-width: ${breakpoints.lg}px) {

    background-color: transparent;
  }

  @media (max-width: ${breakpoints.lg - 1}px) {
    position: fixed;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    width: ${dimensions.widths.sidebar.md}px;
    padding-bottom: 5rem;
    overflow-y: auto;
    pointer-events: auto;
    transform: translate(${props => (props.isOpen ? '0' : '-100%')}, 0);
    transition: transform 0.3s ease;
  }

  @media (min-width: ${breakpoints.lg}px) {
    position: absolute;
    z-index: 1000;
    top: 0;
    left: 0;
    box-shadow: none;
  }
`

const WrapperInner = styled('nav')`
  margin-top: ${dimensions.heights.header}px;

  @media (min-width: ${breakpoints.lg}px) {
    width: 200px;
    overflow: none;
  }
`

const Header = styled('div')`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${dimensions.heights.header}px;
  padding: 0 24px;
  background-color: ${colors.white};
  z-index: ${layerIndexes.stickyNav};

  @media(min-width: ${breakpoints.lg}px) {
    background-color: transparent;
  }
`

interface HeaderInnerProps {
  hideOnMobile?: boolean
  hideOnDesktop?: boolean
}

const HideOnMobile = css`
  @media (max-width: ${breakpoints.lg - 1}px) {
    display: none;
  }
`

const HideOnDesktop = css`
  @media (min-width: ${breakpoints.lg}px) {
    display: none;
  }
`

const HeaderInner = styled('div')<HeaderInnerProps>`
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  height: inherit;
  ${props => props.hideOnMobile && HideOnMobile}
  ${props => props.hideOnDesktop && HideOnDesktop}
`

interface FontSizeProps {
  size: ReturnType<typeof determineFontDimensions>
}

const HomepageLink = styled(Link)<FontSizeProps>`
  color: ${colors.grey09};
  font-size: ${props => props.size.fontSize};
  font-size: ${props => props.size.lineHeight};
  font-weight: ${props => props.size.fontWeight};
  height: inherit;
  svg {
    height: 100%;
  }
  padding: ${space.sm}px;
  &:hover,
  &:focus {
    color: ${colors.grey09};
    text-decoration: none;
  }
`

const DocumentationMenu = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  a {
    padding: 8px 0;
    color: ${colors.grey07};

    &:hover,
    &:focus,
    &.active {
      color: ${colors.darkMustardYellow};
      text-decoration: none;
      outline: none;
    }
  }

  ${HideOnDesktop}
`

const DocumentationNav = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 24px;
`

interface NavigationProps {
  title?: string
  navigation?: Edge<MenuNode>[]
  headerMenus?: Edge<HeaderMenuItem>[]
}

const menuIsActive = (node: MenuNode) => {
  const currentUrl = globalHistory.location.pathname
  if (node.slug && currentUrl.includes(node.slug)) {
    return true
  }
  return (
    node.items &&
    node.items.reduce((isActive, node) => {
      if (node.slug && currentUrl.includes(node.slug)) {
        return true
      }
      return isActive
    }, false)
  )
}

function Navigation({ title, navigation, headerMenus }: NavigationProps) {
  const { state, dispatch } = React.useContext(NavigationContext)

  let initialMenuState: any = {}
  if (navigation) {
    navigation.map(({ node }) => {
      initialMenuState[node.id] = menuIsActive(node)
    })
  }

  const [openMenus, setOpenMenus] = React.useState(initialMenuState) as any

  const createMenuToggle = (key: any) => {
    return (isOpen: boolean) => {
      let newOpenMenus = openMenus
      newOpenMenus[key] = isOpen
      setOpenMenus(newOpenMenus)
    }
  }

  return (
    <Wrapper isOpen={state.isOpen}>
      <Header>
        <HeaderInner hideOnMobile>
          <HomepageLink
            to="/"
            size={determineFontDimensions('heading', 400)}
            onClick={() => dispatch({ type: NavigationActionTypes.CLOSE_DRAWER })}
          >
            <Llama_Icon color={`${colors.burntOrange}`} />
          </HomepageLink>
        </HeaderInner>
        <HeaderInner hideOnDesktop>
          <Heading as="h1" size={300}>
            Menu
          </Heading>
          {
            <NavButton
              icon="x"
              fill={colors.darkBurntOrange}
              onClick={() => dispatch({ type: NavigationActionTypes.TOGGLE_DRAWER })}
            >
              Toggle Drawer
            </NavButton>
          }
        </HeaderInner>
      </Header>
      <WrapperInner>
        <DocumentationMenu>
          {headerMenus &&
            headerMenus.map(({ node }) => {
              if (node.external) {
                return (
                  <a key={node.id} href={node.href} target="_blank" rel="noopener noreferrer">
                    {node.label}
                  </a>
                )
              }

              return (
                <Link key={node.id} getProps={isActive} to={node.href}>
                  {node.label}
                </Link>
              )
            })}
        </DocumentationMenu>
        {navigation && (
          <DocumentationNav onClick={() => dispatch({ type: NavigationActionTypes.TOGGLE_DRAWER })}>
            {navigation.map(({ node }) => (
              <NavigationMenu
                key={node.title}
                menuKey={node.title}
                node={node}
                isOpen={openMenus[node.id]}
                setIsOpen={createMenuToggle(node.id)}
              />
            ))}
          </DocumentationNav>
        )}
      </WrapperInner>
    </Wrapper>
  )
}


export default Navigation
