import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import parser from 'react-html-parser'

// Query and display trabalhos post type given certain data
const Trabalhos = ({ data, style }) => {
    const trabalhos = data.edges.map(trabalho => {
        let alt = trabalho.node.featured_media.alt_text ? trabalho.node.featured_media.alt_text : trabalho.node.title

        return (
            <Link key={trabalho.node.slug} to={`/trabalhos/${trabalho.node.slug}`} className={style.Trabalhos_wrapper_singleTrabalho}>
                <figure>
                    <Img alt={alt} fixed={trabalho.node.featured_media.localFile.childImageSharp.fixed} style={{ maxHeight: '100vw' }} />
                </figure>
                <div className={style.Trabalhos_wrapper_singleTrabalho_metaBox}>
                    <h3>
                        {trabalho.node.title}
                    </h3>
                    {parser(trabalho.node.excerpt)}
                </div>
            </Link>
        )
    })

    return (
        <section className={style.Trabalhos}>
            <h2 className={style.Trabalhos_heading}>Projetos concluídos <span className={style.Trabalhos_heading_headingAside}>Amostras</span></h2>
            <div className={style.Trabalhos_wrapper}>
                {trabalhos}
            </div>
        </section>
    )
}

Trabalhos.propTypes = {
    data: PropTypes.object.isRequired,
    style: PropTypes.object.isRequired
}

export default Trabalhos