---
title: 'Tenpai Speeder'
date: '2026-01-20'
author: Ryooo-k
code:
  - repository: 'https://github.com/Ryooo-k/tenpai-speeder'
    description: ''
blog: 'https://ryo-ta090.hatenablog.com/entry/2026/01/20/061412'
website: 'https://tenpai-speeder.com/'
published: true
hasAudio: false
stack:
  - name: フロントエンド
    detail:
      - name: JavaScript
      - name: Hotwire
      - name: Turbo
      - name: Stimulus
      - name: Tailwind CSS
        version: 4.1.11
      - name: Importmap Rails
        version: 2.1.0
      - name: Propshaft
        version: 1.1.0

  - name: バックエンド
    detail:
      - name: Ruby
        version: 3.4.4
      - name: Ruby on Rails
        version: 8.0.2
      - name: Puma
        version: 6.6.0
      - name: Solid Cable
        version: 3.0.12
      - name: torch-rb
        version: 0.21.0

  - name: データベース
    detail:
      - name: SQLite3

  - name: テスト
    detail:
      - name: Minitest
      - name: Capybara

  - name: Linter/Formatter
    detail:
      - name: RuboCop
      - name: ERB Lint
      - name: Brakeman
      - name: ESLint
      - name: Prettier

  - name: 認証
    detail:
      - name: OmniAuth
      - name: omniauth-google-oauth2

  - name: インフラ
    detail:
      - name: Docker
      - name: Kamal
        version: 2.7.0
      - name: さくらVPS

  - name: CI/CD
    detail:
      - name: GitHub Actions
      - name: Dependabot
---

Tenpai Speederは、聴牌に近づくための切り方を視覚的に学べる麻雀トレーニングサービスです。AI対局で実戦感覚を保ちつつ、有効牌や向聴数を確認しながらプレイできます。
