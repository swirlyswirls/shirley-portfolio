import React from "react"
import { Helmet } from "react-helmet"
import get from "lodash/get"
import Layout from "../components/layout"
import styled from "styled-components"
import WorkMobile from "../components/WorkMobile"
import WorkDesktop from "../components/WorkDesktop"

const Desktop = styled.div`
  display: block;
  @media only screen and (max-width: 950px) {
    display: none;
  }
`

const Mobile = styled.div`
  display: none;

  @media only screen and (max-width: 950px) {
    display: block;
  }
`

function Work({ data }) {
  const siteTitle = get(this, "props.data.site.siteMetadata.title")

  // useEffect(() => {
  //   const allImages = data.allContentfulWorkProjectPreview.edges.map(
  //     (project) => {
  //       return {
  //         id: project.node.id,
  //         image: project.node.projectImageDesktop.fluid,
  //       }
  //     }
  //   )

  //   setProjectImagesDesktop(allImages)
  // }, [data.allContentfulWorkProjectPreview.edges])


  return (
    <>
      <Layout>
        <Helmet title={siteTitle} />

        <Desktop>
          <WorkDesktop {...data} />
        </Desktop>

        <Mobile>
          <WorkMobile />
        </Mobile>
      </Layout>
    </>
  )
}

export default Work



export const pageQuery = graphql`
  query WorkQuery {
    allContentfulWorkPage {
      edges {
        node {
          headerText
        }
      }
    }
    allContentfulWorkProjectPreview(sort: { order: DESC, fields: id }) {
      edges {
        node {
          id
          projectTitle
          projectBody
          projectImageDesktop {
            fluid {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          projectImageMobile {
            fluid {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          tags
        }
      }
    }
  }
`