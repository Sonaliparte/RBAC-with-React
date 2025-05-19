pipeline {
    agent any

    environment {
        IMAGE_NAME     = 'rbac-react-app'
        CONTAINER_NAME = 'rbac-react-container'
        PORT           = '3000'
        GCR_IMAGE_NAME = 'gcr.io/rbca-460307/rbca'
        GCLOUD_PATH    = 'C:\\Users\\sonal\\AppData\\Local\\Google\\Cloud SDK\\google-cloud-sdk\\bin\\gcloud'
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
                    bat "\"%GCLOUD_PATH%\" auth activate-service-account --key-file=%GOOGLE_APPLICATION_CREDENTIALS%"
                    bat "\"%GCLOUD_PATH%\" config set project rbca-460307"
                    bat "docker tag %IMAGE_NAME%:latest %GCR_IMAGE_NAME%"
                    bat "docker push %GCR_IMAGE_NAME%"
                    bat """
                        \"%GCLOUD_PATH%\" run deploy rbac-react-service ^
                        --image %GCR_IMAGE_NAME% ^
                        --platform managed ^
                        --region us-central1 ^
                        --allow-unauthenticated
                    """
                }
            }
        }
    }
}
