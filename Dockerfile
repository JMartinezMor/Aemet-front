FROM nginx:alpine
RUN echo "" > /usr/share/nginx/html/.placeholder
RUN find /usr/share/nginx/html -mindepth 1 -delete
COPY /.github/workflows /usr/share/nginx/html/
CMD ["nginx", "-g", "daemon off;"]
