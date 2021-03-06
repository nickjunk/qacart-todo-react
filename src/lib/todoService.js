const baseUrl = 'http://localhost:8000/todos';

export const loadTodos = () => {
    return fetch(baseUrl).then((res) => res.json());
};

export const createTodo = (todo) => {
    return fetch(baseUrl, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    });
};
export const saveTodo = (todo) => {
    return fetch(`${baseUrl}/${todo.id}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    });
};
export const destroyTodo = (id) => {
    return fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    });
};
