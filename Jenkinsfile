pipeline {
    agent any  // Specify the Jenkins agent or node to run this pipeline

    stages {
        stage('Clone Repository') {
            steps {
                // Check out source code from the Git repository
                git branch: 'main', url: 'https://github.com/your-username/your-repo.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                // Install Node.js dependencies
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                // Run Playwright tests
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            // Archive the results file and reports, if generated
            archiveArtifacts artifacts: '**/test-results/*.*', allowEmptyArchive: true
            // Notify (we can include email notifications or other steps here)
            echo "Pipeline completed."
        }
    }
}