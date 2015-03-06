/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the TodoStore and passes the new data to its children.
 */

var Footer = require('./Footer.react');
var Header = require('./Header.react');
var MainSection = require('./MainSection.react');
var React = require('react');
var TodoStore = require('../stores/TodoStore');

var init_flag_todo = true;

/**
 * Retrieve the current TODO data from the TodoStore
 */
function getTodoState() {
  return {
    allTodos: TodoStore.getAll(),
    areAllComplete: TodoStore.areAllComplete()
  };
}


function mySetTodoState(myAllTodos, myAreAllComplete) {
	return {
		allTodos: myAllTodos,
    areAllComplete: myAreAllComplete 
	}
}


var TodoApp = React.createClass({

  getInitialState: function() {
		var json_todo;
		var return_todo;

		json_todo = JSON.parse(localStorage.getItem('todo'));

		if(json_todo) {
			return_todo = json_todo;

			//test
			console.log('-has_todo');
			console.log(return_todo);
		}
		else {
			json_todo = getTodoState();
			localStorage.setItem('todo', JSON.stringify(json_todo));
			return_todo = json_todo;

			//test
      console.log('-no_todo');
      console.log(json_todo);
		}

    return return_todo;
  },

  componentDidMount: function() {
    TodoStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TodoStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
		//test
		console.log('-render');
		console.log(getTodoState());

		var json_todo;

		if(init_flag_todo) {
			// Get from storage
			json_todo = JSON.parse(localStorage.getItem('todo'));
	
			// Assign current state
			TodoStore.setAll(json_todo.allTodos);
			var tmp_out = mySetTodoState(json_todo.allTodos, json_todo.areAllComplete);			
	
			init_flag_todo = false;
	
			//test
			console.log('-flag');
			console.log(getTodoState());
			console.log(tmp_out);
		}
		else {
			json_todo = JSON.stringify(getTodoState());
			localStorage.setItem('todo', json_todo);

			//test
			console.log('-no_flag');
			console.log(getTodoState());
		}

  	return (
      <div>
        <Header />
        <MainSection
          allTodos={this.state.allTodos}
          areAllComplete={this.state.areAllComplete}
        />
        <Footer allTodos={this.state.allTodos} />
      </div>
  	);
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange: function() {
    this.setState(getTodoState());
  }

});

module.exports = TodoApp;
