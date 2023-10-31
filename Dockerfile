FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# docker build -t triafly:1.0 .
# docker run --rm -d -p 3004:80 triafly:1.0
# docker run --rm -p 3004:80 triafly:1.0
