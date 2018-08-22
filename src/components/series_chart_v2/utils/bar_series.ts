import { Dimensions } from '../commons/dimensions';
import {
  createOrdinalScale,
  getContinuousScaleFn,
  getOrdinalScaleFn,
  ScaleConfig,
  ScaleFunction,
  ScaleType,
} from '../commons/scales';
import { BarSeriesGlyph } from '../commons/series/bar_series';
export const DEFAULT_BAR_WIDTH = 10;

/**
 *
 * @param data The data array
 * @param xScaleConfig the x scale configuration
 * @param yScaleConfig the y scale configuration
 * @param seriesDimensions the dimension of the series
 */
export function computeDataPoints(
  data: any[],
  xScaleConfig: ScaleConfig,
  yScaleConfig: ScaleConfig,
  seriesDimensions: Dimensions,
): BarSeriesGlyph[] {
  let barWidth = DEFAULT_BAR_WIDTH;
  let xScale: ScaleFunction;
  if (xScaleConfig.type === ScaleType.Ordinal) {
    const { domain, accessor } = xScaleConfig;
    const ordinalScale = createOrdinalScale(domain as string[], 0, seriesDimensions.width);
    xScale = getOrdinalScaleFn(ordinalScale, accessor);
    barWidth = ordinalScale.bandwidth();
  } else {
    const { domain, accessor, type, clamp } = xScaleConfig;
    xScale = getContinuousScaleFn(
      type,
      domain as number[],
      accessor,
      0,
      seriesDimensions.width,
      clamp,
    );
  }
  let yScale: ScaleFunction;
  if (yScaleConfig.type === ScaleType.Ordinal) {
    const { domain, accessor } = yScaleConfig;
    const ordinalScale = createOrdinalScale(domain as string[], 0, seriesDimensions.height);
    yScale = getOrdinalScaleFn(ordinalScale, accessor);
  } else {
    const { domain, accessor, type, clamp } = yScaleConfig;
    yScale = getContinuousScaleFn(
      type,
      domain as number[],
      accessor,
      0,
      seriesDimensions.height,
      clamp,
    );
  }

  const dataPoints = data.map((point) => {
    const xValue = xScale(point);
    const yValue = yScale(point);
    return { x: xValue, y: seriesDimensions.height - yValue, height: yValue, width: barWidth };
  });
  return dataPoints;
}
