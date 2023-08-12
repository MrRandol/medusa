package main

import (
	// "medusa/controllers"
	// "medusa/models"

	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	// to remove in controller
	"medusa/controllers"
)

func InitRouter() *gin.Engine {
	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowWildcard:    true,
		AllowOrigins:     []string{"http://localhost:*"}, // Disable CORS for local development
		AllowMethods:     []string{"PUT", "PATCH"},
		AllowHeaders:     []string{"Origin"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			return origin == "https://github.com"
		},
		MaxAge: 12 * time.Hour,
	}))

	// Routes

	// Medias
	r.GET("/medias", controllers.FindMedias)
	r.POST("/medias", controllers.CreateMedia)

	return r
}
