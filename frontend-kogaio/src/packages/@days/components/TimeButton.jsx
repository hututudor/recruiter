import React from 'react';
import PropTypes from 'prop-types'
import styled, { css }  from 'styled-components';
import { themeGet } from '@kogaio';

const Button = styled.button`
  background: transparent;
  border: none;
  outline: none !important;
  font-weight: bold;
  text-transform: uppercase;
  margin-right: 1rem;
  cursor: pointer;
  //font-size: 1.3rem;
  color: ${themeGet('colors.time-button.normal')};
  
  ::after {
    content: '';
    display: block;
    padding-top: 4px;
    padding-bottom: 5px;
    border-bottom: 3px solid transparent;
  }
  
  ${props => props.active && css`
    color: ${themeGet('colors.time-button.selected')};
    
    ::after {
      border-bottom: 3px solid ${themeGet('colors.time-button.selected')};
    }
  `}
  
  :hover {
    color: ${themeGet('colors.time-button.selected')};
    
    ::after {
      border-bottom: 3px solid ${themeGet('colors.time-button.selected')};
    }
  }
`;

const TimeButton = ({ text, active, onClick }) => {
  return (
    <Button onClick={onClick} active={active}>
      {text}
    </Button>
  );
};

TimeButton.propTypes = {
  text: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func
};

export default TimeButton;
