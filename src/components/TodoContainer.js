import React from 'react'
import TodosList from './TodosList'
import Header from './Header'
import InputTodo from './InputTodo'
import uuid from "react-uuid" // For ID Generation
import axios from "axios" // For pulling todos from third party api

/**
 * TodoContainer
 * Class Component
 * Main parent component that stores state as well
 */
class TodoContainer extends React.Component {
    /**
     * Store state on main parent component
     * ID = int
     * title = string
     * completed = boolean
     */
    state = {
        todos: [],
        show: false,
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
            }),
            show: !this.state.show,
        });
    }

    /**
     * delTodo
     * Update state todos for each filter and return entry
     * whos id is not equal to the current id
     */
    delTodo = id => {
        axios
            .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .then(response =>
                this.setState({
                todos: [
                    ...this.state.todos.filter(todo => {
                        return todo.id !== id
                    })
                ]
            })
        )

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
        axios
            .post("https://jsonplaceholder.typicode.com/todos", {
                title: title,
                completed: false
            })
            .then(response =>
                this.setState({
                    todos: [...this.state.todos, response.data]
                })
            )
    }

    componentDidMount(){
        axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10")
            .then(response => this.setState({ todos: response.data }));
    }

    render(){
        return (
            <div className="container">
                <Header headerSpan={this.state.show}/>
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