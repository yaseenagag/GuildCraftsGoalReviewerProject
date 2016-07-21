var state = {}
var commands = {}

commands.logout = function(){
  state = {};
  render();
};

commands.login = function(){
  state.currentUser = {
    name: 'Peter', /* this will come from the oauth - need to clairfy */
  }
  render();
};

commands.loadGoals = function(){
  $.getJSON( '/data/goals.json?' + (new Date), function( goals ) {
    state.goals = goals;
    render();
  })
};

var PlaceholderContent = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Please Login</h1>
        <LoginLink size="huge" />
        <LoginLink size="small" />
      </div>
    );
  }
});

var SimpleExample = React.createClass({
  render: function(){
    if ( this.props.currentUser ) {
      return (
        <div>
          <h1>Welcome Back {this.props.currentUser.name}</h1>
          <LogoutLink />
          <GoalsList goals={this.props.goals} />
        </div>
      );
    } else {
      return <PlaceholderContent />
    }
  }
})

var LogoutLink = React.createClass({
  render: function(){
    return <a
      href="javascript: void(null);"
      onClick={commands.logout}
    >Logout</a>
  }
});

var LoginLink = React.createClass({
  classNames: function() {
    var className = 'LoginLink';

    className += {
      'small': ' LoginLink-small',
      'huge': ' LoginLink-huge'
    }[ this.props.size ];

    return className;
  },

  render: function(){
    return <a
      className={this.classNames()}
      href="javascript: void(null);"
      onClick={commands.login}
    >Login</a>
  }
});

var GoalsList = React.createClass({
  componentDidMount: function(){
    if ( !this.props.goals ) {
      commands.loadGoals();
    }
  },

  render: function() {
    if (!this.props.goals) {
      return <div>Loading...</div>;
    }

    var goals = this.props.goals.map( function( goal ) {
      return <GoalsListMember key={goal.id} goal={goal} />
    })

    return <div>{goals}</div>
  }
});

var GoalsListMember = React.createClass({
  render: function(){
    return <div>
      Goal Title: {this.props.goal.title};
    </div>
  }
});

var render = function(){
  ReactDOM.render(
    <SimpleExample {...state} />,
    document.getElementById('content')
  );
}

render();
