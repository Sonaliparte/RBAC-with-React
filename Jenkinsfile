pipeline {
    agent any

    environment {
        IMAGE_NAME     = 'rbac-react-app'
        CONTAINER_NAME = 'rbac-react-container'
        PORT           = '3000'
        GCR_IMAGE_NAME = 'gcr.io/rbca-460307/RBCA'
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

        stage('Push to Google Container Registry and Deploy to Cloud Run') {
            steps {
                withCredentials([file(credentialsId: 'gcp-service-account-key', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
                    bat '''
                        gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS
                        gcloud config set project rbca-460307
                        
                        docker tag $IMAGE_NAME:latest $GCR_IMAGE_NAME
                        docker push $GCR_IMAGE_NAME

                        gcloud run deploy rbac-react-service \
                          --image $GCR_IMAGE_NAME \
                          --platform managed \
                          --region us-central1 \
                          --allow-unauthenticated
                    '''
                }
            }
        }
    }
}
