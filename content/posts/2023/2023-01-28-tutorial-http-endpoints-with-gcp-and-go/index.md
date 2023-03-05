---
categories:
- devops
- go
coverImage: go_cover.png
date: "2023-01-28"
id: tutorial-http-endpoints-with-gcp-and-go
primaryBlog: maxrohde.com
tags:
- gcp
- cloud-functions
- programming
- go
title: Tutorial HTTP Endpoints with GCP Function (2nd Gen) and Go
---

[Cloud Functions](https://cloud.google.com/functions/) provide a lightweight execution environment for code in various languages. They are the serverless compute solutions in Google Cloud Platform (GCP) that is similar to [AWS Lambda](https://aws.amazon.com/lambda/) functions in AWS.

There are two different versions of Cloud Functions available: _1st Gen_ and _2nd Gen_. [2nd Gen is recommended for all new projects](https://cloud.google.com/functions/docs/concepts/version-comparison).

In this tutorial, we are developing a very simple Hello World application that renders and serves the following web page:

![Sample page rendered by the function](images/Pasted%20image%2020230128142300.png)

You can open the page here: [https://hello-http-v2-ndzxp34coq-uc.a.run.app/](https://hello-http-v2-ndzxp34coq-uc.a.run.app/).

The source code is provided on GitHub: [mxro / gcp-serverless-http-example](https://github.com/mxro/gcp-serverless-http-example).

The function code is developed using [Go](https://go.dev/).

## Part 1: Project Setup

First, ensure that you have Go installed. If not, find instructions here: [Go - Download and Install](https://go.dev/doc/install)

Then we set up a simple Go project:

```
go mod init example.com/cfv2
```

## Part 2: Define Function Source Code

Create a new file `hello.go` and paste the following content:

```go
// Sends a simple message to the client
package hello_v2

import (
	"html/template"
	"net/http"
	"time"

	"github.com/GoogleCloudPlatform/functions-framework-go/functions"
)

func init() {
	functions.HTTP("hello-http-v2", HelloHTTPV2)
}

var htmlTemplate = `<html>
  <head>
    <title>Hello from Go (v2)</title>
	</head>
	<body>
		<p>Hello there!</p>
		<p>The time on the server is {{ .Date }}</p>
	</body>
</html>
	`

// HelloHTTP is an HTTP Cloud Function with a request parameter.
func HelloHTTPV2(w http.ResponseWriter, r *http.Request) {
	var my_template *template.Template = template.New("hello")
	my_template.Parse(htmlTemplate)
	dt := time.Now()
	render_data := struct {
		Date string
	}{
		Date: dt.Local().Format("02-01-2006 15:04:05"),
	}
	my_template.Execute(w, render_data)
}
```

We are using the [Functions Framework for Go](https://pkg.go.dev/github.com/GoogleCloudPlatform/functions-framework-go). Key is the `init()` function that registers the handler function for the API:

```go
func init() {
	functions.HTTP("hello-http-v2", HelloHTTPV2)
}
```

Note the name we define for our function `"hello-http-v2"`.

All handler functions defined using the framework need to provide the following method signature:

```go
func HelloHTTPV2(w http.ResponseWriter, r *http.Request) { }
```

Since we are just rendering some content and sending it back to the client, we won't need to access the request.

Instead, we write a rendered template to the ResponseWriter:

```go
	my_template.Execute(w, render_data)
```

Ensure that all our dependencies are accounted for by running:

```
go mod tidy
```

This should create a `go.sum` file with locked down dependency versions and also update `go.mod`. For reference, `go.mod` should now have the following contents:

```
module example.com/cfv2

go 1.19

require github.com/GoogleCloudPlatform/functions-framework-go v1.6.1

require (
	github.com/cloudevents/sdk-go/v2 v2.6.1 // indirect
	github.com/google/uuid v1.1.2 // indirect
	github.com/json-iterator/go v1.1.10 // indirect
	github.com/modern-go/concurrent v0.0.0-20180228061459-e0a39a4cb421 // indirect
	github.com/modern-go/reflect2 v0.0.0-20180701023420-4b7aa43c6742 // indirect
	go.uber.org/atomic v1.4.0 // indirect
	go.uber.org/multierr v1.1.0 // indirect
	go.uber.org/zap v1.10.0 // indirect
)
```

The versions of dependencies may be different in your project.

## Part 3: Deploy Function

In order to deploy our function, we need the [gcloud CLI](https://cloud.google.com/cli).

If you don't have the gcloud CLI installed, find instructions to install it here: [Install the gcloud CLI](https://cloud.google.com/sdk/docs/install).

Once the gcloud CLI is installed, we need to [login](https://cloud.google.com/sdk/docs/authorizing) and [select the GCP project we want to use](https://cloud.google.com/sdk/gcloud/reference/config/set):

```
gcloud init
gcloud config set project [PROJECT ID]
```

If you don't have a project set up, see the following to create a project: [Google Cloud  - Creating and Managing Projects](https://cloud.google.com/resource-manager/docs/creating-managing-projects).

Once everything is set up, you can deploy your function with the following command:

```
	gcloud functions deploy hello-http-v2 --gen2 --runtime=go119 --source=functionsv2/hello --entry-point=hello-http-v2 --region=us-central1 --trigger-http  --allow-unauthenticated 
```

After the deployment is complete, run the following command to obtain the public HTTP endpoint:

```
gcloud functions describe hello-http-v2
```

This will provide an output like the following:

```yaml
buildConfig:
  build: xxx
  entryPoint: hello-http-v2
  runtime: go119
  source:
    storageSource:
      bucket: xxx
      object: hello-http-v2/function-source.zip
  sourceProvenance:
    resolvedStorageSource:
      bucket: xxx
      generation: 'xxx'
      object: hello-http-v2/function-source.zip
environment: GEN_2
labels:
  deployment-tool: cli-gcloud
name: projects/go-serverless-http-example/locations/us-central1/functions/hello-http-v2
serviceConfig:
  allTrafficOnLatestRevision: true
  availableCpu: '0.1666'
  availableMemory: 256M
  ingressSettings: ALLOW_ALL
  maxInstanceCount: 100
  maxInstanceRequestConcurrency: 1
  revision: hello-http-v2-00005-zaj
  service: projects/go-serverless-http-example/locations/us-central1/services/hello-http-v2
  serviceAccountEmail: xxx
  timeoutSeconds: 60
  uri: https://hello-http-v2-ndzxp34coq-uc.a.run.app
state: ACTIVE
updateTime: '2023-01-28T01:37:25.903696730Z'
```

Take note here of the `uri` property towards the end. This is the public endpoint you can open in your browser to test the page.

[https://hello-http-v2-ndzxp34coq-uc.a.run.app](https://hello-http-v2-ndzxp34coq-uc.a.run.app)

## Part 4: Test function

No project is complete without some unit testing. Thankfully, this is very easy to set up in Go using the [`httptest`](https://pkg.go.dev/net/http/httptest) package.

Add another file to your project called `hello_test.go` and provide the following contents:

```go
package hello_v2

import (
	"net/http/httptest"
	"strings"
	"testing"
)

func TestHelloHTTP(t *testing.T) {
	req := httptest.NewRequest("GET", "/", nil)
	req.Header.Add("Content-Type", "text/html")

	rr := httptest.NewRecorder()
	HelloHTTPV2(rr, req)

	if got := rr.Body.String(); !strings.Contains(got, "Hello there!") {
		t.Errorf("HelloHTTPV2() = %q, want %q", got, "Hello There")
	}
}
```

We are simply calling the handler function defined in `hello.go` and ensure the correct response is provided.

You can run this test with the following command:

```
go test
```

If everything worked successfully, you should receive an output as follows:

```
$ go test
PASS
ok      example.com/cfv2  0.348s
```

## Conclusion

It is very easy to create a public API endpoint using Cloud Functions. The result is returned very fast. Even when a cold start is required, the response should be rendered in under 200 ms. This [compares quite well to serverless API performance on AWS](https://maxrohde.com/2022/10/16/serverless-react-ssr).

Unfortunately, the API we created is not suitable for anything but the most basic prototyping. For a real API, we will likely want to use our own domain. This appears to be quite complicated in GCP. We will need a [Load Balancer](https://cloud.google.com/load-balancing/), a [serverless NEG](https://cloud.google.com/load-balancing/docs/negs/serverless-neg-concepts) and an [API Gateway](https://cloud.google.com/api-gateway) among some other components. See [Getting started with HTTP(S) Load Balancing for API Gateway](https://cloud.google.com/api-gateway/docs/gateway-serverless-neg) and [HTTP(S) Load Balancing for API Gateway](https://cloud.google.com/api-gateway/docs/gateway-load-balancing).