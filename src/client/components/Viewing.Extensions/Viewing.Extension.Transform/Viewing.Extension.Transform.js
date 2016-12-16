/////////////////////////////////////////////////////////////////////
// Viewing.Extension.CSSTVExtension
// by Philippe Leefsma, April 2016
//
/////////////////////////////////////////////////////////////////////
import TranslateTool from './Viewing.Tool.Translate'
import RotateTool from './Viewing.Tool.Rotate'

import ExtensionBase from 'Viewer.ExtensionBase'
import ViewerToolkit from 'Viewer.Toolkit'

class TransformExtension extends ExtensionBase {

  /////////////////////////////////////////////////////////////////
  // Class constructor
  //
  /////////////////////////////////////////////////////////////////
  constructor (viewer, options = {}) {

    super (viewer, options)

    this.translateTool = new TranslateTool(viewer)

    this.rotateTool = new RotateTool(viewer)

    this.transformedFragIdMap = {}
  }

  /////////////////////////////////////////////////////////////////
  // Extension Id
  //
  /////////////////////////////////////////////////////////////////
  static get ExtensionId () {

    return 'Viewing.Extension.Transform'
  }

  /////////////////////////////////////////////////////////////////
  // Load callback
  //
  /////////////////////////////////////////////////////////////////
  load () {

    this._txControl = ViewerToolkit.createButton(
      'toolbar-translate',
      'fa fa-arrows-alt',
      'Translate Tool', () => {

        if (this.translateTool.active) {

          this.translateTool.deactivate()
          this._txControl.container.classList.remove('active')
          this._comboCtrl.container.classList.remove('active')

        } else {

          this.translateTool.activate()
          this._txControl.container.classList.add('active')

          this.rotateTool.deactivate()
          this._rxControl.container.classList.remove('active')

          this._comboCtrl.container.classList.add('active')
        }
      })

    this.translateTool.on('deactivate', () => {

      this._txControl.container.classList.remove('active')
      this._comboCtrl.container.classList.remove('active')
    })

    this.translateTool.on('transform.translate', (data) => {

      data.fragIds.forEach((fragId) => {

        this.transformedFragIdMap[fragId] = true
      })
    })

    this._rxControl = ViewerToolkit.createButton(
      'toolbar-rotate',
      'fa fa-refresh',
      'Rotate Tool', () => {

        if (this.rotateTool.active) {

          this.rotateTool.deactivate()
          this._rxControl.container.classList.remove('active')
          this._comboCtrl.container.classList.remove('active')

        } else {

          this.rotateTool.activate()
          this._rxControl.container.classList.add('active')

          this.translateTool.deactivate()
          this._txControl.container.classList.remove('active')

          this._comboCtrl.container.classList.add('active')
        }
      })

    this.rotateTool.on('deactivate', () => {

      this._rxControl.container.classList.remove('active')
      this._comboCtrl.container.classList.remove('active')
    })

    this.parentControl = this._options.parentControl

    if (!this.parentControl) {

      var viewerToolbar = this._viewer.getToolbar(true)

      this.parentControl = new Autodesk.Viewing.UI.ControlGroup(
        'transform')

      viewerToolbar.addControl(this.parentControl)
    }

    this._comboCtrl = new Autodesk.Viewing.UI.ComboButton(
      'transform-combo')

    this._comboCtrl.setToolTip('Transform Tools')

    this._comboCtrl.icon.style.fontSize = '24px'
    this._comboCtrl.icon.style.transform = 'rotateY(180Deg)'

    this._comboCtrl.icon.className =
      'glyphicon glyphicon-wrench'

    this._comboCtrl.addControl(this._txControl)
    this._comboCtrl.addControl(this._rxControl)

    var openCombo = this._comboCtrl.onClick

    this._comboCtrl.onClick = (e) => {

      if(this._comboCtrl.container.classList.contains('active')) {

        this._txControl.container.classList.remove('active')
        this._rxControl.container.classList.remove('active')

        this._comboCtrl.container.classList.remove('active')

        this.translateTool.deactivate()
        this.rotateTool.deactivate()

      } else {

        openCombo()
      }
    }

    this.parentControl.addControl(this._comboCtrl)

    console.log('Viewing.Extension.Transform loaded')

    return true
  }

  /////////////////////////////////////////////////////////////////
  // Unload callback
  //
  /////////////////////////////////////////////////////////////////
  unload () {

    this.parentControl.removeControl(
      this._comboCtrl)

    this.translateTool.deactivate()

    this.rotateTool.deactivate()

    console.log('Viewing.Extension.Transform unloaded')
  }

  /////////////////////////////////////////////////////////////////
  //
  //  From viewer.getState:
  //  Allow extensions to inject their state data
  //
  //  for (var extensionName in viewer.loadedExtensions) {
  //    viewer.loadedExtensions[extensionName].getState(
  //      viewerState);
  //  }
  /////////////////////////////////////////////////////////////////
  getState (viewerState) {

    viewerState.transforms = {}

    for (let fragId in this.transformedFragIdMap) {

      const fragProxy = this._viewer.impl.getFragmentProxy(
        this._viewer.model,
        fragId)

      fragProxy.getAnimTransform()

      viewerState.transforms[fragId] = {
        position: fragProxy.position
      }
    }

    console.log(viewerState)
  }

  /////////////////////////////////////////////////////////////////
  //
  //    From viewer.restoreState:
  //    Allow extensions to restore their data
  //
  //    for (var extensionName in viewer.loadedExtensions) {
  //      viewer.loadedExtensions[extensionName].restoreState(
  //        viewerState, immediate);
  //    }
  /////////////////////////////////////////////////////////////////
  restoreState (viewerState, immediate) {

    const currentFragIds = Object.keys(
      this.transformedFragIdMap)

    if (viewerState.transforms) {

      for (let fragId in viewerState.transforms) {

        const fragProxy = this._viewer.impl.getFragmentProxy(
          this._viewer.model,
          fragId)

        const transform = viewerState.transforms[fragId]

        console.log(transform)

        fragProxy.getAnimTransform()

        fragProxy.position.x = transform.position.x
        fragProxy.position.y = transform.position.y
        fragProxy.position.z = transform.position.z

        fragProxy.updateAnimTransform()
      }

      this.viewer.impl.sceneUpdated(true)

      this.transformedFragIdMap = {}
    }
  }
}

Autodesk.Viewing.theExtensionManager.registerExtension(
  TransformExtension.ExtensionId,
  TransformExtension)

