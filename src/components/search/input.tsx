import React from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'
import * as debounce from 'lodash/debounce'
import { SearchIcon, Input, SearchContainer } from './styles'
import styled from 'styled-components'

export default connectSearchBox(({ refine, ...rest }) => {
  const debouncedSearch = debounce((e: any) => refine(e.target.value), 250)
  const onChange = (e: any) => {
    e.persist()
    debouncedSearch(e)
  }

  return (
    <SearchContainer>
      <Input type="text" placeholder="Search" aria-label="Search" onChange={onChange} {...rest} />
      <SearchIcon>
        <MagnifyingIconPlaceholder />
      </SearchIcon>
    </SearchContainer>
  )
}) as any

//TODO - use a magnifying glass icon instead of a llama
const MagnifyingIconPlaceholder = styled.div`
  background-color: blue;
  width: 10px;
  height: 10px;
`
