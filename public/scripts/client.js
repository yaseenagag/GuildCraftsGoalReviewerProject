var Root = React.createClass({

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

    return <div>
      <h1>Welcome Back {profile.name}</h1>
      <img src={profile.avatar_url} />
    </div>
  }
});

ReactDOM.render(
  <Root />,
  document.getElementById('content')
);
