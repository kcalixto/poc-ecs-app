# poc-ecs-app

```
docker build -f docker-prod/Dockerfile -t golang-production:latest .
```

```
1) Retrieve an authentication token and authenticate your Docker client to your registry. Use the AWS CLI:

aws ecr get-login-password --region sa-east-1 | docker login --username AWS --password-stdin 664960032265.dkr.ecr.sa-east-1.amazonaws.com

2) Build your Docker image.

docker build -t sample_app .

3) After the build completes, tag your image so you can push the image to this repository:

docker tag sample_app:latest 664960032265.dkr.ecr.sa-east-1.amazonaws.com/sample_app:latest

4) Run the following command to push this image to your newly created AWS repository:

docker push 664960032265.dkr.ecr.sa-east-1.amazonaws.com/sample_app:latest

```
