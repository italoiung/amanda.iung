import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import Seo from '../components/seo'
import RecentPosts from '../components/recentPosts'

import style from '../assets/stylesheet/pages/blog.module.scss'

// Tag archive template
const Tag = ({ data, pageContext }) => {
    const { previousPagePath, nextPagePath, name } = pageContext;

    return (
        <Layout style={style}>
            <Seo title={`Postagens na tag ${name}`} description={`Postagens do blog na tag ${name}`} />
            <section className={`${style.FlexSection} ${style.FlexSection___blog}`}>
                <div className={style.FlexSection___blog_recent}>
                    <RecentPosts data={data.allWordpressPost} style={style} />
                </div>
                <div className={style.FlexSection___blog_nav}>
                    {previousPagePath ? <div className={`${style.FlexSection___blog_nav_item} ${style.FlexSection___blog_nav_item___before}`}>
                        <Link to={previousPagePath}>&larr; Anterior</Link>
                    </div> : null}
                    {nextPagePath ? <div className={`${style.FlexSection___blog_nav_item} ${style.FlexSection___blog_nav_item___next}`}>
                        <Link to={nextPagePath}>Próximo &rarr;</Link>
                    </div> : null}
                </div>
            </section>
        </Layout>
    )
}

Tag.propTypes = {
    data: PropTypes.object.isRequired,
    pageContext: PropTypes.object.isRequired
}

export const pageQuery = graphql`
  query TagQuery($limit: Int!, $skip: Int!, $slug: String) {
    allWordpressPost(
      sort: { fields: date, order: DESC }
      limit: $limit
      skip: $skip
      filter: { tags: { elemMatch: { slug: { eq: $slug } } } }
    ) {
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
  }
`

export default Tag
