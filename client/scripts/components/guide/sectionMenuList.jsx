'use strict';

var React = require('react');
var inputActions = require('../../actions/input');
var mui = require('material-ui');
var	DropDownMenu = mui.DropDownMenu;
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = require('material-ui/lib/styles/colors');

var SectionMenuListComponent = React.createClass({

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
		//ThemeManager.setPalette({
		//	accent1Color: Colors.deepOrange500
		//});
	},

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
			selectedIndex={this.props.default}
      //placeholder={this.props.placeholder}
      value={this.state.value}
      onChange={this.onChange}
      index={this.props.index}
      linkidx={this.props.linkidx}
			menuItems={this.props.menuItems}
      />
      /* jshint ignore:end */
    );
  },

  onChange: function(e, selected, menuItem){
    this.setState({
      value: menuItem.text
		});
    this.handleUpdateStoreValue(menuItem.payload, this.props.name, this.props.index, this.props.linkidx);
  },

  handleUpdateStoreValue: function(input, name, index, key){
    inputActions.updateValue(input, name, index, key);
  }
});

module.exports = SectionMenuListComponent;
