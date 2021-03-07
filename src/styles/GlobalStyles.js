import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html {
    --color-text: black;
    --color-red: #fe3966;
    --color-black: #33241e;
    --color-gray: #8e7f79;
    --color-link: #51d3f5;

    --text-60: 60px;
    --text-36: 36px;
    --text-30: 30px;
    --text-28: 28px;
    --text-24: 24px;
    --text-28: 28px;
    --text-18: 18px;
    --text-16: 16px;

  }

  .nav-active {
    border-bottom: 3px solid var(--color-link);
    padding-bottom: 8px;
  }
`;

export default GlobalStyles