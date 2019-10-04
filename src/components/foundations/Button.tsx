import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { Heading } from 'components/foundations'
import { colors, space } from 'utils/variables'

interface ButtonProps {
  to: string,
  bgColor: string,
  textColor?: string,
  height?: string,
  key?: string
}

const StyledButton = styled(Link)<ButtonProps>`
  display: flex;
  align-items: center;
  background-color: ${props => props.bgColor};
  color: ${props => props.textColor};
  border-radius: 100px;
  text-transform: uppercase;
  height: ${props => props.height}px;
  padding: 0;
  :hover,
  :focus {
    text-decoration: none;
  }
  h5 {
    padding: 0 ${space.md}px;
  }
`

const Button:React.SFC<ButtonProps> = ({to, bgColor, textColor, height, children}) => {
  return (
    <StyledButton to={to} bgColor={bgColor} textColor={textColor} height={height}>
      <Heading as="h5" size="label" color={`${textColor}`}>
        {children}
      </Heading>
    </StyledButton>
  )
}

Button.defaultProps = {
  height: '45',
  bgColor: colors.hunterOrange,
  textColor: colors.seafoam
}

export default Button;
