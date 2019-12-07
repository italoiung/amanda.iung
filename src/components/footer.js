import { useStaticQuery, graphql } from 'gatsby'
import PropTypes from "prop-types"
import React from "react"

const Footer = ({ authorUrl, author }) => {
    const data = useStaticQuery(graphql`
    query {
        allWordpressWpApiMenusMenusItems(filter: { slug: { eq: "footer" } }) {
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
        <li key={menuItem.object_slug}><a href={menuItem.url}>{menuItem.title}</a></li>
    )

    return (
        <footer>
            <ul>
                {menuItems}
            </ul>
            <p>Copyright © {new Date().getFullYear()}<br /> por <a href={authorUrl}>{author}</a></p>
        </footer>
    )
}

Footer.propTypes = {
    authorUrl: PropTypes.string,
}

Footer.defaultProps = {
    authorUrl: ``,
}

export default Footer
