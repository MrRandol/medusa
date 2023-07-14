package medusaFS

import (
	"fmt"
	"log"
	"os"

	"github.com/evanoberholster/imagemeta"
)

func ReadFolder() {
	files, err := os.ReadDir("/Users/randol/Documents/projects/static")
	if err != nil {
		log.Fatal(err)
	}

	for _, file := range files {
		fmt.Println(file.Name(), file.IsDir())
	}
}

func GetMedia(mediaName string) ([]byte, error) {
	return os.ReadFile(fmt.Sprintf("R:\\BIDOUILLES\\projects\\static\\%s", mediaName))
}

func GetMediaMetadata(mediaName string) ([]byte, error) {
	fileName := fmt.Sprintf("R:\\BIDOUILLES\\projects\\static\\%s", mediaName)
	//The file has to be opened first
	f, err := os.Open(fileName)
	// The file descriptor (File*) has to be used to get metadata
	fi, err := f.Stat()
	e, err := imagemeta.Decode(f)
	if err != nil {
		panic(err)
	}
	fmt.Println(e)
	// The file can be closed
	f.Close()
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	// fi is a fileInfo interface returned by Stat
	fmt.Println(fi)

	return os.ReadFile(fileName)
}
