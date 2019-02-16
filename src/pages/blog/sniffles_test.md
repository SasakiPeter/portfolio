---
templateKey: blog-post
title: Snifflesにかける
date: 2019-2-8
description: samtoolsで.samを.bamに変換してSnifflesにかけSV検出
tags:
  - Bioinfomatics
image: /img/chemex.jpg
---

## samtools

### Installation

#### Linux

```shell
$ git clone git://github.com/samtools/samtools.git 
$ make
```

もしくは

```shell
$ wget https://sourceforge.net/projects/samtools/files/samtools/1.0/samtools-bcftools-htslib-1.0_x64-linux.tar.bz2/download
```

かな

#### Bioconda

conda-forgeチャンネルが優先されていない環境でインストールすると`libcrypto.so.1.0.0`がないとエラーが出る。

```shell
dyld: Library not loaded: @rpath/libcrypto.1.0.0.dylib
  Referenced from: /Users/sasakipeter/miniconda3/bin/samtools
  Reason: image not found
```

```shell
$ conda config --get channels
--add channels 'r'   # lowest priority
--add channels 'defaults'
--add channels 'bioconda'
--add channels 'conda-forge'   # highest priority
$ conda install samtools 
```

> 使うかもしれなかったコマンド
>
> ```shell
> $ conda update -n base -c defaults conda
> $ ldd $(which samtools)
> $ otool -L $(which samtools)
> $ cd ~/miniconda3/envs/genome/lib
> $ ln -s libcrypto.so.1.1 libcrypto.so.1.0.0
> $ brew install openssl
> $ ln -s /usr/local/opt/openssl/lib/libcrypto.1.0.0.dylib /usr/local/lib/
> $ ln -s /usr/local/opt/openssl/lib/libssl.1.0.0.dylib /usr/local/lib/
> ```

他のライブラリを入れて、samtoolsが動かなくなったら、以下のコマンドでだいたいうまくいく

```shell
$ conda update --all
```

[参考](http://yfuruta.sakura.ne.jp/blog/?p=884)

### Execution

```shell
$ samtools view -Sb test.sam > test.bam
```

sortしてからSVをコールしたほうがいいのかな？

[参考](http://kazumaxneo.hatenablog.com/entry/2018/04/21/124950)

samtoolsの使い方についての記述を要調査。

## Sniffles

### Execution

```shell
$ sniffles -s 10 -m test.bam -v output.vcf
```

データが少なすぎると警告が出る模様。

