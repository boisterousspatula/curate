'use strict';

var React = require('react');
var SectionLinkList = require('./sectionLinkList.jsx');
var inputActions = require('../../actions/input')

var SectionTextInputComponent = React.createClass({

getInitialState: function(){
  return {
    value: this.props.value || ''
  }
},
  render: function() {

    return (
      /* jshint ignore:start */
      <input 
      className={this.props.className}
      id={this.props.id}
      name={this.props.name}
      placeholder={this.props.placeholder}
      value={this.state.value}
      onChange={this.onChange}
      index={this.props.index}
      />
      /* jshint ignore:end */
    );
  },

  // save: function(){
  //   this.props.onSave(this.state.value);
  //   this.setState({
  //     value: ''
  //   });
  // },

  onChange: function(e){
    this.setState({
      value: e.target.value
    })

    this.handleUpdateStoreValue(e.target.value, e.target.name, e.target.index);
  },
  handleUpdateStoreValue: function(input, name, index){
    inputActions.updateValue(input, name, index);
  }
});

module.exports = SectionTextInputComponent;
