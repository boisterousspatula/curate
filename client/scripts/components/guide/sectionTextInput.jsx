'use strict';

var React = require('react');
var SectionLinkList = require('./sectionLinkList.jsx');
var inputActions = require('../../actions/input')

var SectionTextInputComponent = React.createClass({

getInitialState: function(){
console.log('PROOOOOOOOOPS', this.props)
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
      linkidx={this.props.linkidx}
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

    this.handleUpdateStoreValue(e.target.value, e.target.name, this.props.index, this.props.linkidx)

  },
  handleUpdateStoreValue: function(input, name, index, key){

    inputActions.updateValue(input, name, index, key);
  }
});

module.exports = SectionTextInputComponent;
