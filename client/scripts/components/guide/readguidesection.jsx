'use strict';

var React = require('react');
var inputActions = require('../../actions/input');

var ReadGuideSectionComponent = React.createClass({


  render: function() {
    var section = this.props.sec;
    console.log('in readguidesection.jsx section:', section);
    var self = this;
    var linkList = section.links.map(function(link, idx){
      /* jshint ignore:start */
      link.votes = link.votes || 0;
      return(
        <div key={idx}>
       <li>{link.title}</li>
       <li>{link.url}</li>
       </div>
        )
       //   Add back VoteComponent to linkList once fixed
       //  <VoteComponent key={idx} sectionIndex={this.props.index} linkIndex={idx} votes={link.votes}/>
      /* jshint ignore:end */
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
        {linkList}
        </li>
      </ul>
    </div>
    /* jshint ignore:end */
    );
  },

});

module.exports = ReadGuideSectionComponent;
