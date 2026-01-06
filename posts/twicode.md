---
title: 'TwiCode'
date: '2021-11-24'
author: yana-gi
code: 
  - repository: "https://github.com/yana-gi/twicode"
    description: ""
blog: https://yana-g.hatenablog.com/entry/2021/12/20/112148
website: 
published: true
hasAudio: true
stack:
  - name: フロントエンド
    detail: 
      - name: Ruby
        version: 3.0.2
      - name: Slim
        version: 4.1.0
      - name: JavaScript
        version:
 
  - name: バックエンド
    detail: 
      - name: Ruby
        version: 3.0.2
      - name: Ruby on Rails
        version: 6.1.4

  - name: Linter/Formatter
    detail:
      - name: ESLint
        version: 7.32.0
      - name: Prettier
        version: 2.4.0
      - name: Rubocop
        version: 1.22.1
  
  - name: ビルドツール
    detail:
      - name: Webpack
        version: 4.46.0

  - name: テスト
    detail:
      - name: RSpec
        version: 5.0.2

  - name: API連携
    detail:
      - name: Twitter API
        version: 
 
  - name: インフラ
    detail:
      - name: Heroku
        version: 
      - name: Amazon S3
        version: 

  - name: CI/CD
    detail:
      - name: GitHub Actions
        version: 
---

TwiCodeは、Twitterでちょっとしたソースコードを共有したい人のためのソースコード画像作成サービスです。

TwiCodeでコードを入力すると、ソースコード画像とURLを生成します。URLをツイートすることでTwitterカードに画像を表示します。

従来のようにコードをテキストで投稿するよりも読みやすく、画像で投稿する時と違ってURLからコードがコピーできることが特徴です。
