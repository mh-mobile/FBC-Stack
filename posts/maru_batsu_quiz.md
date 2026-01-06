---
title: '○×クイズオンライン'
date: '2023-10-26'
author: keiz1213
code:
  - repository: 'https://github.com/keiz1213/maru-batsu-quiz'
    description: '○×クイズオンラインは、複数人でオンライン上で集まって○×クイズが遊べるパーティーゲームです。'
blog: 'https://keiz1213.hatenablog.com/entry/2023/10/26/085739'
website: ''
published: true
hasAudio: true
stack:
  - name: フロントエンド
    detail:
      - name: Nuxt.js
        version: 3.5.2
      - name: TypeScript
        version: '^5.59.8'
      - name: Tailwind CSS
        version: '^3.3.2'
      - name: DaisyUI
        version: '^3.0.3'

  - name: バックエンド
    detail:
      - name: Ruby
        version: 3.2.2
      - name: Rails
        version: 7.0.5
      - name: Puma
        version: '~> 5.0'

  - name: インフラ
    detail:
      - name: Fly.io
        version: ''
      - name: Vercel
        version: ''

  - name: 環境構築
    detail:
      - name: Docker
        version: ''
      - name: Docker Compose
        version: ''

  - name: テスト
    detail:
      - name: RSpec
        version: ''
      - name: Vitest
        version: '^0.33.0'
      - name: Cypress
        version: '^12.13.0'

  - name: リンター・フォーマッター
    detail:
      - name: ESLint
        version: '^8.42.0'
      - name: Prettier
        version: '^2.8.8'
      - name: RuboCop
        version: ''

  - name: 外部サービス
    detail:
      - name: SkyWay
        version: '^1.4.0'
      - name: Firebase Authentication
        version: '^9.22.1'
---

○× クイズオンラインというサービスは、複数人でオンライン上で集まって ○× クイズが遊べるパーティーゲームです。
ユーザーはブラウザ上で自分のアバターを ○ エリア、✗ エリアに移動させることによって回答ができます。
チャットなどで ○ や ✗ を発言するのと違って、誰が、どれくらいの人数が、○ または ✗ と答えているか、また回答に迷っている様子がリアルタイムで見れる機能が備わっていることが特徴です。
