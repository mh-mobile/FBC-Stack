---
title: 'Guitar Scale Sketch'
date: '2023-10-31'
author: sadanora
code: 
  - repository: "https://github.com/sadanora/guitar_scale_sketch"
    description: "Guitar Scale Sketchは、ギターの指板図を人に渡したり自分用に保存したい人向けの指板図作成ツールです。"
blog: "https://sadanora.hatenablog.com/entry/2023/10/31/090000"
website: "https://guitar-scale-sketch.com/"
published: true
hasAudio: true
stack:
  - name: フロントエンド
    detail:
      - name: jsbundling-rails
        version:
      - name: esbuild
        version: 0.17.19
      - name: Hotwire
        version:
      - name: turbo-rails
        version: 7.3.0
      - name: stimulus-rails
        version: 3.2.1
      - name: Bootstrap
        version: 5.2.3
      - name: Konva
        version: 9.2.0

  - name: バックエンド
    detail: 
      - name: Ruby
        version: 3.1.2
      - name: Ruby on Rails
        version: 7.0.4.3
      - name: Puma
        version: 5.0
      - name: slim-rails
      - name: sentry-rails
        version: 5.11
      - name: sentry-ruby
        version: 5.11

  - name: ソーシャルログイン
    detail: 
      - name: omniauth-google-oauth2
      - name: omniauth-rails_csrf_protection

  - name: テスト
    detail:
      - name: RSpec
        version: 6.0.3

  - name: Linter/Formatter
    detail:
      - name: ESLint
        version: 8.46.0
      - name: Prettier
        version: 3.0.1
      - name: Rubocop
      - name: Slim-Lint

  - name: データベース
    detail: 
      - name: PostgreSQL

  - name: CI/CD
    detail:
      - name: GitHub Actions

  - name: インフラ
    detail:
      - name: Fly.io

---

Guitar Scale Sketchは、ギターの指板図を人に渡したり自分用に保存したい人向けの指板図作成ツールです。指板の幅をきめてドットを打つだけで指板図を素早く作成できます。作った指板図はブラウザから印刷したり、URLをシェアして共有できます。
