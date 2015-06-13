'use strict';

var React = require('react');
var DefaultLayout = require('../layouts/default.jsx');
var guideActions = require('../../actions/guide');
var inputActions = require('../../actions/input');
var guideStore = require('../../stores/guides');
var GuideVote = require('./vote.jsx');
var GuideSection = require('./readguidesection.jsx');
var CommentsBox = require('../comment/commentBox.jsx');
var FavoriteButton = require('../favorites/favoriteButton.jsx');
var mui = require('material-ui');
var LinearProgress = mui.LinearProgress;
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = require('material-ui/lib/styles/colors');

var ReadGuideComponent = React.createClass({
//Needed for mui to load theme
	childContextTypes: {
		muiTheme: React.PropTypes.object
	},
//
//	//Needed for mui to load theme
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
  getInitialState: function () {

    var dummyObj = {
      title: null,
      description: null,
      sections: [],
      userId: null,
      userEmail: null,
      category: null,
      votes: 0,
      comments: [{message:null, userEmail:null}]
    };

    var guideId = guideStore.getId();
    guideActions.getGuide(guideId);

    return {
      // guide: guideStore.get(),
      id: guideId,
      guide: dummyObj
	  };
  },

  componentDidMount: function() {
    guideStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    guideStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      guide: guideStore.get()
    });
  },

	render: function() {
    var guide = this.state.guide;
    var sections = guide.sections.map(function(sec, idx) {
      return (
        /* jshint ignore:start */
        <GuideSection key={idx} index={idx} sec={sec} guideId={guide.id}/>
        /* jshint ignore:end */

      );
    });

		return (
			/* jshint ignore:start */

			<DefaultLayout>       
        <div className='readGuideContainer'>
          <div className='readGuideHeader'>
           
           <div className='voteAndFav'>
            <GuideVote votes={this.state.guide.votes} type='readGuide' onDownvote={this.handleDownvote} onUpvote={this.handleUpvote}/>
            <div className='favButton'>
             <FavoriteButton guideId={this.state.id} />
            </div>
          </div>


          <span className='guideTitle'>
            {this.state.guide.title}
          </span>
          <span className="submittedBy">
            Curated by: <span className='guideCreatorName'>{this.state.guide.userEmail}</span>
          </span>
          
        </div>

					{/*<LinearProgress mode='determinate' value={50}/>*/}

          <div className='guideContentContainer'>
            <span className='guideDescHeader'>Guide Description</span>
            <span className='guideDescription'> {this.state.guide.description}</span>
              {sections}
  				  <CommentsBox guideId={this.state.id} comments={guide.comments}/>
				</div>
      </div>     
			</DefaultLayout>
			/* jshint ignore:end */
		);
	},

  handleUpvote: function(e) {
    e.preventDefault();
    var type = 'upvote';
    var linkIndex = this.props.linkIndex;
  
    inputActions.postLinkVote(type, linkId, guideId, linkIndex, sectionIndex)

  },
  handleDownvote: function(e) {
    e.preventDefault();
    var type = 'downvote';
    var linkIndex = this.props.linkIndex;
    var sectionIndex = this.props.sectionIndex;

    inputActions.postLinkVote(type, linkId, guideId, linkIndex, sectionIndex)

  }


})



module.exports = ReadGuideComponent;
