package models

type Media struct {
	ID       uint   `json:"id" gorm:"primary_key"`
	FileName string `json:"fileName"`

	// Hidden fields
	FilePath string `json:"-"`
}
