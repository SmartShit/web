import { color } from 'd3-color';
import { interpolateRgb } from 'd3-interpolate';
import React, { Component } from 'react';
import LiquidFillGauge from 'react-liquid-gauge';
import PropTypes from 'prop-types';

export default class Loader extends Component {
  static propTypes = {
    percentage: PropTypes.number,
  };

  state = {
    value: 50,
  };

  startColor = '#3eb127';

  endColor = '#b30408';

  render() {
    const radius = 200;
    const interpolate = interpolateRgb(this.startColor, this.endColor);
    const fillColor = interpolate(Number(this.props.percentage) / 100);
    const gradientStops = [
      {
        key: '0%',
        stopColor: color(fillColor).darker(0.5).toString(),
        stopOpacity: 1,
        offset: '0%',
      },
      {
        key: '50%',
        stopColor: fillColor,
        stopOpacity: 0.75,
        offset: '50%',
      },
      {
        key: '100%',
        stopColor: color(fillColor).brighter(0.5).toString(),
        stopOpacity: 0.5,
        offset: '100%',
      },
    ];

    return (
      <div>
        <LiquidFillGauge
          style={{ margin: '0 auto' }}
          width={this.props.size}
          height={this.props.size}
          value={this.props.percentage}
          percent="%"
          textSize={1}
          textOffsetX={0}
          textOffsetY={35}
          textRenderer={(props) => {
            const value = Math.round(props.value);
            const radius = Math.min(props.height / 2, props.width / 2);
            const textPixels = (props.textSize * radius / 2);
            const valueStyle = {
              fontSize: textPixels,
            };
            const percentStyle = {
              fontSize: textPixels * 0.6,
            };

            return (
              <tspan>
                <tspan className="value" style={valueStyle}>{value}</tspan>
                <tspan style={percentStyle}>{props.percent}</tspan>
              </tspan>
            );
          }}
          riseAnimation
          waveAnimation
          waveFrequency={2}
          waveAmplitude={1}
          gradient
          gradientStops={gradientStops}
          circleStyle={{
            fill: fillColor,
          }}
          waveStyle={{
            fill: fillColor,
          }}
          textStyle={{
            fill: color('#444').toString(),
            fontFamily: 'Arial',
          }}
          waveTextStyle={{
            fill: color('#fff').toString(),
            fontFamily: 'Arial',
          }}
        />
      </div>
    );
  }
}
