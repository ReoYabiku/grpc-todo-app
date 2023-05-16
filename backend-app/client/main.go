package main

import (
	"context"
	"fmt"
	"grpc-todo-app/pb"
	"log"

	"google.golang.org/grpc"
)

func main() {
	conn, err := grpc.Dial(":9000", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("failed to connect: %v", err)
	}
	defer conn.Close()

	client := pb.NewTodoServiceClient(conn)
	// callCreateTodo(client)
	// callGetTodo(client)
	callGetAllTodos(client)
}

func callCreateTodo(client pb.TodoServiceClient) {
	in := &pb.CreateTodoRequest{
		Id:      1,
		Content: "数理演習の小テスト対策",
		IsDone:  false,
	}
	res, err := client.CreateTodo(context.Background(), in)
	if err != nil {
		log.Fatalf("failed to create todo: %v", err)
	}

	fmt.Println(res.GetId())
}

func callGetTodo(client pb.TodoServiceClient) {
	in := &pb.GetTodoRequest{
		Id: 1,
	}
	res, err := client.GetTodo(context.Background(), in)
	if err != nil {
		log.Fatalf("failed to get todo: %v", err)
	}

	fmt.Println(res)
}

func callGetAllTodos(client pb.TodoServiceClient) {
	in := &pb.GetAllTodosRequest{}
	res, err := client.GetAllTodos(context.Background(), in)
	if err != nil {
		log.Fatalf("failed to get all todos: %v", err)
	}
	fmt.Println(res)
}
