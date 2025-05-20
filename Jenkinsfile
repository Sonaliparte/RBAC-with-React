pipeline {
    agent any

    environment {
        IMAGE_NAME     = 'rbac-react-app'
        GCR_IMAGE_NAME = 'gcr.io/rbca-460307/rbca'
        REGION         = 'us-central1'
        SERVICE_NAME   = 'rbac-react-service'
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
                    set PATH=C:\\Program Files\\Docker\\Docker\\resources\\bin;%PATH%
docker --version
                        docker build -t rbac-react-app -f dockerfile .
                        echo Exit code is: %ERRORLEVEL%
                    '''
                }
            }
        }

          stage('Authenticate with GCP & Push Image') {
            steps {
                withCredentials([file(credentialsId: 'gcp-service-account-key', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
                    bat '''
                        docker run --rm -v $GOOGLE_APPLICATION_CREDENTIALS:/tmp/key.json \
                                   -v $HOME/.config:/root/.config \
                                   google/cloud-sdk:slim gcloud auth activate-service-account --key-file=/tmp/key.json

                        docker tag ${IMAGE_NAME}:latest ${GCR_IMAGE_NAME}
                        docker push ${GCR_IMAGE_NAME}
                    '''
                }
            }
        }

         stage('Deploy to Cloud Run') {
            steps {
                withCredentials([file(credentialsId: 'gcp-service-account-key', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
                    bat '''
                        docker run --rm -v $GOOGLE_APPLICATION_CREDENTIALS:/tmp/key.json \
                                   -v $HOME/.config:/root/.config \
                                   google/cloud-sdk:slim sh -c "
                            gcloud auth activate-service-account --key-file=/tmp/key.json &&
                            gcloud config set project rbca-460307 &&
                            gcloud run deploy ${SERVICE_NAME} \
                                --image ${GCR_IMAGE_NAME} \
                                --platform managed \
                                --region ${REGION} \
                                --allow-unauthenticated"
                    '''
                }
            }
        }
    }
}