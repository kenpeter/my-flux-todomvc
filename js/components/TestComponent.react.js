var React = require('react');
var LocalStorageMixin = require('react-localstorage');
 
var TestComponent = module.exports = React.createClass({
  displayName: 'TestComponent',
  // This is all you need to do 
  mixins: [LocalStorageMixin],
 
  getInitialState: function() {
    return {counter: 0};
  },
 
  onClick: function() {
    this.setState({counter: this.state.counter + 1});
  },
 
  render: function() {
		this.props.localStorageKey = "TestComponent";

    return (
      <span onClick={this.onClick}>{this.state.counter}</span>
    );
  }
});
