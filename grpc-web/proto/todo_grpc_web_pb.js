/**
 * @fileoverview gRPC-Web generated client stub for todo
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.4.2
// 	protoc              v3.21.12
// source: proto/todo.proto


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.todo = require('./todo_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.todo.TodoServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.todo.TodoServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.todo.CreateTodoRequest,
 *   !proto.todo.CreateTodoResponse>}
 */
const methodDescriptor_TodoService_CreateTodo = new grpc.web.MethodDescriptor(
  '/todo.TodoService/CreateTodo',
  grpc.web.MethodType.UNARY,
  proto.todo.CreateTodoRequest,
  proto.todo.CreateTodoResponse,
  /**
   * @param {!proto.todo.CreateTodoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.todo.CreateTodoResponse.deserializeBinary
);


/**
 * @param {!proto.todo.CreateTodoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.todo.CreateTodoResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.todo.CreateTodoResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.todo.TodoServiceClient.prototype.createTodo =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/todo.TodoService/CreateTodo',
      request,
      metadata || {},
      methodDescriptor_TodoService_CreateTodo,
      callback);
};


/**
 * @param {!proto.todo.CreateTodoRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.todo.CreateTodoResponse>}
 *     Promise that resolves to the response
 */
proto.todo.TodoServicePromiseClient.prototype.createTodo =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/todo.TodoService/CreateTodo',
      request,
      metadata || {},
      methodDescriptor_TodoService_CreateTodo);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.todo.GetTodoRequest,
 *   !proto.todo.GetTodoResponse>}
 */
const methodDescriptor_TodoService_GetTodo = new grpc.web.MethodDescriptor(
  '/todo.TodoService/GetTodo',
  grpc.web.MethodType.UNARY,
  proto.todo.GetTodoRequest,
  proto.todo.GetTodoResponse,
  /**
   * @param {!proto.todo.GetTodoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.todo.GetTodoResponse.deserializeBinary
);


/**
 * @param {!proto.todo.GetTodoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.todo.GetTodoResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.todo.GetTodoResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.todo.TodoServiceClient.prototype.getTodo =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/todo.TodoService/GetTodo',
      request,
      metadata || {},
      methodDescriptor_TodoService_GetTodo,
      callback);
};


/**
 * @param {!proto.todo.GetTodoRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.todo.GetTodoResponse>}
 *     Promise that resolves to the response
 */
proto.todo.TodoServicePromiseClient.prototype.getTodo =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/todo.TodoService/GetTodo',
      request,
      metadata || {},
      methodDescriptor_TodoService_GetTodo);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.todo.GetAllTodosRequest,
 *   !proto.todo.GetAllTodosResponse>}
 */
const methodDescriptor_TodoService_GetAllTodos = new grpc.web.MethodDescriptor(
  '/todo.TodoService/GetAllTodos',
  grpc.web.MethodType.UNARY,
  proto.todo.GetAllTodosRequest,
  proto.todo.GetAllTodosResponse,
  /**
   * @param {!proto.todo.GetAllTodosRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.todo.GetAllTodosResponse.deserializeBinary
);


/**
 * @param {!proto.todo.GetAllTodosRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.todo.GetAllTodosResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.todo.GetAllTodosResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.todo.TodoServiceClient.prototype.getAllTodos =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/todo.TodoService/GetAllTodos',
      request,
      metadata || {},
      methodDescriptor_TodoService_GetAllTodos,
      callback);
};


/**
 * @param {!proto.todo.GetAllTodosRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.todo.GetAllTodosResponse>}
 *     Promise that resolves to the response
 */
proto.todo.TodoServicePromiseClient.prototype.getAllTodos =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/todo.TodoService/GetAllTodos',
      request,
      metadata || {},
      methodDescriptor_TodoService_GetAllTodos);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.todo.UpdateTodoRequest,
 *   !proto.todo.UpdateTodoResponse>}
 */
const methodDescriptor_TodoService_UpdateTodo = new grpc.web.MethodDescriptor(
  '/todo.TodoService/UpdateTodo',
  grpc.web.MethodType.UNARY,
  proto.todo.UpdateTodoRequest,
  proto.todo.UpdateTodoResponse,
  /**
   * @param {!proto.todo.UpdateTodoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.todo.UpdateTodoResponse.deserializeBinary
);


/**
 * @param {!proto.todo.UpdateTodoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.todo.UpdateTodoResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.todo.UpdateTodoResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.todo.TodoServiceClient.prototype.updateTodo =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/todo.TodoService/UpdateTodo',
      request,
      metadata || {},
      methodDescriptor_TodoService_UpdateTodo,
      callback);
};


/**
 * @param {!proto.todo.UpdateTodoRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.todo.UpdateTodoResponse>}
 *     Promise that resolves to the response
 */
proto.todo.TodoServicePromiseClient.prototype.updateTodo =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/todo.TodoService/UpdateTodo',
      request,
      metadata || {},
      methodDescriptor_TodoService_UpdateTodo);
};


module.exports = proto.todo;

