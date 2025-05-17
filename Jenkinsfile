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
                @echo off
                for /f "tokens=* delims=" %%i in ('docker ps -a --format "{{.Names}}" ^| findstr /R /C:"^%CONTAINER_NAME%$"') do (
                    echo [CLEAN] Stopping %%i ...
                    docker stop %%i  2>NUL
                    docker rm   %%i  2>NUL
                )
                '''
            }
        }

stage('Run new container') {
    when {
        expression {
            return true  // temporarily force this stage to run
        }
    }
    steps {
        bat '''
            docker run -d -p 3000:80 --name rbac-react-container rbac-react-app
        '''
    }
}

    post {
        success {
            echo "✅  Visit your app at http://localhost:${PORT}"
        }
        failure {
            echo "❌  Build failed – check the log."
        }
    }
}
