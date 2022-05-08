import { ToDo } from '../classes';
import { todoList } from '../index';

// Referencias al Html
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');

export const crearTodoHtml = (todo) => {

    const htmlTodo =
        `<li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
            <div class="view">
                <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
                <label> ${todo.tarea}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>`;

    // Crea un div y no un li porque hay muchas cosas definidas en la etiqueta li
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    // Al hacer divTodoList.append(div); inserta un div dentro de un lu y no es buena práctica
    // Lo que se recomienda es insertar directamente el li entonces hacemos esto:
    divTodoList.append(div.firstElementChild);
    return div.firstElementChild;
}

// Eventos
txtInput.addEventListener('keyup', (event) => {

    const tareaAgregada = event.target.value.trim();

    if (event.keyCode === 13 && tareaAgregada !== '') {

        const nuevoToDo = new ToDo(tareaAgregada);
        todoList.nuevoTodo(nuevoToDo);
        crearTodoHtml(nuevoToDo);
        txtInput.value = '';

    }

})