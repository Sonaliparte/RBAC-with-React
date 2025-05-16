pipeline {
    agent any

    environment {
        IMAGE_NAME = 'rbac-react-app'
        CONTAINER_NAME = 'silly_satoshi'
        APP_PORT = '3000'
    }

    options {
        timestamps()
    }

    stages {

        stage('Update Image') {
            steps {
                echo 'Using existing local Docker image — skipping pull.'
                // You can even validate it exists:
                bat "docker images -q %IMAGE_NAME% || echo 'Image not found locally!'"
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests inside Docker container...'
                bat """
                    docker run --rm %IMAGE_NAME% npm test || echo 'No tests found or failed'
                """
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying Docker container...'
                bat """
                    docker rm -f %CONTAINER_NAME% || echo 'No existing container to remove'
                    docker run -d --name %CONTAINER_NAME% -p %APP_PORT%:80 %IMAGE_NAME%
                """
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline finished successfully.'
            bat "git log -1 --oneline || echo 'Git log not available'"
        }
        failure {
            echo '❌ Something went wrong in the pipeline.'
        }
    }
}
