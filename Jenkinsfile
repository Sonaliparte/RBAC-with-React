pipeline {
    agent any

    environment {
        IMAGE_NAME = 'rbac-react-app'
        CONTAINER_NAME = 'rbac-react-container'
        PORT = '5173'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "📦 Building Docker image..."
                    bat "docker build -t %IMAGE_NAME% -f dockerfile ."
                }
            }
        }

        stage('Remove Old Container') {
            steps {
                script {
                    bat """
                    @echo off
                    docker ps -a --format "{{.Names}}" | findstr /R /C:"^%CONTAINER_NAME%$"
                    if %errorlevel%==0 (
                        echo 🧹 Stopping and removing old container...
                        docker stop %CONTAINER_NAME%
                        docker rm %CONTAINER_NAME%
                    )
                    """
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    echo "🚀 Running Docker container..."
                    bat "docker run -d -p %PORT%:%PORT% --name %CONTAINER_NAME% %IMAGE_NAME%"
                }
            }
        }
    }

    post {
        success {
            echo "✅ Docker container is running at http://localhost:%PORT%"
        }
        failure {
            echo "❌ Build failed. Check logs for errors."
        }
    }
}
