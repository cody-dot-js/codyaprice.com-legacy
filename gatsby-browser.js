import React from 'react';
import { ActiveBreakpointProvider } from './src/components/breakpoints';
import './static/oceanic-next.css';

export function wrapRootElement({ element }) {
  return <ActiveBreakpointProvider>{element}</ActiveBreakpointProvider>;
}
