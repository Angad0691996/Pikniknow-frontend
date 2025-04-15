pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                // Use Jenkins' built-in SCM checkout
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Automatically fix vulnerabilities before install
                    sh 'npm audit fix || true'
                    sh 'npm install'
                }
            }
        }

        stage('Build Project') {
            steps {
                script {
                    // Run your actual build command, like:
                    // sh 'npm run build'
                    echo "Build step - replace this with actual build logic"
                }
            }
        }

        stage('Test (Optional)') {
            steps {
                script {
                    // Add tests here if needed
                    echo "Running tests..."
                }
            }
        }

        stage('Deploy (Optional)') {
            steps {
                script {
                    echo "Deployment logic goes here"
                }
            }
        }
    }
}
