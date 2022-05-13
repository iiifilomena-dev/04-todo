import { ToDo } from '../classes';
import { todoList } from '../index';

// Referencias al Html
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const borrarCompletados = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

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
borrarCompletados.addEventListener('click', (event) => {
    todoList.eliminarCompletados();

    for (let i = divTodoList.children.length - 1; i >= 0; i--) {

        const elemento = divTodoList.children[i];

        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }

        console.log(elemento)

    }
})


txtInput.addEventListener('keyup', (event) => {

    const tareaAgregada = event.target.value.trim();

    if (event.keyCode === 13 && tareaAgregada !== '') {

        const nuevoToDo = new ToDo(tareaAgregada);
        todoList.nuevoTodo(nuevoToDo);
        crearTodoHtml(nuevoToDo);
        txtInput.value = '';

    }

})

divTodoList.addEventListener('click', (event) => {
    //console.log(event);
    const nombreElemento = event.target.localName; // Dónde hice click? input, label o button
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');
    console.log(todoElemento);
    //console.log(todoId);
    //console.log(nombreElemento);

    if (nombreElemento.includes('input')) {
        // Esto signfica que hizo clic en el check (Es un input)
        todoList.toogleTodo(todoId);
        // classList hace referencia a todas las clases. toogle trabaja con la propiedad completed
        // en este caso. Si existe la quita, y si no existe la agrega
        todoElemento.classList.toggle('completed');
        //console.log(todoList);
    } else if (nombreElemento.includes('button')) {
        console.log('Entro por presionar button!');
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }
})

ulFiltros.addEventListener('click', (event) => {
    const filtro = event.target.textContent;
    if (!filtro) return;

    for (const elemento of divTodoList.children) {
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        anchorFiltros.forEach(element => {
            element.classList.remove('selected');
        });
        event.target.classList.add('selected');

        switch (filtro) {
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;

            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                }
                break;

            default:
                break;
        }

        //console.log(elemento);
    }

    //console.log(event.target.textContent);
})