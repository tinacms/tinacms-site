import React from 'react'
import styled from 'styled-components'
import { colors, layerIndexes, breakpoints } from 'utils/variables'

interface ToggleableProps {
  isOpen?: boolean
}

const Wrapper = styled('button')<ToggleableProps>`
  display: inline-block;
  position: fixed;
  bottom: 24px;
  right: 24px;
  padding: 8px 12px;
  background-color: ${props => (props.isOpen ? colors.darkPurple : colors.seafoam)};
  color: ${props => (props.isOpen ? colors.seafoam : colors.darkPurple)};
  cursor: pointer;
  z-index: ${layerIndexes.overlay - 1};
  border-radius: 25rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 2px 4px 1px rgba(0, 0, 0, 0.15);

  &:hover,
  &:focus {
    outline: none;
  }

  @media (min-width: ${breakpoints.lg}px) and (max-width: ${breakpoints.xl - 1}px) {
    z-index: ${layerIndexes.dialog + 2};
  }

  @media (min-width: ${breakpoints.xl}px) {
    display: none;
  }
`

const Inner = styled('div')<ToggleableProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;

  &.is-open {
    & svg {
      transform: rotate(180deg);
    }
  }
`

interface TocFloatingButtonProps {
  className?: string
  tocIsOpen?: boolean
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void
}

const TocFloatingButton: React.SFC<TocFloatingButtonProps> = ({ className, tocIsOpen, onClick }) => (
  <Wrapper className={className} onClick={onClick} isOpen={tocIsOpen} aria-label="Toggle Table of Contents">
    Table of Contents
  </Wrapper>
)

export default TocFloatingButton
