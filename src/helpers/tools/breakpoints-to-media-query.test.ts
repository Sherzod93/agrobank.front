import { Breakpoints, breakpointsToMediaQuery } from './breakpoints-to-media-query';

describe('breakpointsToMediaQuery', () => {
  test('throws an exception if parameters are invalid', () => {
    expect(() => breakpointsToMediaQuery({ from: Breakpoints.infinity })).toThrow();
    expect(() => breakpointsToMediaQuery({ to: Breakpoints.xs })).toThrow();
    expect(() => breakpointsToMediaQuery({ from: Breakpoints.lg, to: Breakpoints.md })).toThrow();
    expect(() => breakpointsToMediaQuery({ from: Breakpoints.lg, to: Breakpoints.lg })).toThrow();
  });

  test('works correct when to breakpoint is omitted', () => {
    expect(breakpointsToMediaQuery({ from: Breakpoints.xs })).toEqual('(min-width: 0px) and (max-width: 575px)');
    expect(breakpointsToMediaQuery({ from: Breakpoints.md })).toEqual('(min-width: 768px) and (max-width: 991px)');
    expect(breakpointsToMediaQuery({ from: Breakpoints.xs })).toEqual(
      breakpointsToMediaQuery({ from: Breakpoints.xs, to: Breakpoints.sm }),
    );
    expect(breakpointsToMediaQuery({ from: Breakpoints.xxl })).toEqual(
      breakpointsToMediaQuery({ from: Breakpoints.xxl, to: Breakpoints.infinity }),
    );
  });

  test('works correct when from breakpoint is omitted', () => {
    expect(breakpointsToMediaQuery({ to: Breakpoints.md })).toEqual('(min-width: 0px) and (max-width: 767px)');
    expect(breakpointsToMediaQuery({ to: Breakpoints.infinity })).toEqual(
      '(min-width: 0px) and (max-width: 99999998px)',
    );
  });

  test('works correct for breakpoints pairs', () => {
    expect(breakpointsToMediaQuery({ from: Breakpoints.xs, to: Breakpoints.infinity })).toEqual(
      '(min-width: 0px) and (max-width: 99999998px)',
    );
    expect(breakpointsToMediaQuery({ from: Breakpoints.md, to: Breakpoints.lg })).toEqual(
      '(min-width: 768px) and (max-width: 991px)',
    );
    expect(breakpointsToMediaQuery({ from: Breakpoints.lg, to: Breakpoints.xxl })).toEqual(
      '(min-width: 992px) and (max-width: 1439px)',
    );
  });
});
