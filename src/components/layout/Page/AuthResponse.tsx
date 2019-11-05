import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'

import { Page } from 'components/layout/Page'
import { styledWrapper as styled } from 'utils/primitives'
import { Heading, Text } from 'components/foundations'
import IndexLayout from 'layouts'

interface Props {
  message: string
}

export const AuthResponse: React.FC<Props> = props => (
  <IndexLayout>
    <Page>
      <Helmet>
        <title>{props.message}</title>
      </Helmet>
      <div>
        <Inner>
          <Heading as="h1" size={800} color="grey09" m={0}>
            {props.message}
          </Heading>
          <Text as="p" size={400} color="grey07">
            You can now close this window.
          </Text>
          <br />
          <Text as="p" size={400} color="grey07">
            <Link to="/docs">Need help? Check out our docs</Link>
          </Text>
        </Inner>
      </div>
    </Page>
  </IndexLayout>
)

export default AuthResponse

const Inner = styled('div')`
  text-align: center;
`
