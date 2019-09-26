import React from 'react';
import styled from 'styled-components';
import { colors, textSizes } from 'utils/variables';

const Wrapper = styled('footer')`
  padding-top: 24px;
  border-top: 1px solid ${colors.grey02};

  p {
    margin: 0;
    font-size: ${textSizes[300].fontSize}px;
    line-height: ${textSizes[300].lineHeight}px;
  }
`;

const Footer: React.SFC = () => (
  <Wrapper>
    <p>

    </p>
  </Wrapper>
);

export default Footer;
