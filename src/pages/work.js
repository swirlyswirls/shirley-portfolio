import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import get from 'lodash/get'
import Layout from '../components/layout'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { Link } from 'gatsby'

const StyledWrapper = styled.main`
  max-width: 1242px;
  width: calc(100% - 60px);
  margin: auto;
`

const StyledWrapperInner = styled.article`
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  /* flex-direction: column; */
  counter-reset: css-counter 0;
  /* height: 80vh; */
`

const StyledProjectSection = styled.section``

const StyledTitle = styled.div`
  font-family: WorkSans-SemiBold;
  font-size: 30px;
  margin-top: 19.5px;
  margin-bottom: 20px;
  color: ${(prop) =>
    prop.hover ? 'var(--color-blue)' : 'var(--color-light-gray)'};

  &::before {
    counter-increment: css-counter 1;
    content: '0' counter(css-counter) ' ';
  }
`

const StyledHeading = styled.div`
  font-family: Montserrat-Bold;
  font-size: 36px;
  color: var(--color-black);
  margin-bottom: 50px;
`

const StyledBodyText = styled.div`
  font-family: WorkSans;
  font-size: 16px;
  line-height: 1.75;
  margin-bottom: 22px;
  color: ${(prop) =>
    prop.hover ? 'var(--color-black)' : 'var(--color-light-gray)'};
`

const StyledTagList = styled.ul`
  padding: 0 10px;
  margin-left: 0;
  margin-bottom: 18px;
  border-radius: ${(prop) => (prop.hover ? '5px' : null)};
  background-color: ${(prop) => (prop.hover ? '#f9f5f3' : null)};
`

const StyledTagItem = styled.li`
  font-family: WorkSans;
  font-size: 16px;
  line-height: 1.75;
  /* color: var(--color-light-gray); */
  color: ${(prop) =>
    prop.hover ? 'var(--color-gray)' : 'var(--color-light-gray)'};
  display: inline;
`

const StyledDivider = styled.div`
  width: 100%;
  height: 1px;
  border: solid 1px #ece3e0;
`

const LeftContent = styled.div`
  width: 449px;
  /* height: 80vh; */

  a {
    text-decoration: none;
  }
`

const RightContent = styled.div`
  width: 641px;
`

function Work({ data }) {
  const [projectImages, setProjectImages] = useState([])

  const [projectId, setProjectId] = useState(0)

  // const [isHover, setIsHover] = useState(false)

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

  const hoverPreviewImage = (projectId) => {
    for (let i = 0; i < projectImages.length; i++) {
      if (projectId === projectImages[i].id) {
        setCurrentImage(projectImages[i].image)
        setProjectId(projectId)
        // setIsHover(true)
      }
    }
  }

  const leftContentPreview = data.allContentfulWorkProjectPreview.edges.map(
    (project, index) => {
      const arrayLength = data.allContentfulWorkProjectPreview.edges.length

      const tagsItems = project.node.tags.map((tag, index) => {
        if (projectId === project.node.id) {
          return (
            <StyledTagItem key={index} hover>
              {(index ? ', ' : '') + tag}
            </StyledTagItem>
          )
        } else {
          return (
            <StyledTagItem key={index}>
              {(index ? ', ' : '') + tag}
            </StyledTagItem>
          )
        }
      })

      return (
        <>
          <Link to="/">
            <StyledProjectSection
              key={project.node.id}
              onMouseEnter={() => hoverPreviewImage(project.node.id)}
            >
              {projectId === project.node.id ? (
                <>
                  <StyledTitle hover>{project.node.projectTitle}</StyledTitle>
                  <StyledBodyText hover>
                    {project.node.projectBody}
                  </StyledBodyText>
                  <StyledTagList hover>{tagsItems}</StyledTagList>
                </>
              ) : (
                <>
                  <StyledTitle>{project.node.projectTitle}</StyledTitle>
                  <StyledBodyText>{project.node.projectBody}</StyledBodyText>
                  <StyledTagList>{tagsItems}</StyledTagList>
                </>
              )}

              {/* Check the array to see if its the last item to not add divider */}
              {index + 1 !== arrayLength && <StyledDivider />}
            </StyledProjectSection>
          </Link>
        </>
      )
    }
  )

  return (
    <>
      <Layout>
        <Helmet title={siteTitle} />

        <StyledWrapper>
          <StyledWrapperInner>
            <LeftContent>
              <StyledHeading>{headerText}</StyledHeading>
              {leftContentPreview}
            </LeftContent>

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
    allContentfulWorkProjectPreview {
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
          tags
        }
      }
    }
  }
`
