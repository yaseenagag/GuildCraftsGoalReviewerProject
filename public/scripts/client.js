var Root = React.createClass({

  propTypes: {
    path: React.PropTypes.string.isRequired
  },

  getInitialState: function(){
    return {
      profile: null
    }
  },

  componentWillMount: function(){
    $.getJSON('/api/profile', function(profile){
      console.log(profile)
      this.setState({profile: profile})
    }.bind(this))
  },

  render: function(){
    console.log('Root render', this.state)
    var profile = this.state.profile;
    if (profile === null) {
      return <div>Loading...</div>;
    }

    if (profile.notLoggedIn){
      return <div>
        <a href={profile.loginURI}>Click here to login via GitHub</a>
      </div>
    }

    if (profile.error){
      return <div>
        <h1>Error loading profile: {error}</h1>
      </div>
    }

    var Page = router(this.props.path)

    return <Layout>
      <Page profile={profile} />
    </Layout>
  }
});

ReactDOM.render(
  <Root path={location.pathname} />,
  document.getElementById('content')
);



function router(path){
  // strip off any trailing slash
  if (path[path.length-1] === '/') path = path.slice(0,-1)

  if (path === '') return HomePage
  if (path === '/goals') return GoalsPage
  if (path.match(/^\/goals\/(\d+)/)){
    var goalNumber = RegExp.$1
    return function(props){
      return <GoalPage goalNumber={goalNumber} {...props} />
    }
  }
  return NotFoundPage
}


// Components


var Layout = function(props){
  return <div>
    <Header />
    {props.children}
  </div>
}

var Header = function(props){
  return <header>
    <a href="/">Home</a> |
    <a href="/goals">Goals</a>
  </header>
}

var HomePage = function(props){
  var profile = props.profile;
  return <div>
    <h1>Welcome Back {profile.name}</h1>
    <img src={profile.avatar_url} />
  </div>
};

var GoalsPage = React.createClass({
  getInitialState: function(){
    return {
      goals: null
    }
  },

  componentWillMount: function(){
    $.getJSON('/api/goals', function(goals){
      this.setState({goals: goals})
    }.bind(this))
  },

  render: function(props){
    var goals = this.state.goals === null ? <div>Loading...</div> :
      <ol>{this.state.goals.map(GoalListItem)}</ol>

    return <div>
      <h1>Goals Page</h1>
      {goals}
    </div>;
  }
});

var GoalListItem = function(props){
  return <div key={props.id}>
    <a href={"/goals/"+props.number}>{props.number} {props.title}</a>
  </div>
}

var GoalPage = React.createClass({

  getInitialState: function(){
    return {
      goal: null,
    }
  },

  componentWillMount: function(){
    $.getJSON('/api/goals/'+this.props.goalNumber, function(goal){
      this.setState({goal: goal})
    }.bind(this))
  },

  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.state.goal.body.toString());
    return { __html: rawMarkup };
  },

  render: function(props){
    var goal = this.state.goal
    if (goal === null) return <div>Loading goal {this.props.goalNumber}</div>

    return <div>
      <h1>{goal.title} {goal.number}</h1>
      <h3>{goal.user.login}</h3>
      <h4>{goal.created_at}</h4>
      <h4><a href={goal.html_url}>{goal.html_url}</a></h4>
      <span dangerouslySetInnerHTML={this.rawMarkup()} />
    </div>
  }
});

var NotFoundPage = function(){
  return <div>Page Not Found</div>;
}
