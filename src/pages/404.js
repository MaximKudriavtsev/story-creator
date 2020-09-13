import React from "react"
import { Link } from "gatsby"
import SEO from "../components/seo";
import { page404 } from '../landing-page-config';
import image404 from '../images/404.svg';

const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" />
    <div style={{ backgroundColor: 'white', height: '100vh', width: '100%', display: 'flex', overflow: 'hidden' }}>
      <div style={{ backgroundColor: 'white', height: '100vh', width: '48%' }}>
        <div style={{ backgroundColor: 'white', padding: '0 calc(100vw * 0.03)' }}>
          <h1 style={{ marginTop: 'calc(100vw * 0.13)', color: 'rgb(24, 25, 26)', fontWeight: 'bold' }}>
            {page404.title}
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
            {page404.text}
          </h2>
          <Link to="/">
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
              {page404.button}
            </button>
          </Link>
        </div>
      </div>

      <div style={{ height: '100vh', width: '90%', position: 'absolute', right: 0 }}>
        <img src={image404} width="100%" height="100%" style={{ position: 'absolute', margin: 0 }} />
      </div>
    </div>
  </>
)

export default NotFoundPage
