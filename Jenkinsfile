pipeline {
    agent any

    stages {
        stage('Install NVM and Node.js v14') {
            steps {
                script {
                    // Install NVM
                    sh 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash'
                    
                    // Load nvm
                    sh 'source ~/.bashrc'
                    
                    // Install Node.js v14 using NVM
                    sh 'nvm install 14'
                    sh 'nvm use 14'
                    
                    // Verify Node.js version
                    sh 'node -v'
                    sh 'npm -v'
                }
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    // Run npm install with legacy-peer-deps flag
                    sh 'npm install --legacy-peer-deps'
                }
            }
        }
        stage('Build Angular App') {
            steps {
                script {
                    // Build the Angular app for production
                    sh 'npm run build --prod'
                }
            }
        }
        stage('Deploy to Web Server') {
            steps {
                script {
                    // Deployment commands here (e.g., rsync, scp, etc.)
                }
            }
        }
    }
}
