import { Dimensions } from '../../../dimensions';
import { getGroupId, getSpecId } from '../../../ids';
import { ColorConfig, ScalesConfig } from '../../../themes/theme';
import { SpecDomains } from '../../../utils/domain';
import { ScaleType } from '../../../utils/scales';
import { LineSeriesSpec } from '../../specs';
import { computeDataDomain } from '../domains';
import { renderLineSeriesSpec } from '../rendering';

const CHART_DIMS: Dimensions = {
  top: 0,
  left: 0,
  width: 100,
  height: 100,
};

const SPEC: LineSeriesSpec = {
  id: getSpecId('spec1'),
  groupId: getGroupId('group1'),
  data: [{ x: 0, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 10 }, { x: 3, y: 5 }],
  xAccessor: 'x',
  yAccessors: ['y'],
  xScaleType: ScaleType.Ordinal, // TODO CHECK WITH ORDINAL
  yScaleType: ScaleType.Linear,
  yScaleToDataExtent: false,
};

const chartScalesConfig: ScalesConfig = {
  ordinal: {
      padding: 0,
    },
  };
const chartColorsConfig: ColorConfig = {
  vizColors: ['green'],
  defaultVizColor: 'red',
};

const colorScales = {
  '': 'green',
};

describe('Line rendering 1Y0G', () => {
  let computedDomains: SpecDomains;
  test('should compute the domain', () => {
    computedDomains = computeDataDomain(SPEC);

    expect(computedDomains).toMatchSnapshot();
  });

  test('should render the line series', () => {
    const renderedData = renderLineSeriesSpec(
      SPEC,
      computedDomains,
      CHART_DIMS,
      0,
      colorScales,
      chartColorsConfig,
      chartScalesConfig,
    );
    expect(renderedData).toMatchSnapshot();
  });
});
