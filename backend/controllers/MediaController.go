package controllers

import (
	"medusa/models"

	"net/http"

	"github.com/gin-gonic/gin"
)

// GET /medias
// Find all medias
func FindMedias(c *gin.Context) {
	var medias []models.Media
	models.DB.Find(&medias)

	c.JSON(http.StatusOK, gin.H{"data": medias})
}
