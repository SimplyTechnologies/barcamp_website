# Restfull API Documentation


All GET and DELETE requests do not have bodies, POST/PUT can have body with content-type "application/json"

Some endpoints requires authorization. In order to authorize the "X-Auth-Token" request header should be a valid authorization token which can be omitted via signin API.

## General

### GET /api/v1

Returns the API information

*Output* for 200 status code
```json
{"version":"1"}
```

## Accounts

### POST /api/v1/accounts/singin

Returns X-Auth-Token which should be used in order to authorize user

Request params should passed using request body
* username
* password

Sample body
```json
{ "username": "admin", "password": "hellokitty" }
```

Sample output
```json
{
	"_id":"5559ed3080ad8ba41dfab4ae",
	"username":"admin",
	"updated":"2015-05-18T13:46:24.474Z",
	"created":"2015-05-18T13:46:24.367Z",
	"roles":["admin"]
}
```
Headers
```
 HTTP/1.1 200 OK
 X-Powered-By: Express
 X-Auth-Token: 8df10ea54d9a70d404f1ab3673ca80fc53cb567eaf33c7f46e8813559995658de2a574052ab6f942561f7ec8af1d9f5d0fbb11379bd3c6116ce712a88e0bb85c
 Content-Type: application/json; charset=utf-8
 Content-Length: 145
 ETag: W/"91-3ef62537"
 Date: Fri, 22 May 2015 10:37:30 GMT
 Connection: keep-alive
```
Possible status codes:
* 200 - success
* 400 - wrong credentials or missing fields

## Events
### **GET** /api/v1/events
Returs the all events list grouped by theirs location

Sample output
```json
[{
    "events": [{
        "topic": {
            "en": "Topic1",
            "hy": "Topic1 hy"
        },
        "name": {
            "en": "Poghos Poghosyan",
            "hy": "Poghos Poghosyan"
        },
        "start": "2015-10-31T20:00:00.000Z",
        "end": "2015-10-31T21:00:00.000Z"
    }, {
        "topic": {
            "en": "Topic1",
            "hy": "Topic1 hy"
        },
        "name": {
            "en": "Poghos Poghosyan",
            "hy": "Poghos Poghosyan"
        },
        "start": "2015-10-31T21:00:00.000Z",
        "end": "2015-10-31T22:00:00.000Z"
    }, {
        "topic": {
            "en": "Topic1",
            "hy": "Topic1 hy"
        },
        "name": {
            "en": "Poghos Poghosyan",
            "hy": "Poghos Poghosyan"
        },
        "start": "2015-10-31T22:00:00.000Z",
        "end": "2015-10-31T23:00:00.000Z"
    }],
    "location": "204"
}, {
    "events": [{
        "topic": {
            "en": "Topic1",
            "hy": "Topic1 hy"
        },
        "name": {
            "en": "Poghos Poghosyan",
            "hy": "Poghos Poghosyan"
        },
        "start": "2015-10-31T19:00:00.000Z",
        "end": "2015-10-31T20:00:00.000Z"
    }, {
        "topic": {
            "en": "Topic1",
            "hy": "Topic1 hy"
        },
        "name": {
            "en": "Poghos Poghosyan",
            "hy": "Poghos Poghosyan"
        },
        "start": "2015-10-31T20:00:00.000Z",
        "end": "2015-10-31T21:00:00.000Z"
    }, {
        "start": "2015-10-31T21:00:00.000Z",
        "end": "2015-10-31T22:00:00.000Z"
    }, {
        "topic": {
            "en": "Topic1",
            "hy": "Topic1 hy"
        },
        "name": {
            "en": "Poghos Poghosyan",
            "hy": "Poghos Poghosyan"
        },
        "start": "2015-10-31T22:00:00.000Z",
        "end": "2015-10-31T23:00:00.000Z"
    }],
    "location": "201"
}]
```

Dates are shown in UTC format (GMT +0)

### **GET** /api/v1/events/current
Return current events and the 2 following events. The output is the same as in **GET** /api/v1/events, but the elements in each group is limited by 3




### **GET** /api/v1/events/all
*Authorization and admin roles is required*

Returns the same as the GET /api/v1/events but with their IDs and with disabled events

### **POST** /api/v1/events
*Authorization and admin roles is required*

Create an event, the request body should be like the following one
```json
{
    "topic": {
        "en": "Topic1",
        "hy": "Topic1 hy"
    },
    "name": {
        "en": "Poghos Poghosyan",
        "hy": "Poghos Poghosyan"
    },
    "start": "2015-10-31T20:00:00.000Z",
    "end": "2015-10-31T21:00:00.000Z"
}
```

If everything is OK, the created event will be returned with 201 status code, otherwise 400 will be returned (if validation is failed).

Dates should be in UTC format (GMT +0)

### **PUT** /api/v1/events/:id
*Authorization and admin roles is required*

Updates the event data. The following fields can be changed:
* topic
* name
* start
* end
* location
* disabled (default: false)

ID should be valid event ID. If there are no event with such ID, 404 will be returned.
