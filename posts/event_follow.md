---
title: EventFollow
date: '2021-06-07'
author: mh-mobile
code:
  - repository: 'https://github.com/mh-mobile/event_follow'
    description: 'front/backend'
  - repository: 'https://github.com/mh-mobile/event_follow_mobile'
    description: 'mobile'
blog: https://mh-mobile.hatenablog.com/entry/2021/07/06/085442
website:
published: true
hasAudio: true
stack:
  - name: フロントエンド
    detail:
      - name: Vue.js
        version: 2.6.12
      - name: TypeScript
        version:
      - name: Nuxt.js
        version: 2.14.7

  - name: バックエンド
    detail:
      - name: Ruby on Rails (APIモード)
        version: 6.1.3.1
      - name: Ruby
        version: 3.0.0

  - name: アプリケーションサーバ
    detail:
      - name: Puma
        version: 5.2.2

  - name: Linter/Formatter
    detail:
      - name: ESLint
        version: 7.28.0
      - name: Prettier
        version: 2.2.1
      - name: Rubocop
        version: 1.11.0

  - name: テスト
    detail:
      - name: Storybook
        version:
      - name: Jest
        version: 26.6.2
      - name: RSpec
        version: 5.0.0

  - name: データベース
    detail:
      - name: PostgreSQL
        version: 5.4

  - name: 認証
    detail:
      - name: Firebase Authentication
        version:

  - name: キャッシュサーバ
    detail:
      - name: Redis
        version:

  - name: CI/CD
    detail:
      - name: GitHub Actions
        version:

  - name: インフラ
    detail:
      - name: Heroku
        version:
      - name: GitHub
        version:

  - name: 環境構築
    detail:
      - name: Docker
        version:
      - name: Docker Compose
        version:

  - name: API連携
    detail:
      - name: Twitter API
        version:
      - name: Connpass API
        version:
      - name: Doorkeeper API
        version:

  - name: API関連ツール
    detail:
      - name: OpenAPI
        version:
      - name: committee-rails
        version: 0.5.1

  - name: モニタリングツール
    detail:
      - name: Sentry
        version:
      - name: Skylight
        version: 5.0.0

  - name: モバイルアプリ
    detail:
      - name: Flutter
        version: 2.0.1
---

イベントフォローは、自分の興味の方向に近い技術イベントを見逃してしまう問題を解決したい、技術イベント発見サービスです。ユーザーは Twitter の友達がシェアした Doorkeeper、connpass のイベントを発見することができ、キーワードで検索することとは違い、検索せずに自分の興味の方向に近いイベントを発見できることが特徴です。
