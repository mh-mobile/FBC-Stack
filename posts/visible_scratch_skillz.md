---
title: 'Visible Scratch Skillz'
date: '2021-09-29'
author: obregonia1
code:
  - repository: 'https://github.com/obregonia1/visible_scratch_skillz'
    description: ''
blog: https://zenn.dev/obregonia1/articles/9f6fae7968c0c0
website:
published: true
stack:
  - name: フロントエンド
    detail:
      - name: Vue.js
        version: 3.1.5
      - name: JavaScript
        version:
      - name: Konva.js
        version: 8.1.1
      - name: bulma
        version:
      - name: ERB
        version:
      - name: Ruby
        version: 3.0.2

  - name: バックエンド
    detail:
      - name: Ruby
        version: 3.0.2
      - name: Ruby on Rails
        version: 6.1.4

  - name: Linter/Formatter
    detail:
      - name: ESLint
        version: 8.10.0
      - name: Prettier
        version: 2.5.1
      - name: Stylelint
        version: 14.6.1
      - name: Rubocop
        version: 1.18.3
      - name: ERB Lint
        version: 0.1.1

  - name: テスト
    detail:
      - name: RSpec
        version: 5.0.2

  - name: 認証
    detail:
      - name: OmniAuth
        version: 2.0.4

  - name: ビルドツール
    detail:
      - name: Webpack
        version: 5.73.0

  - name: CI/CD
    detail:
      - name: GitHub Actions

  - name: デプロイツール
    detail:
      - name: Capistrano
        version: 3.16.0

  - name: AWS
    detail:
      - name: Amazon EC2
        version:
      - name: Amazon RDS (PostgreSQL)
        version:
      - name: Amazon Route 53
        version:
      - name: Amazon S3
        version:
---

- スクラッチの楽譜を作成し、画像として出力できるサービスです
- トリック名、パターン、拍の長さを選んで追加していくことで簡単に楽譜を作ることができます
- ログイン無しでも作成することができます

ログインして利用すると以下の機能が使えるようになります

- 作成した楽譜の保存(画像用の URL が生成されます)
- 保存した画像の URL をワンクリックでクリップボードにコピー
- 保存した画像の embed タグをワンクリックでクリップボードにコピー
