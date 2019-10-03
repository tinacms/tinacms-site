import React from 'react'
import { Highlight, Snippet } from 'react-instantsearch-dom'
import { Link } from 'gatsby'
import { Hit } from 'react-instantsearch-core'

const DocHit = (clickHandler: any) => ({ hit }: { hit: Hit }) => (
  <div>
    <Link to={(hit.fields as any).slug} onClick={clickHandler}>
      <h4>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </h4>
    </Link>
    <Snippet attribute="excerpt" hit={hit} tagName="mark" />
  </div>
)

const BlogHit = (clickHandler: any) => ({ hit }: { hit: Hit }) => (
  <div>
    <Link to={(hit.fields as any).slug} onClick={clickHandler}>
      <h4>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </h4>
    </Link>
    <div>
      &nbsp;
      <Highlight attribute="date" hit={hit} tagName="mark" />
    </div>
    <Snippet attribute="excerpt" hit={hit} tagName="mark" />
  </div>
)

export const hitComponents = {
  ['DocHit']: DocHit,
  ['BlogHit']: BlogHit,
}
