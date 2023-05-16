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
	if err = encoder.Encode(req); err != nil {
		return nil, err
	}

	return &pb.CreateTodoResponse{Id: req.Id}, nil
}

func (*server) GetTodo(ctx context.Context, req *pb.GetTodoRequest) (*pb.GetTodoResponse, error) {
    fmt.Println("GetTodo was invoked")

    currentDir, err := os.Getwd()
    if err != nil {
        return nil, err
    }
    fileName := fmt.Sprintf("%d.gob", req.GetId())

    path := filepath.Join(currentDir, "storage", fileName)
    file, err := os.Open(path)
    if err != nil {
        return nil, err
    }
    defer file.Close()

    res := &pb.GetTodoResponse{}

    decoder := gob.NewDecoder(file)
    if err = decoder.Decode(res); err != nil {
        return nil, err
    }

    return res, nil
}

func main() {
	lis, err := net.Listen("tcp", ":8000")
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
