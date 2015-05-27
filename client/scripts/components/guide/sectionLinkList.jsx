'use strict';

var React = require('react');
var SectionLink = require('./sectionLink.jsx')

var SectionLinkListComponent = React.createClass({
  render: function () {
    var links = this.props.links
    var linkList = links.map(function(link, idx){
      return (
        <SectionLink key={idx} link={link}/>
      )
    })
    return (
      /* jshint ignore:start */
      <li>
        {linkList}
      </li>
      /* jshint ignore:end */
    );
  },

});

module.exports = SectionLinkListComponent;
