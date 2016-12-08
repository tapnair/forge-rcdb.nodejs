import {LayoutSplitter, Layout} from 'FlexLayout'
import DBResponsiveView from '../DBResponsiveView'
import WidgetContainer from 'WidgetContainer'
import DBChart from 'DBChart'
import Viewer from 'Viewer'
import './FlexLayout.scss'
import React from 'react'


class FlexLayout extends React.Component {

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  state = {

  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  constructor () {

    super()

    this.onResizeHandler = () => {

      this.onResize()
    }
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  componentDidMount() {

    window.addEventListener('resize', this.onResizeHandler)
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  componentWillUnmount() {

    window.removeEventListener('resize', this.onResizeHandler)
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  onResize() {

    this.setState(this.state)

    if(this.eventTimeout) {
      clearTimeout(this.eventTimeout)
    }

    this.eventTimeout = setTimeout(() => {

      this.setState(this.state)
    }, 100)
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  render() {

    var width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth

    var height = window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight

    switch(this.props.layoutType) {

      case 'flexLayoutRight':

        return (
          <div>
            <Layout fill='parent' layoutWidth={width} layoutHeight={height-65}>
              <Layout layoutWidth={width * 60/100}>
                <Viewer
                  onViewerCreated={this.props.onViewerCreated}
                  onFilterDbItems={this.props.onFilterDbItems}
                  updatedDbItem={this.props.updatedDbItem}
                  onModelLoaded={this.props.onModelLoaded}
                  dbItems={this.props.dbItems}/>
              </Layout>
              <LayoutSplitter onResizeComplete={this.onResizeHandler}
                onResizing={this.onResizeHandler}
                orientation='horizontal'
              />
              <Layout layoutWidth='flex'>
                <Layout layoutHeight={(height-65)/2}>
                  <WidgetContainer title="Database">
                    <DBResponsiveView
                      onSelectDbItem={this.props.onSelectDbItem}
                      onUpdateDbItem={this.props.onUpdateDbItem}
                      selectedDbItem={this.props.selectedDbItem}
                      dbItems={this.props.filteredDbItems}
                      height={this.state.splitHeight}
                    />
                  </WidgetContainer>
                </Layout>
                <LayoutSplitter onResizing={this.onResizeHandler}
                  onResizeComplete={this.onResizeHandler}
                />
                <Layout layoutHeight={(height-65)/2}>
                  <WidgetContainer title="Cost Breakdown">
                    <DBChart
                      onClick={this.props.onChartClicked}
                      height={this.state.splitHeight}
                      width={this.state.splitWidth}
                      data={this.props.chartData}
                    />
                  </WidgetContainer>
                </Layout>
              </Layout>
            </Layout>
          </div>
        )

      case 'flexLayoutLeft':
      default:

        return (
          <div>
            <Layout layoutWidth={1000} layoutHeight={500}>
              <Layout layoutHeight={100}>
                Row 1
              </Layout>
              <LayoutSplitter orientation='horizontal'/>
              <Layout layoutHeight={100}>
                Row 2
              </Layout>
              <LayoutSplitter orientation='horizontal'/>
              <Layout layoutHeight={100}>
                Row 3
              </Layout>
              <LayoutSplitter orientation='horizontal'/>
              <Layout layoutHeight={100}>
                Row 4
              </Layout>
            </Layout>
          </div>
        )
    }
  }
}

module.exports = FlexLayout

