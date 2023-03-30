export enum Breakpoints {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
  xxl = 'xxl',
  xxxl = 'xxxl',
  infinity = 'infinity',
}

const breakpointsToPixelsAndNextBreakpointPairMap: Record<Breakpoints, [number, Breakpoints | null]> = {
  [Breakpoints.xs]: [0, Breakpoints.sm],
  [Breakpoints.sm]: [576, Breakpoints.md],
  [Breakpoints.md]: [768, Breakpoints.lg],
  [Breakpoints.lg]: [992, Breakpoints.xl],
  [Breakpoints.xl]: [1200, Breakpoints.xxl],
  [Breakpoints.xxl]: [1440, Breakpoints.xxxl],
  [Breakpoints.xxxl]: [1920, Breakpoints.infinity],
  [Breakpoints.infinity]: [99999999, null],
};

export const breakpointsToMediaQuery = ({
  from = Breakpoints.xs,
  to,
}: {
  from?: Breakpoints;
  to?: Breakpoints;
} = {}): string => {
  const pixelsAndNextBreakpointPairFrom = breakpointsToPixelsAndNextBreakpointPairMap[from];

  if (from === 'infinity' || !pixelsAndNextBreakpointPairFrom) {
    throw new Error('Invalid from parameter value');
  }

  if (!to) {
    to = pixelsAndNextBreakpointPairFrom[1] as Breakpoints;
  }
  const pixelsAndNextBreakpointPairTo = breakpointsToPixelsAndNextBreakpointPairMap[to];

  if (!pixelsAndNextBreakpointPairTo) {
    throw new Error('Invalid to parameter value');
  }

  if (pixelsAndNextBreakpointPairTo[0] <= pixelsAndNextBreakpointPairFrom[0]) {
    throw new Error('Invalid from and to parameters relation');
  }

  return `(min-width: ${pixelsAndNextBreakpointPairFrom[0]}px) and (max-width: ${
    pixelsAndNextBreakpointPairTo[0] - 1
  }px)`;
};
