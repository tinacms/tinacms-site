import React from 'react'
import styled from 'styled-components'

import { Heading } from 'components/foundations'
import { colors, space } from 'utils/variables'

interface CTAButtonProps {
  bgColor: string,
  textColor?: string,
  height?: string
}

const StyledCTAButton = styled('button')<CTAButtonProps>`
  background-color: ${props => props.bgColor};
  color: ${props => props.textColor};
  border-radius: 100px;
  text-transform: uppercase;
  height: ${props => props.height}px;
  h1 {
    padding: 0 ${space.xSmallDeskop}px;
  }
`

const CTAButton:React.SFC<CTAButtonProps> = ({bgColor, textColor, height, children}) => {
  return (
    <StyledCTAButton bgColor={bgColor} textColor={textColor} height={height}>
      <Heading as="h1" size={100} color={`${textColor}`}>
        {children}
      </Heading>
    </StyledCTAButton>
  )
}

CTAButton.defaultProps = {
  height: '45',
  bgColor: colors.hunterOrange,
  textColor: colors.seafoam
}

export default CTAButton;
