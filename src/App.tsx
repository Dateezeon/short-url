import { Container } from "react-bootstrap";
import { createGlobalStyle } from "styled-components";
import "bootstrap/scss/bootstrap.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

import Layout from "./components/Layout";

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    src: url('https://fonts.gstatic.com/s/inter/v3/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    src: url('https://fonts.gstatic.com/s/inter/v3/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2') format('woff2');
  }

  html {
    --color: #042765;
    --background: #f7f9fe;
  }
  body {
    background-color: var(--background);
    color: var(--color);
    font-size: 15px;
    margin: 64px;
    font-family: 'Inter';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

function App() {
  return (
    <Container fluid>
      <GlobalStyles />
      <Layout />
    </Container>
  );
}

export default App;
