---
title: 'Fjord Calendar'
date: '2025-05-31'
author: hagiya0121
code:
  - repository: 'https://github.com/hagiya0121/fjord-calendar'
    description: ''
blog: 'https://hagi0121.hatenablog.com/entry/2025/05/31/131946'
website: 'https://fjord-calendar.jp/'
published: true
hasAudio: false
stack:
  - name: フロントエンド
    detail:
      - name: Hotwire
      - name: Tailwind CSS

  - name: バックエンド
    detail:
      - name: Ruby
        version: 3.4.4
      - name: Ruby on Rails
        version: 8.0.2

  - name: データベース
    detail:
      - name: PostgreSQL

  - name: テスト
    detail:
      - name: RSpec

  - name: Linter/Formatter
    detail:
      - name: RuboCop
        version: 1.75.6
      - name: erb_lint
        version: 0.9.0
      - name: ESLint
        version: 9.19.0
      - name: Prettier
        version: 3.4.2

  - name: CI/CD
    detail:
      - name: GitHub Actions

  - name: デプロイ
    detail:
      - name: Fly.io
---

FjordCalendar はフィヨルドブートキャンプ（以下、FBC）専用の、アドベントカレンダーアプリです。

##### 特徴
* FBC のメンバー限定で記事を投稿できます
* カレンダーの同じ日に複数人が登録可能です
* ブログ記事のリンクを Markdown 形式で出力できます

