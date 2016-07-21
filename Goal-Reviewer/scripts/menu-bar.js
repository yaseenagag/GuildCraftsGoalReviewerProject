
//abandon all hope ye who enter here\\

import 'base.css'
import 'react'
import 'ReactDOM'
import 'react-headroom'
import 'react-sidebar'

var React = require('react');
var Headroom = require('react-headroom')

var = React.createClass({
  propTypes () {
    return {
      children: React.PropTypes.any,
    }
  },

   render () {
    return (
      <div style={{ marginBottom: rhythm(1) }}>
        <Headroom
          onPin={() => console.log('pinned')}
          onUnpin={() => console.log('unpinned')}
          wrapperStyle={{ marginBottom: rhythm(1) }}
          style={{
            background: '#000f21',
            boxShadow: '1px 1px 1px rgba(0,0,0,0)',
          }}
        Container style={{ maxWidth: 960, padding: `${rhythm(1/2)}` }}>
            <h1
              style={{
                margin: 0,
                color: '#000f21',
              }}  
               Goal Viewer
            </h1>
          </Container> 
        </Headroom>
        <Container
          style={{
            maxWidth: 960,
            padding: `${rhythm(1)} ${rhythm(1/2)}`,
            paddingTop: 0,
          }}
        >
          {this.props.children}
        </Container>
      </div>
    )
  },
})

var React = require('react');
var Sidebar = require('react-sidebar').default;

var App = React.createClass({
  getInitialState: function() {
    return {sidebarOpen: false};
  },

  onSetSidebarOpen: function(open) {
    this.setState({sidebarOpen: open});
  },

  render: function() {
    var sidebarContent = <b>Sidebar content</b>;

    return (
      <Sidebar sidebar={sidebarContent}
               open={this.state.sidebarOpen}
               onSetOpen={this.onSetSidebarOpen}>
        <b>Main content</b>
      </Sidebar>
    );
  }
});

module.exports = App;

// the below is in jsx, do i need a transformer like gulp or grunt? don't forget to render in html file? "ReactDOM.render(<ProfileTab />, document.getElementByID('container'))"\\

var ProfileTab = React.createClass ({
  render: function ()  {
    return <div> My Profile </div>;
  }
});

