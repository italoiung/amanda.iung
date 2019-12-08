import { Link, useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle, style }) => {
  const data = useStaticQuery(graphql`
    query {
      allWordpressWpApiMenusMenusItems(filter: { slug: { eq: "header" } }) {
        edges {
          node {
            slug
            name
            items {
              title
              url
              object_slug
              attr
            }
          }
        }
      }
      wordpressWpMedia(mime_type: {eq: "application/pdf"}, title: {eq: "avi"}) {
        localFile {
          publicURL
        }
      }
    }
  `)

  const { allWordpressWpApiMenusMenusItems } = data
  const { wordpressWpMedia: { localFile: { publicURL: source } } } = data
  const menuItems = allWordpressWpApiMenusMenusItems.edges[0].node.items.map(menuItem => {
    let element
    if (menuItem.attr === "pdf") {
      element = <li key={menuItem.object_slug}><a href={source} target="_blank" rel="noopener noreferrer">{menuItem.title}</a></li>
    } else {
      element = <li key={menuItem.object_slug}><Link to={menuItem.url}>{menuItem.title}</Link></li>
    }
    return element
  })

  return (
    <header className={style.Header}>
      <h1>
        <Link to="/">
          {siteTitle}
        </Link>
      </h1>
      <span><a href="mailto:amanda@iung.me">amanda@iung.me</a></span>
      <nav>
        <ul>
          {menuItems}
        </ul>
      </nav>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
