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
    const { wordpressPage: page, allWordpressPost: dataRecentPosts } = data

    return (
        <Layout>
            <Seo title={page.yoast_meta.yoast_wpseo_title} description={page.yoast_meta.yoast_wpseo_metadesc} />
            <section className={`${style.FlexSection} ${style.FlexSection___main}`}>
                <div className={style.FlexSection___main_content}>{parser(page.content)}</div>
                <div className={style.FlexSection___main_image}>
                    <figure>
                        <Img alt={page.featured_media.alt_text} fixed={page.featured_media.localFile.childImageSharp.fixed} />
                    </figure>
                </div>
            </section>
            <Services style={style} />
            <section className={`${style.FlexSection} ${style.FlexSection___blog}`}>
                <h2>Últimas Postagens</h2>
                <div className={style.FlexSection___blog_recent}>
                    <RecentPosts data={dataRecentPosts} style={style} />
                </div>
                <div className={style.FlexSection___blog_featured}>
                    <FeaturedPosts style={style} />
                </div>
            </section>
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
            localFile {
                childImageSharp {
                    fixed(width: 960, height: 500, quality: 100) {
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
}`