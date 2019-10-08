import React from 'react'
import styled from 'styled-components'
import { colors, space } from 'utils/variables'

export const tip = styled.span`
  display: block;
  background-color: ${colors.uberLiteMintGreen};
  border: 1px solid ${colors.liteMintGreen};
  padding: ${space.xxs}px ${space.xs}px;
  margin-bottom: ${space.xxs}px;
  margin-top: ${space.xxs}px;
`
