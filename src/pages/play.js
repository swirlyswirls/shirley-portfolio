import React from 'react'
import { Helmet } from 'react-helmet'
import get from 'lodash/get'
import Layout from '../components/layout'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'


function Play({ data }) {
  const headerText = data.allContentfulPlayPage.edges[0].node.headerText

  const playPreviewProjects = data.allContentfulPlayProjectPreview.edges.map(
    project => {
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
    <div>
      <Layout>
      <Helmet title={siteTitle} />
        <h1>{headerText}</h1>
        {playPreviewProjects}
      </Layout>

    </div>
  )
}

export default Play

export const pageQuery = graphql`
  query PlayQuery {
    allContentfulPlayPage {
      edges {
        node {
          headerText
        }
      }
    }
    allContentfulPlayProjectPreview {
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
