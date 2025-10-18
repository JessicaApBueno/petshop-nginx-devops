# Este arquivo é dedicado à infraestrutura do GCP

# Configura o provider GCP para usar sua chave de serviço
provider "google" {
  project     = "1049175473029" # SUBSTITUA PELO ID DO SEU PROJETO
  region      = "us-central1" # Região gratuita
  credentials = file("gcp_key.json") # Chave de Conta de Serviço
}

# --- RECURSO 1: Regra de Firewall (Permite HTTP/80) ---
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

# --- RECURSO 2: Máquina Virtual (VM) e2-micro ---
resource "google_compute_instance" "web_server" {
  name         = "petshop-nginx-vm"
  machine_type = "e2-micro" 
  zone         = "us-central1-a"

  boot_disk {
    initialize_params {
      image = "ubuntu-os-cloud/ubuntu-2004-lts"
      size = 10
    }
  }

  network_interface {
    network = "default"
    access_config {}
  }

  tags = ["http-server"]

  # CRUCIAL: Adiciona a chave SSH de DEPLOY (github_deploy_key.pub)
  metadata = {
    ssh-keys = "ansible_user:{{ file(\"~/.ssh/github_deploy_key.pub\") }}" 
  }

  lifecycle {
    create_before_destroy = true
  }
}

# --- RECURSO 3: Saída do IP Público (Usado nas Secrets) ---
output "external_ip" {
  value = google_compute_instance.web_server.network_interface.0.access_config.0.nat_ip
}
