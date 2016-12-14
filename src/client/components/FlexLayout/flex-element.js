import ReactDOM from 'react-dom'
import React from 'react'

export default class FlexElement extends React.Component {

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  static propTypes = {
    className: React.PropTypes.string
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  static defaultProps = {
    className: ''
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  constructor (props) {

    super(props)

    this.state = {

    }
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  componentDidMount () {

  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  componentWillUnmount () {

  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  render () {

    const classNames = [
      ...this.props.className.split(' '),
      'flex-element'
    ]

    const children = React.Children.map(
      this.props.children, (child) => {

        return child
      })

    const style = Object.assign({}, this.props.style, {
      WebkitBoxFlex: this.props.flex, /* OLD - iOS 6-, Safari 3.1-6 */
      MozBoxFlex: this.props.flex,    /* OLD - Firefox 19- */
      WebkitFlex: this.props.flex,    /* Chrome */
      FlexElement: this.props.flex,   /* IE 10 */
      flex: this.props.flex
    })

    return (
      <div className={classNames.join(' ')} style={style}>
        { children }
      </div>
    )
  }
}
