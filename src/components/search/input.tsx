import React from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'
import * as debounce from 'lodash/debounce'
import { SearchIcon, Form, Input } from './styles'
import styled from 'styled-components'

export default connectSearchBox(({ refine, ...rest }) => {
  const debouncedSearch = debounce((e: any) => refine(e.target.value), 300)
  const onChange = (e: any) => {
    e.persist()
    debouncedSearch(e)
  }

  return (
    <Form>
      <Input type="text" placeholder="Search" aria-label="Search" onChange={onChange} {...rest} />
      <SearchIcon>
        <MagnifyingIconPlaceholder />
      </SearchIcon>
    </Form>
  )
}) as any

//TODO - use a magnifying glass icon instead of a llama
const MagnifyingIconPlaceholder = styled.div`
  background-color: blue;
  width: 10px;
  height: 10px;
`
