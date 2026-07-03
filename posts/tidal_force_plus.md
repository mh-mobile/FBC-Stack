---
title: 'Tidal Force Plus'
date: '2026-04-11'
author: 'nishitatsu-dev'
code:
  - repository: 'https://github.com/nishitatsu-dev/tidal-force-plus'
    description: ''
blog: 'https://gaibukiokusouchi.hatenablog.com/entry/2026/04/11/161745'
website: 'https://tidal-force-plus.net/'
published: true
hasAudio: false
stack:
  - name: フロントエンド
    detail:
      - name: JavaScript
      - name: Hotwire
      - name: Tailwind CSS

  - name: バックエンド
    detail:
      - name: Ruby on Rails
        version: 8.1.2
      - name: Ruby
        version: 3.4.7

  - name: データベース
    detail:
      - name: SQLite

  - name: テスト
    detail:
      - name: Minitest

  - name: Linter/Formatter
    detail:
      - name: RuboCop
      - name: ERB Lint
      - name: ESLint
      - name: Prettier

  - name: 認証
    detail:
      - name: Devise
      - name: OmniAuth
      - name: omniauth-google-oauth2
      - name: omniauth-rails_csrf_protection

  - name: 外部サービス
    detail:
      - name: Apache ECharts
      - name: Google OAuth

  - name: CI/CD
    detail:
      - name: GitHub Actions

  - name: インフラ
    detail:
      - name: さくらのVPS
      - name: Kamal
      - name: Docker
---

Tidal Force Plus は、「月・太陽による起潮力（潮汐力）」や「木星」の影響を調べたい人向けの、データ提供サービスです

- 「月・太陽による起潮力（潮汐力）」と「木星との距離」を計算します
- ログインすると、メモ機能が使えます
