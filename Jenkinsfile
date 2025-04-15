pipeline {
    agent any

    stages {
        stage('Install NVM and Node.js v14') {
            steps {
                script {
                    // Install NVM
                    sh '''#!/bin/bash
                    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
                    '''
                    
                    // Load nvm
                    sh '''#!/bin/bash
                    source ~/.bashrc
                    '''
                    
                    // Install Node.js v14 using NVM
                    sh '''#!/bin/bash
                    nvm install 14
                    nvm use 14
                    '''
                    
                    // Verify Node.js version
                    sh '''#!/bin/bash
                    node -v
                    npm -v
                    '''
                }
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    // Run npm install with legacy-peer-deps flag
                    sh '''#!/bin/bash
                    npm install --legacy-peer-deps
                    '''
                }
            }
        }
        stage('Build Angular App') {
            steps {
                script {
                    // Build the Angular app for production
                    sh '''#!/bin/bash
                    npm run build --prod
                    '''
                }
            }
        }
        stage('Deploy to Web Server') {
            steps {
                script {
                    // Deployment commands here (e.g., rsync, scp, etc.)
                    sh '''#!/bin/bash
                    echo "Deploying app..."
                    '''
                }
            }
        }
    }
}
