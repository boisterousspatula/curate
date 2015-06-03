'use strict';

var React = require('react');
var guideActions = require('../../actions/guide');
var routeActions = require('../../actions/routes');

var GuidePreviewComponent = React.createClass({
  render: function() {
    var guide = this.props.guide;
    return (
      /* jshint ignore:start */
      <tr>
        <td>
          <h4 guideId={this.props.guide.id} onClick={this.handleClick}>{guide.title}</h4>
          <div>

            <b>{guide.votes}</b>
            <br/>

            <p>{guide.description}</p>
          </div>
        </td>
      </tr>
      /* jshint ignore:end */
    );
  },

  handleClick: function(e){
    var id = this.props.guide.id;
    console.log('selected guide id', id);
    guideActions.passGuideId(id);
    routeActions.setRoute('/readguide');
  }
});

module.exports = GuidePreviewComponent;
