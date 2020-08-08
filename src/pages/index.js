import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import pageConfig, { main } from '../landing-page-config';

const IndexPage = () => (
  <Layout>
    <SEO title="Introducing to User Stories" />
    <h1>{main.title}</h1>
    <p>{main.text}</p>

    <Link to="/user-story-creator/">
      <button>
        Try it for free!
      </button>
    </Link>

    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
    </div>
    {pageConfig.map(block => (
      <div key={block.alt}>
        <h3>
          {block.title}
        </h3>
        <img
          src={block.image}
          alt={block.alt}
        />
        <p>
          {block.text}
        </p>
      </div>
    ))}

    <Link to="/user-story-creator/">
      <button>
        Try it for free!
      </button>
    </Link>
  </Layout>
)

export default IndexPage
