import { Link, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => {
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
          }
        }
      }
    }
  }
  `)

  const { allWordpressWpApiMenusMenusItems } = data
  const menuItems = allWordpressWpApiMenusMenusItems.edges[0].node.items.map(menuItem =>
    <li key={menuItem.object_slug}><Link to={menuItem.url}>{menuItem.title}</Link></li>
  )

  return (
    <header>
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
