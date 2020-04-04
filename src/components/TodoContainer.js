import React from 'react'
import TodosList from './TodosList'
import Header from './Header'
import InputTodo from './InputTodo'
import uuid from "react-uuid";

class TodoContainer extends React.Component {
    /**
     * Store state on main parent component
     * ID = int
     * title = string
     * completed = boolean
     */
    state = {
        todos: [
            {
                id: 1,
                title: "Setup development environment",
                completed: true
            },
            {
                id: 2,
                title: "Develop website and add content",
                completed: false
            },
            {
                id: 3,
                title: "Deploy to live server",
                completed: false
            }
        ]
    }

    /**
     * handleChange
     * On check get ID and if it matches toDo saved, switch
     * Completed to true
     * @var completed Boolean
     */
    handleChange = (id) => {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed
                }
                return todo;
            })
        });
    }

    /**
     * delTodo
     * Update state todos for each filter and return entry
     * whos id is not equal to the current id
     */
    delTodo = id => {
        this.setState({
            todos: [
                ...this.state.todos.filter(todo => {
                    return todo.id !== id;
                })
            ]
        });
    }

    /**
     * addTodoItem
     * @var title String
     * get title from input and save/add item
     */
    addTodoItem = title => {
        const newTodo = {
            id: uuid(),
            title: title,
            completed: false
        };
        this.setState({
            todos: [...this.state.todos, newTodo]
        });
    }

    render(){
        return (
            <div className="container">
                <Header />
                <InputTodo addTodoProps={this.addTodoItem} />
                <TodosList 
                    todos={this.state.todos} 
                    handleChangeProps={this.handleChange} 
                    deleteTodoProps={this.delTodo} />
            </div>
        );
    }
}
export default TodoContainer