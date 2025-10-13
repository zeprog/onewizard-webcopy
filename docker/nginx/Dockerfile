
      FROM nginx

COPY ./*.conf               /etc/nginx/
COPY ./sites-enabled/*.conf /etc/nginx/sites-enabled/

WORKDIR /srv/www

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
      