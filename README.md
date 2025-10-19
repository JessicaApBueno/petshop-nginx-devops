# PetShop Nginx - Projeto de Automação DevOps

Este projeto demonstra a implementação de um fluxo de CI/CD (Integração Contínua e Entrega Contínua) para uma aplicação web estática (HTML/CSS/JS) servida pelo Nginx. O foco principal é a automação completa do processo de build e publicação de artefatos, aplicando princípios fundamentais da cultura DevOps.

[![CI - Build and Push to Docker Hub](https://github.com/JessicaApBueno/petshop-nginx-devops/actions/workflows/deploy-cd.yml/badge.svg)](https://github.com/JessicaApBueno/petshop-nginx-devops/actions)

---

## ⚙ A Aplicação da Cultura DevOps
<p align="center" ><img  alt="DevOps" height="500" width="900" src="https://i.pinimg.com/originals/eb/a0/45/eba045b39659fd0e3ceca8acb7d0beee.jpg" /></p>

A cultura DevOps busca unir desenvolvimento (Dev) e operações (Ops) para entregar software de forma mais rápida, eficiente e confiável. Este projeto aplicou essa cultura através dos seguintes pilares:

### 🤖 1. Automação (O Coração do CI/CD)

O pilar central do DevOps é a automação de tarefas manuais, repetitivas e sujeitas a erro.

* **Como foi aplicado:** Utilizamos o **GitHub Actions** para criar um pipeline de CI/CD que é acionado automaticamente a cada `push` na branch `main`. O trabalho que antes seria manual (buildar a imagem, logar no registro, enviar a imagem) agora é 100% automatizado, garantindo consistência e velocidade.

### ♾ 2. Integração e Entrega Contínua (CI/CD)

O fluxo de trabalho (`.github/workflows/deploy-cd.yml`) implementa um pipeline de CI/CD clássico:

* **Integração Contínua (CI):** A cada alteração enviada ao repositório, o workflow valida, constrói e empacota a aplicação em um contêiner Docker. Isso garante que o código novo sempre gere um "pacote" funcional e testável.
* **Entrega Contínua (CD):** Após o build bem-sucedido, o artefato gerado (a imagem Docker) é automaticamente enviado para um registro central (o **Docker Hub**). A partir dali, ela está pronta para ser implantada em qualquer ambiente (desenvolvimento, homologação, produção).

### ⚒  3. Infraestrutura como Código (IaC)

Os princípios de IaC tratam a definição da infraestrutura e dos processos com o mesmo rigor do código da aplicação: eles são versionados, testáveis e reproduzíveis.

* **Como foi aplicado:**
    * **`Dockerfile`:** Este arquivo é a "receita" da infraestrutura desta aplicação. Ele define o sistema operacional, o servidor Nginx, e como a aplicação deve ser montada. Qualquer pessoa com Docker pode recriar um ambiente idêntico e funcional em segundos.
    * **`.github/workflows/deploy-cd.yml`:** Este arquivo define o nosso pipeline de automação como código. O processo de deploy não é mais um manual secreto, mas sim um arquivo versionado no Git, transparente para toda a equipe.

### 🤝 4. Colaboração e Transparência

DevOps é, acima de tudo, sobre quebrar silos. O pipeline automatizado serve como uma fonte única de verdade.

* **Como foi aplicado:** Qualquer pessoa com acesso ao repositório no GitHub pode ir na aba "Actions" e ver o histórico completo de builds, os logs de cada etapa e o status atual da aplicação. Se um build falhar, a notificação é imediata e transparente, permitindo uma correção rápida. Acabou o "mas na minha máquina funciona".
  
<img width="1331" height="640" alt="git actions" src="https://github.com/user-attachments/assets/423dca43-2b90-4f39-ab32-c497abdc3838" />

---

## Stack de Tecnologias


* **Aplicação:** HTML / CSS / JS (Estática)
<p> <img align="center" alt="HTML" height="40" width="50" src="https://img.icons8.com/?size=100&id=CMVEhOBzk3Zp&format=png&color=000000" /> 

<img align="center" alt="CSS" height="40" width="50" src="https://img.icons8.com/?size=100&id=5cVdiiKKi0vX&format=png&color=000000" /> 

<img align="center" alt="JS" height="40" width="50" src="https://img.icons8.com/?size=100&id=V6HShIzw21x7&format=png&color=000000" />
</p>

* **Servidor Web:** Nginx <br>
<img align="center" width="40" height="50" alt="Nginx" src="https://github.com/user-attachments/assets/290fc1ca-c0f0-4027-b129-44b050212522" />

* **Contêinerização:** Docker <br>
 <img align="center" alt="Docker" height="40" width="50" src="https://github.com/user-attachments/assets/0568f6e3-9c3a-4908-ae91-699a7d7b882f" />
  

* **CI/CD:** GitHub Actions<br>
<img align="center" width="150" height="150" alt="h2jfrvzrbyh1yff2n3wfu2hkqqps6x_uvqo-removebg-preview" src="https://github.com/user-attachments/assets/8f1ccddb-ace0-43f8-a57e-29f33810066e" />

* **Registro de Imagens:** Docker Hub
<img width="150" height="150" alt="image" src="https://github.com/user-attachments/assets/05ca3957-6671-4f7d-9eb5-06ee935cb725" />

---

## Como Executar o Projeto Localmente

Qualquer desenvolvedor pode rodar uma versão idêntica à de produção em sua máquina local.

**Pré-requisitos:**
* [Git](https://git-scm.com/)
* [Docker Desktop](https://www.docker.com/products/docker-desktop/)

**Passos:**
1.  Clone o repositório:
    ```bash
    git clone [https://github.com/JessicaApBueno/petshop-nginx-devops.git](https://github.com/JessicaApBueno/petshop-nginx-devops.git)
    cd petshop-nginx-devops
    ```

2.  Construa a imagem Docker localmente:
    ```bash
    docker build -t petshop-local .
    ```

3.  Execute o contêiner:
    ```bash
    docker run --rm -p 8080:80 petshop-local
    ```

4.  Abra seu navegador e acesse `http://localhost:8080`.

---

<h1 align="center" > Cuidados Pets </h1><br>
<p>
Este projeto é um site de blog simples e informativo, criado para fornecer dicas, informações sobre raças e ferramentas úteis para donos de cães. <br> O objetivo é ser um recurso fácil de usar e visualmente agradável para quem busca conhecimento sobre o cuidado de seus animais de estimação. </p><br>
<hr>
<h1 align="center" > Funcionalidades </h1><br>
<h3 align="center"> O website oferece as seguintes seções e recursos:</h3>

  Página Inicial: Uma breve introdução e boas-vindas.  
![Captura de tela 2025-08-01 232902](https://github.com/user-attachments/assets/1f4f7c63-b5d4-4381-9554-9e2040d4e527)

 Raças de Cachorro: Uma galeria de cartões que exibem informações detalhadas sobre diferentes raças de cães. 
![Captura de tela 2025-08-01 233040](https://github.com/user-attachments/assets/8fdf4a3a-df8c-44f1-8893-93b4cb0cdd5a)

 Dicas e Cuidados: Seções expansíveis com informações sobre cuidados básicos e dicas de treinamento para cães.

![Captura de tela 2025-08-01 233354](https://github.com/user-attachments/assets/77dd195b-4936-453b-ac22-edb864449f79)

 Galeria de Imagens: Uma galeria de fotos de cães
 ![Captura de tela 2025-08-01 233243](https://github.com/user-attachments/assets/47836c46-e2f3-43ed-a18d-ebde05c39cf8)

Pesquisa de Raças: Uma ferramenta de filtragem que permite aos usuários encontrar raças de cães com base no tamanho, temperamento e nível de atividade.



https://github.com/user-attachments/assets/092bf8c0-6233-46d0-b623-aaa5bf3d4079


Conversor de Medidas: Uma ferramenta para converter medidas de volume de alimentos (xícaras, colheres de sopa) para peso (gramas, quilogramas).


https://github.com/user-attachments/assets/a71fab72-28f9-4d0e-ba6f-aab797b112a5


 Formulário de Contato: Um formulário simples para os usuários entrarem em contato. 
![Captura de tela 2025-08-01 233844](https://github.com/user-attachments/assets/f3335566-17d4-49dc-93a7-5dd165c61fd9)

<br> <br>
<hr>
