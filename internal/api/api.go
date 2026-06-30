package api

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mlc-lab-psych/result-web-application/internal/firebase"
	"github.com/mlc-lab-psych/result-web-application/internal/logging"
	"github.com/mlc-lab-psych/result-web-application/internal/models"
	"github.com/sirupsen/logrus"
)

func LoadFirebase(c *gin.Context) {

	var req models.FirebaseRequest

	err := c.ShouldBindBodyWithJSON(&req)
	if err != nil {
		logging.Logger.WithFields(logrus.Fields{"error": err, "module": "api", "method": "LoadFirebase"}).Warning("Error loading the request!")
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Unable to process request!",
		})
		return
	}

	logging.Logger.WithFields(logrus.Fields{"req": req, "module": "api", "method": "LoadFirebase"}).Info("Recieved request!")

	db, err := firebase.GetFirebase(req)
	if err != nil {
		logging.Logger.WithFields(logrus.Fields{"error": err, "module": "api", "method": "LoadFirebase"}).Warning(fmt.Sprintf("Failure Loading a Firebase: %s", req.Name))
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Unable to process request!",
		})
		return
	}

	table, err := firebase.GetInfo(db, req)
	if err != nil {
		logging.Logger.WithFields(logrus.Fields{"error": err, "module": "api", "method": "LoadFirebase"}).Warning(fmt.Sprintf("Failure Getting info inside a Firebase: %s", req.Name))
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Unable to process request!",
		})
		return
	}

	c.JSON(http.StatusOK, table)
	return
}
