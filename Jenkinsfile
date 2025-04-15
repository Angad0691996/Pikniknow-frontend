pipeline {
    agent any

    environment {
        NODE_OPTIONS = "--openssl-legacy-provider"
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install the specific TypeScript version before npm install
                sh 'npm install typescript@4.8.4 --save-dev --legacy-peer-deps'
                sh 'npm install --legacy-peer-deps'
            }
        }

        stage('Build Angular App') {
            steps {
                sh 'npm run build --prod'
            }
        }

        stage('Deploy to Web Server') {
            steps {
                script {
                    def outputDir = 'dist/client-app-new'
                    sh """
                        sudo rm -rf /var/www/html/*
                        sudo cp -r ${outputDir}/* /var/www/html/
                    """
                }
            }
        }
    }
}
