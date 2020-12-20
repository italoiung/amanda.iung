import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import parser from 'react-html-parser'

import Layout from '../components/layout'
import Seo from '../components/seo'

import style from '../assets/stylesheet/pages/contato.module.scss'

// Contact page
export default class Contato extends Component {
    state = {
        nome: "",
        email: "",
        mensagem: ""
    }
    handleInputChange = event => {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value,
        })
    }
    handleSubmit = event => {
        event.preventDefault()
        let loading = document.getElementById('loading')
        loading.style.display = 'block'
        fetch('https://viung.me/sendmail.php', {
            method: 'post',
            body: JSON.stringify({ ...this.state }),
            headers: { "Content-Type": "application/json" },
        })
        .then(response => { 
            loading.style.display = 'none' 
            return response.text()
        })
        .then(data => {
            if(data === "Enviado com sucesso! Responderemos assim que possível"){
                this.setState({
                    nome: "",
                    email: "",
                    mensagem: ""
                })
            }
            alert(data)
        })
        .catch(e => console.log(e))
    }
    render() {
        const data = this.props.data
        const { wordpressPage: page } = data
        const alt = page.featured_media.alt_text ? page.featured_media.alt_text : page.title
        const publicURL = page.featured_media.localFile.publicURL ? page.featured_media.localFile.publicURL : null


        return (
            <Layout style={style}>
                <Seo title={page.yoast_meta.yoast_wpseo_title} description={page.yoast_meta.yoast_wpseo_metadesc} image={publicURL} />
                <section className={style.MainSection}>
                    <div className={style.MainSection_content}>
                        {parser(page.content)}
                    </div>
                </section>
                <section className={style.FormSection}>
                    <div className={style.FormSection_form}>
                        <form onSubmit={this.handleSubmit}>
                            <div className={style.FormSection_form_formGroup}>
                                <label htmlFor="nome">Nome</label>
                                <input type="text" name="nome" id="nome" placeholder="Seu nome aqui..." required value={this.state.nome} onChange={this.handleInputChange} />
                            </div>
                            <div className={style.FormSection_form_formGroup}>
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" placeholder="Seu email aqui..." title="O domínio do email informado é inválido. Exemplo de email válido exemplo@domínio.com"
                                    pattern="^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$"
                                    required value={this.state.email} onChange={this.handleInputChange} />
                            </div>
                            <div className={style.FormSection_form_formGroup}>
                                <label htmlFor="mensagem">Mensagem</label>
                                <textarea name="mensagem" id="mensagem" placeholder="Sua mensagem aqui..." required value={this.state.mensagem} onChange={this.handleInputChange} />
                            </div>
                            <button type="submit">Enviar</button>
                            <div className={style.Loading} id="loading"><div /><div /><div /><div /><div /></div>
                        </form>
                    </div>
                    <div className={style.FormSection_image}>
                        <figure>
                            <Img alt={alt} fixed={page.featured_media.localFile.childImageSharp.fixed} />
                        </figure>
                    </div>
                </section>
            </Layout>
        )
    }
}

Contato.propTypes = {
    data: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
    query PageContatoById($id: String!) {
        wordpressPage(id: { eq: $id }) {
        content
        yoast_meta {
            yoast_wpseo_title
            yoast_wpseo_metadesc
        }
        featured_media {
            alt_text
            localFile {
                publicURL
                childImageSharp {
                    fixed(quality: 100) {
                        ...GatsbyImageSharpFixed_tracedSVG
                    }
                }
            }
        }
    }
}
`