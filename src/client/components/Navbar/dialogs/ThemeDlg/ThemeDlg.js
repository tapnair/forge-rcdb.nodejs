import React, { PropTypes } from 'react'
import Modal from 'react-modal'
import './ThemeDlg.scss'

export default class ThemeDlg extends React.Component {

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  constructor() {

    super()

    this.items = [
      {
        img: '/resources/img/forge-theme.png',
        css: '/resources/themes/forge.css',
        name: 'forge-theme',
        caption: 'Forge',
        viewer: {
          backgroundColor: [
            255, 226, 110,
            219, 219, 219
          ]
        },
        key: '1'
      },
      {
        img: '/resources/img/snow-white-theme.png',
        css: '/resources/themes/snow-white.css',
        name: 'snow-white-theme',
        caption: 'Snow White',
        viewer: {
          backgroundColor: [
            245, 245, 245,
            245, 245, 245
          ]
        },
        key: '2'
      }
    ]
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  close () {

    this.props.close()
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  onClick (item) {

    this.props.themeChange(item)
    this.props.saveAppState()
    this.props.close()
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  render() {

    return (
      <div>
        <Modal className="dialog theme"
          isOpen={this.props.open}
          onRequestClose={() => {this.close()}}>

          <div className="title">
            <img/>
            <b>Select theme ...</b>
          </div>

          <div className="content responsive-grid">

            {this.items.map((item) => {
              return (
                <a key={item.key} href="#" onClick={()=>{this.onClick(item)}}>
                  <figure>
                    <img src={item.img}/>
                    <figcaption>
                    {item.caption}
                    </figcaption>
                  </figure>
                </a>)
              })
            }
          </div>

        </Modal>
      </div>
    )
  }
}
