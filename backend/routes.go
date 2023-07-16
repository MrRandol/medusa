package main

import (
	// "medusa/controllers"
	// "medusa/models"
	"fmt"

	"github.com/gin-gonic/gin"

	// to remove in controller
	"medusa/controllers"
	FS "medusa/fileSystem"
	"net/http"
)

func InitRouter() *gin.Engine {

	// Connect to database
	// models.ConnectDatabase()

	r := gin.Default()
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
