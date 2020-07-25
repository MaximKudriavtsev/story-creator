import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import pageConfig from '../landing-page-config';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>User Story Creator App.</h1>
    <p>Create user stories files quickly and easily.</p>
    <p>The application generates user stories MD markup based on your minimum data.</p>

    <Link to="/user-story-creator/">
      <button>
        Try it for free!
      </button>
    </Link>

    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
    </div>
    {pageConfig.map(block => (
      <div>
        <h3>
          {block.title}
        </h3>
        {block.image()}
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
