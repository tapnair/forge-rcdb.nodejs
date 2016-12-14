
import {FlexContainer, FlexElement, FlexSplitter} from 'FlexLayout'
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

    this.state = {

    }
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  componentDidMount() {

  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  componentWillUnmount() {

  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  render() {

    switch(this.props.layoutType) {

      case 'flexLayoutRight':

        return (
          <FlexContainer orientation='vertical'>
            <FlexElement flex={0.6}>
              <Viewer
                onViewerCreated={this.props.onViewerCreated}
                onFilterDbItems={this.props.onFilterDbItems}
                updatedDbItem={this.props.updatedDbItem}
                onModelLoaded={this.props.onModelLoaded}
                dbItems={this.props.dbItems}/>
            </FlexElement>
            <FlexSplitter
              onStopResize={() => this.setState(this.state)}
            />
            <FlexElement>
              <FlexContainer orientation='horizontal'
                className="data-pane">
                <FlexElement minSize={210}>
                  <WidgetContainer title="Database">
                    <DBResponsiveView
                      onSelectDbItem={this.props.onSelectDbItem}
                      onUpdateDbItem={this.props.onUpdateDbItem}
                      selectedDbItem={this.props.selectedDbItem}
                      dbItems={this.props.filteredDbItems}
                    />
                  </WidgetContainer>
                </FlexElement>
                <FlexSplitter
                  onStopResize={() => this.setState(this.state)}
                />
                <FlexElement>
                  <WidgetContainer title="Cost Breakdown">
                    <DBChart
                      onClick={this.props.onChartClicked}
                      data={this.props.chartData}
                    />
                  </WidgetContainer>
                </FlexElement>
              </FlexContainer>
            </FlexElement>
          </FlexContainer>
        )

      case 'flexLayoutLeft':

        return (
          <FlexContainer orientation='vertical'>
            <FlexElement>
              <FlexContainer orientation='horizontal'
                className="data-pane">
                <FlexElement minSize={210}>
                  <WidgetContainer title="Database">
                    <DBResponsiveView
                      onSelectDbItem={this.props.onSelectDbItem}
                      onUpdateDbItem={this.props.onUpdateDbItem}
                      selectedDbItem={this.props.selectedDbItem}
                      dbItems={this.props.filteredDbItems}
                    />
                  </WidgetContainer>
                </FlexElement>
                <FlexSplitter
                  onStopResize={() => this.setState(this.state)}
                />
                <FlexElement>
                  <WidgetContainer title="Cost Breakdown">
                    <DBChart
                      onClick={this.props.onChartClicked}
                      data={this.props.chartData}
                    />
                  </WidgetContainer>
                </FlexElement>
              </FlexContainer>
            </FlexElement>
            <FlexSplitter
              onStopResize={() => this.setState(this.state)}
            />
            <FlexElement flex={0.6}>
              <Viewer
                onViewerCreated={this.props.onViewerCreated}
                onFilterDbItems={this.props.onFilterDbItems}
                updatedDbItem={this.props.updatedDbItem}
                onModelLoaded={this.props.onModelLoaded}
                dbItems={this.props.dbItems}/>
            </FlexElement>
          </FlexContainer>
        )
    }
  }
}

module.exports = FlexLayout


