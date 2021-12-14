# Downtime Monitoring Tool

A tool to monitor given websites regularly to check if any of them is down.
In case, website with the status of "down" detected, website owner will be notified by email.

Make sure you provide .env with the details below:

```
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_DB=
POSTGRES_PASSWORD=
POSTGRES_PORT=
APP_PORT=
EMAIL_API_KEY=
EMAIL_HOST_DOMAIN=
SENDER_EMAIL=
```
All the request parameters is specified in the `request` directory.

Application consists of main services: database, adminer, migrations, api, and worker that works on the background to check the websites regularly.

To run the application, all you need to run is:

`docker-compose up`