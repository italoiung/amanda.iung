import React, { Fragment } from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

const RecentPosts = () => {
    const data = useStaticQuery(graphql`
        query RecentPosts {
            allWordpressPost(filter: {status: {eq: "publish"}}, limit: 3) {
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
                                    fixed(width: 576, height: 576) {
                                        ...GatsbyImageSharpFixed_withWebp_tracedSVG
                                    }
                                }
                            }
                        }
                        categories {
                            id
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
        let categories = post.node.categories.map((categorie, index) => 
            <Fragment key={categorie.id+"-"+post.node.id+"-recent"}>
                { (index ? ', ' : '') }<Link to={"/categorias/" + categorie.slug}>{categorie.name}</Link>
            </Fragment>
        )
        return (
            <article key={post.node.id+"-recent"}>
                <figure>
                    <Img alt={post.node.featured_media.alt_text} fixed={post.node.featured_media.localFile.childImageSharp.fixed} style={{maxHeight: '100vw'}}/>
                </figure>
                <div className="flex-section--blog__recent__post-meta">
                    <time>{post.node.date}</time>
                    <div>
                        {categories}
                    </div>
                    <h3>{post.node.title}</h3>
                    <Link to={"/blog/" + post.node.slug} className="flex-section--blog__recent__post-meta__read-more">Ler Mais</Link>
                </div>
            </article>
        )
    })

    return posts
}

export default RecentPosts