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
                    // Adjust if your output folder is dist/<app-name>
                    def outputDir = 'dist/client-app-new'

                    // Clean and deploy to /var/www/html/
                    sh """
                        sudo rm -rf /var/www/html/*
                        sudo cp -r ${outputDir}/* /var/www/html/
                    """
                }
            }
        }
    }
}
