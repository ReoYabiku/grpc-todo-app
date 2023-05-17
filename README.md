# grpc-todo-app
todo app with golang and javascript
## 構成
### grpc-web
- grpc-web/protoのjsファイルを元に、gRPCクライアントとして振る舞う
### backend-app
- backend-app/pbのgoファイルを元に、gRPCサーバとして振る舞う
- backend-app/storageを擬似的にデータベースとして利用している
- Envoyをプロキシとして用いている
### proto
- protoファイルの格納場所

## 起動方法
```
1. cd backend-app
1. docker compose up -d --build
1. cd ../grpc-web
1. npx serve ./
```

## 開発
### protoファイルのコンパイル
```
protoc -I. --go_out=backend-app --go-grpc_out=backend-app proto/*.proto

protoc -I. --js_out=import_style=commonjs:grpc-web proto/*.proto
protoc -I. --grpc-web_out=import_style=commonjs,mode=grpcwebtext:grpc-web proto/*.proto
```
### バンドルの実行
```
cd grpc-web
npm install
npx webpack --mode development ./client/client.js
```