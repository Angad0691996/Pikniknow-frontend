pipeline {
    agent any

    environment {
        DEPLOY_DIR = "/var/www/pikniknow"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/Angad0691996/Pikniknow-frontend.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('Pikniknow-frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('Pikniknow-frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy to NGINX') {
            steps {
                sh '''
                sudo mkdir -p ${DEPLOY_DIR}
                sudo cp -r Pikniknow-frontend/build/* ${DEPLOY_DIR}/

                sudo tee /etc/nginx/sites-available/pikniknow <<EOF
                server {
                    listen 80;
                    root ${DEPLOY_DIR};
                    index index.html index.htm;

                    server_name _;

                    location / {
                        try_files \$uri /index.html;
                    }
                }
                EOF

                sudo ln -sf /etc/nginx/sites-available/pikniknow /etc/nginx/sites-enabled/default
                sudo nginx -t && sudo systemctl restart nginx
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Frontend deployed successfully!"
        }
        failure {
            echo "❌ Deployment failed!"
        }
    }
}
