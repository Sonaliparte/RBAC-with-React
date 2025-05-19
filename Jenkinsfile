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

        // stage('Remove old container') {
        //     steps {
        //         bat '''
        //             if docker ps -a -q -f name=rbac-react-container; then
        //                 docker rm -f rbac-react-container
        //             else
        //                 echo "No existing container found"
        //         '''
        //     }
        // }

        // stage('Run new container') {
        //     when {
        //         expression {
        //             return true  // always run for now
        //         }
        //     }
        //     steps {
        //         bat '''
        //             docker run -d -p 3000:80 --name rbac-react-container rbac-react-app
        //         '''
        //     }
        // }

        // stage('Build') {
        //     steps {
        //         echo 'Building...'
        //     }
        //     post {
        //         success {
        //             echo "  Visit your app at http://localhost:${PORT}"
        //         }
        //         failure {
        //             echo "  Build failed – check the log."
        //         }
        //     }
        // }
        def IMAGE_NAME = "gcr.io/rbca-460307/RBCA"

stage('Push to Google Container Registry') {
    steps {
        withCredentials([file(credentialsId: 'gcp-service-account-key', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
            sh '''
                gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS
                gcloud config set project rbca-460307
                docker tag your-image-name:latest gcr.io/rbca-460307/RBCA
                docker push gcr.io/rbca-460307/RBCA
                gcloud run deploy your-service-name \
  --image gcr.io/rbca-460307/RBCA \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
            '''
        }
    }
}
    }
}
