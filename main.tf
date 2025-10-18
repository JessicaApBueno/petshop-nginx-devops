# Define o provider Docker
terraform {
  required_providers {
    docker = {
      source = "kreuzwerker/docker"
      version = "~> 2.15.0"
    }
  }
}

provider "docker" {}

# 1. Constrói a imagem Docker baseada no Dockerfile
resource "docker_image" "petshop_app" {
  name = "petshop-static-nginx:latest"
  
  # Usa 'path' para o contexto de construção (onde está o Dockerfile)
  build {
    path = "."
  }
  
  keep_locally = true
}

# 2. Cria e executa o contêiner NGINX
resource "docker_container" "petshop_container" {
  name  = "petshop-nginx-tf-app"
  
  # Usa o atributo '.name' da imagem construída (a correção final)
  image = docker_image.petshop_app.name

  ports {
    internal = 80
    external = 8080 # Acessível em http://localhost:8080
  }

  restart = "unless-stopped"
}
