import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { Heading } from 'components/foundations'
import { colors, space } from 'utils/variables'
import { rgba } from 'polished'

interface ButtonProps {
  to: string
  bgColor: string
  textColor?: string
  height?: string
  key?: string
  isExternal?: boolean
}

const StyledButton = styled(Link)<ButtonProps>`
  width: max-content;
  filter: drop-shadow(1px 2px 18px rgb(0, 0, 0, 12%));
  transition: filter 250ms ease;
  display: flex;
  align-items: center;
  background-color: ${props => props.bgColor};
  color: ${props => props.textColor};
  border-radius: 100px;
  cursor: pointer;
  text-transform: uppercase;
  height: ${props => props.height}px;
  padding: 0;
  &:hover,
  &:focus {
    text-decoration: none;
    filter: drop-shadow(1px 5px 18px rgb(0, 0, 0, 25%));
    transition: filter 250ms ease;
  }
  &:focus {
    box-shadow: 0 0 0 3px ${p => rgba(p.bgColor, 0.5)};
  }
  &:focus,
  &:active {
    outline: none;
  }
  &:active {
    filter: none;
  }
  h5 {
    padding: 0 ${space.md}px;
  }
`
const StyledExternalButton = styled('a')<ButtonProps>`
  width: max-content;
  filter: drop-shadow(1px 2px 18px rgb(0, 0, 0, 12%));
  transition: filter 250ms ease;
  display: flex;
  align-items: center;
  background-color: ${props => props.bgColor};
  color: ${props => props.textColor};
  border-radius: 100px;
  text-transform: uppercase;
  height: ${props => props.height}px;
  padding: 0;
  &:hover,
  &:focus {
    text-decoration: none;
    filter: drop-shadow(1px 5px 18px rgb(0, 0, 0, 25%));
    transition: filter 250ms ease;
  }
  &:focus {
    box-shadow: 0 0 0 3px ${p => rgba(p.bgColor, 0.5)};
  }
  &:focus,
  &:active {
    outline: none;
  }
  &:active {
    filter: none;
  }
  h5 {
    padding: 0 ${space.md}px;
  }
`

const Button: React.SFC<ButtonProps> = ({ to, bgColor, textColor, height, children, isExternal }) => {
  return isExternal ? (
    <StyledExternalButton
      to={to}
      href={`${to}`}
      target="_blank"
      bgColor={bgColor}
      textColor={textColor}
      height={height}
    >
      <Heading as="h5" size="label" color={`${textColor}`}>
        {children}
      </Heading>
    </StyledExternalButton>
  ) : (
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
  textColor: colors.seafoam,
}

export default Button
