package main

import (
	"fmt"
	"grpc-todo-app/pb"
	"io/ioutil"

	"google.golang.org/protobuf/proto"
)

func main() {
    res := &pb.CreateUserRequest{
        Id: 1,
        Name: "John",
        Job: "student",
    }

    binData, err := proto.Marshal(res)
    if err != nil {
        fmt.Printf("failed to serialize: %s", err)
    }

    if err = ioutil.WriteFile("test.txt", binData, 0666); err != nil {
        fmt.Printf("failed to write: %s", err)
    }

    in, err := ioutil.ReadFile("test.txt")
    if err != nil {
        fmt.Printf("failed to read: %s", err)
    }

    readCreateUserRequest := &pb.CreateUserRequest{}
    err = proto.Unmarshal(in, readCreateUserRequest)
    if err != nil {
        fmt.Printf("failed to deserialize: %s", err)
    }

    fmt.Println(readCreateUserRequest)
}