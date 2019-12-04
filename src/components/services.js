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
                                    fixed(width: 960, height: 580) {
                                        ...GatsbyImageSharpFixed_withWebp
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
        <section className="flex-section services" key={service.node.id}>
            <div>
                <Link to={"/services/" + service.node.slug}><h2>{service.node.title}</h2></Link>
                {parser(service.node.excerpt)}
            </div>
            <div>
                <figure>
                    <Img alt={service.node.featured_media.alt_text} fixed={service.node.featured_media.localFile.childImageSharp.fixed} />
                </figure>
            </div>
        </section>
    )
    return services
}

export default Services