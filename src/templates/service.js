import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import parser from 'react-html-parser'

import Layout from '../components/layout'
import Seo from '../components/seo'
import Trabalhos from '../components/trabalhos'
import Share from '../components/share'

import style from '../assets/stylesheet/pages/service.module.scss'

const Service = ({ data }) => {
    const { wordpressWpServices: service, site: { siteMetadata: { url, owner } }, allWordpressWpTrabalhos } = data
    const alt = service.featured_media.alt_text ? service.featured_media.alt_text : service.title

    const trabalhos = allWordpressWpTrabalhos.edges.length ? <Trabalhos data={allWordpressWpTrabalhos} style={style} /> : null

    return (
        <Layout style={style}>
            <Seo title={service.yoast_meta.yoast_wpseo_title} description={service.yoast_meta.yoast_wpseo_metadesc} />
            <article className={style.Service}>
                <header>
                    <div className={style.Service_serviceMeta}>
                        <h2>{service.title}</h2>
                    </div>
                    <div className={style.Service_serviceImage}>
                        <figure>
                            <Img alt={alt} fixed={service.featured_media.localFile.childImageSharp.fixed} style={{ maxHeight: '100vw' }} />
                        </figure>
                    </div>
                </header>
                <section className={style.Service_mainContent}>
                    {parser(service.content)}
                </section>
                {trabalhos}
                <footer>
                    <Share
                        socialConfig={{
                            owner,
                            config: {
                                url: `${url}/${service.slug}`,
                                title: service.title,
                            },
                        }}
                        style={style}
                    />
                </footer>
            </article>
        </Layout>
    )
}

Service.propTypes = {
    data: PropTypes.object.isRequired,
}

export default Service

export const pageQuery = graphql`
    query ServiceByIdAndSiteMetaAndTrabalhos($id: String!, $trabalhos: [Int]) {
        site {
            siteMetadata {
                url
                owner
            }
        }
        wordpressWpServices(id: {eq: $id}) {
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
        allWordpressWpTrabalhos(filter: {wordpress_id: {in: $trabalhos}}) {
            edges {
                node {
                    slug
                    title
                    excerpt
                    featured_media {
                        localFile {
                            childImageSharp {
                                fixed(width: 576, height: 576, quality: 100, cropFocus: ENTROPY) {
                                    ...GatsbyImageSharpFixed_withWebp_tracedSVG
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`