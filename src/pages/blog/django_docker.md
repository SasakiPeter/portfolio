---
templateKey: blog-post
title: DockerでDjango用のサーバーを構築する
date: 2019-3-25
description: DockerでDjango用のサーバーを構築する
tags:
  - Docker
  - Python
image: /img/chemex.jpg
---

## Docker



```dockerfile
FROM nginx:latest
```

* Nginxの

```mermaid
graph RL
	subgraph PC
		subgraph 仮想マシン
			Nginxコンテナ--django.webコンテナIP:8001-->WSGI
			subgraph Djangoコンテナ
				Django
				WSGI--起動-->Django
			end
		end
		Webブラウザ--localhost:8000/listenPort80-->Nginxコンテナ
	end
```



docker-compose使うときは

```
upstream django{
    server_name web:8001
}
```

みたいにして、django.webでEXPOSE 8001とかすればいいけど、



そうじゃないときは

Nginx/conf.d/default.confに

```
location / {
    proxy_pass http://hoge
}
```

みたいにしてコンテナ起動時に

```shell
$ docker run --name django.nginx --link django.web:hoge -p 8000:80 -d django.nginx
```

ってすればいいのかな？

そうでもなさそう。

```
upstream api{
    server api.com
}
```

とかって書いたら、これは

```
server {
    location / {
        proxy_pass http://api;
    }
}
```

これでupstreamの記述にアクセス、すなわちapi.comにアクセスされるということ。このserverの書き方はIP:PORTなのはいいのだが、あ、django.webコンテナのportを確認すればいいのか。

IPアドレスは`exec -it hoge bash`とかでコンテナ内から

```shell
$ hostname -i
```

ってやるか

```shell
$ docker inspect django.web | grep IP
```

とかってすれば見られそう。

Docker-composeを使う場合は、`compose up`の度に、新しくコンテナが立てられ、その度にIPアドレスが変わってしまうので、`docker-compose.yml`の中で定義したラベル？を用いて、

```
upstream hoge {
    server fuga:8001;
}

server {
    location / {
        proxy_pass http://hoge;
    }
}
```

のように書くことができる。コンテナのラベルから勝手にIPを取得できるというわけ。