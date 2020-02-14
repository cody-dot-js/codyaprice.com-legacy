module.exports = {
  siteMetadata: {
    title: "Cody A. Price",
    author: "Cody A. Price",
    description: "My personal website.",
    siteUrl: "https://codyaprice.com/",
    topNavigationRoutes: [
      {
        to: "/blog",
        display: "Blog"
      },
      {
        to: "/projects",
        display: "Projects"
      },
      {
        to: "/about",
        display: "About"
      }
    ],
    socials: [
      {
        id: "github",
        user: "dev-cprice",
        url: "https://github.com/dev-cprice"
      },
      {
        id: "linkedin",
        user: "cody-price-56889b108",
        url: "https://www.linkedin.com/in/cody-price-56889b108/"
      },
      {
        id: "twitter",
        user: "devcprice",
        url: "https://twitter.com/devcprice"
      },
      {
        id: "medium",
        user: "@dev.cprice",
        url: "https://medium.com/@dev.cprice"
      },
      {
        id: "instagram",
        user: "lokcal_styles",
        url: "https://www.instagram.com/lokcal_styles/"
      },
      {
        id: "facebook",
        user: "lokcal.styles",
        url: "https://fb.me/lokcal.styles"
      },
      {
        id: "dribbble",
        user: "styles_",
        url: "https://dribbble.com/styles_"
      }
    ]
  },
  plugins: [
    "gatsby-plugin-emotion",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-146469183-1",
        head: true
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/blog`,
        name: "blog"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/assets`,
        name: "assets"
      }
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          "gatsby-remark-numbered-footnotes",
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 800
            }
          },
          {
            resolve: "gatsby-remark-responsive-iframe",
            options: {
              wrapperStyle: "margin-bottom: 1.0725rem"
            }
          },
          "gatsby-remark-autolink-headers",
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              showLineNumbers: true
            }
          },
          "gatsby-remark-copy-linked-files"
        ],
        plugins: ["gatsby-remark-images", "gatsby-remark-autolink-headers"]
      }
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-feed",
      options: {
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(edge => ({
                ...edge.node.frontmatter,
                description: edge.node.excerpt,
                date: edge.node.frontmatter.date,
                url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                custom_elements: [{ "content:encoded": edge.node.html }]
              }))
            },
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            title: "codyaprice.com RSS Feed",
            output: "/rss.xml"
          }
        ]
      }
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "codyaprice.com",
        short_name: "codyaprice",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#663399",
        display: "minimal-ui",
        icon: "content/assets/icon.png"
      }
    },
    "gatsby-plugin-offline",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography"
      }
    },
    {
      resolve: "gatsby-redirect-from",
      options: {
        query: "allMdx"
      }
    },
    "gatsby-plugin-meta-redirect" // make sure this is always the last one
  ]
}
