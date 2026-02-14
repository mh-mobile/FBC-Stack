---
title: '展示グループトーク'
date: '2026-01-19'
author: ayu-0505
code:
  - repository: 'https://github.com/ayu-0505/TenjiGroupTalk'
    description: ''
blog: 'https://ayu-0505.hatenablog.com/entry/2026/01/19/120508'
website: 'https://tenji-grouptalk.net/'
published: true
hasAudio: false
stack:
  - name: フロントエンド
    detail:
      - name: Hotwire
      - name: Turbo
      - name: Stimulus
      - name: Tailwind CSS
        version: 3.4.19
      - name: Slim
        version: 5.2.1
      - name: Importmap Rails
        version: 2.2.3
      - name: Propshaft
        version: 1.3.1
      - name: Lucide Rails
        version: 0.7.3

  - name: バックエンド
    detail:
      - name: Ruby
        version: 3.4.4
      - name: Ruby on Rails
        version: 8.0.3
      - name: Puma
        version: 7.2.0
      - name: Solid Cache
        version: 1.0.10
      - name: Solid Queue
        version: 1.3.1
      - name: Kaminari
        version: 1.2.2

  - name: データベース
    detail:
      - name: SQLite3

  - name: テスト
    detail:
      - name: RSpec
      - name: Capybara
      - name: FactoryBot
      - name: SimpleCov

  - name: Linter/Formatter
    detail:
      - name: RuboCop
      - name: Slim Lint
      - name: Brakeman
      - name: ESLint
      - name: Prettier
      - name: Bullet

  - name: 認証
    detail:
      - name: OmniAuth
      - name: omniauth-google-oauth2

  - name: インフラ
    detail:
      - name: Docker
      - name: Kamal
        version: 2.10.1
      - name: さくらVPS

  - name: CI/CD
    detail:
      - name: GitHub Actions
      - name: Dependabot
---

点字グループトークというサービスは、点訳サークルなどで点字を学習している人々のための、
一言点字クイズを送り合うことができる招待制掲示板サービスです。

### 特徴
利用ユーザーは掲示板を作成することができ、やりとりに一言点字を付与することができます。
一言点字は凸面・凹面で表示され、ひらがなを正解ボタンで見ることができます。  
ユーザー同士のやり取りの中で、クイズ形式によって頻繁に点字に触れることにより、
ユーザーはより早く・楽しく点字を覚えることができます。
