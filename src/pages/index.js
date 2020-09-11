import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

import pageConfig, { main } from '../landing-page-config';
import gradient from '../images/landing-gradient.svg';
import landingImage from '../images/landing-image.svg';

const IndexPage = () => (
  <>
    <div style={{ backgroundColor: 'white', height: '100vh', width: '100%', display: 'flex' }}>
      <div style={{ backgroundColor: 'white', height: '100vh', width: '48%' }}>
        <div style={{ backgroundColor: 'white', padding: '0 calc(100vw * 0.03)' }}>
          <h1 style={{ marginTop: 'calc(100vw * 0.13)', color: 'rgb(24, 25, 26)', fontWeight: 'bold' }}>
            {main.title}
          </h1>
          <div
            style={{
              border: '5px',
              borderRadius: '2px',
              color: 'red',
              width: '100%',
              height: '5px',
              margin: '30px 0',
              backgroundImage: 'linear-gradient(90deg, rgb(0, 69, 190) 0%, rgb(0, 113, 230) 100%)'
            }}
          />
          <h2 style={{ color: 'rgb(73, 74, 75)', fontWeight: 'lighter', lineHeight: '40px' }}>
            {main.text}
          </h2>
          <Link to="/user-story-creator/">
            <button
              style={{
                width: '70%',
                height: '70px',
                borderRadius: '35px',
                color: 'white',
                border: '0',
                backgroundImage: 'linear-gradient(90deg, rgb(0, 113, 230) 0%, rgb(0, 69, 190) 100%)',
                maxWidth: '260px',
                boxShadow: '7px 7px 25px rgba(14, 4, 152, 0.36)',
                fontWeight: 'bold',
                fontSize: '25px',
                cursor: 'pointer'
              }}
            >
              Try it free!
            </button>
          </Link>
        </div>
      </div>

      <div style={{ height: '100vh', width: '60%', position: 'absolute', right: 0 }}>
        <img src={gradient} width="100%" height="100%" style={{ position: 'absolute' }} />
        <img src={landingImage} style={{ position: "absolute", width: "82%", top: '0%', right: '5%' }} />
      </div>
    </div>

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
  </>
)

export default IndexPage
