var state = {}

var commands = {};

commands.logout = function(){
  state = {};
  render();
};

commands.login = function(){
  state.currentUser = {
    name: 'Peter',
  }
  render();
};

commands.loadGoals = function(){
  $.getJSON('/data/goals.json?'+(new Date), function(goals){
    state.goals = goals;
    render();
  })
};

var SimpleExample = React.createClass({
  render: function(){
    if (this.props.currentUser){
      return <div>
        <h1>Welcome Back {this.props.currentUser.name}</h1>
        <LogoutLink />
        <GoalsList goals={this.props.goals}/>
      </div>;
    }else{
      return <div>
        <h1>Please Login</h1>
        <LoginLink />
      </div>;
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
  render: function(){
    return <a
      href="javascript: void(null);"
      onClick={commands.login}
    >Login</a>
  }
});

var GoalsList = React.createClass({
  componentDidMount: function(){
    if (!this.props.goals) commands.loadGoals();
  },
  render: function(){
    if (!this.props.goals){
      return <div>Loading...</div>;
    }
    var goals = this.props.goals.map(function(goal){
      return <GoalsListMember key={goal.id} goal={goal} />
    })
    return <div>{goals}</div>
  }
});

var GoalsListMember = React.createClass({
  render: function(){
    return <div>
      Goal Id: {this.props.goal.id}
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
