---
title: 'StamPon'
date: '2021-11-24'
author: kaiyu-tech
code:
  - repository: 'https://github.com/kaiyu-tech/stampon'
    description: ''
blog: https://kaiyu-tech.hatenablog.com/entry/2022/01/07/205825
website:
published: true
hasAudio: true
stack:
  - name: フロントエンド
    detail:
      - name: Vue.js
        version: 2.6.14
      - name: Vuetify
        version: 2.5.14
      - name: Slim
        version: 4.1.0
      - name: Ruby
        version: 3.0.2

  - name: バックエンド
    detail:
      - name: Ruby
        version: 3.0.2
      - name: Ruby on Rails
        version: 6.1.4.1

  - name: アプリケーションサーバ
    detail:
      - name: Puma
        version: 5.5.2

  - name: Linter/Formatter
    detail:
      - name: ESLint
        version: 8.2.0
      - name: Prettier
        version: 2.4.1
      - name: RuboCop
        version: 1.22.3

  - name: テスト
    detail:
      - name: minitest
        version: 5.14.4

  - name: Discord Bot
    detail:
      - name: discord.js
        version:
      - name: Discord
        version:

  - name: データベース
    detail:
      - name: PostgreSQL
        version: '13.4'

  - name: インフラ
    detail:
      - name: Railway
        version:

  - name: CI/CD
    detail:
      - name: GitHub Actions
        version:
---

すたんぽんは、Discord の発言をブックマークするサービスです。 ブックマークしたい発言に「気になる」か「👀」スタンプを押すことで自動登録します。 Web 上に自分のブックマーク管理サイトを持ち、絞り込み検索や削除することが出来ます。
