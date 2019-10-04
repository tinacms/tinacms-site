import { css } from 'styled-components';
import { textSizes, colors, breakpoints } from 'utils/variables';
import '../../typography/typefaces/fonts.css'


const base = css`
  :root {
    font-size: ${textSizes[300].fontSize}px;
    line-height: ${textSizes[300].lineHeight}px;
  }

  html,
  body,
  #root {
    font-family: "Inter";
    width: 100%;
    height: 100%;
    -webkit-font-smooth: "antialiased";
    color: #000;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  a {
    color: ${colors.darkMustardYellow};
    text-decoration: none;
    transition: color 250ms ease;

    &:hover,
    &:focus {
      color: ${colors.darkMustardYellow};
      text-decoration: underline;
      transition: color 250ms ease;
    }
  }
  /**HACK to get responsive mobile type styles */
  @media(max-width: ${breakpoints.md}px) {
    h1 {
      font-size: 32px !important;
      line-height: 1.375 !important;
      letter-spacing: .1px !important;
    }
    h2 {
      font-size: 24px !important;
      line-height: 1.333!important;
    }
    h3 {
      font-size: 18px !important;
      line-height: 1.333 !important;
    }
    p.body {
      font-size: 16px !important;
      line-height: 1.375 !important;
    }
  }

  p {
    font-size: 18px !important;
    line-height: 1.5!important;
    letter-spacing: .8px !important;
  }

  button {
    display: inline-block;
    border: none;
    margin: 0;
    text-decoration: none;
    cursor: pointer;
    text-align: center;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  img {
    display: block;
    max-width: 100%;
  }

  #root {
    transition: all 0.5s cubic-bezier(0.15, 1, 0.3, 1);
    -webkit-transition: all 0.5s cubic-bezier(0.15, 1, 0.3, 1);

    &.pushed-legend-right {
      transform: translateX(-280px);
    }
  }

  .noscroll {
    overflow: hidden;
  }

  .noselect {
    user-select: none;
  }

  .full-size {
    height: 100%;
    width: 100%;
  }

  .full-size-layout {
    height: 100%;
    min-height: 100vh;
    width: 100%;
  }

  .icon-middle {
    &::before {
      vertical-align: middle;
    }
  }

  .drag-handle {
    cursor: move;
    display: inline-block;

    &::before {
      content: '......';
      display: inline-block;
      width: 10px;
      word-break: break-word;
      white-space: normal;
      letter-spacing: 2px;
      line-height: 4.5px;
      text-align: center;
      height: 18px;
    }
  }

  /* https://github.com/reach/reach-ui/blob/master/packages/skip-nav/styles.css */
  [data-reach-skip-link] {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    width: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    position: absolute;
  }

  [data-reach-skip-link]:focus {
    padding: 1rem;
    position: fixed;
    top: 10px;
    left: 10px;
    background: white;
    z-index: 100;
    width: auto;
    height: auto;
    clip: auto;
  }
`;

export default base;
