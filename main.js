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
        -li
         -label
           -input
           -span
         -button
        */

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.checked = todo.isCompleted;
        //checkしたやつも保存する機能を追加
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
            if (!confirm('Sure?')) {
                return;
            }
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

    //フォームからtodoに投稿できるようにする
    //デフォルトだとページ遷移をして消えてしまうのでeを渡して遷移しないようにする
    document.querySelector('#add-form').addEventListener('submit', (e) => {
        e.preventDefault();
        //多くなるので定数にする
        const input = document.querySelector('#add-form input');
        const todo = {
            //todoに各要素にユニークなIDをつける
            id: Date.now(),     //あまり厳密ではないが今回はこれで
            title: input.value,
            isCompleted: false,
        };
        renderTodo(todo);
        todos.push(todo);
        console.table(todos);
        saveTodos();

        //フォームの後に残ったやつを消す
        input.value = '';
        //空になったときに自動的にフォーカスする
        input.focus();
    });

    //パージ機能の追加
    document.querySelector('#purge').addEventListener('click', () => {
        if (!confirm('Sure?')) {
            return;
        }
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