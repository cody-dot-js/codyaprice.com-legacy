import { graphql } from "gatsby"

export const heroImage = graphql`
  fragment heroImage320 on File {
    childImageSharp {
      fluid(maxWidth: 320, traceSVG: { color: "#a44fb6" }, quality: 50) {
        ...GatsbyImageSharpFluid_withWebp_tracedSVG
      }
    }
  }
  fragment heroImage640 on File {
    childImageSharp {
      fluid(maxWidth: 640, traceSVG: { color: "#a44fb6" }, quality: 75) {
        ...GatsbyImageSharpFluid_withWebp_tracedSVG
      }
    }
  }
  fragment heroImage800 on File {
    childImageSharp {
      fluid(maxWidth: 800, traceSVG: { color: "#a44fb6" }, quality: 100) {
        ...GatsbyImageSharpFluid_withWebp_tracedSVG
      }
    }
  }
`
