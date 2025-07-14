FROM golang:1.24.1 as builder

WORKDIR /app

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o server .

ENTRYPOINT ["/app/server"]

FROM scratch

COPY --from=builder /app/server /server

ENTRYPOINT ["/server"]
