package firebase

import (
	"context"
	"embed"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"time"

	fb "firebase.google.com/go/v4"
	firebase "firebase.google.com/go/v4"
	"firebase.google.com/go/v4/db"
	"github.com/mlc-lab-psych/result-web-application/internal/logging"
	"github.com/mlc-lab-psych/result-web-application/internal/models"
	"google.golang.org/api/option"
)

//go:embed credentials/*
var credFiles embed.FS

func GetInfo(db *db.Client, request models.FirebaseRequest) (*any, error) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*20)
	defer cancel()

	users := db.NewRef(request.Reference)

	var info *any
	err := users.Get(ctx, &info)
	if err != nil {
		return nil, fmt.Errorf("Unable to get info for users!: %v", err)
	}

	return info, nil
}

func GetFirebase(request models.FirebaseRequest) (*db.Client, error) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
	defer cancel()

	path := filepath.Join(
		"credentials",
		fmt.Sprintf("%s.json", request.Name),
	)

	logging.Logger.Info("Loading Firebase config from:", path)

	config, err := credFiles.ReadFile(path)
	if err != nil {
		config = []byte(os.Getenv(fmt.Sprintf("CRED_%s", strings.ToUpper(request.Name))))
		if len(config) == 0 {
			return nil, fmt.Errorf("Unable to find the firebase credientials for %s: %v", request.Name, err)
		}
	}

	options := option.WithAuthCredentialsJSON(option.ServiceAccount, config)

	logging.Logger.Info("Request URL:", request.Url)

	app, err := fb.NewApp(ctx, &firebase.Config{
		DatabaseURL: request.Url,
	}, options)
	if err != nil {
		return nil, fmt.Errorf("Unable connect to the firebase application %s : %v", request.Name, err)
	}

	database, err := app.Database(ctx)
	if err != nil {
		return nil, fmt.Errorf("Unable to load the database from the firebase %s : %v", request.Name, err)
	}

	return database, nil
}
