import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import parser from 'react-html-parser'

import Layout from '../components/layout'
import Seo from '../components/seo'
import Services from '../components/services'
import RecentPosts from '../components/recentPosts'
import FeaturedPosts from '../components/featuredPosts'

import style from '../assets/stylesheet/pages/home.module.scss'

const HomePage = ({ data }) => {
    const DESKTOP_QUERY = `(min-width: 575px)`;
    const { wordpressPage: page, allWordpressPost: dataRecentPosts, mobile } = data
    const alt = page.featured_media.alt_text ? page.featured_media.alt_text : page.title
    const title = page.featured_media.title ? page.featured_media.title : page.title
    const publicURL = page.featured_media ? page.featured_media.localFile.publicURL : null

    let sources = [
        mobile.featured_media.localFile.childImageSharp.fixed,
        {
            ...page.featured_media.localFile.childImageSharp.fixed,
            media: DESKTOP_QUERY
        }
    ]

    const posts = dataRecentPosts ? 
    <section className={`${style.FlexSection} ${style.FlexSection___blog}`}>
        <h2>Últimas Postagens</h2>
        <div className={style.FlexSection___blog_recent}>
            <RecentPosts data={dataRecentPosts} style={style} />
        </div>
        <div className={style.FlexSection___blog_featured}>
            <FeaturedPosts style={style} />
        </div>
    </section> : null

    return (
        <Layout style={style}>
            <Seo title={page.yoast_meta.yoast_wpseo_title} description={page.yoast_meta.yoast_wpseo_metadesc} image={publicURL} />
            <section className={`${style.FlexSection} ${style.FlexSection___main}`}>
                <div className={style.FlexSection___main_content}>{parser(page.content)}</div>
                <div className={style.FlexSection___main_image}>
                    <figure>
                        <Img alt={alt} title={title} fixed={sources} />
                    </figure>
                </div>
            </section>
            <Services style={style} />
            {posts}
        </Layout>
    )
}

HomePage.propTypes = {
    data: PropTypes.object.isRequired,
}

export default HomePage

export const pageQuery = graphql`
query PageByIdAndRecentPosts($id: String!) {
    wordpressPage(id: { eq: $id }) {
        content
        yoast_meta {
            yoast_wpseo_title
            yoast_wpseo_metadesc
        }
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
    }
    mobile: wordpressPage(id: { eq: $id }) {
        featured_media {
            localFile {
                childImageSharp {
                    fixed(width: 576, height: 300) {
                        ...GatsbyImageSharpFixed_withWebp_tracedSVG
                    }
                }
            }
        }
    }
    allWordpressPost(filter: {status: {eq: "publish"}}, limit: 3) {
        edges {
            node {
                id
                title
                slug
                date(formatString: "DD/MM/YYYY")
                featured_media {
                    title
                    alt_text
                    localFile {
                        childImageSharp {
                            fixed(width: 576, height: 576, cropFocus: ENTROPY) {
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
}`