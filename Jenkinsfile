pipeline {
    agent any
    
    environment {
        IMAGE_TAG = "${BUILD_NUMBER}"
    }
    
    stages {
        stage('Build Backend') {
            steps {
                dir('medusa-api') {
                    script {
                        // Build the backend using Dockerfile
                        docker.build('medusa-api:build', '--target builder .')
                    }
                }
            }
        }
        
        stage('Build Frontend') {
            steps {
                dir('medusa-front') {
                    script {
                        // Build the frontend using Dockerfile
                        docker.build('medusa-front:build', '--target builder .')
                    }
                }
            }
        }

        stage('Build Medusa Images') {
            steps {
                script {
                    dir('medusa-api') {
                        docker.build("medusa-api:${IMAGE_TAG}", '.')
                    }
                    dir('medusa-front') {
                        docker.build("medusa-front:${IMAGE_TAG}", '.')
                    }
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            echo 'Build completed successfully!'
            echo "Images built and tagged as:"
            echo "- medusa-api:${IMAGE_TAG}"
            echo "- medusa-front:${IMAGE_TAG}"
        }
        failure {
            echo 'Build failed!'
        }
    }
}