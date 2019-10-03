import React from 'react';
import styled, { css } from 'styled-components';
import { breakpoints } from 'utils/variables';

interface HeaderInnerProps {
  className?: string;
  contents?: "center" | 'space-around' | 'space-between' | 'space-evenly' | 'flex-start' | 'flex-end';
  hideOnMobile?: boolean;
  hideOnDesktop?: boolean;
}

const HideOnMobile = css`
  @media (max-width: ${breakpoints.lg - 1}px) {
    display: none;
  }
`;

const HideOnDesktop = css`
  @media (min-width: ${breakpoints.lg}px) {
    display: none;
  }
`;

const Wrapper = styled('div')<HeaderInnerProps>`
  height: inherit;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  justify-content: ${props => props.contents};
  ${props => props.hideOnMobile && HideOnMobile}
  ${props => props.hideOnDesktop && HideOnDesktop}
  @media(min-width: ${breakpoints.lg}px) {
    svg {
      height: inherit;
      padding: 8px 0px 16px 48px;
    }
  }
`;

const HeaderInner: React.SFC<HeaderInnerProps> = ({ children, className, contents, ...rest }) => (
  <Wrapper className={className} contents={contents} {...rest}>
    {children}
  </Wrapper>
);

HeaderInner.defaultProps = {
  className: undefined,
  contents: 'space-between'
};

export default HeaderInner;
