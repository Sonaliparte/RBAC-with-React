pipeline {
    agent any

    environment {
        IMAGE_NAME     = 'rbac-react-app'
        CONTAINER_NAME = 'rbac-react-container'
        PORT           = '3000'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker image') {
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    bat '''
                        docker build -t rbac-react-app -f dockerfile .
                        echo Exit code is: %ERRORLEVEL%
                    '''
                }
            }
        }

        stage('Remove old container') {
            steps {
                bat '''
                    if docker ps -a -q -f name=rbac-react-container; then
                        docker rm -f rbac-react-container
                    else
                        echo "No existing container found"
                    fi
                '''
            }
        }

        stage('Run new container') {
            when {
                expression {
                    return true  // always run for now
                }
            }
            steps {
                bat '''
                    docker run -d -p 3000:80 --name rbac-react-container rbac-react-app
                '''
            }
        }

        stage('Build') {
            steps {
                echo 'Building...'
            }
            post {
                success {
                    echo "  Visit your app at http://localhost:${PORT}"
                }
                failure {
                    echo "  Build failed – check the log."
                }
            }
        }
    }
}
