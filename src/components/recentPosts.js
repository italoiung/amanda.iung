import React, { Fragment } from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'

const RecentPosts = ({ data, style }) => {
    const posts = data.edges.map(post => {
        let alt = post.node.featured_media.alt_text ? post.node.featured_media.alt_text : post.node.title
        let categories = post.node.categories.map((categorie, index) =>
            <Fragment key={categorie.id + "-" + post.node.id + "-recent"}>
                {(index ? ', ' : '')}<Link to={"/blog/categoria/" + categorie.slug}>{categorie.name}</Link>
            </Fragment>
        )
        return (
            <article key={post.node.id + "-recent"}>
                <figure>
                    <Img alt={alt} fixed={post.node.featured_media.localFile.childImageSharp.fixed} style={{ maxHeight: '100vw' }} />
                </figure>
                <div className={style.FlexSection___blog_recent_postMeta}>
                    <time>{post.node.date}</time>
                    <div>
                        {categories}
                    </div>
                    <h3>{post.node.title}</h3>
                    <Link to={"/blog/" + post.node.slug} className={style.FlexSection___blog_recent_postMeta_readMore}>Ler Mais</Link>
                </div>
            </article>
        )
    })

    return posts
}

RecentPosts.propTypes = {
    data: PropTypes.object.isRequired,
    style: PropTypes.object.isRequired
}

export default RecentPosts