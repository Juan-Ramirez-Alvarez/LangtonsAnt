package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("starting server on http://localhost:3001/")
	http.Handle("/", http.FileServer(http.Dir("./public")))
	err := http.ListenAndServe(":3001", nil)
	if err != nil {
		panic("Error: " + err.Error())
	}
}
