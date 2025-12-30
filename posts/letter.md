---
title: 'letter'
date: '2025-07-11'
author: riq0h
code:
  - repository: 'https://github.com/riq0h/letter'
    description: ''
blog: 'https://riq0h.jp/2025/07/11/163822/'
published: true
stack:
  - name: フロントエンド
    detail:
      - name: Hotwire
      - name: Tailwind CSS

  - name: バックエンド
    detail:
      - name: Ruby on Rails
        version: 8
      - name: Solid Queue
      - name: Solid Cable
      - name: Solid Cache

  - name: データベース
    detail:
      - name: SQLite

  - name: Linter/Formatter
    detail:
      - name: RuboCop
      - name: ESLint
      - name: Prettier

  - name: インフラ
    detail:
      - name: Docker
---

letter は Rails8 および SQLite、Hotwire で構成されるミニマルな ActivityPub 実装であり、一般的に作成された電子書簡を速やかに公衆送信することができます。この実装系は以下の特徴を備えています。

- 1 インスタンス 2 アカウント制限
- サードパーティクライアントの利用を前提とした軽量な設計
- Redis や Sidekiq を廃し、Solid Queue および Solid Cable、Solid Cache で構成された外部非依存のバックエンド
- マイクロブログの復権を意識した平易かつ高速なフロントエンド
- ローカル投稿の全文検索に対応
- Mastodon API に準拠
