import React, { useEffect } from 'react'
import TodoList from './Todo/todolist'
import Context from './Kontekst'
import AddTodo from './Todo/AddTodo'
import Loader from './Loader'


function App() {
  const [todos, setTodos] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
    .then(response => response.json())
    .then(todos => {
      setTimeout(() => {
      setTodos(todos)
      setLoading(false)
      }, 2000)
    })
  }, [])
  function togleTodo (id) {
   setTodos(todos.map(todo => {
      if(todo.id === id){
        todo.completed = !todo.completed
      }
      return todo
    })
   )
  }
  
   function removeTodo(id){
      setTodos(todos.filter(todo => todo.id !== id))
   }
  
    function addTodo (title){
      setTodos(todos.concat([{
        title,
        id: Date.now(),
        completed: false
      }]))
    }
  return (
    <Context.Provider value = {{removeTodo}}>
        <div className = "wrapper">
        <h1>React tutorial</h1>
        <AddTodo onCreate = {addTodo}/>
        {loading && <Loader />}

        {todos.length ? (
        <TodoList todos = {todos} onToggle={togleTodo} />) : 
        loading ? null:
        (<p>NO todos</p>)}
       

    </div>
    </Context.Provider>
  )
}

export default App;
