import { SpecDomains } from '../../../data_ops/domain';
import { ScaleType } from '../../../data_ops/scales';
import { Dimensions } from '../../../dimensions';
import { getGroupId, getSpecId } from '../../../ids';
import { Theme } from '../../../themes/theme';
import { BarSeriesSpec } from '../../specs';
import { computeDataDomain } from '../domains';
import { renderBarSeriesSpec } from '../rendering';

const CHART_DIMS: Dimensions = {
  top: 0,
  left: 0,
  width: 160, // to easy compute spaces
  height: 100,
};

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
    'green',
    'blue',
  ],
  defaultVizColor: 'red',
};

const colorScales = {
  'a--y1': 'green',
  'a--y2': 'blue',
  'b--y1': 'yellow',
  'b--y2': 'violet',
};

const SPEC: BarSeriesSpec = {
  id: getSpecId('spec1'),
  groupId: getGroupId('group1'),
  data: [
    { x: 0, g: 'a', y1: 1, y2: 4 },
    { x: 0, g: 'b', y1: 3, y2: 6 },
    { x: 1, g: 'a', y1: 2, y2: 1 },
    { x: 1, g: 'b', y1: 2, y2: 5 },
    { x: 2, g: 'a', y1: 10, y2: 5 },
    { x: 2, g: 'b', y1: 3, y2: 1 },
    { x: 3, g: 'a', y1: 7, y2: 3 },
    { x: 3, g: 'b', y1: 6, y2: 4 },
  ],
  xAccessor: 'x',
  yAccessors: ['y1', 'y2'],
  xScaleType: ScaleType.Linear,
  yScaleType: ScaleType.Linear,
  yScaleToDataExtent: false,
  splitSeriesAccessors: ['g'],
};

describe.only('Bar rendering 2Y1G', () => {
  let computedDomains: SpecDomains;

  test('should compute the domain', () => {
    computedDomains = computeDataDomain(SPEC);
    const expectedDomains: SpecDomains = {
      xDomains: [
        {
          accessor: 'x',
          level: 0,
          domain: [0, 1, 2, 3],
          scaleType: ScaleType.Ordinal, // transformation from linear to ordinal
        },
        {
          accessor: 'g',
          level: 1,
          domain: ['a', 'b'],
          scaleType: ScaleType.Ordinal,
        },
        {
          accessor: 'y',
          level: 2,
          domain: ['y1', 'y2'],
          scaleType: ScaleType.Ordinal,
        },
      ],
      yDomain: {
        accessor: 'y',
        level: 0,
        domain: [0, 10],
        scaleType: ScaleType.Linear,
        isStacked: false,
      },
      colorDomain: {
        accessors: ['g'],
        yAccessors: ['y1', 'y2'],
        domain: ['a--y1', 'a--y2', 'b--y1', 'b--y2'],
        scaleType: ScaleType.Ordinal,
      },
    };
    expect(computedDomains).toEqual(expectedDomains);
  });
  test('should render the bar series', () => {
    const renderedData = renderBarSeriesSpec(SPEC, computedDomains, CHART_DIMS, 0, colorScales, THEME);
    const expectedRendering = [
      {
        level: 0,
        accessor: 'x',
        levelValue: '0',
        translateX: 0,
        translateY: 0,
        elements: [
          {
            level: 1,
            accessor: 'g',
            levelValue: 'a',
            translateX: 0,
            translateY: 0,
            elements: [
              { x: 0, y: 90, width: 10, height: 10, fill: 'green' },
              { x: 10, y: 60, width: 10, height: 40, fill: 'blue' },
            ],
          },
          {
            level: 1,
            accessor: 'g',
            levelValue: 'b',
            translateX: 20,
            translateY: 0,
            elements: [
              { x: 0, y: 70, width: 10, height: 30, fill: 'yellow' },
              { x: 10, y: 40, width: 10, height: 60, fill: 'violet' },
            ],
          },
        ],
      },
      {
        level: 0,
        accessor: 'x',
        levelValue: '1',
        translateX: 40,
        translateY: 0,
        elements: [
          {
            level: 1,
            accessor: 'g',
            levelValue: 'a',
            translateX: 0,
            translateY: 0,
            elements: [
              { x: 0, y: 80, width: 10, height: 20, fill: 'green' },
              { x: 10, y: 90, width: 10, height: 10, fill: 'blue' },
            ],
          },
          {
            level: 1,
            accessor: 'g',
            levelValue: 'b',
            translateX: 20,
            translateY: 0,
            elements: [
              { x: 0, y: 80, width: 10, height: 20, fill: 'yellow' },
              { x: 10, y: 50, width: 10, height: 50, fill: 'violet' },
            ],
          },
        ],
      },
      {
        level: 0,
        accessor: 'x',
        levelValue: '2',
        translateX: 80,
        translateY: 0,
        elements: [
          {
            level: 1,
            accessor: 'g',
            levelValue: 'a',
            translateX: 0,
            translateY: 0,
            elements: [
              { x: 0, y: 0, width: 10, height: 100, fill: 'green' },
              { x: 10, y: 50, width: 10, height: 50, fill: 'blue' },
            ],
          },
          {
            level: 1,
            accessor: 'g',
            levelValue: 'b',
            translateX: 20,
            translateY: 0,
            elements: [
              { x: 0, y: 70, width: 10, height: 30, fill: 'yellow' },
              { x: 10, y: 90, width: 10, height: 10, fill: 'violet' },
            ],
          },
        ],
      },
      {
        level: 0,
        accessor: 'x',
        levelValue: '3',
        translateX: 120,
        translateY: 0,
        elements: [
          {
            level: 1,
            accessor: 'g',
            levelValue: 'a',
            translateX: 0,
            translateY: 0,
            elements: [
              { x: 0, y: 30, width: 10, height: 70, fill: 'green' },
              { x: 10, y: 70, width: 10, height: 30, fill: 'blue' },
            ],
          },
          {
            level: 1,
            accessor: 'g',
            levelValue: 'b',
            translateX: 20,
            translateY: 0,
            elements: [
              { x: 0, y: 40, width: 10, height: 60, fill: 'yellow' },
              { x: 10, y: 60, width: 10, height: 40, fill: 'violet' },
            ],
          },
        ],
      },
    ];
    expect(renderedData).toEqual(expectedRendering);
  });
});
