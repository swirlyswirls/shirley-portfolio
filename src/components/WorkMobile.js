import React, { useState } from "react"
import styled from 'styled-components'
import Carousel, { arrowsPlugin } from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'
import '../styles/carousel-overwrite.css'
import {
  TitleContainer,
  ProjectNumber,
  Title,
  Arrow,
  BodyInner,
  // Heading,
  BodyText,
  TagList,
  TagItem
} from '../styles/work'

const ProjectContainer = styled.section`
  /* display: flex; */
  /* flex-direction: column; */
  /* align-items: center; */
  /* justify-content: center; */
`

const ArrowIcon = styled.div`
  width: 70px;
  height: 70px;
  padding: 11px 23px 10px 1px;
  border: solid 2px #33241e;
  background-color: #ffffff;
  border-radius: 50%;
  /* dispay: flex; */
`

const ArrowIconLeft = styled(ArrowIcon)`
  overflow: auto;
  margin: auto;
  position: absolute;
  left: 0;
  bottom: 0;
  right: 100px;
  border: solid 2px orange;
`

const ArrowIconRight = styled(ArrowIcon)`
  overflow: auto;
  margin: auto;
  position: absolute;
  left: 100px;
  bottom: 0;
  right: 0;
`

function WorkMobile(data) {

  const [projectId, setProjectId] = useState(0)
  
  const projectArray = data.allContentfulWorkProjectPreview.edges.map(
    (project, index) => {

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
        <ProjectContainer key={project.node.id}>
          <TitleContainer>
            <ProjectNumber>0{index + 1}</ProjectNumber>
            <Title>{project.node.projectTitle}</Title>
            <Arrow> →</Arrow>
          </TitleContainer>

          <BodyInner>
            <BodyText>{project.node.projectBody}</BodyText>
            <TagList>{tagsItems}</TagList>
          </BodyInner>
        </ProjectContainer>
      )
    }
  )

  return (
    <Carousel
      plugins={[
        {
          resolve: arrowsPlugin,
          options: {
            arrowLeft: <ArrowIconLeft />,
            arrowLeftDisabled:<ArrowIconLeft />,
            arrowRight: <ArrowIconRight />,
            arrowRightDisabled: <ArrowIconRight />,
            addArrowClickHandler: true,
          },
        },
      ]}
    >
      {projectArray}
    </Carousel>
  )
}

export default WorkMobile
