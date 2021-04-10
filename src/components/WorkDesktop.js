import React, { useState, useEffect } from "react"
// import get from "lodash/get"
import Img from "gatsby-image"
// import { graphql } from "gatsby"
import styled from "styled-components"
import { Link } from "gatsby"
import breakpoint from "../styles/breakpoints"

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

const ProjectSection = styled.section``

const TitleContainer = styled.span`
  font-family: WorkSans-SemiBold;
  font-size: 30px;
  margin-top: 19.5px;
  margin-bottom: 20px;
  display: flex;
`
const ProjectNumber = styled.span`
  margin-right: 20px;
  text-decoration: none;
  color: ${(prop) =>
    prop.hover ? "var(--color-black)" : "var(--color-light-gray)"};
`

const Title = styled.div`
  color: ${(prop) =>
    prop.hover ? "var(--color-blue)" : "var(--color-light-gray)"};
  text-decoration: ${(prop) => (prop.hover ? "underline" : "none")};
  margin-right: 10px;
`

const Arrow = styled.div`
  color: ${(prop) =>
    prop.hover ? "var(--color-blue)" : "var(--color-light-gray)"};
`

const BodyInner = styled.div`
  margin-left: 50px;
`

const Heading = styled.div`
  font-family: Montserrat-Bold;
  font-size: 36px;
  color: var(--color-black);
  margin-bottom: 50px;
`

const BodyText = styled.div`
  font-family: WorkSans;
  font-size: 16px;
  line-height: 1.75;
  margin-bottom: 22px;
  color: ${(prop) =>
    prop.hover ? "var(--color-black)" : "var(--color-light-gray)"};
`

const TagList = styled.ul`
  padding: 0 10px;
  margin-left: 0;
  margin-bottom: 18px;
  border-radius: ${(prop) => (prop.hover ? "5px" : null)};
  background-color: ${(prop) => (prop.hover ? "#f9f5f3" : null)};
`

const TagItem = styled.li`
  font-family: WorkSans;
  font-size: 16px;
  line-height: 1.75;
  color: ${(prop) =>
    prop.hover ? "var(--color-gray)" : "var(--color-light-gray)"};
  display: inline;
`

const Divider = styled.div`
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


