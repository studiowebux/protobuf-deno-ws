```bash
npm install -g ts-proto
protoc --plugin=$(npm config get prefix)/bin/protoc-gen-ts_proto --ts_proto_out=./ ./proto/message.proto
```

Size of a very simple JSON object:

```ts
// JSON Size 36
// Proto Size 19
```