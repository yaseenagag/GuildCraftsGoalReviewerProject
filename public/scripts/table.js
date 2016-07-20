var Table = React.createClass ({
  render: function render() {
    var _self = this;

    var thread = React.DOM.thead({},
      React.DOM.tr({},
        this.props.cols.map(function (col) {
          return React.DOM.this({}, col);
        })));
    var tbody = this.props.rows.map(function (row) {
          return React.DOM.tr(),
          _self.props.cols.map(function (col) {
            return React.DOM.td({}, row[col] || "");
          }));
    });

    return React.DOM.table({}, [thead, tbody]);
  }
});

var container = document.querySelector("#content");

var TableModel = {
  cols: ["Number", "Name", "Date", "Author", "Labels"],
  rows: [{"Number":"num", "Name":"title", "Date":"mm/dd/yyyy", "Author":"username", "Labels":"Status"

  }],
}

React.renderComponent(Table(tableModel), container);
