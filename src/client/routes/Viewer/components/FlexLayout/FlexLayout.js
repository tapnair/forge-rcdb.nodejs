
import {ReflexContainer, ReflexElement, ReflexSplitter} from 'react-reflex'
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
  constructor () {

    super()
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  render() {

    switch (this.props.layoutType) {

      case 'flexLayoutRight':

        return (
          <ReflexContainer key="flexLayoutRight" orientation='vertical'>
            <ReflexElement flex={0.6} propagateDimensions={true}>
              <Viewer
                onViewerCreated={this.props.onViewerCreated}
                onFilterDbItems={this.props.onFilterDbItems}
                updatedDbItem={this.props.updatedDbItem}
                onModelLoaded={this.props.onModelLoaded}
                style={{height:"calc(100vh - 65px)"}}
                dbItems={this.props.dbItems}/>
            </ReflexElement>
            <ReflexSplitter onStopResize={() => this.forceUpdate()}/>
            <ReflexElement>
              <ReflexContainer orientation='horizontal'>
                <ReflexElement minSize={210} propagateDimensions={true}>
                  <WidgetContainer title="Database">
                    <DBResponsiveView
                      onSelectDbItem={this.props.onSelectDbItem}
                      onUpdateDbItem={this.props.onUpdateDbItem}
                      selectedDbItem={this.props.selectedDbItem}
                      dbItems={this.props.filteredDbItems}
                    />
                  </WidgetContainer>
                </ReflexElement>
                <ReflexSplitter onStopResize={() => this.forceUpdate()}/>
                <ReflexElement>
                  <WidgetContainer title="Cost Breakdown">
                    <DBChart
                      onClick={this.props.onChartClicked}
                      data={this.props.chartData}
                    />
                  </WidgetContainer>
                </ReflexElement>
              </ReflexContainer>
            </ReflexElement>
          </ReflexContainer>
        )

      case 'flexLayoutLeft':

        return (
          <ReflexContainer key="flexLayoutLeft" orientation='vertical'>
            <ReflexElement flex={0.4}>
              <ReflexContainer orientation='horizontal'>
                <ReflexElement minSize={210} propagateDimensions={true}>
                  <WidgetContainer title="Database">
                    <DBResponsiveView
                      onSelectDbItem={this.props.onSelectDbItem}
                      onUpdateDbItem={this.props.onUpdateDbItem}
                      selectedDbItem={this.props.selectedDbItem}
                      dbItems={this.props.filteredDbItems}
                    />
                  </WidgetContainer>
                </ReflexElement>
                <ReflexSplitter
                  onStopResize={() => this.forceUpdate()}
                />
                <ReflexElement>
                  <WidgetContainer title="Cost Breakdown">
                    <DBChart
                      onClick={this.props.onChartClicked}
                      data={this.props.chartData}
                    />
                  </WidgetContainer>
                </ReflexElement>
              </ReflexContainer>
            </ReflexElement>
            <ReflexSplitter
              onStopResize={() => this.refs.viewer.forceUpdate()}
            />
            <ReflexElement propagateDimensions={true}>
              <Viewer
                onViewerCreated={this.props.onViewerCreated}
                onFilterDbItems={this.props.onFilterDbItems}
                updatedDbItem={this.props.updatedDbItem}
                onModelLoaded={this.props.onModelLoaded}
                style={{height:"calc(100vh - 65px)"}}
                dbItems={this.props.dbItems}/>
            </ReflexElement>
          </ReflexContainer>
        )
    }
  }
}

module.exports = FlexLayout


