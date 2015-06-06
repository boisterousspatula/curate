'use strict';

var React = require('react');
var SectionLinkList = require('./sectionLinkList.jsx');
var inputActions = require('../../actions/input');
var mui = require('material-ui');
var	TextInputs = mui.TextField;
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = require('material-ui/lib/styles/colors');

var SectionTextInputComponent = React.createClass({

	//Needed for mui to load theme
	childContextTypes: {
		muiTheme: React.PropTypes.object
	},

	//Needed for mui to load theme
	getChildContext: function() {
		return {
			muiTheme: ThemeManager.getCurrentTheme()
		};
	},

	//Set current theme
	componentWillMount: function() {
		ThemeManager.setPalette({
			accent1Color: Colors.deepOrange500
		});
	},
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
      hintText={this.props.placeholder}
			multiline={this.props.isMultiLine}
      value={this.state.value}
      onChange={this.onChange}
      index={this.props.index}
      linkidx={this.props.linkidx}
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
