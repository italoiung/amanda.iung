import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import parser from 'react-html-parser'

import Layout from '../components/layout'
import Seo from '../components/seo'
import Share from '../components/share'

import style from '../assets/stylesheet/pages/post.module.scss'

// Single post template
const Post = ({ data }) => {
    const { wordpressPost: post, site: { siteMetadata: { siteUrl, owner } } } = data
    const alt = post.featured_media && post.featured_media.alt_text ? post.featured_media.alt_text : post.title
    const title = post.featured_media && post.featured_media.title ? post.featured_media.title : post.title
    const publicURL = post.featured_media.localFile.publicURL ? post.featured_media.localFile.publicURL : null

    const image = post.featured_media ?
        <div className={style.Post_postImage}>
            <figure>
                <Img alt={alt} title={title} fixed={post.featured_media.localFile.childImageSharp.fixed} />
            </figure>
        </div> : null

    const categories = post.categories.map((category, index) =>
        <Fragment key={category.id + "-" + post.id + "-category"}>
            {(index ? ', ' : '')}<Link to={"/blog/categoria/" + category.slug}>{category.name}</Link>
        </Fragment>
    )

    const hashtags = []
    const tags = post.tags.map((tag, index) => {
        hashtags.push(tag.name)

        return (
            <Fragment key={tag.id + "-" + post.id + "-tag"}>
                {(index ? ', ' : '')}<Link to={"/blog/tag/" + tag.slug}>{tag.name}</Link>
            </Fragment>
        )
    })

    return (
        <Layout style={style}>
            <Seo title={post.yoast_meta.yoast_wpseo_title} description={post.yoast_meta.yoast_wpseo_metadesc} image={publicURL} />
            <article className={style.Post}>
                <header>
                    <div className={style.Post_postMeta}>
                        <time pubdate="pubdate">{post.date}</time>
                        <h2>{post.title}</h2>
                        <div>
                            {categories}
                        </div>
                    </div>
                    {image}
                </header>
                <section>
                    {parser(post.content)}
                </section>
                <footer>
                    <div className={style.Post_postTags}>
                        Tags: {tags}
                    </div>
                    <Share
                        socialConfig={{
                            owner,
                            config: {
                                siteUrl: `${siteUrl}/${post.slug}`,
                                title: post.title,
                            },
                        }}
                        tags={hashtags}
                        style={style}
                    />
                </footer>
            </article>
        </Layout>
    )
}

Post.propTypes = {
    data: PropTypes.object.isRequired,
}

export default Post

export const pageQuery = graphql`
    query PostByIdAndSiteMeta($id: String!) {
        site {
            siteMetadata {
                siteUrl
                owner
            }
        }
        wordpressPost(id: {eq: $id}) {
            content
            title
            slug
            date(formatString: "DD/MM/YYYY")
            featured_media {
                alt_text
                title
                localFile {
                    publicURL
                    childImageSharp {
                        fixed(width: 960, height: 500, quality: 100) {
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
            tags {
                id
                slug
                name
            }
            yoast_meta {
                yoast_wpseo_title
                yoast_wpseo_metadesc
            }
        }
    }
`