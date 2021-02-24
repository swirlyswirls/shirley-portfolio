import React from 'react'
import { Helmet } from 'react-helmet'
import get from 'lodash/get'
import Layout from '../components/layout'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'

function Work({ data }) {
  const headerText = data.allContentfulWorkPage.edges[0].node.headerText

  const workPreviewProjects = data.allContentfulWorkProjectPreview.edges.map(
    project => {
      // console.log(project.node.projectImage.fluid)


      return (
        <div key={project.node.id}>
          <p>{project.node.projectTitle}</p>
          <p>{project.node.projectBody}</p>

          <div style={{ width: '600px' }}>
            <Img fluid={project.node.projectImage.fluid} />
          </div>
        </div>
      )
    }
  )

  const siteTitle = get(this, 'props.data.site.siteMetadata.title')


  return (
    <>
      <Layout>
      <Helmet title={siteTitle} />
        <h1>{headerText}</h1>
        {workPreviewProjects}
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
    allContentfulWorkProjectPreview(sort: {order: DESC, fields: id}) {
      edges {
        node {
          id
          projectTitle
          projectBody
          projectImage {
            fluid {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`
