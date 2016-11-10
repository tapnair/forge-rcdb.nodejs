import EventsEmitter from 'EventsEmitter'
import './Viewer.Tooltip.scss'

export default class ViewerTooltip extends EventsEmitter {

  /////////////////////////////////////////////////////////////////
  // Class constructor
  //
  /////////////////////////////////////////////////////////////////
  constructor (viewer) {

    super()

    viewer.toolController.registerTool(this)

    this.viewer = viewer

    this.active = false
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  setContent (html, selector) {

    this.tooltipSelector = selector

    $(this.viewer.container).append(html)
  }

  /////////////////////////////////////////////////////////////////
  // Tool names
  //
  /////////////////////////////////////////////////////////////////
  getNames () {

    return ['Viewer.Tooltip.Tool']
  }

  /////////////////////////////////////////////////////////////////
  // Tool name
  //
  /////////////////////////////////////////////////////////////////
  getName () {

    return 'Viewer.Tooltip.Tool'
  }

  /////////////////////////////////////////////////////////////////
  // Activate Tool
  //
  /////////////////////////////////////////////////////////////////
  activate () {

    if(!this.active) {

      this.active = true

      this.viewer.toolController.activateTool(
        this.getName())

      $(this.tooltipSelector).css({
        display: 'block'
      })

      this.emit('activate')
    }
  }

  /////////////////////////////////////////////////////////////////
  // Deactivate tool
  //
  /////////////////////////////////////////////////////////////////
  deactivate () {

    if (this.active) {

      this.active = false

      this.viewer.toolController.deactivateTool(
        this.getName())

      $(this.tooltipSelector).css({
        display: 'none'
      })

      this.emit('deactivate')
    }
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  handleSingleClick (event, button) {

    return false
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  handleMouseMove (event) {

    $(this.tooltipSelector).css({
      left : event.clientX + 'px',
      top  : event.clientY - 95 + 'px'
    })

    const screenPoint = {
      x: event.clientX,
      y: event.clientY
    }

    const worldPoint = this.screenToWorld(screenPoint)

    if (worldPoint && this.active) {

      //console.log(worldPoint)
    }

    return false
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  screenToWorld (screenPoint) {

    var viewport = this.viewer.navigation.getScreenViewport()

    var n = {
      x: (screenPoint.x - viewport.left) / viewport.width,
      y: (screenPoint.y - viewport.top ) / viewport.height
    }

    return this.viewer.utilities.getHitPoint(n.x, n.y)
  }

  ///////////////////////////////////////////////////////////////////////////
  // world -> screen coords conversion
  //
  ///////////////////////////////////////////////////////////////////////////
  worldToScreen (worldPoint, camera) {

    var p = new THREE.Vector4()

    p.x = worldPoint.x
    p.y = worldPoint.y
    p.z = worldPoint.z
    p.w = 1

    p.applyMatrix4(camera.matrixWorldInverse)
    p.applyMatrix4(camera.projectionMatrix)

    // Don't want to mirror values with negative z (behind camera)
    // if camera is inside the bounding box,
    // better to throw markers to the screen sides.
    if (p.w > 0) {

      p.x /= p.w;
      p.y /= p.w;
      p.z /= p.w;
    }

    // This one is multiplying by width/2 and height/2,
    // and offsetting by canvas location
    var point = this._viewer.impl.viewportToClient(p.x, p.y);

    // snap to the center of the pixel
    point.x = Math.floor(point.x) + 0.5;
    point.y = Math.floor(point.y) + 0.5;

    return point;
  }

  /////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////
  handleKeyDown (event, keyCode) {

    return false
  }
}
