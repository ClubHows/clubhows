import styled, { css } from 'react-emotion';
import colors from '../../utils/colors';

const buttonBasic = css`
  width: 100%;
  padding: 0.5rem 1.25rem;
  border-radius: 5px;
  border: 2px solid ${colors.secondary};
`;

const buttonPrimary = css`
  ${buttonBasic};
  background-color: ${colors.secondary};
  color: ${colors.primary};
  transition: all 0.1s ease;

  &:hover {
    border: 2px solid ${colors.accent};
    background-color: ${colors.accent};
    cursor: pointer;
  }
`;

const buttonSecondary = css`
  ${buttonBasic};
  background-color: transparent;
  color: ${colors.secondary};
  transition: all 0.3s ease;

  &:hover {
    border: 2px solid ${colors.accent};
    color: ${colors.accent};
    cursor: pointer;
  }
`;

const buttonDark = css`
  ${buttonBasic};
  background-color: ${colors.accent};
  border: 1px solid ${colors.accent};
  color: ${colors.secondary};
  transition: all 0.1s ease;

  &:hover {
    border: 1px solid ${colors.primary};
    background-color: ${colors.primary};
    cursor: pointer;
  }
`;

const buttonBlue = css`
  ${buttonBasic};
  background-color: ${colors.primary};
  border: 1px solid ${colors.primary};
  color: ${colors.secondary};
  transition: all 0.1s ease;

  &:hover {
    border: 1px solid ${colors.accent};
    background-color: ${colors.accent};
    cursor: pointer;
  }
`;

const buttonClear = css`
  ${buttonBasic};
  background-color: transparent;
  border: 1px solid ${colors.gray4};
  color: ${colors.gray4};
  transition: all 0.3s ease;

  &:hover {
    border: 1px solid ${colors.dark};
    color: ${colors.dark};
    cursor: pointer;
  }
`;

const ButtonPrimary = styled.button`
  ${buttonPrimary};
`;

export const ButtonSecondary = styled.button`
  ${buttonSecondary};
`;

export const ButtonDark = styled.button`
  ${buttonDark};
`;

export const ButtonBlue = styled.button`
  ${buttonBlue};
`;

export const ButtonClear = styled.button`
  ${buttonClear};
`;

export default ButtonPrimary;
