import {CreateTodoRequest, GetAllTodosRequest, UpdateTodoRequest, DeleteTodoRequest} from '../proto/todo_pb';
import {TodoServiceClient} from '../proto/todo_grpc_web_pb';

var todoService = new TodoServiceClient('http://localhost:9000');

const checkboxList = document.querySelector('#checkbox-list');
while(checkboxList.firstChild){
  checkboxList.removeChild(checkboxList.firstChild);
}

var getRequest = new GetAllTodosRequest();
todoService.getAllTodos(getRequest, {}, function(error, response) {
  if (error) {
    throw new Error(error);
  }

  for(const todo of response.getTodoList()) {
    const div = document.createElement('div');

    const input = document.createElement('input');
    input.type = "checkbox";
    input.id = "checkbox" + todo.getId();
    input.dataset.id = todo.getId();
    input.checked = todo.getIsdone();
    input.addEventListener('change', function(event) {
      var updateRequest = new UpdateTodoRequest();
      updateRequest.setId(event.target.dataset.id);
      updateRequest.setContent(event.target.parentNode.children[1].innerText);
      updateRequest.setIsdone(event.target.checked);
      todoService.updateTodo(updateRequest, {}, function(error, response) {
        if (response.getId() != event.target.dataset.id || error) {
          throw new Error();
        }
      });
    })

    const label = document.createElement('label');
    label.htmlFor = "checkbox" + todo.getId();
    label.innerText = todo.getContent();

    const deleteBtn = document.createElement('button');
    deleteBtn.id = "delete" + todo.getId();
    deleteBtn.innerText = "削除";
    deleteBtn.addEventListener('click', function(event) {
      var deleteRequest = new DeleteTodoRequest();
      deleteRequest.setId(event.target.parentNode.children[0].dataset.id);
      todoService.deleteTodo(deleteRequest, {}, function(error, response) {
        if (error) {
          throw new Error(error);
        }
        location.reload();
      });
    })

    div.appendChild(input);
    div.appendChild(label);
    div.appendChild(deleteBtn);
    checkboxList.appendChild(div);
  }

  const div = document.createElement('div');
  const input = document.createElement('input');
  const addBtn = document.createElement('button');
  addBtn.id = "add-todo";
  addBtn.innerText = "追加";
  addBtn.addEventListener('click', function(event) {
    var createRequest = new CreateTodoRequest();
    createRequest.setId(Math.floor( Math.random() * 10000000 ));
    createRequest.setContent(event.target.parentNode.children[0].value);
    createRequest.setIsdone(false);
    if(event.target.parentNode.children[0].value == '') {
      return;
    }
    todoService.createTodo(createRequest, {}, function(error, response) {
      if (error) {
        throw new Error(error);
      }
      event.target.parentNode.children[0].value = '';
      location.reload();
    });
  })
  div.appendChild(input);
  div.appendChild(addBtn);
  checkboxList.appendChild(div);

})

const btn = document.querySelector('#conn');
btn.onclick = function() {
  console.log('pushed!');
  var request = new CreateTodoRequest();

  request.setId(2);
  request.setContent('try to conntct to backend server');
  request.setIsdone(false);

  todoService.createTodo(request, {}, function(error, response) {
    if (error) {
      throw new Error(error);
    }
    console.log('通信が成功しました', response.getId());
  });
}