package models

import (
	"gorm.io/driver/postgres"
	_ "gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	// TODO : DB configs
	dsn := "host=localhost user=medusa_user password=medusa_pass dbname=medusa port=5432 sslmode=disable TimeZone=Etc/UTC"
	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("Failed to connect to database!")
	}

	database.AutoMigrate(&Media{})
	DB = database
}
