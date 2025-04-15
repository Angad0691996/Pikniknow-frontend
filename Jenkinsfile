pipeline {
    agent any

    stages {
        stage('Install NVM and Node.js v14') {
            steps {
                script {
                    sh '''#!/bin/bash
                    # Install NVM
                    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
                    
                    # Ensure .bashrc exists
                    if [ ! -f ~/.bashrc ]; then
                        touch ~/.bashrc
                    fi
                    
                    # Add NVM init to .bashrc
                    echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.bashrc
                    echo '[ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"' >> ~/.bashrc
                    
                    # Source bashrc for current session
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"
                    
                    # Install and use Node.js v14
                    nvm install 14
                    nvm use 14
                    
                    # Verify installation
                    node -v
                    npm -v
                    '''
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''#!/bin/bash
                npm install --legacy-peer-deps
                '''
            }
        }

        stage('Build Angular App') {
            steps {
                sh '''#!/bin/bash
                npm run build --prod
                '''
            }
        }

        stage('Deploy to Web Server') {
            steps {
                sh '''#!/bin/bash
                echo "Deploying to web server..."
                # Add your deployment logic here
                '''
            }
        }
    }
}
