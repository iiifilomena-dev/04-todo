import './styles.css';
import { ToDo, TodoList } from './classes'; // Al no especificar nada va por defecto a: index.js
import { crearTodoHtml } from './js/componentes';


export const todoList = new TodoList();


const tarea = new ToDo('Aprender JavaScript');
todoList.nuevoTodo(tarea);
console.log(todoList);

crearTodoHtml(tarea);



