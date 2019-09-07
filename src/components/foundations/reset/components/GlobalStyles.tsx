import { createGlobalStyle } from 'styled-components';
import reboot from '../styles/reboot';
import base from '../styles/base';
import code from '../styles/code';
import React from 'react';

const GlobalStyles = createGlobalStyle`
${reboot}
${base}
${code}
`;

export default React.memo(() => <GlobalStyles />);
