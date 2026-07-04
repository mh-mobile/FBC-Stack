---
title: 'サブスク管理'
date: '2026-05-13'
author: 'thmz337'
code:
  - repository: 'https://github.com/thmz337/subscmanage'
    description: ''
blog: 'https://thmz.hatenablog.com/entry/2026/05/13/231806'
website: 'https://www.subscmanage.com/'
published: true
hasAudio: false
stack:
  - name: フロントエンド
    detail:
      - name: Tailwind CSS
      - name: Stimulus
      - name: Turbo

  - name: バックエンド
    detail:
      - name: Ruby on Rails
        version: 8.1.1
      - name: Ruby
        version: 3.4.7

  - name: テスト
    detail:
      - name: minitest

  - name: Linter/Formatter
    detail:
      - name: RuboCop
      - name: ERB Lint
      - name: ESLint
      - name: Prettier

  - name: 認証
    detail:
      - name: Devise

  - name: 外部サービス・API
    detail:
      - name: Resend

  - name: データベース
    detail:
      - name: PostgreSQL

  - name: CI/CD
    detail:
      - name: GitHub Actions

  - name: デプロイ
    detail:
      - name: Heroku
      - name: Kamal
---

サブスク管理は、自分が利用しているサブスクを一元管理できるサービスです。サービス名・金額・支払いサイクルを登録すると、毎月の合計支払い額を確認でき、支払日が近づいたらメールでお知らせします。
