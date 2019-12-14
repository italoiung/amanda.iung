import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import parser from 'react-html-parser'

import Layout from '../components/layout'
import Seo from '../components/seo'
import Share from '../components/share'

import style from '../assets/stylesheet/pages/trabalho.module.scss'

const Trabalho = ({ data }) => {
    const { wordpressWpTrabalhos: trabalho, site: { siteMetadata: { siteUrl, owner } } } = data
    const alt = trabalho.featured_media.alt_text ? trabalho.featured_media.alt_text : trabalho.title

    return (
        <Layout style={style}>
            <Seo title={trabalho.yoast_meta.yoast_wpseo_title} description={trabalho.yoast_meta.yoast_wpseo_metadesc} />
            <article className={style.Trabalho}>
                <header>
                    <div className={style.Trabalho_trabalhoMeta}>
                        <h2>{trabalho.title}</h2>
                    </div>
                    <div className={style.Trabalho_trabalhoImage}>
                        <figure>
                            <Img alt={alt} fixed={trabalho.featured_media.localFile.childImageSharp.fixed} style={{ maxHeight: '100vw' }} />
                        </figure>
                    </div>
                </header>
                <section>
                    {parser(trabalho.content)}
                </section>
                <footer>
                    <div className={style.Trabalho_trabalhoShare}>
                        <Share
                            socialConfig={{
                                owner,
                                config: {
                                    siteUrl: `${siteUrl}/${trabalho.slug}`,
                                    title: trabalho.title,
                                },
                            }}
                            style={style}
                        />
                    </div>
                </footer>
            </article>
        </Layout>
    )
}

Trabalho.propTypes = {
    data: PropTypes.object.isRequired,
}

export default Trabalho

export const pageQuery = graphql`
    query TrabalhoByIdAndSiteMeta($id: String!) {
        site {
            siteMetadata {
                siteUrl
                owner
            }
        }
        wordpressWpTrabalhos(id: {eq: $id}) {
            content
            title
            slug
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
            yoast_meta {
                yoast_wpseo_title
                yoast_wpseo_metadesc
            }
        }
    }
`