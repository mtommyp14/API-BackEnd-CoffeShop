def dockerhub = "mtommyp14/back"
def images_name = "${dockerhub}:${BRANCH_NAME}"
def builder 

pipeline{
    
    agent any

    parameters {
        string(name: 'DOCKERHUB', defaultValue: 'Backend ID', description: 'DockerID-Backend')
        booleanParam(name: 'RUNTEST', defaultValue: 'false', description: 'Check to Runnig Test image')
        choice(name: 'DEPLOY', choices: ["main", "production"], description: 'Choice build to')
    }


    stages{

        stage("Install dependencies"){

            steps{
                nodejs("node14 back"){
                    sh 'npm install'
                }
            }
        }

        stage("Build Docker - Main"){
            when {
                expression {
                    params.DEPLOY == "main"
                }
            }
            steps{
                script{
                    builder = docker.build("${dockerhub}:${env.BRANCH_NAME}")
                }
            }
        }

        stage("Build Docker - Production"){
            when {
                expression {
                    params.DEPLOY == "production"
                }
            }
            steps{
                script{
                    builder = docker.build("${dockerhub}:${env.BRANCH_NAME}")
                }
            }
        }

        stage("Testing Image"){
            when {
                expression {
                    params.RUNTEST
                }
            }
            steps{
                script{
                    builder.inside{
                        sh 'echo passed'
                    }
                }
            }
        }

        stage("Push Image Main"){
            when {
                expression {
                    params.DEPLOY == "main"
                }
            }
            steps{
                script{
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'backend-server',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        sourceFiles: 'docker-compose.yml',
                                        remoteDirectory: 'app',
                                        execCommand: "docker pull ${images_name}; docker kill backend; docker run -d --rm --name frontendVue -p 7070:9001 ${images_name}",
                                        execTimeout: 1200000
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        }
        stage("Push Image Production"){
            when {
                expression {
                    params.DEPLOY == "production"
                }
            }
            steps{
                script{
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: 'backend-server',
                                verbose: false,
                                transfers: [
                                    sshTransfer(
                                        sourceFiles: 'docker-compose.yml',
                                        remoteDirectory: 'app',
                                        execCommand: "docker pull ${images_name}; docker kill backend; docker run -d --rm --name frontendVue -p 7070:9001 ${images_name}",
                                        execTimeout: 1200000
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        }
    }
}