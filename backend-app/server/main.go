package main

import (
	"context"
	"encoding/gob"
	"fmt"
	"grpc-todo-app/pb"
	"io/ioutil"
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

func (*server) GetTodo(ctx context.Context, in *pb.GetTodoRequest) (*pb.GetTodoResponse, error) {
	fmt.Println("GetTodo was invoked")

	currentDir, err := os.Getwd()
	if err != nil {
		return nil, err
	}
	fileName := fmt.Sprintf("%d.gob", in.GetId())

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

func (*server) GetAllTodos(ctx context.Context, in *pb.GetAllTodosRequest) (*pb.GetAllTodosResponse, error) {
	fmt.Println("GetAllTodos was invoked")

	currentDir, err := os.Getwd()
	if err != nil {
		return nil, err
	}

	storageDir := filepath.Join(currentDir, "storage")
	fileInfos, err := ioutil.ReadDir(storageDir)
	if err != nil {
		return nil, err
	}

	todos := []*pb.Todo{}
	
	for _, fileInfo := range fileInfos {
		fmt.Println(fileInfo)
		path := filepath.Join(storageDir, fileInfo.Name())
		file, err := os.Open(path)
		if err != nil {
			return nil, err
		}
		defer file.Close()
		todo := &pb.Todo{}

		decoder := gob.NewDecoder(file)
		if err = decoder.Decode(todo); err != nil {
			return nil, err
		}

		fmt.Println(todo)

		todos = append(todos, todo)
	}

	return &pb.GetAllTodosResponse{Todo: todos}, nil
}

func (*server) UpdateTodo(ctx context.Context, in *pb.UpdateTodoRequest) (*pb.UpdateTodoResponse, error) {
	fmt.Println("UpdateTodo was invoked")

	currentDir, err := os.Getwd()
	if err != nil {
		return nil, err
	}
	fileName := fmt.Sprintf("%d.gob", in.GetId())

	path := filepath.Join(currentDir, "storage", fileName)
	file, err := os.Create(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	encoder := gob.NewEncoder(file)
	if err = encoder.Encode(in); err != nil {
		return nil, err
	}

	return &pb.UpdateTodoResponse{Id: in.Id}, nil
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
