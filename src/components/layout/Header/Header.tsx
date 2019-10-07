import React from 'react';
import styled, { css } from 'styled-components';
import { breakpoints, colors, dimensions, layerIndexes, space } from 'utils/variables';

interface HeaderProps {
  navigation?: boolean;
  absolute?: boolean;
  fixed?: boolean;
}

const isFixed = css`
  @media (min-width: ${breakpoints.lg}px) {
    /* left: ${dimensions.widths.sidebar.lg}px; */
  }
`;

const Wrapper = styled('header')<HeaderProps>`
  display: flex;
  flex-direction: column;
  position: ${props => (props.fixed ? 'fixed' : props.absolute ? 'absolute' : 'relative')};
  top: 0;
  left: 0;
  width: 100%;
  /* height: ${dimensions.heights.header}px; */
  padding: ${space.xSmallMobile}px ${space.smallMobile}px;;
  background-color: ${props => (props.navigation ? colors.grey01 : "transparent")};
  background: linear-gradient(#FAFFFE, transparent);
  z-index: ${layerIndexes.stickyNav};
  ${props => props.fixed && isFixed}
  @media(min-width: ${breakpoints.lg}px){
    padding: ${space.xSmallDesktop}px ${space.smallDesktop}px;
  }
`;

const Header: React.SFC<HeaderProps> = ({ children, absolute, fixed, navigation }) => (
  <Wrapper absolute={absolute} fixed={fixed} navigation={navigation}>
    {children}
  </Wrapper>
);

export default Header;
