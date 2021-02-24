import React from 'react'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'
import { v4 as uuidv4 } from 'uuid'
import Img from 'gatsby-image'
// import get from 'lodash/get'
// import { Helmet } from 'react-helmet'
import Hero from '../components/hero'
import Layout from '../components/layout'
// import ArticlePreview from '../components/article-preview'

function RootIndex({ data }) {
  // const siteTitle = get(this, 'props.data.site.siteMetadata.title')
  // const posts = get(this, 'props.data.allContentfulBlogPost.edges')
  // const [author] = get(this, 'props.data.allContentfulPerson.edges')

  const bodyText = data.allContentfulHomePage.edges[0].node.bodyText.content.map(
    text => {
      return <div key={uuidv4()}>{text.content[0].value}</div>
    }
  )

  const recentWorkLinkText =
    data.allContentfulHomePage.edges[0].node.recentWorkLinkText

  const image = data.allContentfulHomePage.edges[0].node.image.fluid

  // console.log(image)

  return (
    // <Layout location={this.props.location}>
    <Layout>
      <div style={{ background: '#fff' }}>
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

        <div>{bodyText}</div>

        <div>
          <Link to='/work'>{recentWorkLinkText}</Link>
        </div>

        <div style={{ width: '600px' }}>
          <Img fluid={image} />
        </div>
      </div>
    </Layout>
  )
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    allContentfulHomePage {
      edges {
        node {
          bodyText {
            content {
              content {
                value
                nodeType
              }
            }
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
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    allContentfulPerson(
      filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }
    ) {
      edges {
        node {
          name
          shortBio {
            shortBio
          }
          title
          heroImage: image {
            fluid(
              maxWidth: 1180
              maxHeight: 480
              resizingBehavior: PAD
              background: "rgb:000000"
            ) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`
