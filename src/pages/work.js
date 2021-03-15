import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import get from 'lodash/get'
import Layout from '../components/layout'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { Link } from 'gatsby'
import breakpoint from '../styles/breakpoints'

const StyledWrapper = styled.main`
  max-width: 1242px;
  width: calc(100% - 60px);
  margin: auto;

  @media only screen and ${breakpoint.device.md} {
    max-width: 636px;
  }
`

const StyledWrapperInner = styled.article`
  display: flex;
  justify-content: space-between;
  margin-top: 35px;

  @media only screen and ${breakpoint.device.md} {
    flex-direction: column-reverse;
  }
`

const StyledProjectSection = styled.section``

const StyledTitleContainer = styled.span`
  font-family: WorkSans-SemiBold;
  font-size: 30px;
  margin-top: 19.5px;
  margin-bottom: 20px;
  display: flex;
`
const StyledProjectNumber = styled.span`
  margin-right: 20px;
  text-decoration: none;
  color: ${(prop) =>
    prop.hover ? 'var(--color-black)' : 'var(--color-light-gray)'};
`

const StyledTitle = styled.div`
  color: ${(prop) =>
    prop.hover ? 'var(--color-blue)' : 'var(--color-light-gray)'};
  text-decoration: ${(prop) => (prop.hover ? 'underline' : 'none')};
  margin-right: 10px;
`

const StyledArrow = styled.div`
  color: ${(prop) =>
    prop.hover ? 'var(--color-blue)' : 'var(--color-light-gray)'};
`

const StyledBodyInner = styled.div`
  margin-left: 50px;
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
  width: 500px;
  padding-left: 50px;
  margin-top: 100px;
  margin-right: 100px;

  a {
    text-decoration: none;
  }

  @media only screen and (max-width: 1100px) {
    padding-left: 0;
    margin-right: 50px;
  }
`

const RightContent = styled.div`
  width: 641px;
`

function Work({ data }) {
  const [projectImagesDesktop, setProjectImagesDesktop] = useState([])

  const [projectId, setProjectId] = useState(0)

  // const [isHover, setIsHover] = useState(false)

  const [currentImageDesktop, setCurrentImageDesktop] = useState(
    data.allContentfulWorkProjectPreview.edges[0].node.projectImageDesktop.fluid
  )

  useEffect(() => {
    const allImages = data.allContentfulWorkProjectPreview.edges.map(
      (project) => {
        return {
          id: project.node.id,
          image: project.node.projectImageDesktop.fluid,
        }
      }
    )

    setProjectImagesDesktop(allImages)
  }, [data.allContentfulWorkProjectPreview.edges])

  const headerText = data.allContentfulWorkPage.edges[0].node.headerText

  const siteTitle = get(this, 'props.data.site.siteMetadata.title')

  const hoverPreviewImage = (projectId) => {
    for (let i = 0; i < projectImagesDesktop.length; i++) {
      if (projectId === projectImagesDesktop[i].id) {
        setCurrentImageDesktop(projectImagesDesktop[i].image)
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
                  <StyledTitleContainer>
                    <StyledProjectNumber hover>
                      0{index + 1}
                    </StyledProjectNumber>
                    <StyledTitle hover>{project.node.projectTitle}</StyledTitle>
                    <StyledArrow hover>→</StyledArrow>
                  </StyledTitleContainer>

                  <StyledBodyInner>
                    <StyledBodyText hover>
                      {project.node.projectBody}
                    </StyledBodyText>
                    <StyledTagList hover>{tagsItems}</StyledTagList>
                  </StyledBodyInner>
                </>
              ) : (
                <>
                  <StyledTitleContainer>
                    <StyledProjectNumber>0{index + 1}</StyledProjectNumber>
                    <StyledTitle>{project.node.projectTitle}</StyledTitle>
                    <StyledArrow> →</StyledArrow>
                  </StyledTitleContainer>

                  <StyledBodyInner>
                    <StyledBodyText>{project.node.projectBody}</StyledBodyText>
                    <StyledTagList>{tagsItems}</StyledTagList>
                  </StyledBodyInner>
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
              <div>
                <Img fluid={currentImageDesktop} />
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
