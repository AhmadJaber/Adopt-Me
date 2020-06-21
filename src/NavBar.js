import React, { useContext } from 'react';
import { Link } from '@reach/router';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

import ThemeContext from './ThemeContext';
import colors from './colors';

const spin = keyframes`
  to {
    transform: rotate(-360deg);
  }
`;

const HeaderTag = styled.header`
  background-color: ${(props) => props.color};
  padding: 15px;

  .emoji {
    font-size: 60px;
    animation: 1s ${spin} linear infinite;

    &:hover {
      animation: 1s ${spin} linear infinite reverse;
    }
  }

  .logo:hover {
    text-decoration: underline;
    text-decoration-color: ${(props) =>
      props.color === 'peru' ? colors.secondary : '#bf3334'};
  }
`;

const NavBar = () => {
  const [theme] = useContext(ThemeContext);

  return (
    <HeaderTag color={theme}>
      <Link className='logo' to='/'>
        Adopt Me!
      </Link>
      <span className='emoji' role='img' aria-label='poodle'>
        🐩
      </span>
    </HeaderTag>
  );
};

export default NavBar;
