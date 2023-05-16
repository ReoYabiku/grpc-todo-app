import {CreateTodoRequest, GetAllTodosRequest, UpdateTodoRequest} from '../proto/todo_pb';
import {TodoServiceClient} from '../proto/todo_grpc_web_pb';

var todoService = new TodoServiceClient('http://localhost:9000');

const checkboxList = document.querySelector('#checkbox-list');
while(checkboxList.firstChild){
  checkboxList.removeChild(checkboxList.firstChild);
}

var getRequest = new GetAllTodosRequest();
todoService.getAllTodos(getRequest, {}, function(error, response) {
  if (error) {
    throw new Error();
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

    const button = document.createElement('button');
    button.id = "delete" + todo.getId();
    button.innerText = "削除";

    div.appendChild(input);
    div.appendChild(label);
    div.appendChild(button);
    checkboxList.appendChild(div);
  }

  const button = document.createElement('button');
  button.id = "add-todo";
  button.innerText = "NEW";
  checkboxList.appendChild(button);

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
      throw new Error();
    }
    console.log('通信が成功しました', response.getId());
  });
}