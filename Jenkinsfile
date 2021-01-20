
pipeline{
    
    agent any

    parameters{
        string(name: 'DOKERHUB', defaultValue: 'Hallo Params', description: 'blasalavbla')
        boleanParam(name: 'RUNTEST', defaultValue: 'false', description: 'lalalal')
        choice(name: 'DEPLOY', choices: ["Yes", "No"], description: 'lalalal')
    }
    
    stages{

        stage("Build"){

            steps{
                echo "Halo"
            }
        }

        stage("Testing"){
            when{
                expression{
                    params.RUNTEST
                }
            }
            steps{
                echo "Halo"
            }
        }

        stage("Deploy"){
            when{
                expression{
                    params.DEPLOY == "Yes"
                }
            }
            steps{
                echo "Halo"
            }
        }
    }
}