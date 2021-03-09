import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import get from 'lodash/get'
import Layout from '../components/layout'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import styled from 'styled-components'

const StyledWrapper = styled.main`
  max-width: 1242px;
  width: calc(100% - 60px);
  margin: auto;
`

const StyledWrapperInner = styled.article`
  display: flex;
  justify-content: space-between;
  /* flex-direction: column; */
`

const LeftContent = styled.div`
  width: 449px;
  /* display: flex; */
`

const RightContent = styled.div`
  width: 641px;
`

function Work({ data }) {
  const [projectImages, setProjectImages] = useState([])

  const [projectId, setProjectId] = useState(0)

  const [currentImage, setCurrentImage] = useState(
    data.allContentfulWorkProjectPreview.edges[0].node.projectImage.fluid
  )

  useEffect(() => {
    const allImages = data.allContentfulWorkProjectPreview.edges.map(
      (project) => {
        return {
          id: project.node.id,
          image: project.node.projectImage.fluid,
        }
      }
    )

    setProjectImages(allImages)
  }, [data.allContentfulWorkProjectPreview.edges])

  const headerText = data.allContentfulWorkPage.edges[0].node.headerText

  const siteTitle = get(this, 'props.data.site.siteMetadata.title')

  const clickedPreviewImage = (productId) => {
    setProjectId(productId)
    for (let i = 0; i < projectImages.length; i++) {
      if (projectId === projectImages[i].id) {
        setCurrentImage(projectImages[i].image)
      }
    }
  }

  const leftContentPreview = data.allContentfulWorkProjectPreview.edges.map(
    (project) => {
      return (
        <div
          key={project.node.id}
          onClick={() => clickedPreviewImage(project.node.id)}
        >
          <div>{project.node.projectTitle}</div>
          <p>{project.node.projectBody}</p>
        </div>
      )
    }
  )

  console.log(projectId)

  return (
    <>
      <Layout>
        <Helmet title={siteTitle} />
        {/* {workPreviewProjects} */}

        <StyledWrapper>
          <h1>{headerText}</h1>
          <StyledWrapperInner>
            <LeftContent>{leftContentPreview}</LeftContent>

            <RightContent>
              <div style={{ width: '600px' }}>
                <Img fluid={currentImage} />
              </div>
            </RightContent>
          </StyledWrapperInner>
        </StyledWrapper>
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
