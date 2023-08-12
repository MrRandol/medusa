package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"medusa/models"
)

// GET /medias
// Find all medias
func FindMedias(c *gin.Context) {
	var medias []models.Media
	models.DB.Find(&medias)

	c.JSON(http.StatusOK, gin.H{"data": medias})
}

// POST /medias
// Create a new media
func CreateMedia(c *gin.Context) {

	var input models.CreateMediaInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	media := models.Media{FileName: input.FileName, FilePath: input.FilePath}
	models.DB.Create(&media)

	c.JSON(http.StatusOK, gin.H{"data": media})
}
