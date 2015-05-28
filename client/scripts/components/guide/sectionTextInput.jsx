'use strict';

var React = require('react');
var SectionLinkList = require('./sectionLinkList.jsx');

var SectionTextInputComponent = React.createClass({


  render: function() {

    return (
      /* jshint ignore:start */
      <input 
      className={this.props.className}
      id={this.props.id}
      name={this.props.name}
      placeholder={this.props.placeholder}
      value={this.props.value}
      />
      /* jshint ignore:end */
    );
  },
});

module.exports = SectionTextInputComponent;
