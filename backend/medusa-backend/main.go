package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"

	medusaFS "randol/medusa-file-system"
)

func main() {
	router := gin.Default()

	// Define a GET endpoint
	router.GET("/example", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello, this is a basic GET API!",
		})
	})

	router.GET("/media/:name", func(c *gin.Context) {
		byteFile, err := medusaFS.GetMedia(c.Param("name"))
		if err != nil {
			fmt.Println(err)
		}
		c.Data(http.StatusOK, "application/octet-stream", byteFile)
	})

	router.GET("/metadata/:name", func(c *gin.Context) {
		byteFile, err := medusaFS.GetMediaMetadata(c.Param("name"))
		if err != nil {
			fmt.Println(err)
		}
		c.Data(http.StatusOK, "image/jpg", byteFile)
	})

	// Start the server
	router.Run(":8080")
}
