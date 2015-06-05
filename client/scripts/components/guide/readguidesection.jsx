'use strict';

var React = require('react');
var Vote= require('./readguidevote.jsx');
var inputActions = require('../../actions/input');


var ReadGuideSectionComponent = React.createClass({

  render: function() {
    var section = this.props.sec;
    var self = this;
    var linkList = section.links.map(function(link, idx){
      /* jshint ignore:start */
      return(
        <div key={idx}>
        <ul>
          <li>{link.title}</li>
          <li>{link.url}</li>
        </ul>
         <Vote votes={link.votes} type="link" linkIndex={idx} sectionIndex={self.props.index} />
        </div>

        )
    });

    return (
      /* jshint ignore:start */
    <div>
      <ul>
        <li>
        <label>Section Title: </label>
        {section.title}
        </li>

        <li>
        <label>Section Description: </label>
        {section.description}
        </li>

        <li>
        <label>Links: </label> 
        </li>
        {linkList}
       
      </ul>
    </div>
    /* jshint ignore:end */
    );
  },


});

module.exports = ReadGuideSectionComponent;
