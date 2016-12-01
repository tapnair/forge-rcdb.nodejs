import {LayoutSplitter, Layout} from 'react-flex-layout'
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
  componentDidMount() {

  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  render() {

    switch(this.props.layoutType) {

      case 'flexLayoutRight':

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

      case 'flexLayoutLeft':
      default:

        return (
          <div>

          </div>
        )
    }
  }
}

module.exports = FlexLayout

