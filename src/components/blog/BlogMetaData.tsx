import React from 'react'
import styled from 'styled-components'

import { colors, space, breakpoints } from 'utils/variables'

interface BlogMetaData_Props {
  author: String
  date: Date | String
}

export default function BlogMetaData({ author, date }: BlogMetaData_Props) {
  return (
    <StyledBlogMetaData>
      <p>By: {author}</p>
      <p>{date}</p>
    </StyledBlogMetaData>
  )
}

const StyledBlogMetaData = styled('div')`
  width: 100%;
  justify-content: space-between;
  display: flex;
  flex-grow: 1;
  p {
    margin: ${space.sm}px 0 ${space.xs}px 0;
    color: ${colors.grey04};
    display: block;
  }
  p:first-child {
    max-width: 250px;
  }
`
