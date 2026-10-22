---
title: 'ReNovo'
date: '2026-09-18'
author: koguchi-e
code:
  - repository: 'https://github.com/koguchi-e/ReNovo'
    description: ''
blog: 'https://eliri.hatenablog.com/entry/2026/09/17/080344'
website: 'https://renovoapp.net/'
published: true
hasAudio: false
stack:
  - name: フロントエンド
    detail:
      - name: Hotwire
      - name: Turbo
      - name: Stimulus
      - name: Tailwind CSS
        version: 4.3.1
      - name: SortableJS

  - name: バックエンド
    detail:
      - name: Ruby
        version: 4.0.5
      - name: Ruby on Rails
        version: 8.1.4
      - name: Solid Queue
      - name: acts_as_list

  - name: テスト
    detail:
      - name: RSpec
      - name: SimpleCov

  - name: Linter/Formatter
    detail:
      - name: RuboCop
      - name: ESLint
      - name: ERB Lint

  - name: 認証
    detail:
      - name: Google OAuth

  - name: 外部サービス・API
    detail:
      - name: OpenAI API

  - name: データベース
    detail:
      - name: PostgreSQL
        version: '18'

  - name: CI/CD
    detail:
      - name: GitHub Actions

  - name: インフラ
    detail:
      - name: Render
      - name: NeonDB
      - name: Docker
---

ReNovoは、考えすぎて行動に移せない人のためのタスク分解サービスです。

現在の状況・問題・目標を入力すると、AIが5〜15分程度で取り組める5つの具体的なタスクに分解します。
