import styled, { css } from 'styled-components';

import { backgroundStyle, colorForName, palm } from 'grommet/utils';

const ALIGN_MAP = {
  baseline: 'baseline',
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
  stretch: 'stretch'
};

const alignStyle = css`
  align-items: ${props => ALIGN_MAP[props.align]};
`;

const ALIGN_CONTENT_MAP = {
  around: 'around',
  between: 'between',
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
  stretch: 'stretch'
};

const alignContentStyle = css`
  align-content: ${props => ALIGN_CONTENT_MAP[props.alignContent]};
`;

const ALIGN_SELF_MAP = {
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
  stretch: 'stretch'
};

const alignSelfStyle = css`
  align-self: ${props => ALIGN_SELF_MAP[props.alignSelf]};
`;

const BASIS_MAP = {
  full: '100%',
  '1/2': '50%',
  '1/4': '25%',
  '3/4': '75%',
  '1/3': '33.33%',
  '2/3': '66.66%'
};

const basisStyle = css`
  flex-basis: ${props => BASIS_MAP[props.basis] || props.theme.global.size[props.basis]};
`;

// min-width and min-height needed because of this
// https://stackoverflow.com/questions/36247140/why-doesnt-flex-item-shrink-past-content-size
const directionStyle = css`
  ${props => props.direction === 'row' && 'min-width: 0;'};
  ${props => props.direction === 'column' && 'min-height: 0;'};
  flex-direction: ${props => {
    if (props.direction) {
      return props.reverse ? `${props.direction}-reverse` : props.direction;
    }
    return 'column-reverse';
  }};
`;

const fullStyle = full => {
  if (full === 'horizontal') {
    return `
      max-width: 100%;
      width: 100vw;
    `;
  }
  if (full === 'vertical') {
    return `
      height: 100vh;
      max-height: 100%;
      overflow: auto;
    `;
  }
  if (full === 'grow') {
    return `
      max-width: 100%;
      width: 100vw;
      min-height: 100vh;
    `;
  }
  if (full) {
    return `
      max-width: 100%;
      width: 100vw;
      height: 100vh;
      max-height: 100%;
      overflow: auto;
    `;
  }
  return undefined;
};

const gridAreaStyle = css`
  grid-area: ${props => props.gridArea};
`;

const JUSTIFY_MAP = {
  between: 'space-between',
  center: 'center',
  end: 'flex-end',
  start: 'flex-start'
};

const justifyStyle = css`
  justify-content: ${props => JUSTIFY_MAP[props.justify]};
`;

const borderStyle = (data, theme) => {
  let style = '';
  const color = colorForName(data.color || 'border', theme);
  const borderSize = data.size || 'xsmall';
  const side = typeof data === 'string' ? data : data.side || 'all';
  const value = `solid ${theme.global.borderSize[borderSize]} ${color}`;
  if (side === 'top' || side === 'bottom' || side === 'left' || side === 'right') {
    style = `border-${side}: ${value};`;
  } else if (side === 'horizontal') {
    style = `
      border-left: ${value};
      border-right: ${value};
    `;
  } else if (side === 'vertical') {
    style = `
      border-top: ${value};
      border-bottom: ${value};
    `;
  } else {
    style = `border: ${value};`;
  }
  return style;
};

const edgeStyle = (kind, data, theme) => {
  if (typeof data === 'string') {
    return `${kind}: ${theme.global.edgeSize[data]};`;
  }
  let result = '';
  if (data.horizontal) {
    result += `
      ${kind}-left: ${theme.global.edgeSize[data.horizontal]};
      ${kind}-right: ${theme.global.edgeSize[data.horizontal]};
    `;
  }
  if (data.vertical) {
    result += `
      ${kind}-top: ${theme.global.edgeSize[data.vertical]};
      ${kind}-bottom: ${theme.global.edgeSize[data.vertical]};
    `;
  }
  if (data.top) {
    result += `${kind}-top: ${theme.global.edgeSize[data.top]};`;
  }
  if (data.bottom) {
    result += `${kind}-bottom: ${theme.global.edgeSize[data.bottom]};`;
  }
  if (data.left) {
    result += `${kind}-left: ${theme.global.edgeSize[data.left]};`;
  }
  if (data.right) {
    result += `${kind}-right: ${theme.global.edgeSize[data.right]};`;
  }
  return result;
};

const responsiveStyle = css`
  ${props =>
    palm(`
      flex-direction: column;
      flex-basis: auto;
      ${props.justify === 'center' && 'align-items: stretch;'}
      ${props.reverse && 'flex-direction: column-reverse'}
    `)};
`;

// NOTE: basis must be after flex! Otherwise, flex overrides basis
const StyledForm = styled.form`
  display: flex;
  ${props => !props.basis && 'max-width: 100%;'};
  ${props => props.align && alignStyle};
  ${props => props.alignContent && alignContentStyle};
  ${props => props.alignSelf && alignSelfStyle};
  ${props => (props.direction || props.reverse) && directionStyle};
  ${props => props.background && backgroundStyle(props.background, props.theme)};
  ${props => props.border && borderStyle(props.border, props.theme)};
  ${props => props.basis && basisStyle};
  ${props => props.full && fullStyle(props.full)};
  ${props => props.gridArea && gridAreaStyle};
  ${props => props.justify && justifyStyle};
  ${props => props.margin && edgeStyle('margin', props.margin, props.theme)};
  ${props => props.pad && edgeStyle('padding', props.pad, props.theme)};
  ${props => props.responsive && responsiveStyle};
`;

export default StyledForm.extend`
  ${props => props.theme.box && props.theme.box.extend};
`;
