import React from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"

const StyledNav = styled.nav`
  padding: 16px 40px;
`

const StyledUl = styled.ul`
  display: flex;
  align-items: center;
  list-style-type: none;
  margin: 0;

  li {
    margin-right: 60px;
    font-family: "WorkSans-Medium";
    text-decoration: none;
  }

  a {
    text-decoration: none;
    font-size: var(--text-18);
    color: var(--color-black);
  }

  a:hover {
    border-bottom: 3px solid var(--color-link);
    padding-bottom: 8px;
    /* position: relative; */
  }
`

function Navigation() {
  const data = useStaticQuery(graphql`
    query NavQuery {
      allContentfulAsset(filter: { title: { eq: "Logo" } }) {
        edges {
          node {
            fluid {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  `)

  const logoImg = data.allContentfulAsset.edges[0].node.fluid

  return (
    <StyledNav role="navigation">
      <StyledUl>
        <li>
          <Link to="/" activeClassName="nav-active">
            <div style={{ width: "48px" }}>
              <Img fluid={logoImg} />
            </div>
          </Link>
        </li>
        {/* <li>
          <Link to="/blog">Blog</Link>
        </li>` */}
        <li>
          <Link
            to="/about"
            activeClassName="nav-active"
          >
            about
          </Link>
        </li>
        <li>
          <Link to="/work" activeClassName="nav-active">
            work
          </Link>
        </li>
        <li>
          <Link to="/play" activeClassName="nav-active">
            play
          </Link>
        </li>
      </StyledUl>
    </StyledNav>
  )
}

export default Navigation
