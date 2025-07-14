build-app:
	@echo "Building application..."
	# Add your build commands here

test-app:
	@echo "Testing application..."
	go test ./app/...

deploy-app: test-app build-app
	@echo "Deploying application..."
	# Add your build commands here

test-infra:
	@echo "Testing infrastructure..."
	# Add your test commands here

build-infra:
	@echo "Building infrastructure..."
	# Add your build commands here

deploy-infra:
	@echo "Deploying infrastructure..."
	# Add your deploy commands here
