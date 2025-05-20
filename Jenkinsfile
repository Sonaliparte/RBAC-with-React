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
                set "PATH=C:\\Program Files\\Docker\\Docker\\resources\\bin;%PATH%"
                
                REM Step 1: Activate the service account (inside container)
                docker run --rm ^
                    -v %GOOGLE_APPLICATION_CREDENTIALS%:/tmp/key.json ^
                    -v %WORKSPACE%\\.gcloud:/root/.config ^
                    google/cloud-sdk:slim gcloud auth activate-service-account --key-file=/tmp/key.json

                REM Step 2: Set project
                docker run --rm ^
                    -v %WORKSPACE%\\.gcloud:/root/.config ^
                    google/cloud-sdk:slim gcloud config set project rbca-460307

                REM Step 3: Get access token and save to file
                docker run --rm ^
                    -v %WORKSPACE%\\.gcloud:/root/.config ^
                    google/cloud-sdk:slim gcloud auth print-access-token > access.token

                REM Step 4: Use token to login to Docker host
                for /f %%t in (access.token) do docker login -u oauth2accesstoken -p %%t https://gcr.io

                REM Step 5: Tag and push from host Docker
                docker tag %IMAGE_NAME%:latest %GCR_IMAGE_NAME%
                docker push %GCR_IMAGE_NAME%
            '''
        }
    }
}



stage('Deploy to Cloud Run') {
    steps {
        withCredentials([file(credentialsId: 'gcp-service-account-key', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
            bat '''
                set "PATH=C:\\Program Files\\Docker\\Docker\\resources\\bin;%PATH%"
                
                docker run --rm ^
                    -v %GOOGLE_APPLICATION_CREDENTIALS%:/tmp/key.json ^
                    -v %WORKSPACE%\\.gcloud:/root/.config ^
                    google/cloud-sdk:slim gcloud auth activate-service-account --key-file=/tmp/key.json

                docker run --rm ^
                    -v %WORKSPACE%\\.gcloud:/root/.config ^
                    google/cloud-sdk:slim gcloud config set project rbca-460307

                docker run --rm ^
                    -v %WORKSPACE%\\.gcloud:/root/.config ^
                    google/cloud-sdk:slim gcloud run deploy rbca ^
                        --image gcr.io/rbca-460307/rbca ^
                        --platform managed ^
                        --region asia-south1 ^
                        --allow-unauthenticated
            '''
        }
    }
}
    }
    }

