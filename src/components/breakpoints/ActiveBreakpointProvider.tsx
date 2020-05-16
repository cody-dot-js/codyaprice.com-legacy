import React, { ReactNode } from 'react';
import BreakpointContext from './ActiveBreakpointContext';
import { breakpoints, Breakpoint } from '.';

function getActiveBreakpoint(width: number) {
  const size = width > 0 ? width : 0;

  const breakpoint = breakpoints.find((breakpoint) => size >= breakpoint) ?? 0;

  return Breakpoint[breakpoint];
}

function width() {
  if (typeof window !== 'undefined') {
    return window.innerWidth;
  }

  return 0;
}

interface Props {
  children: ReactNode;
}

function ActiveBreakpointProvider({ children }: Props) {
  const [activeBreakpoint, setActiveBreakpoint] = React.useState(
    getActiveBreakpoint(width())
  );

  const updateActiveBreakpoint = React.useCallback(() => {
    const breakpoint = getActiveBreakpoint(width());

    if (activeBreakpoint !== breakpoint) {
      setActiveBreakpoint(breakpoint);
    }
  }, [activeBreakpoint]);

  React.useEffect(() => {
    window.addEventListener('resize', updateActiveBreakpoint);

    return () => {
      window.removeEventListener('resize', updateActiveBreakpoint);
    };
  }, [updateActiveBreakpoint]);

  return (
    <BreakpointContext.Provider value={activeBreakpoint}>
      {children}
    </BreakpointContext.Provider>
  );
}

export default ActiveBreakpointProvider;
