package main

import (
	"context"
	"encoding/gob"
	"fmt"
	"grpc-todo-app/pb"
	"log"
	"net"
	"os"
	"path/filepath"

	"google.golang.org/grpc"
)

type server struct {
	pb.UnimplementedTodoServiceServer
}

func (*server) CreateTodo(ctx context.Context, req *pb.CreateTodoRequest) (*pb.CreateTodoResponse, error) {
	fmt.Println("CreateTodo was invoked")

    currentDir, err := os.Getwd()
    if err != nil {
        return nil, err
    }
    fileName := fmt.Sprintf("%d.gob", req.GetId())

	path := filepath.Join(currentDir, "storage", fileName)
	file, err := os.Create(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	encoder := gob.NewEncoder(file)
	// gobのEncodeにポインタを渡してもいいの？
	if err = encoder.Encode(req); err != nil {
		return nil, err
	}

	return &pb.CreateTodoResponse{Id: req.Id}, nil
}

func main() {
	lis, err := net.Listen("tcp", "localhost:50051")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	s := grpc.NewServer()
	pb.RegisterTodoServiceServer(s, &server{})

    fmt.Println("server is running...")
    if err := s.Serve(lis); err != nil {
        log.Fatalf("failed to serve: %v", err)
    }
}
