import React, { PropTypes } from 'react'
import PieChart from './PieChart'
import Legend from 'Legend'
import './DBChart.scss'

class DBChart extends React.Component {

  /////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////
  componentDidMount () {

    this.onResizeHandler = () => {
      this.onResize()
    }

    window.addEventListener(
      'resize',
      this.onResizeHandler)
  }

  /////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////
  onResize () {

    if(this.eventTimeout) {
      clearTimeout(this.eventTimeout)
    }

    this.eventTimeout = setTimeout(() => {
      this.draw(this.props.data)
    }, 100)
  }

  /////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////
  componentWillUnmount () {

    window.removeEventListener(
      'resize',
      this.onResizeHandler)

    if (this.pieChart) {

      this.pieChart.destroy()
    }

    $('.pie-chart-container').empty()

    $('.legend-container').empty()
  }

  /////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////
  componentDidUpdate () {


  }

  /////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////
  render() {

    setTimeout(() => {
      this.draw(this.props.data)
    }, 100)

    return (
      <div className="db-chart">
        <div className="legend-scroll">
          <div className="legend-container">
          </div>
        </div>
        <div className="pie-chart-container">
        </div>
        <div className="footer">
          <div className="footer-panel">
          </div>
          <div className="footer-panel">
          </div>
        </div>
      </div>
    );
  }

  /////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////
  draw (chartData) {

    $('.legend-container').empty()

    $('.legend-container').css({
      height: `${chartData.length * 20}px`
    })

    this.legend = new Legend(
      $('.legend-container')[0],
      chartData)

    this.legend.on('legend.click', (data) => {

      this.pieChart.pie.openSegment(data.index)

      this.props.onClick(data.item)
    })

    $('.pie-chart-container').empty()

    if(chartData && chartData.length) {

      const groupedChartData = this.groupDataSmallerThan(
        chartData, 5.0)

      const height = $('.pie-chart-container').height()
      const width = $('.pie-chart-container').width()

      if($('.pie-chart-container').length) {

        this.pieChart = new PieChart(
          '.pie-chart-container',
          groupedChartData,
          { effects: { load: { effect: "none" }},
            size: {
              canvasHeight: height * 0.9,
              canvasWidth: width * 0.9,
              pieInnerRadius: '0%',
              pieOuterRadius: '98%'
            }})

        this.pieChart.on('pieSegment.click', (item) => {

          this.props.onClick(item)
        })
      }
    }
  }

  /////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////
  groupDataSmallerThan (chartData, threshold) {

    const groupedData = []

    let otherData = {
      value: 0,
      percent: 0,
      item: {
        components: []
      }
    }

    chartData.forEach((entry) => {

      if (entry.percent < threshold) {

        const components = [
          ...otherData.item.components,
          ...entry.item.components
        ]

        const percent = otherData.percent + entry.percent

        const value = otherData.value + entry.value

        const label =  `Other materials: ` +
          `${percent.toFixed(2)}% ` +
          `(${value.toFixed(2)} USD)`

        otherData = Object.assign({}, entry, {
          percent,
          label,
          value,
          item: {
            components
          }
        })

      } else {

        groupedData.push(entry)
      }
    })

    if (otherData.value > 0) {

      groupedData.push(otherData)
    }

    return groupedData
  }
}

export default DBChart
