package models

type FirebaseRequest struct {
	Name      string `json:"name"`
	Url       string `json:"url"`
	Reference string `json:"reference"`
}
