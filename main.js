'use strict';

{
    // localStorageからtodosを取得（なければ空配列を初期化）
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    //なんどもでてくるのでわかりやすく定義しておく
    const saveTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    const renderTodo = (todo) => {
        /*
         - li
           - label
             - input
             - span
           - button
         */

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.checked = todo.isCompleted;

        //チェックボックスの状態変更を保存する
        input.addEventListener('change', () => {
            todos.forEach((item) => {
                if (item.id === todo.id) {
                    item.isCompleted = !item.isCompleted;
                }
            });
            saveTodos();
        });

        const span = document.createElement('span');
        span.textContent = todo.title;

        const label = document.createElement('label');
        label.appendChild(input);
        label.appendChild(span);

        const button = document.createElement('button');
        button.textContent = 'x';
        //削除機能を追加する
        button.addEventListener('click', () => {
            if (!confirm('Sure?')) return;

            li.remove();
            todos = todos.filter((item) => {
                return item.id !== todo.id;
            });
            saveTodos();
        });

        const li = document.createElement('li');
        li.appendChild(label);
        li.appendChild(button);
        document.querySelector('#todos').appendChild(li);
    };

    const renderTodos = () => {
        todos.forEach((todo) => {
            renderTodo(todo);
        });
    };


    //フォームからtodoを追加する
    document.querySelector('#add-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const input = document.querySelector('#add-form input');
        const todo = {
            id: Date.now(),
            title: input.value,
            isCompleted: false,
        };

        renderTodo(todo);
        todos.push(todo);
        saveTodos();

        //フォームの後に残ったやつを消す
        input.value = '';
        input.focus();
    });

    //パージ機能(完了済みを削除)
    document.querySelector('#purge').addEventListener('click', () => {
        if (!confirm('Sure?')) return;

        todos = todos.filter((todo) => {
            return todo.isCompleted === false;
        });
        saveTodos();

        document.querySelectorAll('#todos li').forEach((li) => {
            li.remove();
        });
        renderTodos();
    });

    renderTodos();

}