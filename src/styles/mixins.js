import { css } from 'styled-components';

export const breakpoint = {
  xxs: (...args) => css`
    @media (max-width: 576px) { ${css(...args)} }
  `,
  xs: (...args) => css`
    @media (max-width: 767.98px) { ${css(...args)} }
  `,
  sm: (...args) => css`
    @media (max-width: 991.98px) { ${css(...args)} }
  `,
  md: (...args) => css`
    @media (max-width: 1199.98px) { ${css(...args)} }
  `,
  lg: (...args) => css`
    @media (min-width: 1200px) { ${css(...args)} }
  `,
  max1300: (...args) => css`
    @media (max-width: 1370px) { ${css(...args)} }
  `,
  max1400: (...args) => css`
    @media (max-width: 1400px) { ${css(...args)} }
  `,
};

export const flex = {
  center: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  horizontal: css`
    display: flex;
    flex-flow: row;
    align-items: center;
  `,
  vertical: css`
    display: flex;
    flex-flow: column;
    align-items: center;
  `,
};

export const position = {
  relative: css`
    position: relative;
    left: ${p => p.left}px;
    top: ${p => p.top}px;
    right: ${p => p.right}px;
    bottom: ${p => p.bottom}px;
  `,
  absolute: css`
    position: absolute;
    left: ${p => p.left}px;
    top: ${p => p.top}px;
    right: ${p => p.right}px;
    bottom: ${p => p.bottom}px;
  `,
};

export const pos = {
  relative: css`
    position: relative;
    left: ${p => p.left};
    top: ${p => p.top};
    right: ${p => p.right};
    bottom: ${p => p.bottom};
  `,
  absolute: css`
    position: absolute;
    left: ${p => p.left};
    top: ${p => p.top};
    right: ${p => p.right};
    bottom: ${p => p.bottom};
  `,
};

export const responsible = css`
  &:hover {
    opacity: .6;
    transition: all .4s;
  }
  &:active {
    opacity: .4;
  }
  &:disabled {
    opacity: .4;
    cursor: not-allowed
  }
`;
