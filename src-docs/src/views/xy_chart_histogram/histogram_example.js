import React, { Fragment } from 'react';
import { GuideSectionTypes } from '../../components';
import VerticalRectSeriesExample from './vertical_rect_series';
import StackedVerticalRectSeriesExample from './stacked_vertical_rect_series';
import HorizontalRectSeriesExample from './horizontal_rect_series';
import StackedHorizontalRectSeriesExample from './stacked_horizontal_rect_series';
import TimeHistogramSeriesExample from './time_histogram_series';

import {
  EuiSpacer,
  EuiCode,
  EuiCallOut,
  EuiLink,
  EuiHistogramSeries,
} from '../../../../src/components';

export const XYChartHistogramExample = {
  title: 'Histograms',
  intro: (
    <Fragment>
      <p>
        You can use <EuiCode>EuiXYChart</EuiCode> with <EuiCode>EuiHistogramSeries</EuiCode> to
        displaying histogram charts.
      </p>
      <EuiSpacer size="l" />
      <p>
        The <EuiCode>EuiXYChart</EuiCode> component pass the <EuiCode>orientation</EuiCode> prop to every component child
        to accomodate <EuiCode>vertical</EuiCode> and <EuiCode>horizontal</EuiCode> use cases.
        The default orientation is <EuiCode>vertical</EuiCode>.
      </p>
      <EuiSpacer size="l" />
      <p>
        You can specify the <EuiCode>EuiXYChart</EuiCode> prop <EuiCode>xType</EuiCode> and
        <EuiCode>yType</EuiCode> to one of the following scales: <EuiCode>linear</EuiCode>,<EuiCode>log</EuiCode>,
        <EuiCode>time</EuiCode>, <EuiCode>time-utc</EuiCode>.
        The use of <EuiCode>ordinal</EuiCode> and <EuiCode>category</EuiCode> is not supported.
      </p>
      <EuiSpacer size="l" />
      <EuiCallOut
        title="What is an histogram?"
        iconType="pin"
      >
        <Fragment>
          <p>
            A histogram is an accurate representation of the distribution of numerical data. [...]
          </p>
          <p>
            To construct a histogram, the first step is to <em>bin</em> the range of values—that is,
            divide the entire range of values into a series of intervals—and then count how many values fall into each interval.
            The bins are usually specified as consecutive, non-overlapping intervals of a variable.
            The bins (intervals) must be adjacent, and are often (but are not required to be) of equal size
          </p>
          <EuiLink href="https://en.wikipedia.org/wiki/Histogram">Wikipedia</EuiLink>
        </Fragment>
      </EuiCallOut>
      <EuiSpacer size="l" />
    </Fragment>
  ),
  sections: [
    {
      title: 'Vertical Histogram',
      text: (
        <p>
          You can create out-of-the-box vertical histograms just adding a <EuiCode>EuiHistogramSeries</EuiCode>
          component into your <EuiCode>EuiXYChart</EuiCode>.
        </p>
      ),
      props: { EuiHistogramSeries },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./vertical_rect_series'),
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React',
        },
      ],
      demo: (<VerticalRectSeriesExample />),
    },
    {
      title: 'Stacked Vertical Histogram',
      text: (
        <Fragment>
          <p>
            Use <EuiCode>EuiXYChart</EuiCode> with <EuiCode>EuiHistogramSeries</EuiCode> for
            displaying stacked vertical histograms.
          </p>
          <p>
            Specify <EuiCode>stackBy=&quot;x&quot;</EuiCode> to stack bars together.
          </p>
          <EuiCallOut
            size="s"
            title="Is not possible to &quot;cluster&quot; bars by the same X value as in bar charts"
            color="warning"
            iconType="help"
          />
        </Fragment>
      ),
      props: { EuiHistogramSeries },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./stacked_vertical_rect_series'),
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React',
        },
      ],
      demo: (<StackedVerticalRectSeriesExample />),
    },
    {
      title: 'Horizontal Histogram',
      text: (
        <p>
          You can create horizontal histograms specifing <EuiCode>orientation=&quot;horizontal&quot;</EuiCode>.
          Since you are rotating the histogram, you also have to invert your data.
        </p>
      ),
      props: { EuiHistogramSeries },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./vertical_rect_series'),
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React',
        },
      ],
      demo: (<HorizontalRectSeriesExample />),
    },
    {
      title: 'Stacked Horizontal Histogram',
      text: (
        <Fragment>
          <p>
            To display an horizontal stacked histograms specify <EuiCode>stackBy=&quot;x&quot;</EuiCode>.
          </p>
          <EuiCallOut
            size="s"
            title="Is not possible to &quot;cluster&quot; bars by the same Y value as in bar charts"
            color="warning"
            iconType="help"
          />
        </Fragment>
      ),
      props: { EuiHistogramSeries },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./stacked_horizontal_rect_series'),
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React',
        },
      ],
      demo: (<StackedHorizontalRectSeriesExample />),
    },
    {
      title: 'Time Series Histogram version',
      text: (
        <p>
          Use <EuiCode>EuiXYChart</EuiCode> with <EuiCode>xType=&apos;time&apos;</EuiCode>
          to display a time series histogram.
        </p>
      ),
      props: { EuiHistogramSeries },
      source: [
        {
          type: GuideSectionTypes.JS,
          code: require('!!raw-loader!./time_histogram_series'),
        },
        {
          type: GuideSectionTypes.HTML,
          code: 'This component can only be used from React',
        },
      ],
      demo: (<TimeHistogramSeriesExample />),
    },
  ],
};