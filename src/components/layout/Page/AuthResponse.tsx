import React from 'react'
import Helmet from 'react-helmet'
import StyledButton from 'components/foundations/Button'
import { Page } from 'components/layout/Page'
import { styledWrapper as styled } from 'utils/primitives'
import { Heading, Text } from 'components/foundations'
import { colors } from 'utils/variables'

import IndexLayout from 'layouts'

interface Props {
  message: string
}

export const AuthResponse: React.FC<Props> = props => (
  <IndexLayout hideNav={true}>
    <BgColor />
    <Page>
      <Helmet>
        <title>{props.message}</title>
      </Helmet>
      <div>
        <Inner>
          <Heading as="h2" size="h2" color={`${colors.mintChocoChip}`}>
            {props.message}
          </Heading>
          <DottedLine />
          <Text as="p" size={400} color={`${colors.mintChocoChip}`}>
            You can now close this window.
          </Text>
          <Actions>
            <DocsButton bgColor={colors.lightPurple} to="/docs">
              Need help? Check out our docs
            </DocsButton>
          </Actions>
        </Inner>
      </div>
    </Page>
  </IndexLayout>
)

export default AuthResponse

const Inner = styled('div')`
  text-align: center;
`

const Actions = styled.div`
  display: flex;
  margin: 32px auto 32px auto;
  justify-content: center;
`

const DocsButton = styled(StyledButton)`
  text-decoration: none;
`

const DottedLine = styled.span`
  display: block;
  width: 120px;
  height: 1px;
  border-bottom: 3px dotted ${colors.hunterOrange};
  margin: 32px auto 32px auto;
`

const BgColor = styled('aside')`
  background-color: ${colors.darkPurple};
  width: 100vw;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -10;
`
