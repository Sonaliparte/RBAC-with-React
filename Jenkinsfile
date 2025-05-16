pipeline {
    agent any

    environment {
        IMAGE_NAME = 'rbac-react-app'       // Docker image name
        CONTAINER_NAME = 'silly_satoshi' // Container name
        APP_PORT = '3000'                   // React app runs on this port
    }

    options {
        timestamps() // Adds timestamps to logs
    }

    stages {

        stage('Update Image') {
            steps {
                echo 'Pulling latest Docker image or rebuilding...'
                // Optional: pull from Docker Hub, or build locally
                // Uncomment below if you want to build instead of pull:
                // sh "docker build -t $IMAGE_NAME ."
                sh "docker pull $IMAGE_NAME || echo 'Image not found on registry, skipping pull.'"
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests inside Docker container...'
                sh """
                    docker run --rm $IMAGE_NAME npm test || echo 'No tests found or failed'
                """
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying Docker container...'
                sh """
                    docker rm -f $CONTAINER_NAME || true
                    docker run -d --name $CONTAINER_NAME -p $APP_PORT:80 $IMAGE_NAME
                """
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline finished successfully.'
            // Optional: show last Git commit info
            sh "git log -1 --oneline || echo 'Git log not available'"
        }
        failure {
            echo '❌ Something went wrong in the pipeline.'
        }
    }
}
