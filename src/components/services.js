import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import parser from 'react-html-parser'

const Services = () => {
    const data = useStaticQuery(graphql`
        query Services {
            allWordpressWpServices {
                edges {
                    node {
                        id
                        title
                        excerpt
                        slug
                        featured_media {
                            alt_text
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
        }
    `)

    const { allWordpressWpServices } = data
    const services = allWordpressWpServices.edges.map(service =>
        <section className="flex-section flex-section--service" key={service.node.id}>
            <div className="flex-section--service__content">
            <h2><Link to={"/services/" + service.node.slug}>{service.node.title}</Link></h2>
                {parser(service.node.excerpt)}
            </div>
            <div className="flex-section--service__image">
                <figure>
                    <Img alt={service.node.featured_media.alt_text} fixed={service.node.featured_media.localFile.childImageSharp.fixed} />
                </figure>
            </div>
        </section>
    )
    return services
}

export default Services