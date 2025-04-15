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
                    def outputDir = 'dist/client-app-new' // Adjust this path as needed
                    sh """
                        echo "🧹 Cleaning existing /var/www/html contents"
                        sudo rm -rf /var/www/html/*
                        echo "📦 Copying new build from ${outputDir}"
                        sudo cp -r ${outputDir}/* /var/www/html/
                    """
                }
            }
        }

        stage('Post Deployment') {
            steps {
                echo "🚀 Deployment Successful! Visit: http://<your-ec2-public-ip>"
            }
        }
    }
}
