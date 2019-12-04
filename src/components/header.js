import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header>
    <h1>
      <Link to="/">
        {siteTitle}
      </Link>
    </h1>
    <span><a href="mailto:amanda@iung.me">amanda@iung.me</a></span>
    <nav>
      <ul>
        <li><Link to="/sobre">sobre</Link></li>
        <li><Link to="/blog">blog</Link></li>
        <li><Link to="/">resumé</Link></li>
        <li><Link to="/contato">contato</Link></li>
      </ul>
    </nav>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
