import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import style from "../assets/stylesheet/pages/404.module.scss"

// Custom 404 page
const NotFoundPage = () => (
  <Layout style={style}>
    <SEO title="404: Not found" description="O que você estava procurando não foi encontrado" />
    <article>
      <section className={style.MainSection}>
        <h2>NÃO ENCONTRADO</h2>
        <h3>O que você estava procurando não foi encontrado :(</h3>
        <p>Tente dar mais uma procurada pelo site!</p>
      </section>
    </article>
  </Layout>
)

export default NotFoundPage
