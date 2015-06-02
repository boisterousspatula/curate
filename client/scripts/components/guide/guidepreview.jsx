'use strict';

var React = require('react');
var guideActions = require('../../actions/guide');

var GuidePreviewComponent = React.createClass({
  render: function() {
    var guide = this.props.guide;
    return (
      /* jshint ignore:start */
      <tr>
        <td>
          <h4 guideId={guide.id} onClick={this.handleClick}>{guide.title}</h4>
          <div>
            
            <b>{guide.votes}</b>
            <br/>

            <p>{guide.description}</p>
          </div>
        </td>
      </tr>
      /* jshint ignore:end */
    )
  }

  handleClick: function(e){
    var id = e.target.guideId
    console.log(id)
  }
});

module.exports = GuidePreviewComponent;
