---
templateKey: blog-post
title: Biocondaの入れ方
date: 2019-2-5T00:00:00.000Z
description: Biocondaの入れ方
tags:
  - python
image: /img/chemex.jpg
---

## Biocondaの入れ方

大体のバイオ系のパッケージはdefaultsのチャンネルには見つからない。

```shell
$ conda search ngmlr
```

最初に[Miniconda](https://conda.io/en/latest/miniconda.html)を入れる

そこから*config*コマンドでbiocondaのチャンネルを追加する

defaultのチャンネルよりも、conda-forgeチャンネルの方が扱っているパッケージ数が多いらしい。

```shell
$ conda config --add channnels conda-forge
$ conda config --add channnels defaults
$ conda config --add channnels r
$ conda config --add channnels bioconda
```

以上のコマンドで優先順位が下から順番になる。すなわち、最優先チャンネルがbiocondaで、最後がconda-forge。扱っている数が少ない順。

したがって、このコマンドでもいいはず。

```shell
$ conda config --append channnels conda-forge
$ conda config --add channnels r
$ conda config --add channnels bioconda
```

削除したいときは*—add*を*--remove*に、お尻に追加したいときは*—append*に。

> 現在のチャンネルの確認方法
>
> ```shell
> $ conda config --get channels
> ```
>
> システムワイドも見られるが、こっちはいじらない方がよさそう
>
> ```shell
> $ conda config --get channels --system
> ```
>
> 個人環境の方は
>
> ```shell
> $ vi ~/.condarc
> ```
>
> でも編集できる。