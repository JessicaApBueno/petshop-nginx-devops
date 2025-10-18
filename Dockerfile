# Usa a imagem oficial mais leve do NGINX
FROM nginx:alpine

# Remove o arquivo de configuração padrão do NGINX
RUN rm /etc/nginx/conf.d/default.conf

# Copia a configuração personalizada do NGINX
COPY ./nginx/nginx.conf /etc/nginx/conf.d/site.conf

# Copia todos os arquivos do seu projeto (HTML, CSS, JS) para o diretório de conteúdo estático do NGINX
COPY . /usr/share/nginx/html

# A porta 80 é a padrão para o HTTP
EXPOSE 80

# O comando de inicialização é o padrão do NGINX
CMD ["nginx", "-g", "daemon off;"]
