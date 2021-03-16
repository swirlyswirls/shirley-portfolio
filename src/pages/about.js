import React from 'react'
import { Helmet } from 'react-helmet'
import get from 'lodash/get'
import Layout from '../components/layout'
import Img from 'gatsby-image'
import { v4 as uuidv4 } from 'uuid'
import { graphql } from 'gatsby'
import EmailIcon from '../images/email-icon.svg'
import InstagramIcon from '../images/instagram-icon.svg'
import LinkedIcon from '../images/linkedin-icon.svg'
import styled from 'styled-components'
// import breakpoint from '../styles/breakpoints'
// import AboutDesktopBg from '../images/wallpaper-about-desktop.svg'
// import AboutTabletBg from '../images/wallpaper-about-tablet.svg'
// import Navigation from '../components/navigation'

// const StyledAboutBackground = styled.div`
//   background: url(${AboutDesktopBg});
//   background-position: center;
//   background-repeat: no-repeat;
//   background-size: cover;

//   @media only screen and ${breakpoint.device.md} {
//     background: url(${AboutTabletBg});
//     width: 100%;
//   }
// `

const StyledHeaderText = styled.div`
  font-family: Montserrat-bold;
  font-size: 36px;
  margin-bottom: 50px;
`

const StyledGreetingText = styled.div`
  font-family: WorkSans;
  font-size: 30px;
  font-weight: 600;
  color: var(--color-black);
  margin-bottom: 20px;
`
const StyledBodyText = styled.div`
  font-family: WorkSans;
  font-size: 16px;
  line-height: 1.75;
  color: var(--color-black);
  margin-bottom: 60px;
`

const StyledConnectText = styled.div`
  font-family: WorkSans;
  font-size: 24px;
  font-weight: 600;
  color: var(--color-black);
  margin-bottom: 20px;

  @media only screen and (max-width: 975px) {
    display: none;
  }
`

const StyledWrapper = styled.main`
  display: flex;
  justify-content: space-between;
  max-width: 1160px;
  width: calc(100% - 60px);
  margin: 130px auto auto auto;

  @media only screen and (max-width: 975px) {
    flex-direction: column;
  }
`

const StyledSocialMediaWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 232px;
  /* margin: auto; */

  a {
    text-align: center;
    text-decoration: none;
  }

  @media only screen and (max-width: 975px) {
    display: none;
  }
`

const StyledSocialMediaText = styled.div`
  font-family: WorkSans;
  font-size: 14px;
  line-height: 2;
  text-decoration: none;
  color: var(--color-gray);
`

const StyledLeftContent = styled.section`
  /* flex: 1 1 50%; */
  width: 460px;
  margin-right: 100px;

  @media only screen and (max-width: 975px) {
    width: 540px;
    /* width: 100%; */
    /* margin: auto auto 118px auto; */
    margin: auto;
  }

  @media only screen and (max-width: 600px) {
    width: 100%;
    /* margin-bottom: 60px; */
  }
`

const StyledRightContent = styled.section`
  /* flex: 1 1 50%; */
  width: 603px;
  position: relative;

  @media only screen and (max-width: 975px) {
    margin: auto;
  }

  @media only screen and (max-width: 600px) {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`

const StyledLeftTopImg = styled.div`
  width: 243px;
  position: absolute;
  border-radius: 8px;
  border: solid 1.6px #33241e;
  z-index: 1;
`

const StyledRightBottomImg = styled.div`
  width: 460px;
  position: absolute;
  right: 0;
  bottom: 90px;

  @media only screen and (max-width: 975px) {
    top: 200px;
    left: 150px;
  }

  @media only screen and (max-width: 600px) {
    display: none;
  }
`

function About({ data }) {
  const siteTitle = get(this, 'props.data.site.siteMetadata.title')

  const headerText = data.allContentfulAboutPage.edges[0].node.headerText

  const greetingText = data.allContentfulAboutPage.edges[0].node.greetingText

  const bodyText = data.allContentfulAboutPage.edges[0].node.bodyText.content.map(
    (obj) => {
      return <p key={uuidv4()}>{obj.content[0].value}</p>
    }
  )

  const connectText = data.allContentfulAboutPage.edges[0].node.connectText

  const emailUrl = data.allContentfulAboutPage.edges[0].node.emailUrl

  const instagramUrl = data.allContentfulAboutPage.edges[0].node.instagramUrl

  const linkedinUrl = data.allContentfulAboutPage.edges[0].node.linkedinUrl

  const topLeftImage =
    data.allContentfulAboutPage.edges[0].node.topLeftImage.fluid

  const bottomRightImage =
    data.allContentfulAboutPage.edges[0].node.bottomRightImage.fluid

  return (
    <>
      <Layout>
        <Helmet title={siteTitle} />

        {/* <StyledAboutBackground> */}
        {/* <Navigation /> */}

        <StyledWrapper>
          <StyledLeftContent>
            <StyledHeaderText>{headerText}</StyledHeaderText>

            <StyledGreetingText>{greetingText}</StyledGreetingText>

            <StyledBodyText>{bodyText}</StyledBodyText>

            <StyledConnectText>{connectText}</StyledConnectText>

            <StyledSocialMediaWrapper>
              <a href={emailUrl} target="_blank" rel="noreferrer">
                <img src={EmailIcon} alt="Email Logo" />
                <StyledSocialMediaText>email</StyledSocialMediaText>
              </a>

              <a href={instagramUrl} target="_blank" rel="noreferrer">
                <img src={InstagramIcon} alt="Email Logo" />
                <StyledSocialMediaText>insta</StyledSocialMediaText>
              </a>

              <a href={linkedinUrl} target="_blank" rel="noreferrer">
                <img src={LinkedIcon} alt="Email Logo" />
                <StyledSocialMediaText>linkedin</StyledSocialMediaText>
              </a>
            </StyledSocialMediaWrapper>
          </StyledLeftContent>

          <StyledRightContent>
            <StyledLeftTopImg>
              <Img fluid={topLeftImage} />
            </StyledLeftTopImg>

            <StyledRightBottomImg>
              <Img fluid={bottomRightImage} />
            </StyledRightBottomImg>
          </StyledRightContent>
        </StyledWrapper>
        {/* </StyledAboutBackground> */}
      </Layout>
    </>
  )
}

export default About

export const pageQuery = graphql`
  query AboutQuery {
    allContentfulAboutPage {
      edges {
        node {
          headerText
          greetingText
          bodyText {
            content {
              content {
                value
              }
            }
          }
          connectText
          emailUrl
          instagramUrl
          linkedinUrl
          topLeftImage {
            fluid {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          bottomRightImage {
            fluid {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`
