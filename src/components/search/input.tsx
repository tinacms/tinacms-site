import React from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'

import { SearchIcon, Form, Input } from './styles'
import styled from 'styled-components'

export default connectSearchBox(({ refine, ...rest }) => (
  <Form>
    <Input type="text" placeholder="Search" aria-label="Search" onChange={e => refine(e.target.value)} {...rest} />
    <SearchIcon>
      <MagnifyingIconPlaceholder />
    </SearchIcon>
  </Form>
)) as any

//TODO - use a magnifying glass icon instead of a llama
const MagnifyingIconPlaceholder = styled.div`
  background-color: blue;
  width: 10px;
  height: 10px;
`
