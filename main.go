package main

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"github.com/tkanos/gonfig"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	"io/ioutil"
	"log"
	"net/http"
	"time"
)

var configuration = Configuration{}

type Configuration struct {
	mongoDbUri      string
	mongoDbUserName string
	mongoDbPassword string
	port            string
}

type Issue struct {
	ID         primitive.ObjectID `bson:"_id,omitempty"`
	Title      string             `bson:"title,omitempty"`
	Content    string             `bson:"content,omitempty"`
	Tags       []string           `bson:"tags,omitempty"`
	Priority   string             `bson:"priority, omitempty"`
	AssignedTo string             `bson: "assignedTo"`
	Status     string             `bson: "status"`
}

type User struct {
	ID        primitive.ObjectID `bson:"_id,omitempty"`
	FirstName string             `bson:"firstName"`
	LastName  string             `bson:"lastName"`
	Email     string             `bson:"email, omitempty"`
}

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to the HomePage!")
	fmt.Println("Endpoint Hit: homePage")
}

func handleRequests() {
	myRouter := mux.NewRouter().StrictSlash(true)
	myRouter.HandleFunc("/", homePage)
	myRouter.HandleFunc("/api/v1/all", returnAllIssues)
	myRouter.HandleFunc("/api/v1/issue/{id}", returnSingleIssue)
	myRouter.HandleFunc("/api/v1/createNewIssue", createNewIssue).Methods("POST")
	myRouter.HandleFunc("/api/v1/deleteIssue", deleteIssue).Methods("DELETE")
	http.Handle("/", myRouter)
	log.Fatal(http.ListenAndServe(":"+configuration.port, nil))
}

func returnAllIssues(w http.ResponseWriter, r *http.Request) {
	var issues []Issue
	w.Header().Set("Content-Type", "application/json")
	client, err := mongo.NewClient(options.Client().ApplyURI(configuration.mongoDbUri))
	if err != nil {
		log.Fatal(err)
	}
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(ctx)

	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatal(err)
	}
	db := client.Database("gozilla-data")
	issuesCollection := db.Collection("issues")
	cursor, err := issuesCollection.Find(ctx, bson.M{})
	if err != nil {
		panic(err)
	}
	if err = cursor.All(ctx, &issues); err != nil {
		panic(err)
	}
	json.NewEncoder(w).Encode(issues)
}

func returnSingleIssue(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	vars := mux.Vars(r)
	key := vars["id"]
	fmt.Fprintf(w, "Key: "+key)
	//for _, issue := range Issues {
	//	if issue.IssueNumber == key {
	//		json.NewEncoder(w).Encode(issue)
	//	}
	//}
}

func deleteIssue(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	//vars := mux.Vars(r)
	//id := vars["id"]
	//for index, issue := range Issues {
	//	if issue.IssueNumber == id {
	//		Issues = append(Issues[:index], Issues[index+1:]...)
	//	}
	//}
}

func createNewIssue(w http.ResponseWriter, r *http.Request) {
	reqBody, _ := ioutil.ReadAll(r.Body)
	var issue Issue
	json.Unmarshal(reqBody, &issue)
	// Issues = append(Issues, issue)
	json.NewEncoder(w).Encode(issue)
}

func main() {
	err := gonfig.GetConf("config.json", &configuration)
	if err != nil {
		panic(err)
	}
	fmt.Printf("Listening on port 10000!")
	handleRequests()
}
