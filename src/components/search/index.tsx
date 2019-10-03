import React, { useState, useEffect, createRef } from 'react'
import { InstantSearch, Index, Hits, connectStateResults } from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite'

import { Root, PoweredBy, HitsWrapper, IndexContainer, NoResultsLabel } from './styles'
import Input from './Input'
import { hitComponents } from './hitComps'
import styled from 'styled-components'

const IndexResults = connectStateResults(({ searchResults: res, children }: any) => {
  return res && res.nbHits > 0 ? children : null
})

const IndexStats = connectStateResults(({ searchResults: res }) => {
  return <>{res && res.nbHits > 0 && `${res.nbHits} result${res.nbHits > 1 ? `s` : ``}`}</>
})

const useClickOutside = (ref: any, handler: any, events?: any) => {
  if (!events) events = [`mousedown`, `touchstart`]
  const detectClickOutside = (event: any) => !ref.current.contains(event.target) && handler()
  useEffect(() => {
    for (const event of events) document.addEventListener(event, detectClickOutside)
    return () => {
      for (const event of events) document.removeEventListener(event, detectClickOutside)
    }
  })
}

export default function Search({ indices, collapse }: any) {
  const ref = createRef()
  const [query, setQuery] = useState(``)
  const [focus, setFocus] = useState(false)
  const searchClient = algoliasearch(
    (process.env.GATSBY_ALGOLIA_APP_ID || 'PRU9K3QYUN') as string, //dummy search index if none exist
    (process.env.GATSBY_ALGOLIA_SEARCH_KEY || '8e4e11e7083e01125acb0cb93b13e92b') as string
  )
  useClickOutside(ref, () => setFocus(false))

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indices[0].name}
      onSearchStateChange={({ query }) => setQuery(query)}
      root={{ Root, props: { ref } }}
    >
      <Input onFocus={() => setFocus(true)} {...{ collapse, focus }} />
      {query.length > 0 && focus && (
        <HitsWrapper show={true}>
          <AllIndicesResults />
          {indices.map(({ name, title, hitComp }: { name: string; title: string; hitComp: any }) => (
            <Index key={name} indexName={name}>
              <IndexResults>
                <IndexContainer>
                  <header>
                    <h3>{title}</h3>
                    <IndexStats />
                  </header>
                  {/*
                  // @ts-ignore */}
                  <Hits hitComponent={hitComponents[hitComp](() => setFocus(false))} />
                </IndexContainer>
              </IndexResults>
            </Index>
          ))}
          <PoweredBy />
        </HitsWrapper>
      )}
    </InstantSearch>
  )
}

const AllIndicesResults = connectStateResults(({ allSearchResults, searchState: state, children }: any) => {
  const hasResults =
    allSearchResults && Object.values(allSearchResults).some((results: any) => results && results.nbHits > 0)
  return (
    <>
      {children}
      {!hasResults && <NoResultsLabel>No results found for '{state.query}'</NoResultsLabel>}
    </>
  )
})
