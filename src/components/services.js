import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import parser from 'react-html-parser'

// Query and display services post type. Uses static query because it'll never have any filters
const Services = ({ style }) => {
    const data = useStaticQuery(graphql`
        query Services {
            allWordpressWpServices(sort: {fields: menu_order}) {
                edges {
                    node {
                        id
                        title
                        excerpt
                        slug
                        featured_media {
                            alt_text
                            title
                            localFile {
                                childImageSharp {
                                    fixed(width: 720, height: 435, quality: 100) {
                                        ...GatsbyImageSharpFixed_withWebp_tracedSVG
                                    }
                                }
                            }
                        }
                    }
                }
            }
            mobile: allWordpressWpServices(sort: {fields: menu_order}) {
                edges {
                    node {
                        featured_media {
                            localFile {
                                childImageSharp {
                                    fixed(width: 576, height: 348, quality: 100, cropFocus: ENTROPY) {
                                        ...GatsbyImageSharpFixed_withWebp_tracedSVG
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `)

    const DESKTOP_QUERY = `(min-width: 575px)`;

    const { allWordpressWpServices, mobile } = data
    const services = allWordpressWpServices.edges.map((service, index) => {
        let sources = [
            mobile.edges[index].node.featured_media.localFile.childImageSharp.fixed,
            {
                ...service.node.featured_media.localFile.childImageSharp.fixed,
                media: DESKTOP_QUERY
            }
        ]

        let alt = service.node.featured_media.alt_text ? service.node.featured_media.alt_text : service.node.title
        let title = service.node.featured_media.title ? service.node.featured_media.title : service.node.title
        return (
            <section className={`${style.FlexSection} ${style.FlexSection___service}`} key={service.node.id}>
                <div className={style.FlexSection___service_content}>
                    <h2>{service.node.title}</h2>
                    {parser(service.node.excerpt)}
                </div>
                <div className={style.FlexSection___service_image}>
                    <figure>
                        <Link to={"/servicos/" + service.node.slug}>VER MAIS</Link>
                        <Img alt={alt} title={title} fixed={sources} />
                    </figure>
                </div>
            </section>
        )
    })
    return services
}

Services.propTypes = {
    style: PropTypes.object.isRequired
}

export default Services