pipeline {
    agent any

    environment {
        NODE_OPTIONS = "--max_old_space_size=4096"
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Compatibility fix for dependency issues in older Angular
                    sh 'npm install --legacy-peer-deps'
                }
            }
        }

        stage('Build Project') {
            steps {
                script {
                    // Build Angular project (default: output to `dist/client-app-new`)
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy to /var/www') {
            steps {
                script {
                    // Clean and copy build files to Apache/Nginx public folder
                    sh 'sudo rm -rf /var/www/html/*'
                    sh 'sudo cp -r dist/* /var/www/html/'
                }
            }
        }
    }
}
