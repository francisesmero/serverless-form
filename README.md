# Serverless Form with AWS Lambda and SES

This is a simple serverless form implementation using AWS Lambda and SES (Simple Email Service). It allows you to submit form data and receive it via email.

## Usage

Add the following code snippet anywhere in your HTML body or within the container where you want the form to appear:

```html
<serverless-form></serverless-form>
```

Update the API URL in the JavaScript file (aws_serverless_form.js). Locate line 120 and replace the existing URL with the one you have from your API Gateway setup. This URL should be the endpoint where the form data will be sent.
```javascript
const URL = "<YOUR_API_ENDPOINT_URL>";
```

Deploy the AWS Lambda function and configure SES to handle the email sending. Make sure the necessary IAM permissions are set up correctly for the Lambda function to interact with SES.

Host your HTML file and JavaScript file on a web server or your can serve them in Amazon S3 using static hosting.

Access the hosted HTML file in a web browser and submit the form. The form data will be sent to the specified email address using SES.
