'use strict';

var React = require('react');
var inputActions = require('../../actions/input');
var mui = require('material-ui');
var	DropDownMenu = mui.DropDownMenu;

var SectionTextInputComponent = React.createClass({

  getInitialState: function(){
    return {
      value: this.props.value || ''
    }
  },

  render: function() {
    return (
      /* jshint ignore:start */
      <DropDownMenu
      className={this.props.className}
      id={this.props.id}
      name={this.props.name}
      //placeholder={this.props.placeholder}
      //value={this.state.value}
      onChange={this.onChange}
      index={this.props.index}
      linkidx={this.props.linkidx}
			menuItems={this.props.menuItems}
      />
      /* jshint ignore:end */
    );
  },

  onChange: function(e){
    this.setState({
      value: e.target.value
    });
    this.handleUpdateStoreValue(e.target.value, e.target.name, this.props.index, this.props.linkidx);
  },

  handleUpdateStoreValue: function(input, name, index, key){
    inputActions.updateValue(input, name, index, key);
  }
});

module.exports = SectionTextInputComponent;
