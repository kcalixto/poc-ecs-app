package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.GET("/health", func(c *gin.Context) {
		c.String(http.StatusOK, "OK")
	})

	r.GET("/helloisanyonethere", func(c *gin.Context) {
		c.String(http.StatusOK, "hi, there")
	})

	r.Run(":8080")
}
