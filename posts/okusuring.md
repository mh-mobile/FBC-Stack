---
title: 'おくすリング'
date: '2026-08-07'
author: sharoa119
code:
  - repository: 'https://github.com/sharoa119/okusuring'
    description: ''
blog: 'https://sharoa.hatenablog.com/entry/2026/08/07/115406'
website: 'https://okusuring.com/'
published: true
hasAudio: false
stack:
  - name: フロントエンド
    detail:
      - name: Hotwire

  - name: バックエンド
    detail:
      - name: Ruby
        version: 4.0.6
      - name: Ruby on Rails
        version: 8.1.4

  - name: テスト
    detail:
      - name: Minitest

  - name: Linter/Formatter
    detail:
      - name: RuboCop

  - name: 認証
    detail:
      - name: LINE Login

  - name: 外部サービス・API
    detail:
      - name: LINE Messaging API

  - name: データベース
    detail:
      - name: PostgreSQL
      - name: NeonDB
      - name: SQLite

  - name: CI/CD
    detail:
      - name: GitHub Actions

  - name: インフラ
    detail:
      - name: Render
---

おくすリングは、自分や家族の服薬の飲み忘れを防ぐことに特化した、シンプルなリマインダーサービスです。

服薬時間になるとLINEで通知が届き、通知からおくすリングを開いてワンタップで「飲んだよ」を記録できます。
家族共有を使うことで、家族の服薬予定や服薬状況も確認できます。

「お薬情報の詳細管理」や「診療予約」などの機能はあえて省き、飲み忘れ防止に必要な機能だけに絞っています。
