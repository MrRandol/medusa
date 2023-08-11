package models

import (
	"fmt"

	"gorm.io/driver/postgres"
	_ "gorm.io/driver/postgres"
	"gorm.io/gorm"

	"medusa/config"
)

var DB *gorm.DB

func ConnectDatabase(cfg config.DatabaseConfig) {
	dsn := fmt.Sprintf(`
		host=%s 
		port=%s 
		user=%s 
		password=%s 
		dbname=%s  
		sslmode=disable 
		TimeZone=%s`,
		cfg.Host,
		cfg.Port,
		cfg.User,
		cfg.Password,
		cfg.Name,
		cfg.Tz)
	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("Failed to connect to database!")
	}

	database.AutoMigrate(&Media{})
	DB = database
}
