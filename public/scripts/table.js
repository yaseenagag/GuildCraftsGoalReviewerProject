var TableHeader = React.createClass({
  render: function() {
    return (
      <thead>
        <TableRow number="Number"
          user={{login: "Name"}}
          created_at="Date"
          title="Title"
          labels={[ { name: "Labels" } ]} />
      </thead>
    );
  }
})

var LabelList = React.createClass({
  labelItems: function() {
    const { goalId } = this.props

    return this.props.labels.map( function( label, index ) {
      const className = `label-${goalId}-${index}`

      return <div key={className} className="label">{label.name}</div>
    });
  },

  render: function() {
    return (
      <div className="label-list">
        {this.labelItems()}
      </div>
    )
  }
});

var TableRow = React.createClass({
  render: function() {
    return (
      <tr>
        <td>{this.props.number}</td>
        <td>{this.props.user.login}</td>
        <td>{this.props.title}</td>
        <td>{this.props.created_at}</td>
        <td><LabelList goalId={this.props.id} labels={this.props.labels} /></td>
      </tr>
    );
  }
})

var Table = React.createClass ({
  tableRows: function() {
    return this.props.rows.map( function( goal ) {
      return <TableRow key={goal.id}
        id={goal.id}
        number={goal.number}
        user={goal.user}
        created_at={goal.created_at}
        title={goal.title}
        labels={goal.labels} />
    });
  },

  render: function render() {
    return (
      <div className="result-table">
        <table>
          <TableHeader />
          <tbody>
            {this.tableRows()}
          </tbody>
        </table>
      </div>
    )
  }
});

$.getJSON( `/data/goals.json?${new Date()}`, function( goals ) {
  ReactDOM.render(
    <Table rows={goals} />,
    document.querySelector("#content")
  );
})
