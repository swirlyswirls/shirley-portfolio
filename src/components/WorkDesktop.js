import React, { useState, useEffect } from "react"
// import get from "lodash/get"
import Img from "gatsby-image"
// import { graphql } from "gatsby"
import styled from "styled-components"
import { Link } from "gatsby"
import breakpoint from "../styles/breakpoints"
import { ProjectSection, TitleContainer, ProjectNumber, Title, Arrow, BodyInner, Heading, BodyText, TagList, TagItem, Divider } from "../styles/work"

const Wrapper = styled.main`
  max-width: 1242px;
  width: calc(100% - 60px);
  margin: auto;

  @media only screen and ${breakpoint.device.md} {
    max-width: 636px;
  }
`

const WrapperInner = styled.article`
  display: flex;
  justify-content: space-between;
  margin-top: 35px;

  @media only screen and ${breakpoint.device.md} {
    flex-direction: column-reverse;
  }
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

function WorkDesktop(data) {
  const [projectImagesDesktop, setProjectImagesDesktop] = useState([])

  const [projectId, setProjectId] = useState(0)

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

  // const siteTitle = get(this, "props.data.site.siteMetadata.title")

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
            <TagItem key={index} hover>
              {(index ? ", " : "") + tag}
            </TagItem>
          )
        } else {
          return <TagItem key={index}>{(index ? ", " : "") + tag}</TagItem>
        }
      })

      return (
        <>
          <Link to="/">
            <ProjectSection
              key={project.node.id}
              onMouseEnter={() => hoverPreviewImage(project.node.id)}
            >
              {projectId === project.node.id ? (
                <>
                  <TitleContainer>
                    <ProjectNumber hover>0{index + 1}</ProjectNumber>
                    <Title hover>{project.node.projectTitle}</Title>
                    <Arrow hover>→</Arrow>
                  </TitleContainer>

                  <BodyInner>
                    <BodyText hover>{project.node.projectBody}</BodyText>
                    <TagList hover>{tagsItems}</TagList>
                  </BodyInner>
                </>
              ) : (
                <>
                  <TitleContainer>
                    <ProjectNumber>0{index + 1}</ProjectNumber>
                    <Title>{project.node.projectTitle}</Title>
                    <Arrow> →</Arrow>
                  </TitleContainer>

                  <BodyInner>
                    <BodyText>{project.node.projectBody}</BodyText>
                    <TagList>{tagsItems}</TagList>
                  </BodyInner>
                </>
              )}

              {/* Check the array to see if its the last item to not add divider */}
              {index + 1 !== arrayLength && <Divider />}
            </ProjectSection>
          </Link>
        </>
      )
    }
  )

  return (
    <>
      <Wrapper>
        <WrapperInner>
          <LeftContent>
            <Heading>{headerText}</Heading>
            {leftContentPreview}
          </LeftContent>

          <RightContent>
            <div>
              <Img fluid={currentImageDesktop} />
            </div>
          </RightContent>
        </WrapperInner>
      </Wrapper>
    </>
  )
}

export default WorkDesktop


