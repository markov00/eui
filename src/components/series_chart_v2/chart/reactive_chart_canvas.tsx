import { inject, observer } from 'mobx-react';
import React from 'react';
import { Layer, Stage } from 'react-konva';
import { Axis } from '../components/canvas/axis';
import { BarSeries } from '../components/canvas/bar_series';
import { ChartStore } from '../state/chart_state';

interface ReactiveChartProps {
  chartStore?: ChartStore; // FIX until we find a better way on ts mobx
}
class Chart extends React.Component<ReactiveChartProps> {
  public static displayName = 'ReactiveChart';

  public componentDidMount() {
    // tslint:disable-next-line:no-console
    console.log('Chart mounted');
  }

  public componentWillUnmount() {
    // tslint:disable-next-line:no-console
    console.log('Chart unmounted');
  }

  public renderAxes = () => {
    const {
      axesVisibleTicks,
      axesSpecs,
      axesTicksDimensions,
      axesPositions,
      chartTheme,
    } = this.props.chartStore!;
    const axesComponents: JSX.Element[] = [];
    axesVisibleTicks.forEach((axisTicks, axisId) => {
      const axisSpec = axesSpecs.get(axisId);
      const axisTicksDimensions = axesTicksDimensions.get(axisId);
      const axisPosition = axesPositions.get(axisId);
      const ticks = axesVisibleTicks.get(axisId);
      if (!ticks || !axisSpec || !axisTicksDimensions || !axisPosition) {
        return;
      }
      axesComponents.push(
        <Axis
          key={`axis-${axisId}`}
          axisSpec={axisSpec}
          axisTicksDimensions={axisTicksDimensions}
          axisPosition={axisPosition}
          ticks={ticks}
          chartTheme={chartTheme}
        />,
      );
    });
    return axesComponents;
  }

  public renderBarSeries = () => {
    const { barSeriesGlyphs } = this.props.chartStore!;
    const bars: JSX.Element[] = [];
    barSeriesGlyphs.forEach((barGlyphs) => {
      bars.push(<BarSeries key="data bars" glyphs={barGlyphs} />);
    });
    return bars;
  }

  public render() {
    const { initialized } = this.props.chartStore!;
    if (!initialized.get()) {
      return null;
    }

    const { parentDimensions, chartDimensions, chartRotation } = this.props.chartStore!;

    const chartTransform = {
      x: 0,
      y: 0,
      rotate: 0,
    };
    if (chartRotation === 90) {
      chartTransform.x = chartDimensions.width;
      chartTransform.rotate = 90;
    } else if (chartRotation === -90) {
      chartTransform.y = chartDimensions.height;
      chartTransform.rotate = -90;
    }
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          boxSizing: 'border-box',
        }}
      >
       <Stage
        width={parentDimensions.width}
        height={parentDimensions.height}
        style={{
          width: '100%',
          height: '100%',
        }}
        >
      <Layer
        x={chartDimensions.left}
        y={chartDimensions.top}
      >
        {this.renderBarSeries()}
      </Layer>
      <Layer>{this.renderAxes()}</Layer>
      </Stage>
      </div >
    );
  }
}

export const ReactiveChart = inject('chartStore')(observer(Chart));
