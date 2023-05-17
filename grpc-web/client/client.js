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
    setInputProperty(input, todo);

    const label = document.createElement('label');
    setLabelProperty(label, todo);

    const deleteBtn = document.createElement('button');
    setDeleteBtnProperty(deleteBtn, todo);

    div.appendChild(input);
    div.appendChild(label);
    div.appendChild(deleteBtn);
    checkboxList.appendChild(div);
  }

  const div = document.createElement('div');
  const input = document.createElement('input');
  input.placeholder = "新しいTODO";
  const addBtn = document.createElement('button');
  setAddBtnProperty(addBtn);

  div.appendChild(input);
  div.appendChild(addBtn);
  checkboxList.appendChild(div);
})

function setInputProperty(input, todo) {
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
      if (error) {
        throw new Error(error);
      } else if (response.getId() != event.target.dataset.id) {
        throw new Error("unexpected response")
      }
    });
  })
}

function setLabelProperty(label, todo) {
  label.htmlFor = "checkbox" + todo.getId();
  label.innerText = todo.getContent();
}

function setDeleteBtnProperty(deleteBtn, todo) {
  deleteBtn.id = "delete" + todo.getId();
  deleteBtn.innerText = "削除";

  deleteBtn.addEventListener('click', function(event) {
    var deleteRequest = new DeleteTodoRequest();
    const deleteElementId = event.target.parentNode.children[0].dataset.id;
    deleteRequest.setId(deleteElementId);

    todoService.deleteTodo(deleteRequest, {}, function(error, response) {
      if (error) {
        throw new Error(error);
      } else if (response.getId() != deleteElementId) {
        throw new Error("unexpected response")
      }
      location.reload();
    });
  })
}

function setAddBtnProperty(addBtn) {
  addBtn.id = "add-todo";
  addBtn.innerText = "追加";

  addBtn.addEventListener('click', function(event) {
    var createRequest = new CreateTodoRequest();
    const new_id = Math.floor( Math.random() * 10000000);
    createRequest.setId(new_id);
    createRequest.setContent(event.target.parentNode.children[0].value);
    createRequest.setIsdone(false);

    if(event.target.parentNode.children[0].value == '') {
      return;
    }

    todoService.createTodo(createRequest, {}, function(error, response) {
      if (error) {
        throw new Error(error);
      } else if (response.getId() != new_id) {
        throw new Error("unexpected response")
      }
      event.target.parentNode.children[0].value = '';
      location.reload();
    });
  })
}