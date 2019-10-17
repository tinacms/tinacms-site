import styled from 'styled-components'
import { dimensions, breakpoints, colors, layerIndexes } from 'utils/variables'

interface ToggleableProps {
  isOpen?: boolean
}

const TocWrapper = styled('section')<ToggleableProps>`
  display: block;
  width: 15%;
  font-size: 14px;
  line-height: 18px;

  @media (min-width: ${breakpoints.xl}px) {
    flex: 0 0 240px;
    position: fixed;
    top: ${dimensions.heights.header + 24}px;
    max-height: calc(100vh - ${dimensions.heights.header + 32}px);
    overflow-y: auto;
  }

  @media (max-width: ${breakpoints.xl - 1}px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    margin-left: 0;
    margin-top: ${dimensions.heights.header}px;
    padding: 24px;
    background-color: ${colors.white};
    z-index: ${layerIndexes.overlay - 5};
    visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
    opacity: ${props => (props.isOpen ? 1 : 0)};
    transform: ${props => (props.isOpen ? 'translateY(0)' : 'translateY(64px)')};
    transition: visibility 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
    overflow-y: auto;
  }

  @media (min-width: ${breakpoints.lg}px) and (max-width: ${breakpoints.xl - 1}px) {
    margin-top: 0;
    z-index: ${layerIndexes.dialog + 1};
  }

  ul {
    padding-left: 16px;
    border-left: 1px solid ${colors.grey02};
    list-style-type: none;

    p,
    li,
    a {
      font-size: 14px !important;
      line-height: 18px !important;
    }

    li {
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }

    ul {
      border-left: none;
    }
  }

  a {
    color: ${colors.grey04};
    text-decoration: none;

    &:hover,
    &:focus {
      color: ${colors.grey07};
    }
  }
`

export default TocWrapper
