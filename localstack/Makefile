build:
	dotnet build
	
integration-test:
	cd test && dotnet test

run:
	cd src && dotnet run

setup:
	docker-compose up -d localstack
	echo 'create bucket'
	aws s3api create-bucket --endpoint-url http://localhost:4566 --bucket example-bucket
