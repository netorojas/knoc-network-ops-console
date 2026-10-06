# Static site served by nginx. Build: docker build -t orbinoc . · Run: docker run --rm -p 8080:80 orbinoc
FROM nginx:1.27-alpine
COPY . /usr/share/nginx/html
RUN rm -f /usr/share/nginx/html/Dockerfile /usr/share/nginx/html/docker-compose.yml \
 && printf 'server_tokens off;\nadd_header X-Content-Type-Options nosniff always;\nadd_header Referrer-Policy strict-origin-when-cross-origin always;\n' > /etc/nginx/conf.d/security.conf
EXPOSE 80
