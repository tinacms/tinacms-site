import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql, StaticQuery } from 'gatsby'
import { WindowLocation } from '@reach/router'

import { AksaraReset } from 'components/foundations'
import { LayoutRoot } from 'components/layout/LayoutRoot'
import { DocsLayoutMain } from 'components/layout/LayoutMain'
import { DocsNavigation } from 'components/layout/Navigation'
import { Overlay } from 'components/layout/Overlay'

import { MenuNode, Edge, HeaderMenuItem } from 'interfaces/nodes'
import { SiteMetadata } from 'interfaces/gatsby'

interface DocsLayoutProps {
  location?: WindowLocation
  sidebarNav: Edge<MenuNode>[]
}

interface DataProps {
  site: {
    siteMetadata: SiteMetadata
  }
  navigationMenus: {
    edges: Edge<MenuNode>[]
  }
  headerMenus: {
    edges: Edge<HeaderMenuItem>[]
  }
}

const DocsLayout: React.FC<DocsLayoutProps> = ({ location, children, sidebarNav }) => {
  return (
    <StaticQuery query={query}>
      {(data: DataProps) => {
        const { siteMetadata } = data.site
        return (
          <AksaraReset>
            <LayoutRoot>
              <Helmet>
                <title>{siteMetadata.title}</title>
                <meta name="description" content={siteMetadata.description} />
                <meta name="keywords" content={siteMetadata.keywords} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={siteMetadata.title} />
                <meta property="og:site_name" content={siteMetadata.title} />
                <meta property="og:description" content={siteMetadata.description} />
                <meta property="og:url" content={`${siteMetadata.siteUrl}${location ? location.pathname : '/'}`} />
                <meta property="og:image" content={`${siteMetadata.siteUrl}/img/tina-facebook-share.png`} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={siteMetadata.title} />
                <meta name="twitter:description" content={siteMetadata.description} />
                <meta name="twitter:url" content={`${siteMetadata.siteUrl}${location ? location.pathname : '/'}`} />
                <meta name="twitter:image" content={`${siteMetadata.siteUrl}/img/tina-twitter-share.png`} />
              </Helmet>
              <DocsNavigation
                title={siteMetadata.sidebarTitle || siteMetadata.title}
                navigation={sidebarNav ? sidebarNav.edges : null}
                headerMenus={data.headerMenus.edges}
              />
              <Overlay />
              <DocsLayoutMain
                title={siteMetadata.sidebarTitle || siteMetadata.title}
                headerMenus={data.headerMenus.edges}
              >
                {children}
              </DocsLayoutMain>
            </LayoutRoot>
          </AksaraReset>
        )
      }}
    </StaticQuery>
  )
}

export default DocsLayout

const query = graphql`
  query DocsLayoutQuery {
    site {
      siteMetadata {
        title
        sidebarTitle
        description
        siteUrl
        keywords
        author {
          name
          url
          email
        }
      }
    }
    headerMenus: allNavigationJson {
      edges {
        node {
          id
          label
          href
          external
        }
      }
    }
  }
`
