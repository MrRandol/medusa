package main

import (
	// "medusa/controllers"
	// "medusa/models"
	"fmt"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	// to remove in controller
	"medusa/controllers"
	FS "medusa/fileSystem"
	"net/http"
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
	r.GET("/medias", controllers.FindMedias)

	r.GET("/media/:name", func(c *gin.Context) {
		byteFile, err := FS.GetMedia(c.Param("name"))
		if err != nil {
			fmt.Println(err)
		}
		c.Data(http.StatusOK, "application/octet-stream", byteFile)
	})

	r.GET("/metadata/:name", func(c *gin.Context) {
		byteFile, err := FS.GetMediaMetadata(c.Param("name"))
		if err != nil {
			fmt.Println(err)
		}
		c.Data(http.StatusOK, "image/jpg", byteFile)
	})

	return r
}
