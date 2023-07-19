package models

type Media struct {
	ID       uint   `json:"id" gorm:"primary_key"`
	FileName string `json:"fileName"`
	FilePath string `json:"filePath"`
}
