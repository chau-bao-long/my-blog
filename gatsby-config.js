const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `.env.${activeEnv}`,
});

module.exports = {
  siteMetadata: {
    title: 'TOP BLOG',
    author: 'Chau Bao Long',
    description: 'RECORD INTERESTING STUFFS IN MY LIFE',
    siteUrl: 'http://longcb.me/',
    social: {
      twitter: 'topcbl',
    },
    categories: [
      'ALL', 'TECHNOLOGY', 'TRAVEL', 'FOOD', 'BACKEND', 'FRONTEND', 'DEVOPS', 'ANDROID', 'OTHER',
    ],
  },
  plugins: [
    'gatsby-plugin-eslint',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'BlogAPI',
        fieldName: 'blogapi',
        url: `${process.env.API_URL}/graphql`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/blog`,
        name: 'blog',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/assets`,
        name: 'assets',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        // trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    'gatsby-plugin-feed',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Chau Bao Long Blog',
        short_name: 'LongCb Blog',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'content/assets/favicon.png',
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
  ],
};
