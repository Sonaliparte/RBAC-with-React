pipeline {
    agent any

    environment {
        IMAGE_NAME     = 'rbac-react-app'
        GCR_IMAGE_NAME = 'gcr.io/rbca-460307/rbca'
        REGION         = 'asia-south1'
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
            withEnv(['PATH=C:\\Users\\sonal\\AppData\\Local\\Google\\Cloud SDK\\google-cloud-sdk\\bin;%PATH%']) {
                bat '''
                    set "PATH=C:\\Program Files\\Docker\\Docker\\resources\\bin;%PATH%"

                    REM Step 1: Authenticate using local gcloud
                    gcloud auth activate-service-account --key-file="%GOOGLE_APPLICATION_CREDENTIALS%"

                    REM Step 2: Set project
                    gcloud config set project rbca-460307

                    REM Step 3: Get access token and login to Docker
                    for /f %%t in ('gcloud auth print-access-token') do docker login -u oauth2accesstoken -p %%t https://gcr.io

                    REM Step 4: Tag and push image to GCR
                    docker tag %IMAGE_NAME%:latest %GCR_IMAGE_NAME%
                    docker push %GCR_IMAGE_NAME%
                '''
            }
        }
    }
}

stage('Deploy to Cloud Run') {
    steps {
        withCredentials([file(credentialsId: 'gcp-service-account-key', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
            withEnv(['PATH=C:\\Users\\sonal\\AppData\\Local\\Google\\Cloud SDK\\google-cloud-sdk\\bin;%PATH%']) {
                bat '''
                    set "PATH=C:\\Program Files\\Docker\\Docker\\resources\\bin;%PATH%"

                    REM Step 1: Authenticate with gcloud
                    gcloud auth activate-service-account --key-file="%GOOGLE_APPLICATION_CREDENTIALS%"

                    REM Step 2: Set project
                    gcloud config set project rbca-460307

                    REM Step 3: Deploy to Cloud Run
                    gcloud run deploy rbca ^
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
}