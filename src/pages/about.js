import React from "react"
import { Helmet } from "react-helmet"
import get from "lodash/get"
import Layout from "../components/layout"
import Img from "gatsby-image"
import { v4 as uuidv4 } from "uuid"
import { graphql } from "gatsby"

function About({ data }) {
  const siteTitle = get(this, "props.data.site.siteMetadata.title")

  const headerText = data.allContentfulAboutPage.edges[0].node.headerText

  const bodyText = data.allContentfulAboutPage.edges[0].node.bodyText.content.map(
    (obj) => {
      return <p key={uuidv4()}>{obj.content[0].value}</p>
    }
  )

  const connectText = data.allContentfulAboutPage.edges[0].node.connectText

  const emailUrl = data.allContentfulAboutPage.edges[0].node.emailUrl

  const instagramUrl = data.allContentfulAboutPage.edges[0].node.instagramUrl

  const linkedinUrl = data.allContentfulAboutPage.edges[0].node.linkedinUrl

  const topLeftImage =
    data.allContentfulAboutPage.edges[0].node.topLeftImage.fluid

  const bottomRightImage =
    data.allContentfulAboutPage.edges[0].node.bottomRightImage.fluid

  return (
    <>
      <Layout>
        <Helmet title={siteTitle} />
        <p>FROM ABOUT PAGE</p>

        <p>{headerText}</p>

        {bodyText}

        {connectText}

        {emailUrl}

        {instagramUrl}

        {linkedinUrl}

        <div style={{ width: "600px" }}>
          <Img fluid={topLeftImage} />
        </div>

        <div style={{ width: "600px" }}>
          <Img fluid={bottomRightImage} />
        </div>
      </Layout>
    </>
  )
}

export default About

export const pageQuery = graphql`
  query AboutQuery {
    allContentfulAboutPage {
      edges {
        node {
          headerText
          bodyText {
            content {
              content {
                value
              }
            }
          }
          connectText
          emailUrl
          instagramUrl
          linkedinUrl
          topLeftImage {
            fluid {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          bottomRightImage {
            fluid {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`
