import ContentEditable from 'react-contenteditable'
import 'react-select/dist/react-select.css'
import React, { PropTypes } from 'react'
import Select from 'react-select'
import './DBDropdown.scss'

class DBDropdown extends React.Component {

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  static propTypes = {
    dbItems: PropTypes.arrayOf(PropTypes.object)
  }

  static defaultProps = {
    dbItems: []
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  constructor () {

    super()

    this.state = {
      editedFieldName: '',
      editedFieldValue:'',
      dirty: false
    }
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  onSelectDbItem (selectedDbItem) {

    if (selectedDbItem) {

      this.props.onSelectDbItem(
        selectedDbItem)
    }
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  onChangeField (e, fieldName) {

    let fieldValue = e.target.value

    switch (fieldName) {

      case 'price':
        fieldValue = parseFloat(fieldValue)
        break;
    }

    this.setState(Object.assign({}, this.state, {
      editedFieldValue:fieldValue,
      editedFieldName: fieldName,
      dirty: true
    }))
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  onBlurField (e, field) {

    if (this.state.dirty && this.props.selectedDbItem) {

      this.props.selectedDbItem[
        this.state.editedFieldName] =
          this.state.editedFieldValue

      this.props.onUpdateDbItem(
        this.props.selectedDbItem)

      this.state.dirty = false
    }
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  onKeyDown (e) {

    // ENTER
    if (e.keyCode === 13 || !this.props.selectedDbItem) {

      if (this.state.dirty && this.props.selectedDbItem) {

        this.props.selectedDbItem[
          this.state.editedFieldName] =
          this.state.editedFieldValue

        this.props.onUpdateDbItem(
          this.props.selectedDbItem)

        this.state.dirty = false
      }

      e.stopPropagation()
      e.preventDefault()
    }
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  onKeyDownNumeric (e) {

    //backspace, ENTER, ->, <-, delete, '.', ',',
    const allowed = [8, 13, 37, 39, 46, 188, 190]

    if (allowed.indexOf(e.keyCode) > -1 ||
      (e.keyCode > 47 && e.keyCode < 58)) {

      return this.onKeyDown(e)
    }

    e.stopPropagation()
    e.preventDefault()
  }

  /////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////
  render() {

    const {selectedDbItem} = this.props

    return (
        <div className="db-dropdown">
          <Select
            name="form-field-name"
            labelKey="name"
            valueKey="_id"
            value={selectedDbItem ? selectedDbItem._id : null}
            options={this.props.dbItems}
            clearable={false}
            placeholder={'Select material ...'}
            noResultsText={'No material match ...'}
            onChange={(item)=>this.onSelectDbItem(item)}
          />
          <div className="field-container">
            <div className="field-name">
              <b>Supplier:</b>
            </div>
            <ContentEditable
              onBlur={(e)=>this.onBlurField(e, 'supplier')}
              className="field-value"
              html={selectedDbItem ? selectedDbItem.supplier : ''}
              disabled={false}
              onChange={(e)=>this.onChangeField(e, 'supplier')}
              onKeyDown={(e) => this.onKeyDown(e)}
            />
          </div>
          <br/>
          <div className="field-container">
            <div className="field-name">
              <b>Currency:</b>
            </div>
            <ContentEditable
              onBlur={(e)=>this.onBlurField(e, 'currency')}
              className="field-value"
              html={selectedDbItem ? selectedDbItem.currency : ''}
              disabled={false}
              onChange={(e)=>this.onChangeField(e, 'currency')}
              onKeyDown={(e) => this.onKeyDown(e)}
            />
          </div>
          <br/>
          <div className="field-container">
            <div className="field-name">
              <b>Price:</b>
            </div>
            <ContentEditable
              onBlur={(e)=>this.onBlurField(e, 'price')}
              className="field-value"
              html={selectedDbItem ? selectedDbItem.price : ''}
              disabled={false}
              onChange={(e)=>this.onChangeField(e, 'price')}
              onKeyDown={(e) => this.onKeyDownNumeric(e)}
            />
          </div>
        </div>
    )
  }
}

export default DBDropdown
