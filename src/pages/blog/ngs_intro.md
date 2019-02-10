---
templateKey: blog-post
title: 次世代シーケンサについて調べてみた
date: 2019-2-10
description: これから次世代シーケンサーのデータ解析を行うにあたって調査。
tags:
  - Bioinfomatics
image: /img/chemex.jpg
---

## Windows上でUbuntu環境を構築する

### 仮想化ソフト

* VMware Player
* VirtualBox

## Bio-Linux

FastQC, Picard→NGSデータのクオリティコントロール、フィルタリング

Abyss, Velvet→アセンブル

Bowtie2、BWA→マッピング

Cufflinks→遺伝子構造推定

MEME→モチーフ解析

MAFFT, T-Coffee→多重配列アラインメント

WebLogo→seaquence logsの実行

Cytoscape→ネットワーク解析

blast2→BLAST実行

マイクロアレイデータは数値

RNA-seqデータは塩基配列

ReCountというDBがいいらしい？

ArrayExpressという公共DBがあるらしい。



DDBJ Read Annotation Pipelineってなんぞ？



乳酸菌ゲノムはすでに解読済みで、Ensembleという公共DBから取得できる。



## 第二回

乳酸菌の配列

```shell
$ wget ftp://ftp.ensemblgenomes.org/pub/bacteria/release-42/fasta/bacteria_15_collection/lactobacillus_casei_12a/dna/Lactobacillus_casei_12a.ASM30956v2.dna.toplevel.fa.gz -O Lactobacillus_toplevel.fa.gz;gunzip Lactobacillus_toplevel.fa.gz 
```

[EnsembleBacteria](https://bacteria.ensembl.org/)

[Ensemble](https://www.ensembl.org/info/about/species.html)

```shell
$ grep -c ">" Lactobacillus_toplevel.fa
```

## 第三回

### VirtualBox, BioLinux前提

```shell
$ time wget ftp://ftp.ensemblgenomes.org/
pub/bacteria/release-22/fasta/bacteria_15_collection/
lactobacillus_casei_12a/dna/Lactobacillus_casei_12a.
GCA_000309565.1.22.dna.toplevel.fa.gz
```



チェックサム(check sum)→ダウンロードしたファイルが提供元と同一であるかチェックする方法

`sum`コマンドで値が取れる。

### .gz

#### 解凍

```shell
$ gzip -d hoge.fa.gz
```

> `-d`オプションはdecompressの略

#### 圧縮

```shell
$ gzip hoge.fa
```

### 膨大な容量の配列ファイル(.fasta, .fastq)に対して

#### コンティグ数確認

##### FASTA形式の場合

```shell
$ grep -c ">" hoge.fa
```

##### FASTQ形式の場合

```shell
$ grep -c "@" hoge.fastq
```

#### ファイル内確認

`head`,`tail`,`more`,`less`

```shell
$ head -n 5 Lactobacillus_toplevel.fa
$ tail -n 5 Lactobacillus_toplevel.fa
```

> `-n`オプションは行数を指定できる。
>
> デフォルトで10行。

##### 応用

1001 ~ 1010行あたりをみる。

```shell
$ head -n 1010 Lactobacillus_toplevel.fa | tail -n 10
```

#### 行数確認

```shell
$ wc Lactobacillus_toplevel.fa
48466   48469 2956433 Lactobacillus_toplevel.fa
```

> 出力は行数、単語数、バイト数

#### ディクス容量確認

`df`,`du`

```shell
$ df /Users
```

`du`コマンドはめっちゃ細かい

#### サブセット作成

容量大きいファイルをいきなり解析にかけることはなく、`head`コマンドとリダイレクトを利用してサブセットを作成するのが一般的。

この間使用したのは`seqtk`。

`seqkit`というのもあり、こちらの方がメモリ使用量小さいらしい。

サブセットを作り、プレ解析を行う目的は、動作確認と、本番データ実行時の実行時間の目安とするため。サブセットで目安を建てたら、作成したファイルを消すのが一般的らしい。ファイルが大きいので。

今知ったが、`|`の使用目的は中間ファイルの作成を避けるためだったのか。

### 公共NGS用DB

#### 三代DB

1. SRA
   * もっともデータ総量が多い。
   * sra形式
   * 最初の検索に利用し、目的のデータセットを同定

2. [DRA](https://www.ddbj.nig.ac.jp/dra/index.html)
   * FATSTQ形式のbzip2圧縮ファイルをダウンロード

3. [ENA](https://www.ebi.ac.uk/ena/)
   * FATSTQ形式のgzip圧縮ファイル
   * 目的のデータセットの全体像(IDの対応関係)を俯瞰

DDBJによる解説記事を参考にするといいらしい。

#### 乳酸菌データによるテスト

`Lactobacillus casei`で検索。

例えば、ENAで検索して、Run accession番号が[SRR616269](https://www.ebi.ac.uk/ena/data/view/SRR616269)であるページから、Experiment accession番号[SRX204227](https://www.ebi.ac.uk/ena/data/view/SRX204227)に飛ぶと、Illumina HiSeq 2000で取得したcDNAのペアエンドのリードだとわかるらしい。ペアエンドは5'と3'末端両側からシークエンスする方法でシングルエンドは片側かららしい。その利点とかはもっと調べないとよくわからなかった。

そしてENAで見つけた[SRR616268](https://www.ebi.ac.uk/ena/data/view/SRR616268)をもとにDRAで検索し、同じRun accessionを見つけると[このページ](http://ddbj.nig.ac.jp/DRASearch/run?acc=SRR616268)にたどり着く。このページからもわかるように、この研究はSRP017156というIDで行われているので、データを落とす用のフォルダを以下のように作成する。

```shell
$ mkdir srp017156
```

分割されたファイルの容量がそれぞれ7.1GBと6.5GBで大きすぎる。

```shell
$ wget ftp://ftp.ddbj.nig.ac.jp/ddbj_database/dra/fastq/SRA061/SRA061483/SRX204226/SRR616268.fastq.bz2
$ bzip2 -d SRR616268.fastq.bz2
```

> `bzip2`コマンドは`-c`オプションにより、解凍したファイルを作成せずに中の情報を取り出すこともできる。
>
> ```shell
> $ bzip2 -dc SRR616268.fastq.bz2 | wc
> ```
>
> こうすると、解凍せずに行数を見ることができる。

FASTQ形式ファイルは1リードの情報を４行で記述するという決まりがあるらしい。
あと、４行目は１文字表記のクオリティスコアが表記されているらしい。正直みてもわからんので解釈のために調べる必要がある。

```shell
$ grep -c "@" SRR616268.fastq
```

このファイルの場合は281964リードあることが確かめられる。

中間ファイルを作成せずにサブセット作成までしてしまう方法。

```shell
$ bzip2 -dc SRR616268.fastq.bz2| head -n 10000 > subset_1.fastq
```

10000行抽出しているので、2500リードに相当する。

## 第４回

### NGSの流れ

1. データ取得
2. クオリティコントロール　←今ここ
3. アセンブル、マッピング
4. 数値解析

FastQCでクオリティコントロールを行う。



アダプター配列除去

### データ取得

必要なコマンドをまとめたスクリプトを作成する。

```shell
$ touch SRR616268.sh
$ vi SRR616268.sh
```

そして以下のコマンドを書き込む

```shell
$ wget ftp://ftp.ddbj.nig.ac.jp/ddbj_database/dra/fastq/SRA061/SRA061483/SRX204226/SRR616268_1.fastq.bz2; bzip2 -dc SRR616268_1.fastq.bz2| head -n 400000 > subset_1.fastq
$ wget ftp://ftp.ddbj.nig.ac.jp/ddbj_database/dra/fastq/SRA061/SRA061483/SRX204226/SRR616268_2.fastq.bz2; bzip2 -dc SRR616268_2.fastq.bz2| head -n 400000 > subset_2.fastq
```

権限を変更する

```shell
$ chmod 755 SRR616268.sh
-rwxr-xr-x
```

> 実行権限について
>
> * Read →４
> * Write →２
> * Execute →１
>
> の合計値
>
> 左からUser, Group, Other
>
> 局所的に権限をいじる場合は以下のコマンドが有効
>
> ```shell
> $ chmod g+r hoge # グループに読みとり許可
> $ chmod o-w hoge　# その他の書き込み拒否
> ```

そして実行

```shell
$ time ./SRR616268.sh

```

### クオリティコントロール（QC）

#### 目的

* 全体的な精度チェック
* クオリティの低いリードのフィルタリング
* リードに含まれるアダプター配列やクオリティの低い部分配列の除去（トリミング）

FastQCを用いる

#### FastQCインストール

##### Linux

```shell
$ wget https://www.bioinformatics.babraham.ac.uk/projects/fastqc/fastqc_v0.11.8.zip | unzip ;rm fastqc_v0.11.8.zip
```

##### Bioconda

```shell
$ conda install fastqc
```

これすると、`samtools`が再び使えなくなるので困る。

#### 実行

```shell
$ fastqc hoge.fastq
```

出力はhtmlレポートになる。

#### レポートの見方

黄色の箱ひげ図でポジションごとのリードのスコアが分布されている。リードのクオリティスコアが平均的にどうなっているかが重要。ほとんどのポジションでスコア分布が20以上になっているかどうか。スコア20は100回中１回エラーが起こる確率に相当するらしい。

$$
\begin{align*}
score = -10\log (p_err)
\end{align*}
$$
前回作ったよくわからんファイル見たらクオリティスコアめちゃくちゃ悪かった。よくわからんが。

今回の`subset_1.fastq`というファイルの結果はクオリティスコアは良好だが、**Overrepresented sequence**つまり、頻出配列の中にアダプター配列が３種類見つかった。

`TruSeq Adapter, Index 3 (100% over 50bp)`こんな感じの名前で。

50塩基対以上で構成されるアダプター配列

さらに、基礎解析の欄から、107塩基対のリードだとわかる。

 `TruSeq Adapter, Index 3 (100% over 50bp)`

```shell
$ grep -c "GATCGGAAGAGCACACGTCTGAACTCCAGTCACTTAGGCATCTCGTATGC" subset_1.fastq
294
```

>  fastqcレポートでは262リード

`TruSeq Adapter, Index 2 (100% over 50bp)`

```shell
$ grep -c "GATCGGAAGAGCACACGTCTGAACTCCAGTCACCGATGTATCTCGTATGC" subset_1.fastq
288
```

> fastqcレポートでは153リード

`TruSeq Adapter, Index 2 (100% over 49bp)`

```shell
$ grep -c "AGATCGGAAGAGCACACGTCTGAACTCCAGTCACCGATGTATCTCGTATG" subset_1.fastq
135
```

> fatsqcレポートでは127リード

#### アダプター配列の除去

##### FASTX-toolkitのインストール

###### Linux

```shell
$ wget https://github.com/agordon/fastx_toolkit/releases/download/0.0.14/fastx_toolkit-0.0.14.tar.bz2 | bzip2 -dc | tar xvf
```

###### Bioconda

```shell
$ conda install fastx_toolkit
```

##### 実行

```shell
$ time fastx_clipper \
-a 配列\
-i 入力\
-o hoge1.fastq
```

 `TruSeq Adapter, Index 3 (100% over 50bp)`

```shell
$ time fastx_clipper \
-a "GATCGGAAGAGCACACGTCTGAACTCCAGTCACTTAGGCATCTCGTATGC" \
-i subset_1.fastq \
-o hoge1.fastq

fastx_clipper -a "GATCGGAAGAGCACACGTCTGAACTCCAGTCACTTAGGCATCTCGTATGC" -i  -o   21.58s user 0.54s system 93% cpu 23.542 total
```

```shell
$ wc hoge1.fastq
391512  783024 28271228 hoge1.fastq
```

```shell
$ grep -c "@" hoge1.fastq
97878
```

2122リードがなくなっている。

１リード107bpで50bpの配列を削除したから、1リードに一つアダプター配列が入っていれば、総リード数は変わらないはず。すなわち、全てアダプター配列であるリードが存在している?

```shell
$ fastqc -q hoge1.fastq; o hoge1_fastqc.html
```

最短で5bpのリードがあることが判明。

```shell
$ fastx_clipper -h
usage: fastx_clipper [-h] [-a ADAPTER] [-D] [-l N] [-n] [-d N] [-c] [-C] [-o] [-v] [-z] [-i INFILE] [-o OUTFILE]
Part of FASTX Toolkit 0.0.14 by A. Gordon (assafgordon@gmail.com)

   [-h]         = This helpful help screen.
   [-a ADAPTER] = ADAPTER string. default is CCTTAAGG (dummy adapter).
   [-l N]       = discard sequences shorter than N nucleotides. default is 5.
   [-d N]       = Keep the adapter and N bases after it.
                  (using '-d 0' is the same as not using '-d' at all. which is the default).
   [-c]         = Discard non-clipped sequences (i.e. - keep only sequences which contained the adapter).
   [-C]         = Discard clipped sequences (i.e. - keep only sequences which did not contained the adapter).
   [-k]         = Report Adapter-Only sequences.
   [-n]         = keep sequences with unknown (N) nucleotides. default is to discard such sequences.
   [-v]         = Verbose - report number of sequences.
                  If [-o] is specified,  report will be printed to STDOUT.
                  If [-o] is not specified (and output goes to STDOUT),
                  report will be printed to STDERR.
   [-z]         = Compress output with GZIP.
   [-D]	 = DEBUG output.
   [-M N]       = require minimum adapter alignment length of N.
                  If less than N nucleotides aligned with the adapter - don't clip it.   [-i INFILE]  = FASTA/Q input file. default is STDIN.
   [-o OUTFILE] = FASTA/Q output file. default is STDOUT.
```

アダプターだけの配列を調べる

```shell
$ fastx_clipper \
-k \
-a "GATCGGAAGAGCACACGTCTGAACTCCAGTCACTTAGGCATCTCGTATGC" \
-i subset_1.fastq \
-o hoge2.fastq ; grep -c "@" hoge2.fastq

871
```

-n`オプションでunknownヌクレオチドも表示させ、さらに5bp未満も表示させる。

```shell
$ fastx_clipper \
-n \
-l 0 \
-a "GATCGGAAGAGCACACGTCTGAACTCCAGTCACTTAGGCATCTCGTATGC" \
-i subset_1.fastq \
-o hoge3.fastq ; grep -c "@" hoge3.fastq

99129
```

これで全て洗えた。改めて、QCを見てみる。

```shell
$ fastqc -q hoge3.fastq; o hoge3_fastqc.html
```

Aしかないリードが194個もあるとか言ってる。

#### 検証

 `TruSeq Adapter, Index 3 (100% over 50bp)`

fastqcレポートでは262リード

```shell
$ grep -c "GATCGGAAGAGCACACGTCTGAACTCCAGTCACTTAGGCATCTCGTATGC" subset_1.fastq
294
```

```shell
$ grep -c "^GATCGGAAGAGCACACGTCTGAACTCCAGTCACTTAGGCATCTCGTATGC" subset_1.fastq
262
```

正規表現で行頭から検索すると、レポートの数と一致する。ファイルに書き出してみる。

```shell
$ grep "^GATCGGAAGAGCACACGTCTGAACTCCAGTCACTTAGGCATCTCGTATGC" subset_1.fastq > age.txt
$ less age.txt
```

なるほど。どこかに含む場合はどうか。

```shell
$ grep "GATCGGAAGAGCACACGTCTGAACTCCAGTCACTTAGGCATCTCGTATGC" subset_1.fastq | grep -v "^GATCGGAAGAGCACACGTCTGAACTCCAGTCACTTAGGCATCTCGTATGC" > uge1.txt
```

> `grep`の`-v`オプションは含まないものを抽出

```shell
$ less -N uge1.txt
```

> less起動中は`/`で検索、`n`で次の検索、`N`で前の検索を選択できる。
>
> `-N`オプションは行番号を表示するやつ。

`TruSeq Adapter, Index 3 (100% over 50bp)`というアダプターは[ここ](TruSeq Adapter, Index 3 (100% over 50bp))にあるように63bpの配列ということがわかる。それで、こういう奴をインデックス配列というらしい。

### Python

主要なパッケージ

* cutadapt →アダプター配列除去
* HTSeq →マップされたリードのカウント
* PySam →HTSeqが内部的に使用
* hgvs →ヒトゲノムの多型や変異を扱う

## 第５回

### FaQCs

アダプター除去兼クオリティフィルタリング

#### インストール

```shell
$ conda install 
```

### サブセットファイルの圧縮

.gz形式に圧縮する

```shell
$ gzip subset_1.fastq
```

> 解凍は
>
> ```shell
> $ gzip -d subset_1.fastq.gz
> ```
>
> もしくは
>
> ```shell
> $ gunzip subset_1.fastq.gz
> ```
>
> 

### ゲノムアセンブリ周辺

NGSデータに含まれている、アダプターやプライマー配列などの解析サンプル由来以外の塩基配列を除去する。

シーケンサーにかける際に、PCRで増幅するものと思われるが、その時にプライマーを混ぜるので、シーケンスの結果にもプライマーが混入するものと思われる。その除去。

アダプター配列とは、NGSにおいて、サンプルを調整する際に、最初にDNAを断片化するが、その断片化された配列の両末端にくっつける（ライゲーション）配列。そして、ブリッジPCRなどの方法で増幅する。

プライマーは、すでにある配列にアニーリングさせ、挟み込まれた領域を増幅させるのに使うが、アダプター配列は、ライゲーションさせることにより、元の配列からロス？が発生しない、ということだと思う。それだけじゃなく、プライマーはすでに配列がわかっていないと、アニーリングできないけど、アダプター配列ならOKということか。

[参考](https://www.cosmobio.co.jp/support/technology/a/next-generation-sequencing-introduction-apb.asp)

シーケンスエラーを含むリードの除去のひとつに*k*-mer出現頻度に基づくフィルタリングがあるらしい。そのプログラムはQuakeというのが初出らしい。

#### カバレッジ

カバレッジとは正解となる？リファレンス配列のデータ量に対して、その何倍量のリードを読まないといけないかを示す。

単純に考えて、カバレッジが少ないほどに、一つのリードが長く、たくさん読む必要がないということになると思われる。

約３GBからなるヒトゲノム配列決定時（ヒトゲノムプロジェクトでわかったリファレンス配列）に、その10倍程度（約30GB）読んでアセンブルされたらしい。

リード長が100bp未満だと100Xくらい読む必要がある。

ゲノムの場合は、どの領域でも概ねカバレッジが一定している。

#### *k*-mer

リードの長さよりも短い任意の長さ*k*の連続塩基のこと。

シーケンスエラーを含む*k*-merは想定カバレッジよりも非常に少ない出現回数となる。例えば、リード長が107bpで、カバレッジが100Xくらいだとした時に、63bpのエラー配列は...?いや、よくわからない。

とにかく、*k*-merは出現頻度が低く、そのエラー配列を取り除くことでフィルタリングできる。

#### LOOC260

* PacBio RS II
  平均4kbp長の163,376リードからHGAPでアセンブル
  ７コンティグを取得
* Illumina MiSeq
  ペアエンド、250bp
