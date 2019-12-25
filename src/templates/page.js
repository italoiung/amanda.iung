import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import parser from 'react-html-parser'

import Layout from '../components/layout'
import Seo from '../components/seo'

import style from '../assets/stylesheet/pages/page.module.scss'

// Default page
const Page = ({ data }) => {
    const { wordpressPage: page } = data
    const alt = page.featured_media && page.featured_media.alt_text ? page.featured_media.alt_text : page.title
    const title = page.featured_media && page.featured_media.title ? page.featured_media.title : page.title
    const source_url = page.featured_media.source_url ? page.featured_media.source_url : null

    const image = page.featured_media ? 
    <div className={style.Page_pageImage}>
        <figure>
            <Img alt={alt} title={title} fixed={page.featured_media.localFile.childImageSharp.fixed} />
        </figure>
    </div> : null

    return (
        <Layout style={style}>
            <Seo title={page.yoast_meta.yoast_wpseo_title} description={page.yoast_meta.yoast_wpseo_metadesc} image={source_url} />
            <article className={style.Page}>
                <header>
                    <div className={style.Page_pageMeta}>
                        <h2>{page.title}</h2>
                    </div>        
                    {image}            
                </header>
                <section>
                    {parser(page.content)}
                </section>
            </article>
        </Layout>
    )
}

Page.propTypes = {
    data: PropTypes.object.isRequired,
}

export default Page

export const pageQuery = graphql`
    query PageDefault($id: String!) {
        wordpressPage(id: {eq: $id}) {
            content
            title
            slug
            featured_media {
                alt_text
                title
                localFile {
                    childImageSharp {
                        fixed(width: 960, height: 500, quality: 100) {
                            ...GatsbyImageSharpFixed_withWebp_tracedSVG
                        }
                    }
                }
            }
            yoast_meta {
                yoast_wpseo_title
                yoast_wpseo_metadesc
            }
        }
    }
`