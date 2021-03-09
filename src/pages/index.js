import React from 'react'
import { Link } from 'gatsby'
import breakpoint from '../styles/breakpoints'

import { graphql } from 'gatsby'
// import { v4 as uuidv4 } from "uuid"
import Img from 'gatsby-image'

import styled from 'styled-components'
// import get from 'lodash/get'
// import { Helmet } from 'react-helmet'
// import Hero from '../components/hero'
import Layout from '../components/layout'
// import ArticlePreview from '../components/article-preview'
// import Navigation from '../components/navigation'
// import HomeDesktopBg from '../images/wallpaper-home-desktop.svg'
// import HomeTabletBg from '../images/wallpaper-home-tablet.svg'


// const StyledHomeBackground = styled.div`
//   background: url(${HomeDesktopBg});
//   /* background-position: center; */
//   /* background-repeat: no-repeat; */
//   background-size: cover;

//   @media only screen and ${breakpoint.device.md} {
//     background: url(${HomeTabletBg});
//     /* background-size: 100% 100%; */
//   }
// `

const StyledWrapper = styled.main`
  display: flex;
  justify-content: space-between;
  max-width: 1341px;
  margin: auto;
  width: calc(100% - 60px);

  @media only screen and ${breakpoint.device.md} {
    justify-content: center;
  }
`

// Method #1 - Add fixed width
// Method #2 - Add calculated width
const LeftContent = styled.section`
  display: flex;
  align-items: center;
  /* width: 498px; */
  width: calc(50% - 25px);
  padding-left: 100px;
  /* margin-right: 100px; */

  @media only screen and ${breakpoint.device.md} {
    height: 90vh;
    width: 540px;
    padding: 0;
    /* padding-right: 50px; */
  }
`

const BodyText = styled.article``

const RightContent = styled.section`
  border-radius: 10px;
  border: solid 2px #33241e;
  /* width: 641px; */
  width: calc(50% - 25px);

  @media only screen and ${breakpoint.device.md} {
    display: none;
  }
`

const StyledTopText = styled.div`
  font-family: Montserrat-bold;
  font-size: 60px;
  color: #fe3966;
  margin-bottom: 40px;
`

const StyledMiddleText = styled.div`
  font-family: WorkSans-SemiBold;
  font-size: 30px;
  color: #33241e;
  margin-bottom: 30px;
  line-height: 1.5;
`

const StyledBottomText = styled.div`
  font-family: WorkSans;
  font-size: 18px;
  line-height: 1.56;
  color: #8e7f79;
  margin-bottom: 50px;
`

const RecentWorkText = styled.div`
  a {
    font-family: WorkSans-SemiBold;
    font-size: 16px;
    color: #51d3f5;
  }
`



function RootIndex({ data }) {
  // const siteTitle = get(this, 'props.data.site.siteMetadata.title')
  // const posts = get(this, 'props.data.allContentfulBlogPost.edges')
  // const [author] = get(this, 'props.data.allContentfulPerson.edges')

  const topText = data.allContentfulHomePage.edges[0].node.topText

  const middleText =
    data.allContentfulHomePage.edges[0].node.middleText.middleText

  const bottomText =
    data.allContentfulHomePage.edges[0].node.bottomText.bottomText

  const recentWorkLinkText =
    data.allContentfulHomePage.edges[0].node.recentWorkLinkText

  const image = data.allContentfulHomePage.edges[0].node.image.fluid

  return (
    // <Layout location={this.props.location}>
    <Layout>
      {/* <StyledHomeBackground> */}
        {/* <Navigation /> */}
        <StyledWrapper>
          {/* <Helmet title={siteTitle} /> */}
          {/* <Hero data={author.node} /> */}
          {/* <div className='wrapper'>
          <h2 className='section-headline'>Home - Recent articles</h2>
            <ul className='article-list'>
              {posts.map(({ node }) => {
                return (
                  <li key={node.slug}>
                    <ArticlePreview article={node} />
                  </li>
                )
              })}
            </ul> */}

          <LeftContent>
            <BodyText>
              <StyledTopText>{topText}</StyledTopText>

              <StyledMiddleText>{middleText}</StyledMiddleText>

              <StyledBottomText>{bottomText}</StyledBottomText>
              <RecentWorkText>
                <Link to="/work">{recentWorkLinkText}</Link>
              </RecentWorkText>
            </BodyText>
          </LeftContent>

          <RightContent>
            <Img fluid={image} />
          </RightContent>
        </StyledWrapper>
      {/* </StyledHomeBackground> */}
    </Layout>
  )
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    allContentfulHomePage {
      edges {
        node {
          topText
          middleText {
            middleText
          }
          bottomText {
            bottomText
          }
          recentWorkLinkText
          image {
            fluid {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`
