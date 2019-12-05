import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

const FeaturedPosts = () => {
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
                            localFile {
                                childImageSharp {
                                    fixed(width: 575, height: 575) {
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
        let categories = post.node.categories.map(categorie =>
            <span key={categorie.id + "-" + post.node.id + "-featured"} to={"/categorias/" + categorie.slug}>{categorie.name}</span>
        )
        return (
            <Link key={post.node.id + "-featured"} to={"/blog/" + post.node.slug}>
                <article>
                    <figure>
                        <Img alt={post.node.featured_media.alt_text} fixed={post.node.featured_media.localFile.childImageSharp.fixed} style={{maxHeight: "100vw"}} />
                    </figure>
                    <div className="flex-section--blog__featured__post-meta">
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

export default FeaturedPosts