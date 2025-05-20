pipeline {
    agent any

    environment {
        IMAGE_NAME     = 'rbac-react-app'
        GCR_IMAGE_NAME = 'gcr.io/rbca-460307/rbca'
        REGION         = 'us-central1'
        SERVICE_NAME   = 'rbac-react-service'
        DOCKER_PATH    = 'C:\\Program Files\\Docker\\Docker\\resources\\bin'
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
                    set "PATH=%DOCKER_PATH%;%PATH%"
                    docker --version
                    docker build -t %IMAGE_NAME% -f dockerfile .
                    echo Exit code is: %ERRORLEVEL%
                    '''
                }
            }
        }

   stage('Authenticate with GCP & Push Image') {
    steps {
        withCredentials([file(credentialsId: 'gcp-service-account-key', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
            bat '''
                docker run --rm ^
                    -v %GOOGLE_APPLICATION_CREDENTIALS%:/tmp/key.json ^
                    -v %WORKSPACE%\\.gcloud:/root/.config ^
                    google/cloud-sdk:slim gcloud auth activate-service-account --key-file=/tmp/key.json

                docker run --rm ^
                    -v %WORKSPACE%\\.gcloud:/root/.config ^
                    google/cloud-sdk:slim gcloud config set project rbca-460307

                docker run --rm ^
                    -v %WORKSPACE%\\.gcloud:/root/.config ^
                    google/cloud-sdk:slim gcloud auth configure-docker gcr.io --quiet

                docker tag rbac-react-app:latest gcr.io/rbca-460307/rbca
                docker push gcr.io/rbca-460307/rbca
            '''
        }
    }
}

stage('Deploy to Cloud Run') {
    steps {
        withCredentials([file(credentialsId: 'gcp-service-account-key', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
            bat '''
                docker run --rm ^
                    -v %GOOGLE_APPLICATION_CREDENTIALS%:/tmp/key.json ^
                    -v %WORKSPACE%\\.gcloud:/root/.config ^
                    google/cloud-sdk:slim gcloud auth activate-service-account --key-file=/tmp/key.json

                docker run --rm ^
                    -v %WORKSPACE%\\.gcloud:/root/.config ^
                    google/cloud-sdk:slim gcloud config set project rbca-460307

                docker run --rm ^
                    -v %WORKSPACE%\\.gcloud:/root/.config ^
                    google/cloud-sdk:slim gcloud run deploy rbac-react-service ^
                        --image gcr.io/rbca-460307/rbca ^
                        --platform managed ^
                        --region us-central1 ^
                        --allow-unauthenticated
            '''
        }
    }
}
    }
}

