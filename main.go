package main

import (
	"embed"
	"io/fs"
	"net/http"
	"os"

	"github.com/mlc-lab-psych/result-web-application/internal/api"
	"github.com/mlc-lab-psych/result-web-application/internal/logging"
	"github.com/sirupsen/logrus"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

//go:embed web/build/*
var buildFiles embed.FS

func main() {
	sub, err := fs.Sub(buildFiles, "web/build")
	if err != nil {
		logging.Logger.WithFields(logrus.Fields{"error": err, "module": "main", "method": "main"}).Fatal("error subbing build files")
	}

	router := gin.Default()
	router.Use(cors.Default())

	router.StaticFS("/", http.FS(sub))

	router.POST("/firebase", api.LoadFirebase)

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	router.Run(":" + port)
}
