build:
	dotnet build

run:
	dotnet run

setup:
	docker-compose up -d localstack
	echo 'create bucket'
	aws s3api create-bucket --endpoint-url http://localhost:4566 --bucket example-bucket
