import React from 'react'
import styled, { css } from 'styled-components'

export const Root = styled.div`
  position: relative;
  display: grid;
  grid-gap: 1em;
`

export const SearchIcon = styled.div`
  width: 1em;
  pointer-events: none;
`

const focus = css`
  background: white;
  color: ${props => props.theme.darkBlue};
  cursor: text;
  width: 5em;
  + ${SearchIcon} {
    color: ${props => props.theme.darkBlue};
    margin: 0.3em;
  }
`

interface CollapseProps {
  focus?: boolean
}

const collapse = css<CollapseProps>`
  width: 0;
  cursor: pointer;
  color: ${props => props.theme.lightBlue};
  + ${SearchIcon} {
    color: white;
  }
  ${props => props.focus && focus}
  margin-left: ${props => (props.focus ? `-1.6em` : `-1em`)};
  padding-left: ${props => (props.focus ? `1.6em` : `1em`)};
  ::placeholder {
    color: ${props => props.theme.gray};
  }
`

const expand = css`
  background: ${props => props.theme.veryLightGray};
  width: 6em;
  margin-left: -1.6em;
  padding-left: 1.6em;
  + ${SearchIcon} {
    margin: 0.3em;
  }
`

interface InputProps extends CollapseProps {
  collapse?: boolean
}

export const Input = styled.input<InputProps>`
  outline: none;
  border: none;
  font-size: 1em;
  background: transparent;
  transition: ${props => props.theme.shortTrans};
  border-radius: ${props => props.theme.smallBorderRadius};
  ${props => (props.collapse ? collapse : expand)};
`

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`

interface HitsWrapperProps {
  show: boolean
}

export const IndexContainer = styled.div``

export const HitsWrapper = styled.div<HitsWrapperProps>`
  display: ${props => (props.show ? `grid` : `none`)};
  max-height: 80vh;
  overflow: scroll;
  z-index: 2;
  -webkit-overflow-scrolling: touch;
  position: absolute;
  right: 0;
  top: calc(100% + 0.5em);
  width: 80vw;
  max-width: 30em;
  box-shadow: 0 0 5px 0;
  padding: 0.7em 1em 0.4em;
  background: white;
  border-radius: ${props => props.theme.smallBorderRadius};
  li + li {
    margin-top: 0.7em;
    padding-top: 0.7em;
    border-top: 1px solid ${props => props.theme.lightGray};
  }
  * {
    margin-top: 0;
    padding: 0;
  }
  ul {
    list-style: none;
  }
  > *:not(:first-child) ${IndexContainer} {
    padding-top: 1em !important;
    border-top: 2px solid ${props => props.theme.darkGray};
  }

  mark {
    color: ${props => props.theme.lightBlue};
    background: ${props => props.theme.darkBlue};
  }
  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.3em;
    h3 {
      background: ${props => props.theme.gray};
      padding: 0.1em 0em;
      border-radius: ${props => props.theme.smallBorderRadius};
    }
  }
  h3 {
    margin: 0 0 0.5em;
  }
  h4 {
    margin-bottom: 0.3em;
  }
`

export const NoResultsLabel = styled.div`
  padding: 16px 24px;
`

export const PoweredBy = styled(() => (
  <span>
    Powered by{` `}
    <a href="https://algolia.com">Algolia</a>
  </span>
))`
  font-size: 0.6em;
  text-align: end;
  padding: 0;
`
