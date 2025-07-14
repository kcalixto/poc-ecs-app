run-app:
	@echo "Running application..."
	go run .

build-app:
	@echo "Building application..."
	CGO_ENABLED=0 GOOS=linux go build -ldflags "-s -w" -o bin/app

test-app:
	@echo "Testing application..."
	go test ./...

deploy-app: test-app build-app
	@echo "Deploying application..."

test-infra:
	@echo "Testing infrastructure..."
	# Add your test commands here

build-infra:
	@echo "Building infrastructure..."
	# Add your build commands here

deploy-infra:
	@echo "Deploying infrastructure..."
	# Add your deploy commands here
