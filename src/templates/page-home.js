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

import '../assets/stylesheet/pages/home.scss'

const HomePage = ({ data }) => {
    const { wordpressPage: page } = data

    return (
        <Layout>
            <Seo title={page.yoast_meta.yoast_wpseo_title} description={page.yoast_meta.yoast_wpseo_metadesc} />
            <section className="flex-section flex-section--main">
                <div className="flex-section--main__content">{parser(page.content)}</div>
                <div className="flex-section--main__image">
                    <figure>
                        <Img alt={page.featured_media.alt_text} fixed={page.featured_media.localFile.childImageSharp.fixed} />
                    </figure>
                </div>
            </section>
            <Services />
            <section className="flex-section flex-section--blog">
                <h2>Últimas Postagens</h2>
                <div className="flex-section--blog__recent">
                    <RecentPosts />
                </div>
                <div className="flex-section--blog__featured">
                    <FeaturedPosts />
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
    query PageById($id: String!) {
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
}`