---
title: 'Buzzcord'
date: '2022-06-17'
author: Paru871
code: 
  - repository: "https://github.com/Paru871/buzzcord"
    description: ""
blog: https://paru871.hatenablog.com/entry/buzzcord
website: https://buzzcord-fjord-jp.herokuapp.com/
published: true
stack:
  - name: フロントエンド
    detail: 
      - name: Slim
        version: 4.1.0
      - name: Ruby
        version: 3.1.0
      - name: Bootstrap
        version: 5.1.3

  - name: バックエンド
    detail:
      - name: Ruby on Rails
        version: 6.1.6
      - name: Ruby
        version: 3.1.0

  - name: ビルドツール
    detail:
      - name: Webpack
        version: 4.46.0

  - name: Linter/Formatter
    detail:
      - name: Slim-Lint
        version: 0.22.1
      - name: Rubocop
        version: 1.30.1

  - name: テスト
    detail:
      - name: RSpec
        version: 5.1.2

  - name: Discord Bot
    detail:
      - name: Discordrb
        version: 3.4.2

  - name: ミドルウェア
    detail:
      - name: puma
        version: 5.6.4

  - name: データベース
    detail:
      - name: PostgreSQL
        version: 

  - name: 認証
    detail:
      - name: OmniAuth
        version: 2.0.4

  - name: インフラ
    detail:
      - name: Heroku
        version: 

  - name: CI/CD
    detail:
      - name: GitHub Actions
        version:

---

Buzzcordは、Discord の所属サーバー内で昨日、1 番バズった発言(→ バズコード)を DiscordBot が自動で集計を行い、毎日決まった時間に第 1 位をお知らせ投稿にて紹介してくれるサービスです。
