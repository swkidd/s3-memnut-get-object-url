zip -r function.zip .
aws lambda update-function-code --region ap-northeast-1 --function-name s3-memnut-get-object-url --zip-file fileb://function.zip