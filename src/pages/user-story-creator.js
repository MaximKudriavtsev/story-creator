import React from "react"

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import SEO from "../components/seo"
import App from '../components/App'


const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(0, 113, 230)'
    },
    secondary: {
      main: 'rgb(0, 113, 230)',
    },
  },
});

const SecondPage = () => (
  <>
    <SEO title="Page two" />

    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </>
)

export default SecondPage
