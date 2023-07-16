package main

import (
	"medusa/models"
)

func main() {
	// Connect models to DB using gorm
	models.ConnectDatabase()

	// Start the server
	// use PORT env variable to change server port
	InitRouter().Run()
}
