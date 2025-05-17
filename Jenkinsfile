pipeline {
    agent any

    environment {
        IMAGE_NAME     = 'rbac-react-app'
        CONTAINER_NAME = 'rbac-react-container'
        PORT           = '5173'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker image') {
            steps {
                bat '''
                echo [BUILD] Building %IMAGE_NAME% ...
                docker build -t %IMAGE_NAME% -f dockerfile .
                '''
            }
        }

        stage('Remove old container') {
            steps {
                bat '''
                @echo off
                for /f "tokens=* delims=" %%i in ('docker ps -a --format "{{.Names}}" ^| findstr /R /C:"^%CONTAINER_NAME%$"') do (
                    echo [CLEAN] Stopping %%i ...
                    docker stop %%i  2>NUL
                    docker rm   %%i  2>NUL
                )
                '''
            }
        }

        stage('Run new container') {
            steps {
                bat '''
                echo [RUN] Launching container on port %PORT% ...
                docker run -d -p %PORT%:%PORT% --name %CONTAINER_NAME% %IMAGE_NAME%
                '''
            }
        }
    }

    post {
        success {
            echo "✅  Visit your app at http://localhost:${PORT}"
        }
        failure {
            echo "❌  Build failed – check the log."
        }
    }
}
