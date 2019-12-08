import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import parser from 'react-html-parser'

import Layout from '../components/layout'
import Seo from '../components/seo'
import Share from '../components/share'

import style from '../assets/stylesheet/pages/post.module.scss'

const Post = ({ data }) => {
    const { wordpressPost: post } = data
    const { site: { siteMetadata: { url, owner } } } = data

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
            <Seo title={post.yoast_meta.yoast_wpseo_title} description={post.yoast_meta.yoast_wpseo_metadesc} />
            <article className={style.Post}>
                <header>
                    <div className={style.Post_postMeta}>
                        <time pubdate="pubdate">{post.date}</time>
                        <h2>{post.title}</h2>
                        <div>
                            {categories}
                        </div>
                    </div>
                    <div className={style.Post_postImage}>
                        <figure>
                            <Img alt={post.featured_media.alt_text} fixed={post.featured_media.localFile.childImageSharp.fixed} style={{ maxHeight: '100vw' }} />
                        </figure>
                    </div>
                </header>
                <section>
                    {parser(post.content)}
                </section>
                <footer>
                    <div className={style.Post_postTags}>
                        Tags: {tags}
                    </div>
                    <div className={style.Post_postShare}>
                        <Share
                            socialConfig={{
                                owner,
                                config: {
                                    url: `${url}/${post.slug}`,
                                    title: post.title,
                                },
                            }}
                            tags={hashtags}
                            style={style}
                        />
                    </div>
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
                url
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
                localFile {
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