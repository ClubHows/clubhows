/* eslint-disable no-param-reassign */
import { css } from 'emotion';

const breakpoints = {
  // Numerical values will result in a min-width query
  small: 300,
  medium: 650,
  large: 900,
  xLarge: 1200,
  // String values will be used as is
  tallPhone: '(max-width: 360px) and (min-height: 740px)'
};

export const queries = Object.keys(breakpoints).reduce((accumulator, label) => {
  if (typeof breakpoints[label] === 'string') {
    accumulator[label] = (...args) =>
      css`
        @media (${breakpoints[label]}) {
          ${css(...args)};
        }
      `;
  } else {
    accumulator[label] = (...args) =>
      css`
        @media (min-width: ${breakpoints[label]}px) {
          ${css(...args)};
        }
      `;
  }

  return accumulator;
}, {});

export default queries;
