import { ToDo } from "./todo.class";

export class TodoList {

    constructor() {
        //this.todos = [];
        this.cargarLocalStorage();
    }

    nuevoTodo(todo) {
        this.todos.push(todo);
        this.guardarLocalStorage();
    }

    eliminarTodo(id) {
        // filter, devuelve un nuevo arreglo excluyendo el id enviado por parámetro
        this.todos = this.todos.filter(todo => todo.id != id);
        this.guardarLocalStorage();
    }

    toogleTodo(id) {

        for (const todo of this.todos) {

            // Muestra que son diferentes, el id que recibe es un string
            // El todo.id es un número, por eso hace la comparación con ==
            console.log('todo: ', todo.id, 'id: ', id);

            if (todo.id == id) {
                todo.completado = !todo.completado;
                break;
            }
        }
        this.guardarLocalStorage();

    }

    eliminarCompletados() {
        this.todos = this.todos.filter(todo => todo.completado == false);
        this.guardarLocalStorage();
    }

    guardarLocalStorage() {

        localStorage.setItem('todos', JSON.stringify(this.todos));

    }
    cargarLocalStorage() {

        (localStorage.getItem('todos'))
            ? this.todos = JSON.parse(localStorage.getItem('todos'))
            : this.todos = [];

        this.todos = (localStorage.getItem('todos'))
            ? JSON.parse(localStorage.getItem('todos'))
            : [];

        //this.todos = this.todos.map(obj => ToDo.fromJson(obj));
        this.todos = this.todos.map(ToDo.fromJson);
        console.log(this.todos);
    }

}



