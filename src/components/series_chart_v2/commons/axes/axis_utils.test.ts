import { SpecDomains } from '../data_ops/domain';
import { ScaleType } from '../data_ops/scales';
import { getAxisId, getGroupId } from '../ids';
import { AxisOrientation, AxisPosition } from '../series/specs';
import { Theme } from '../themes/theme';
import { computeAxisTicksDimensions, getAvailableTicks, getVisibleTicks } from './axis_utils';
import { SvgTextBBoxCalculator } from './svg_text_bbox_calculator';
const THEME: Theme = {
  chartMargins: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  scales: {
    ordinal: {
      padding: 0,
    },
  },
  axisTitle: {
    fontSize:  20,
  },
  vizColors: [
    'color1',
    'color2',
  ],
  defaultVizColor: 'red',
};
describe('Axis computational utils', () => {
  const mockedRect = {
    x: 0,
    y: 0,
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 10,
    height: 10,
    toJSON: () => '',
  };
  const originalGetBBox = SVGElement.prototype.getBoundingClientRect;
  beforeEach(() => SVGElement.prototype.getBoundingClientRect = function() {
    const text = this.textContent || 0;
    return { ...mockedRect, width: Number(text) * 10, heigh: Number(text) * 10 };
  });
  afterEach(() => (SVGElement.prototype.getBoundingClientRect = originalGetBBox));

  const chartDim = {
    width: 100,
    height: 100,
    top: 0,
    left: 0,
  };
  const axis1Dims = {
    axisScaleType: ScaleType.Linear,
    axisScaleDomain: [0, 1],
    ticksDimensions: [
      { width:  0, height: 10 },
      { width:  1, height: 10 },
      { width:  2, height: 10 },
      { width:  3, height: 10 },
      { width:  4, height: 10 },
      { width:  5, height: 10 },
      { width:  6, height: 10 },
      { width:  7, height: 10 },
      { width:  8, height: 10 },
      { width:  9, height: 10 },
      { width:  10, height: 10 },
    ],
    tickValues: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    tickLabels: ['0', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1'],
    maxTickWidth: 10,
    maxTickHeight: 10,
  };
  const axis1Spec = {
    id: getAxisId('axis_1'),
    groupId: getGroupId('group_1'),
    hide: false,
    showOverlappingTicks: false,
    showOverlappingLabels: false,
    position: AxisPosition.Left,
    orientation: AxisOrientation.Vertical,
    tickSize: 10,
    tickPadding: 10,
    tickFormat: (value: any) => {
      return `${value}`;
    },
  };
  const specDomain: SpecDomains = {
    xDomains: [
      {
        level: 0,
        accessor: 'x',
        domain: [0, 1],
        scaleType: ScaleType.Linear,
      },
    ],
    yDomain: {
      level: 0,
      accessor: 'y',
      domain: [0, 1],
      scaleType: ScaleType.Linear,
    },
    colorDomain: {
      accessors: [],
      domain: [],
      scaleType: ScaleType.Ordinal,
    },
  };

  test('should compute axis dimensions', () => {
    const bboxCalculator = new SvgTextBBoxCalculator();
    const axisDimensions = computeAxisTicksDimensions(axis1Spec, specDomain, bboxCalculator, THEME, 0);
    expect(axisDimensions).toEqual(axis1Dims);
    bboxCalculator.destroy();
  });

  test('should compute available ticks', () => {
    const axisPositions = getAvailableTicks(chartDim, axis1Spec, axis1Dims, THEME);
    const expectedAxisPositions = [
      { label: '0', position: 100, value: 0 },
      { label: '0.1', position: 90, value: 0.1 },
      { label: '0.2', position: 80, value: 0.2 },
      { label: '0.3', position: 70, value: 0.3 },
      { label: '0.4', position: 60, value: 0.4 },
      { label: '0.5', position: 50, value: 0.5 },
      { label: '0.6', position: 40, value: 0.6 },
      { label: '0.7', position: 30, value: 0.7 },
      { label: '0.8', position: 20, value: 0.8 },
      { label: '0.9', position: 10, value: 0.9 },
      { label: '1', position: 0, value: 1 },
    ];
    expect(axisPositions).toEqual(expectedAxisPositions);
  });
  test('should compute visible ticks', () => {
    const allTicks = [
      { label: '0', position: 100, value: 0 },
      { label: '0.1', position: 90, value: 0.1 },
      { label: '0.2', position: 80, value: 0.2 },
      { label: '0.3', position: 70, value: 0.3 },
      { label: '0.4', position: 60, value: 0.4 },
      { label: '0.5', position: 50, value: 0.5 },
      { label: '0.6', position: 40, value: 0.6 },
      { label: '0.7', position: 30, value: 0.7 },
      { label: '0.8', position: 20, value: 0.8 },
      { label: '0.9', position: 10, value: 0.9 },
      { label: '1', position: 0, value: 1 },
    ];
    const visibleTicks = getVisibleTicks(allTicks, axis1Spec, axis1Dims, chartDim);
    const expectedVisibleTicks = [
      { label: '0', position: 100, value: 0 },
      { label: '0.1', position: 90, value: 0.1 },
      { label: '0.2', position: 80, value: 0.2 },
      { label: '0.3', position: 70, value: 0.3 },
      { label: '0.4', position: 60, value: 0.4 },
      { label: '0.5', position: 50, value: 0.5 },
      { label: '0.6', position: 40, value: 0.6 },
      { label: '0.7', position: 30, value: 0.7 },
      { label: '0.8', position: 20, value: 0.8 },
      { label: '0.9', position: 10, value: 0.9 },
      { label: '1', position: 0, value: 1 },
    ];
    expect(visibleTicks).toEqual(expectedVisibleTicks);
  });
  test('should hide some ticks', () => {
    const allTicks = [
      { label: '0', position: 100, value: 0 },
      { label: '0.1', position: 90, value: 0.1 },
      { label: '0.2', position: 80, value: 0.2 },
      { label: '0.3', position: 70, value: 0.3 },
      { label: '0.4', position: 60, value: 0.4 },
      { label: '0.5', position: 50, value: 0.5 },
      { label: '0.6', position: 40, value: 0.6 },
      { label: '0.7', position: 30, value: 0.7 },
      { label: '0.8', position: 20, value: 0.8 },
      { label: '0.9', position: 10, value: 0.9 },
      { label: '1', position: 0, value: 1 },
    ];
    const axis2Dims = {
      axisScaleType: ScaleType.Linear,
      axisScaleDomain: [0, 1],
      ticksDimensions: [
        { width:  0, height: 20 },
        { width:  1, height: 20 },
        { width:  2, height: 20 },
        { width:  3, height: 20 },
        { width:  4, height: 20 },
        { width:  5, height: 20 },
        { width:  6, height: 20 },
        { width:  7, height: 20 },
        { width:  8, height: 20 },
        { width:  9, height: 20 },
        { width:  10, height: 20 },
      ],
      tickValues: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      tickLabels: ['0', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1'],
      maxTickWidth: 10,
      maxTickHeight: 20,
    };
    const visibleTicks = getVisibleTicks(allTicks, axis1Spec, axis2Dims, chartDim);
    const expectedVisibleTicks = [
      { label: '0', position: 100, value: 0 },
      { label: '0.2', position: 80, value: 0.2 },
      { label: '0.4', position: 60, value: 0.4 },
      { label: '0.6', position: 40, value: 0.6 },
      { label: '0.8', position: 20, value: 0.8 },
      { label: '1', position: 0, value: 1 },
    ];
    expect(visibleTicks).toEqual(expectedVisibleTicks);
  });
});