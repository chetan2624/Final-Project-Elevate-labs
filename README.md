### Project Title

# 🚀 CI/CD Pipeline with GitHub Actions, Docker & Kubernetes

A project that demonstrates a **DevOps workflow** by containerizing a Node.js To-Do App with **Docker**, automating the process using a **GitHub Actions CI/CD pipeline**, and deploying the application to a local **Kubernetes cluster (Minikube)**.

-----

### 📌 Project Overview

This project showcases a modern Node.js application that allows users to manage tasks. The core of this task is the implementation of a fully automated pipeline that handles everything from code changes to a live, scalable deployment.

-----

### ⚙️ Tech Stack

  - **Frontend/Backend**: Node.js + Express + EJS
  - **Containerization**: Docker
  - **CI/CD**: GitHub Actions
  - **Orchestration**: Kubernetes (Minikube)
  - **Registry**: DockerHub

-----

### 📂 Project Structure

```
ci-cd-pipeline-project/
├── app.js                   # Node.js application
├── views/                   # EJS templates
├── public/                  # CSS & static files
├── Dockerfile               # Containerization
├── .github/workflows/
│   └── ci-cd.yml            # GitHub Actions pipeline
├── k8s/                     # Kubernetes manifests
│   ├── deployment.yaml
│   └── service.yaml
└── docs/screenshots/        # Screenshots
```

-----

### 🚀 CI/CD Pipeline Flow

The workflow is triggered by a `push` to the `main` branch, automatically executing a series of steps to build and deploy the application.

1.  **Developer pushes code** to GitHub's `main` branch.
2.  **GitHub Actions** automatically triggers the workflow.
3.  The workflow **builds a Docker image** and **pushes it to DockerHub**.
4.  The latest image is then **deployed to the Minikube** Kubernetes cluster.

-----

### 🐳 Docker Setup

To build and run the application locally, use the following commands:

```bash
docker build -t todo-app:1.0 .
docker run -p 3000:3000 todo-app:1.0
```

You can then access the app at `http://localhost:3000`.

-----

### ⚡ GitHub Actions Setup

The pipeline is defined in `.github/workflows/ci-cd.yml`. This file specifies the steps for building and pushing the Docker image.

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: ["main"]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Docker
        uses: docker/setup-buildx-action@v2

      - name: Login to DockerHub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build & Push Docker Image
        uses: docker/build-push-action@v4
        with:
          context: .
          push: true
          tags: chetan801/todo-app:latest
```

**Note**: You must add `DOCKER_USERNAME` and `DOCKER_PASSWORD` as secrets in your GitHub repository settings.

-----

### ☸️ Kubernetes Deployment (Minikube)

Follow these steps to deploy and manage the application on your local Kubernetes cluster.

#### 1\. Start Minikube

```bash
minikube start --driver=docker
```

#### 2\. Apply Manifests

```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

#### 3\. Verify Deployment

Check the status of your pods and services.

```bash
kubectl get pods
kubectl get svc
```

#### 4\. Scale Deployment

To scale the application, update the number of replicas.

```bash
kubectl scale deployment todo-app --replicas=3
```

#### 5\. Access the Application

Expose the service to access the app in your browser.

```bash
minikube service todo-service
```
## 📄 Project Report
You can view or download the full project report here 👉 [Project Report PDF](./docs/Project-Report.pdf)


-----

### 📌 Key Learnings

  - Built a full **CI/CD pipeline** with GitHub Actions.
  - **Containerized** applications with Docker.
  - Deployed and managed workloads on **Kubernetes (Minikube)**.
  - Understood key Kubernetes concepts like **scaling**, **rollouts**, and **service exposure**.

-----

### 🎯 Final Outcome

This project successfully demonstrates a complete, automated DevOps workflow, proving the ability to take code from a repository, build it into a container, and deploy it to a container orchestration platform with seamless integration.
