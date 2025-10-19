

# Configura o provider GCP para usar sua chave de serviço
provider "google" {
  project     = "1049175473029" # SUBSTITUA PELO ID DO SEU PROJETO
  region      = "us-central1" # Região gratuita
  credentials = file("gcp_key.json") # Chave de Conta de Serviço
}

# --- Data Source: Encontra o ID da Imagem Ubuntu mais Recente ---
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

# --- RECURSO 2: Regra de Firewall para SSH (Porta 22) ---
resource "google_compute_firewall" "ssh_firewall" {
  name    = "allow-ssh-petshop"
  network = "default" 

  allow {
    protocol = "tcp"
    ports    = ["22"] # Permite o tráfego SSH
  }

  source_ranges = ["0.0.0.0/0"] # Permite acesso de qualquer IP para SSH
  target_tags = ["http-server"] # Aplica a regra na sua VM
}

# Firewall para permitir conexão SSH apenas pelo Google IAP
resource "google_compute_firewall" "allow_iap_ssh" {
  name    = "allow-iap-ssh"
  network = "default" # Ou o nome da sua rede VPC

  # Permite tráfego de entrada (ingress)
  direction = "INGRESS"

  allow {
    protocol = "tcp"
    ports    = ["22"]
  }

  # IMPORTANTE: Este é o intervalo de IPs que o serviço IAP do Google usa
  source_ranges = ["35.235.240.0/20"]

  # Aplica esta regra a qualquer VM com a tag que definimos
  target_tags = ["allow-ssh-via-iap"]
}
# --- RECURSO 3: Máquina Virtual (VM) e2-micro (Always Free Tier) ---
resource "google_compute_instance" "web_server" {
  name         = "petshop-nginx-vm"
  machine_type = "e2-micro"
  zone         = "us-central1-a"

  # Configuração de Boot Disk
  boot_disk {
    initialize_params {
      image = data.google_compute_image.ubuntu_lts.self_link
      size = 10 
    }
  }

  network_interface {
    network = "default"
    access_config {} 
  }

  tags = ["http-server", "allow-ssh-via-iap"]

  # AUTENTICAÇÃO VIA GCP IDENTITY (Removemos a injeção manual de SSH)
  service_account {
    # SUBSTITUA PELO SEU E-MAIL DA CONTA DE SERVIÇO
    email  ="1049175473029-compute@developer.gserviceaccount.com" 
    scopes = ["cloud-platform"]
  }

  lifecycle {
    create_before_destroy = true
  }
}

# --- RECURSO 4: Saída do IP Público ---
output "external_ip" {
  value = google_compute_instance.web_server.network_interface.0.access_config.0.nat_ip
}
