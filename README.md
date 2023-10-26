# Poketto AI

## config

### database

1. 确保 remote mongodb 数据库连接（打开防火墙27017端口）（或本地）
2. 初始化数据库
```shell
bash -c '
cd scripts
yarn
'
npx tsx scripts/init-flowgpt-data.ts
# 这步需要
# 1. install `pgvector`
#    - ubuntu: `sudo apt install postgresql-14-pgvector` # support 14/15
#    - mac: `brew install pgvector` # only supports 14
# 2. 确保 OPENAI_KEY 正常
npx tsx scripts/init-pg-vector.ts 
```

### nginx

```shell
server {
  # listen on *:443 -> ssl; instead of *:80
  listen 443 ssl;

  server_name poketto.cs-magic.cn;

  ssl_certificate /etc/letsencrypt/live/cs-magic.cn-0002/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/cs-magic.cn-0002/privkey.pem;
  include snippets/ssl-params.conf;

  set $backend_port 2001;

  location / {
    # reverse proxy for next server
    proxy_pass http://localhost:30817;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;

    # 这里很关键，用于 sse 的（不加的话国内服务器就没有stream了，国外服务器有，这点也不知道为什么）
    # 参考：https://stackoverflow.com/a/13673298/9422455
    chunked_transfer_encoding off;
    proxy_buffering off;
    proxy_cache off;

    # we need to remove this 404 handling
    # because next's _next folder and own handling
    # try_files $uri $uri/ =404;
  }
  location ~ /.well-known {
    allow all;
  }
}
```

## todo

### bug

- [ ] 关于邮箱与`next-auth-url`不同时的表现：
    - button、callback_url等都是next-auth-url，login_url则是请求地址
    - 如果是https，则地址不对时，sendVerificationRequest函数无法触发
- [ ] 关于 https build 下 streaming 失败的问题
    - 只build（或者不build），不用 https，测试可
    - build，则用 https，则不可

## ref

- powered by [T3 Stack](https://create.t3.gg/).
