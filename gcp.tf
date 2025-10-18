# Este arquivo é dedicado à infraestrutura do GCP

# Configura o provider GCP para usar sua chave de serviço
provider "google" {
  project     = "1049175473029" # SUBSTITUA PELO ID DO SEU PROJETO
  region      = "us-central1" # Região gratuita
  credentials = file("gcp_key.json") # Chave de Conta de Serviço
}

# --- Data Source: Encontra o ID da Imagem Ubuntu mais Recente ---
# Garante que o Terraform sempre use o nome de imagem Ubuntu 20.04 correto
data "google_compute_image" "ubuntu_lts" {
  family  = "ubuntu-2204-lts"
  project = "ubuntu-os-cloud" 
}

# --- RECURSO 1: Regra de Firewall para HTTP (Porta 80) ---
resource "google_compute_firewall" "http_firewall" {
  name    = "allow-http-nginx-petshop"
  network = "default" 

  allow {
    protocol = "tcp"
    ports    = ["80"]
  }
  source_ranges = ["0.0.0.0/0"] 
  target_tags = ["http-server"]
}

# --- RECURSO 2: Máquina Virtual (VM) e2-micro (Always Free Tier) ---
resource "google_compute_instance" "web_server" {
  name         = "petshop-nginx-vm"
  machine_type = "e2-micro" 
  zone         = "us-central1-a"

  # Configuração de Boot Disk
  boot_disk {
    initialize_params {
      # REFERÊNCIA CORRETA: Usa o self_link da fonte de dados encontrada (já estava certo)
      image = data.google_compute_image.ubuntu_lts.self_link
      size = 10 
    }
  }

  network_interface {
    network = "default"
    access_config {} 
  }

  tags = ["http-server"]

  # Adiciona a chave SSH de DEPLOY (github_deploy_key.pub)
  metadata = {
    ssh-keys = "ansible_user:{{ file(\"~/.ssh/github_deploy_key.pub\") }}" 
  }

  lifecycle {
    create_before_destroy = true
  }
}

# --- RECURSO 3: Saída do IP Público (Usado nas Secrets do GitHub) ---
output "external_ip" {
  value = google_compute_instance.web_server.network_interface.0.access_config.0.nat_ip
}
