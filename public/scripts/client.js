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
    return function(props){
      return <GoalPage goalId={RegExp.$1} {...props} />
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
    <a href={"/goals/"+props.number}>{props.title}</a>
  </div>
}

var GoalPage = function(props){
  return <div>Goal #{props.goalId} Page</div>;
};

var NotFoundPage = function(){
  return <div>Page Not Found</div>;
}
