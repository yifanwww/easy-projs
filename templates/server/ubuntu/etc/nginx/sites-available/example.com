server {
    listen  [::]:443 ssl ipv6only=on;
    listen       443 ssl;
    server_name  www.example.com;

    ssl_certificate      /etc/letsencrypt/live/www.example.com/fullchain.pem;
    ssl_certificate_key  /etc/letsencrypt/live/www.example.com/privkey.pem;

    include      /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam  /etc/letsencrypt/ssl-dhparams.pem;

    root   /var/www/example.com/webapp;
    index  index.html;

    location / {
        try_files $uri /index.html;
    }

    location /apis {
        proxy_pass          http://localhost:3000;
        proxy_http_version  1.1;
        proxy_set_header    Upgrade $http_upgrade;
        proxy_set_header    Connection 'upgrade';
        proxy_set_header    Host $host;
        proxy_cache_bypass  $http_upgrade;
    }
}

server {
    if ($host = www.example.com) {
        return 301 https://$host$request_uri;
    }

    listen  [::]:80;
    listen       80;
    server_name  www.example.com;

    return 404;
}
