import {CreateTodoRequest, CreateTodoResponse} from '../proto/todo_pb';
const {TodoServiceClient} = require('../proto/todo_grpc_web_pb');

var todoService = new TodoServiceClient('http://localhost:50051');

var request = new CreateTodoRequest();

request.setId(2);
request.setContent('try to conntct to backend server');
request.setIsdone(false);

todoService.createTodo(request, {}, function(error, response) {
  console.log('before error');
  if (error) {
    throw new Error();
  }
  console.log('通信が成功しました', response.getId());
});

const btn = document.querySelector('#invoke-grpc');
btn.onclick = function() {
  console.log('pushed!');
}