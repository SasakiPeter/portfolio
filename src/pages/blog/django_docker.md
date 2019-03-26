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
			Nginx
			Django
		end
		Webブラウザ--localhost:8000-->Nginx
	end
```

