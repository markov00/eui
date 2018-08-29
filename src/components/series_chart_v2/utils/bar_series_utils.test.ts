import { computeDataDomain } from '../commons/domain';
import { ScaleType } from '../commons/scales';
import { computeDataPoints, DEFAULT_BAR_WIDTH } from './bar_series_utils';

describe('Bar Series', () => {
  test('Compute a simple ordinal bar series', () => {
    const data = [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 3 },
      { x: 4, y: 3 },
    ];
    const xScaleType = ScaleType.Ordinal;
    const yScaleType = ScaleType.Linear;
    const xAccessor = (datum: any) => datum.x;
    const yAccessor = (datum: any) => datum.y;
    const xDomain = computeDataDomain(data, xAccessor, xScaleType);
    const yDomain = computeDataDomain(data, yAccessor, yScaleType, true);
    const seriesDimensions = {
      width: 100,
      height: 100,
      top: 0,
      left: 0,
    };
    const seriesScales = [
      {
        groupLevel: 0,
        xDomain,
        yDomain,
        xScaleType,
        yScaleType,
        xAccessor,
        yAccessor,
      },
    ];
    const dataPoints = computeDataPoints(data, seriesScales, seriesDimensions);
    const expectedBandwidth = 25;
    const expectedDataPoints = [
      { x: 0, y: 100, height: 0, width: 25 },
      { x: expectedBandwidth, y: 50, height: 50, width: 25 },
      { x: expectedBandwidth + 25, y: 0, height: 100, width: 25 },
      { x: expectedBandwidth + 50, y: 0, height: 100, width: 25 },
    ];
    expect(dataPoints).toEqual(expectedDataPoints);
  });
  test.only('Compute a grouped ordinal bar series', () => {
    const data = [
      { level0: 'a', x: 1, y: 1 },
      { level0: 'a', x: 2, y: 2 },
      { level0: 'b', x: 1, y: 3 },
      { level0: 'b', x: 2, y: 3 },
      { level0: 'c', x: 1, y: 3 },
      { level0: 'c', x: 3, y: 3 },
    ];
    const xScaleType = ScaleType.Ordinal;
    const yScaleType = ScaleType.Linear;
    const xAccessor = (datum: any) => datum.x;
    const yAccessor = (datum: any) => datum.y;
    const level0Accessor = (datum: any) => datum.level0;
    const seriesDimensions = {
      width: 100,
      height: 100,
      top: 0,
      left: 0,
    };
    const seriesScales = [
      {
        groupLevel: 0,
        xDomain: ['a', 'b', 'c'],
        xScaleType,
        xAccessor: level0Accessor,
      },
      {
        groupLevel: 1,
        xDomain: [1, 2, 3],
        yDomain: [0, 3],
        xScaleType,
        yScaleType,
        xAccessor,
        yAccessor,
      },
    ];
    const dataPoints = computeDataPoints(data, seriesScales, seriesDimensions);
    const expectedBandwidth = 25;
    const expectedDataPoints = [
      { x: 0, y: 100, height: 0, width: 25 },
      { x: expectedBandwidth, y: 50, height: 50, width: 25 },
      { x: expectedBandwidth + 25, y: 0, height: 100, width: 25 },
      { x: expectedBandwidth + 50, y: 0, height: 100, width: 25 },
    ];
    expect(dataPoints).toEqual(expectedDataPoints);
  });
  test('Compute a simple linear bar series', () => {
    const data = [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 3 },
      { x: 4, y: 3 },
      { x: 5, y: 3 },
    ];
    const xScaleType = ScaleType.Linear;
    const yScaleType = ScaleType.Linear;
    const xAccessor = (datum: any) => datum.x;
    const yAccessor = (datum: any) => datum.y;
    const xDomain = computeDataDomain(data, xAccessor, xScaleType);
    const yDomain = computeDataDomain(data, yAccessor, yScaleType, true);
    const seriesScales = [
      {
        groupLevel: 0,
        xDomain,
        yDomain,
        xScaleType,
        yScaleType,
        xAccessor,
        yAccessor,
      },
    ];
    const seriesDimensions = {
      width: 100,
      height: 100,
      top: 0,
      left: 0,
    };
    const dataPoints = computeDataPoints(data, seriesScales, seriesDimensions);
    const expectedDataPoints = [
      { x: 0, y: 100, height: 0, width: DEFAULT_BAR_WIDTH },
      { x: 25, y: 50, height: 50, width: DEFAULT_BAR_WIDTH },
      { x: 50, y: 0, height: 100, width: DEFAULT_BAR_WIDTH },
      { x: 75, y: 0, height: 100, width: DEFAULT_BAR_WIDTH },
      { x: 100, y: 0, height: 100, width: DEFAULT_BAR_WIDTH },
    ];
    expect(dataPoints).toEqual(expectedDataPoints);
  });
  test('Compute a simple linear bar series with clamped domains', () => {
    const data = [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 3 },
      { x: 4, y: 3 },
      { x: 5, y: 3 },
    ];
    const xScaleType = ScaleType.Linear;
    const yScaleType = ScaleType.Linear;
    const xAccessor = (datum: any) => datum.x;
    const yAccessor = (datum: any) => datum.y;
    const xDomain = [1, 5];
    const yDomain = [0, 2];
    const seriesScales = [
      {
        groupLevel: 0,
        xDomain,
        yDomain,
        xScaleType,
        yScaleType,
        xAccessor,
        yAccessor,
      },
    ];
    const seriesDimensions = {
      width: 100,
      height: 100,
      top: 0,
      left: 0,
    };
    const dataPoints = computeDataPoints(data, seriesScales, seriesDimensions, true);
    const expectedDataPoints = [
      { x: 0, y: 100, height: 0, width: DEFAULT_BAR_WIDTH },
      { x: 25, y: 0, height: 100, width: DEFAULT_BAR_WIDTH },
      { x: 50, y: 0, height: 100, width: DEFAULT_BAR_WIDTH },
      { x: 75, y: 0, height: 100, width: DEFAULT_BAR_WIDTH },
      { x: 100, y: 0, height: 100, width: DEFAULT_BAR_WIDTH },
    ];
    expect(dataPoints).toEqual(expectedDataPoints);
  });
});