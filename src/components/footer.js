import PropTypes from "prop-types"
import React from "react"

const Footer = ({ authorUrl, author }) =>
    <footer>
            <ul>
                <li>
                    <a href="mailto:amanda@iung.me">Email</a>
                </li>
                <li>
                    <a href="#">Twitter</a>
                </li>
                <li>
                    <a href="#">Instagram</a>
                </li>
                <li>
                    <a href="#">LinkedIn</a>
                </li>
                <li>
                    <a href="#">YouTube</a>
                </li>
                <li>
                    <a href="#">Facebook</a>
                </li>
            </ul>
            <p>Copyright © {new Date().getFullYear()}<br />por <a href={authorUrl}>{author}</a></p>
    </footer>

Footer.propTypes = {
    authorUrl: PropTypes.string,
}

Footer.defaultProps = {
    authorUrl: ``,
}

export default Footer
