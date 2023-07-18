# Medusa backend

[Go](https://go.dev/)

### Local set up
In `backend`, run `go mod tidy` to fetch all dependencies, then `go run .` to start the server.

### Configuration

Basic configuration containing default values for local development can be found in `config.default.yml`, but can be overwritten through environment.

TODO : table of config values and description

### Tests

TODO

This project was generated with [Go](https://go.dev/)

## Development server

Run `go run .` for a dev server. APIs will be available at `http://localhost:8080/`.
Livereload can be achieved with [air](https://github.com/cosmtrek/air).