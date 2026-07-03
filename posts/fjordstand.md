---
title: 'FjordStand'
date: '2026-06-30'
author: 'kushimegu'
code:
  - repository: 'https://github.com/kushimegu/fjordstand'
    description: ''
blog: 'https://mgmg580.hatenablog.com/entry/2026/06/30/085402'
website: 'https://fjordstand.com/'
published: true
hasAudio: false
stack:
  - name: フロントエンド
    detail:
      - name: Tailwind CSS
      - name: Hotwire
      - name: Slim

  - name: バックエンド
    detail:
      - name: Ruby on Rails
        version: 8.1.3
      - name: Ruby
        version: 4.0.5
      - name: Solid Queue
      - name: Active Storage
      - name: libvips

  - name: テスト
    detail:
      - name: RSpec
      - name: Capybara

  - name: Linter/Formatter
    detail:
      - name: RuboCop
      - name: Slim-Lint
      - name: ESLint
      - name: Prettier

  - name: 認証
    detail:
      - name: OmniAuth
      - name: omniauth-discord

  - name: 外部サービス・API
    detail:
      - name: Discord

  - name: データベース
    detail:
      - name: PostgreSQL

  - name: CI/CD
    detail:
      - name: GitHub Actions

  - name: インフラ
    detail:
      - name: さくらのVPS
      - name: Kamal
      - name: Docker
---

FjordBootCamp (FBC) 内の人に不用品を安く譲って役立ててもらいたい、FBC 関係者向けのクローズドなフリマアプリです。

- 出品者は購入希望申請期間を設けて商品を出品できます
- 締切日時になると購入希望者から自動的に抽選が行われ、購入者が決定します
- 購入確定後は出品者・購入者間の連絡ページでやり取りができます
