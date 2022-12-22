---
title: DuetCode
date: '2022-12-22'
author: daiki0381
code: 
  - repository: https://github.com/daiki0381/duet-code 
    description:
blog: https://daiki0381.hatenablog.com/entry/2022/12/21/021555
website: https://www.duet-code.com
published: true
stack:
  - name: フロントエンド
    detail: 
      - name: React
        version: 18.2.0
      - name: Next.js
        version: 12.3.1
      - name: TypeScript
        version: 4.8.4
      - name: Tailwind CSS
        version: 3.1.8
      - name: MUI
        version: 5.10.11

  - name: バックエンド
    detail:
      - name: Ruby
        version: 2.7.6
      - name: Ruby on Rails (APIモード)
        version: 7.0.4

  - name: Linter/Formatter
    detail:
      - name: ESLint
        version: 8.25.0
      - name: Prettier
        version: 2.7.1
      - name: rubocop
        version: 1.36.0

  - name: インフラ
    detail:
      - name: Vercel
        version: 
      - name: Flyio
        version:
  - name: テスト
    detail:
      - name: committee-rails
        version: 
      - name: RSpec
        version: 6.0.1
      - name: Cypress
        version: 11.2.0

  - name: CI/CD
    detail:
      - name: GitHub Actions
        version: 

  - name: 環境構築
    detail:
      - name: Docker
        version: 
      - name: Lefthook
        version:
      - name: OpenAPI
        version: 3.0.3
      - name: OpenAPI Generator

  - name: 外部サービス
    detail:
      - name: Firebase Authentication
        version: 
      - name: GitHub API
        version: 

---

Duet Code というサービスは、① プライベートで書いたコードをレビューしてもらう機会がない問題 ② 他人の書いたコードを読んだり、自分の書いたコードに意見を貰うことで、技術力を上げたいニーズを解決したいコードレビューを通して技術力を上げたい人向けの、ユーザー間のコードレビューサービスです。ユーザーはレビューしてほしいプルリクエストを投稿し、ユーザー登録でレビュイーにもレビュアーにもなることができ、MENTA でお金を払ってレビューしてもらうのとは違って、無料でレビュイーにもレビュアーにもなれる機能が備わっている事が特徴です。
