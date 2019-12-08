import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import parser from 'react-html-parser'

import Layout from '../components/layout'
import Seo from '../components/seo'

import style from '../assets/stylesheet/pages/sobre.module.scss'

const Sobre = ({ data }) => {
    const { wordpressPage: page } = data
    const content = page.content.split("<p><!--more--></p>")
    const sections = []

    for (let i = 1; i < content.length; i++) {
        sections.push(
            <section key={`section-${i}`} className={`${style.SecondarySection}`}>
                {parser(content[i])}
            </section>
        )
    }

    return (
        <Layout style={style}>
            <Seo title={page.yoast_meta.yoast_wpseo_title} description={page.yoast_meta.yoast_wpseo_metadesc} />
            <article>
                <section className={style.MainSection}>
                    <div className={style.MainSection_image}>
                        <figure>
                            <Img alt={page.featured_media.alt_text} fixed={page.featured_media.localFile.childImageSharp.fixed} style={{ maxHeight: 'calc(100vw - 3rem)' }} />
                        </figure>
                    </div>
                    <div className={style.MainSection_content}>
                        {parser(content[0])}
                    </div>
                </section>
                {sections}
            </article>
        </Layout>
    )
}

Sobre.propTypes = {
    data: PropTypes.object.isRequired,
}

export default Sobre

export const pageQuery = graphql`
    query PageSobreById($id: String!) {
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
                    fixed(width: 576, height: 576, quality: 100) {
                        ...GatsbyImageSharpFixed_withWebp_tracedSVG
                    }
                }
            }
        }
    }
}
`