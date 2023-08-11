package main

import (
	"medusa/config"
	"medusa/models"
)

func main() {
	// Get config from file and environment
	cfg := config.GetConfig()

	// Connect models to DB using gorm
	models.ConnectDatabase(cfg.Database)

	// Start the server
	// use PORT env variable to change server port
	InitRouter().Run()
}
