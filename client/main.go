package main

import (
	"context"
	"fmt"
	"grpc-todo-app/pb"
	"log"

	"google.golang.org/grpc"
)

func main() {
    conn, err := grpc.Dial("localhost:50051", grpc.WithInsecure())
    if err != nil {
        log.Fatalf("failed to connect: %v", err)
    }
    defer conn.Close()

    client := pb.NewTodoServiceClient(conn)
    callCreateTodo(client)
}

func callCreateTodo(client pb.TodoServiceClient) {
    in := &pb.CreateTodoRequest{
        Id: 1,
        Content: "implement Javascript for gRPC",
        IsDone: false,
    }
    res, err := client.CreateTodo(context.Background(), in)
    if err != nil {
        log.Fatalf("failed to create todo: %v", err)
    }

    fmt.Println(res.GetId())
}