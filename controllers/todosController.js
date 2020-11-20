const data = require('../data');

function getTodos() {
    return data.todos;
}

function getTodoById(id) {
    return data.todos.find(todo => todo.id == id);
}

function deleteTodo(id) {
    const idx = data.todos.findIndex(todo => todo.id == id);
    if (idx > -1) {
        //restituisco tutto l'array meno l'elemento da eliminare
        const ele = data.todos.splice(idx, 1);
        return ele;
    }
    //e non è andato a buon fine
    return 0;
}
//uso la destrutturazione per assegnare i nomi
function addTodo({
    todo,
    completed,
    list
}) {
    const newtodo = {
        todo,
        completed,
        list
    }
    data.todos.unshift(newtodo);
    return newtodo;
}
//se aggiorno il todo in questo modo non prendo l'indice del todo ma l'indice dell'array

// function updateTodo(id, newTodo) {
//     const oldTodo = getTodoById(id);
//     //se esiste oldtodo
//     //modifico solo i dati che vengono modificati
//     //destrutturo il vecchio oggetto, e il nuovo
//     //e sovrascrivo solo i parametri modificati
//     if (oldTodo) {
//         data.todos[id] = {
//             ...oldTodo,
//             ...newTodo
//         };
//         return data.todos[id];
//     }
//     return false;

// }
function updateTodo(id, newTodo) {
    const idx = data.todos.findIndex(todo => todo.id == id);
   
    if ( idx !== -1) {
        data.todos[idx] = {
            ...data.todos[idx],
            ...newTodo
        };
        return data.todos[idx];
    }
    return false;

}

module.exports = {
    getTodos,
    getTodoById,
    deleteTodo,
    addTodo,
    updateTodo
}