import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'

//Query and display featured posts
const FeaturedPosts = ({ style }) => {
    const data = useStaticQuery(graphql`
        query FeaturedPosts {
            allWordpressPost(filter: {status: {eq: "publish"}, meta: {meta_checkbox: {eq: "yes"}}}, limit: 2) {
                edges {
                    node {
                        id
                        title
                        slug
                        date(formatString: "DD/MM/YYYY")
                        featured_media {
                            alt_text
                            title
                            localFile {
                                childImageSharp {
                                    fixed(width: 575, height: 575, cropFocus: ENTROPY) {
                                        ...GatsbyImageSharpFixed_withWebp
                                    }
                                }
                            }
                        }
                        categories {
                            slug
                            name
                        }
                    }
                }
            }
        }
    `)

    const { allWordpressPost } = data
    const posts = allWordpressPost.edges.map(post => {
        let alt = post.node.featured_media.alt_text ? post.node.featured_media.alt_text : post.node.title
        let title = post.node.featured_media.title ? post.node.featured_media.title : post.node.title
        let categories = post.node.categories.map((categorie, index) =>
            <span key={categorie.id + "-" + post.node.id + "-featured"}>{(index ? ', ' : '')}{categorie.name}</span>
        )
        return (
            <Link key={post.node.id + "-featured"} to={"/blog/" + post.node.slug}>
                <article>
                    <figure>
                        <Img alt={alt} title={title} fixed={post.node.featured_media.localFile.childImageSharp.fixed} style={{ maxHeight: "100vw" }} />
                    </figure>
                    <div className={style.FlexSection___blog_featured_postMeta}>
                        <time>{post.node.date}</time>
                        <div>
                            {categories}
                        </div>
                        <h3>{post.node.title}</h3>
                    </div>
                </article>
            </Link>
        )
    })

    return posts
}

FeaturedPosts.propTypes = {
    style: PropTypes.object.isRequired
}

export default FeaturedPosts