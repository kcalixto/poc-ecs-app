package main

import (
	"fmt"
	"time"
)

func main() {
	SetInterval(
		func() {
			fmt.Println("-- Deploying to aws ecs --")
		},
		24*time.Hour,
	)
	for {
	}
}

func SetInterval(action func(), interval time.Duration) func() {
	quit := make(chan struct{})

	go func() {
		// Run the action immediately
		action()
		ticker := time.NewTicker(interval)
		defer ticker.Stop()
		for {
			select {
			case <-ticker.C:
				action()
			case <-quit:
				return
			}
		}
	}()

	return func() {
		close(quit)
	}
}
