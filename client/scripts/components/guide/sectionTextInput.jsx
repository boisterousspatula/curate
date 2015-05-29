'use strict';

var React = require('react');
var SectionLinkList = require('./sectionLinkList.jsx');
var inputActions = require('../../actions/input')

var SectionTextInputComponent = React.createClass({


  render: function() {

    return (
      /* jshint ignore:start */
      <input 
      className={this.props.className}
      id={this.props.id}
      name={this.props.name}
      placeholder={this.props.placeholder}
      value={this.state.inputValue}
      onChange={this.props.onChange}
      />
      /* jshint ignore:end */
    );
  },

  onChange: function(e){
    this.setState({inputValue: e.target_value})
    
  }
});

module.exports = SectionTextInputComponent;
