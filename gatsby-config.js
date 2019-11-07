'use strict'

const queries = require('./src/utils/algolia')
require('dotenv').config()
const dummyMailchimpEndpoint =
  'https://theDomainHere.us18.list-manage.com/subscribe/post?u=1512315231251&amp;id=0asd21t12e1'

const plugins = [
  {
    resolve: 'gatsby-plugin-mailchimp',
    options: {
      endpoint: process.env.NODE_ENV === 'production' ? process.env.MAILCHIMP_ENDPOINT : dummyMailchimpEndpoint,
    },
  },
  {
    resolve: 'gatsby-plugin-tinacms',
    options: {
      sidebar: {
        position: 'fixed',
        hidden: process.env.NODE_ENV === 'production',
      },
      plugins: [
        'gatsby-tinacms-json',
        'gatsby-tinacms-remark',
        {
          resolve: 'gatsby-tinacms-git',
          options: {
            defaultCommitMessage: 'Update from Tina',
            defaultCommitName: 'TinaCMS',
            defaultCommitEmail: 'tina@tinacms.org',
            pushOnCommit: true,
          },
        },
      ],
    },
  },
  {
    // keep as first gatsby-source-filesystem plugin for gatsby image support
    resolve: 'gatsby-source-filesystem',
    options: {
      path: `${__dirname}/static/img`,
      name: 'uploads',
    },
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'content',
      path: `${__dirname}/content`,
    },
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'data',
      path: `${__dirname}/data`,
    },
  },
  {
    resolve: 'gatsby-transformer-remark',
    options: {
      plugins: [
        {
          resolve: 'gatsby-remark-relative-images',
          options: {
            name: 'uploads',
          },
        },
        {
          resolve: 'gatsby-remark-images',
          options: {
            maxWidth: 704,
            quality: 90,
            wrapperStyle: 'margin-top: 32px; margin-bottom: 32px;',
            linkImagesToOriginal: false,
          },
        },
        {
          resolve: 'gatsby-remark-responsive-iframe',
          options: {
            wrapperStyle: 'margin-bottom: 1rem',
          },
        },
        {
          resolve: 'gatsby-remark-prismjs',
          options: {
            inlineCodeMarker: '›',
          },
        },
        'gatsby-remark-copy-linked-files',
        'gatsby-remark-autolink-headers',
        'gatsby-remark-smartypants',
      ],
    },
  },
  'gatsby-transformer-json',
  {
    resolve: 'gatsby-plugin-canonical-urls',
    options: {
      siteUrl: 'https://tinacms.org',
    },
  },
  'gatsby-plugin-styled-components',
  'gatsby-plugin-resolve-src',
  'gatsby-plugin-catch-links',
  'gatsby-plugin-typescript',
  'gatsby-plugin-sharp',
  'gatsby-transformer-sharp',
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-netlify-cache',
  'gatsby-plugin-netlify',
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `TinaCMS`,
      short_name: `TinaCMS`,
      start_url: `/`,
      background_color: `#E6FAF8`,
      theme_color: `#EC4815`,
      display: `standalone`,
      icon: `static/img/Favicon.png`,
    },
  },
  {
    resolve: 'gatsby-plugin-google-tagmanager',
    options: {
      id: 'GTM-5SNCV6K',
      includeInDevelopment: false,
      defaultDataLayer: { platform: 'gatsby' },
    },
  },
]

if (process.env.GATSBY_ALGOLIA_APP_ID && process.env.ALGOLIA_ADMIN_KEY && process.env.BRANCH == 'master') {
  plugins.push({
    resolve: `gatsby-plugin-algolia`,
    options: {
      appId: process.env.GATSBY_ALGOLIA_APP_ID,
      apiKey: process.env.ALGOLIA_ADMIN_KEY,
      queries,
      chunkSize: 1000,
    },
  })
}

//TODO -- add slack invite link

module.exports = {
  siteMetadata: {
    title: 'TinaCMS',
    sidebarTitle: 'TinaCMS',
    description: 'A site editor for the modern web',
    siteUrl: 'https://tinacms.org',
    roadmapUrl: 'https://github.com/tinacms/tinacms/blob/master/ROADMAP.md',
    licenseUrl: 'https://github.com/tinacms/tinacms/blob/master/LICENSE',
    keywords: 'gatsbyjs, gatsby, react, cms, next',
    social: {
      twitter: 'https://twitter.com/tina_cms',
      github: 'https://github.com/tinacms',
      slack:
        'https://join.slack.com/t/tinacms/shared_invite/enQtNzgxNDY1OTA3ODI3LTNkNWEwYjQyYTA2ZDZjZGQ2YmI5Y2ZlOWVmMjlkYmYxMzVmNjM0YTk2MWM2MTIzMmMxMDg3NWIxN2EzOWQ0NDM',
    },
    teamsWarning: 'Tina Teams is the closed-source cloud offering for TinaCMS. It is currently in closed beta.',
    author: {
      name: 'Resi Respati',
      url: 'https://resir014.xyz',
      email: 'resi@kata.ai',
    },
  },
  plugins,
}
