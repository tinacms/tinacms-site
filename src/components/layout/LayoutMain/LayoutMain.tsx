import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { SkipNavContent } from '@reach/skip-nav';

import { NavigationContext, NavigationActionTypes } from '../Navigation/NavigationContext';
import { Header, HeaderInner } from '../Header';
import { NavButton } from '../Navigation';
import { Edge, HeaderMenuItem } from 'interfaces/nodes';
import { FooterWrapper, Footer } from 'components/layout/Footer'


import { breakpoints, dimensions, colors, textSizes, space } from 'utils/variables';
import { isActive } from 'utils/helpers';
import { determineFontDimensions, Heading } from 'components/foundations';
import { Wordmark, Llama_Icon } from 'components/foundations/icons'


interface LayoutMainInnerProps {
  className?: string;
  isNavigationOpen?: boolean;
}

interface LayoutMainProps extends LayoutMainInnerProps {
  title: string;
  headerMenus?: Edge<HeaderMenuItem>[];
}

interface FontSizeProps {
  size: ReturnType<typeof determineFontDimensions>;
}

const StyledLayoutMain = styled('div')<LayoutMainInnerProps>`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  position: relative;
  transition: margin-left 0.3s ease;
`;

const LogoWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin: 0 24px;
`;

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
      margin-left: 24px;
    }
  }
`;

const StyledCTAButton = styled('button')`
  background-color: ${colors.hunterOrange};
  color: ${colors.seafoam};
  border-radius: 100px;
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
    height: 35px;
  }
  @media(min-width:${breakpoints.lg}px) {
    height: 50px;
  }
`;

const LayoutMain: React.SFC<LayoutMainProps> = ({ children, title, className, headerMenus }) => {
  const { state, dispatch } = React.useContext(NavigationContext);

  return (
    <StyledLayoutMain className={className} isNavigationOpen={state.isOpen}>
      <Header fixed>
        <HeaderInner hideOnDesktop>
          <NavButton
            icon="hamburger"
            fill={colors.grey05}
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
               <Llama_Icon color={`${colors.burntOrange}`}/>
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
                      <Heading as="h1" size={100}>{node.label}</Heading>
                    </a>
                  );
                }
                return (
                  <Link key={node.id} getProps={isActive} to={node.href}>
                    <Heading as="h1" size={100}>{node.label}</Heading>
                  </Link>
                );
              })}
              <StyledCTAButton>
                <Heading as="h1" size={100} color={`${colors.seafoam}`}>GET STARTED</Heading>
              </StyledCTAButton>

          </DocumentationMenu>
        </HeaderInner>
      </Header>
      <SkipNavContent>{children}</SkipNavContent>
      <FooterWrapper>
        <Footer headerMenus={headerMenus} />
      </FooterWrapper>
    </StyledLayoutMain>
  );
};

export default LayoutMain;
