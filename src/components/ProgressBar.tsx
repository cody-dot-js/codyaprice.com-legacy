import React from 'react';
import { css } from '@emotion/core';

interface Props {
  value?: number;
  max?: number;
  className?: string;
}

const barColor = '#a44fb6';

const style = css`
  background-color: transparent;
  color: ${barColor};
  border-radius: 0;
  display: block;
  height: 0.25rem;
  overflow: hidden;
  width: 100%;
  &::-webkit-progress-bar {
    background-color: transparent;
  }
  &::-webkit-progress-value {
    background-color: ${barColor};
  }

  &::-moz-progress-bar {
    background-color: ${barColor};
  }

  ,
  &::-ms-fill {
    background-color: ${barColor};
  }

  &:focus {
    outline: none;
  }

  &[value] {
    appearance: none;
    border: 0; // Remove Firefox and Opera border

    // To fix background color to the proper shade of Grey in Safari
    &::-webkit-progress-bar {
      border-radius: 0;
    }

    &::-webkit-progress-value {
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
    }
  }

  &[value='100'],
  &[value='0'] {
    &::-webkit-progress-value {
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
    }
  }
`;

function ProgressBar({ value = 0, max = 100, className }: Props) {
  const normalizedValue = (value / max) * 100;

  return (
    <progress
      className={className}
      css={style}
      max={100}
      value={normalizedValue}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={normalizedValue}
      aria-valuetext={`${normalizedValue} %`}
      tabIndex={-1}
    />
  );
}

export default ProgressBar;
