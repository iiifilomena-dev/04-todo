
export class ToDo {

    static fromJson(obj) {

        const tempTodo = new ToDo();
        tempTodo.id = obj.id;
        tempTodo.tarea = obj.tarea;
        tempTodo.completado = obj.completado;
        tempTodo.creado = obj.creado;
        return tempTodo;
    }

    constructor(tarea) {

        this.id = new Date().getTime();
        this.tarea = tarea;
        this.completado = false;
        this.creado = new Date();
    }

    imprimirClase = () => {
        console.log(`${this.tarea} (${this.id})`);
    }
}