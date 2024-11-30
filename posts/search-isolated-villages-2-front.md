---
title: '秘境集落探索ツール'
date: '2024-11-18'
author: ogawa-tomo
code:
  - repository: 'https://github.com/ogawa-tomo/search-isolated-villages-2-front'
    description: ''
blog: https://note.com/otomo6sm/n/n04f8e6b74ddc
website: https://search-isolated-villages.com/
published: true
stack:
  - name: フロントエンド
    detail:
      - name: Next.js
        version: 14.2.5
      - name: TypeScript
        version: 5.1.6
      - name: Tailwind CSS
        version:
      - name: daisyUI
        version: 3.7.7

  - name: Linter/Formatter
    detail:
      - name: ESLint
        version:
      - name: Prettier
        version:

  - name: テスト
    detail:
      - name: Jest
        version: 29.7.0
      - name: React Testing Library
        version:
      - name: Playwright
        version: 1.41.1

  - name: CI/CD
    detail:
      - name: GitHub Actions
        version:

  - name: インフラ
    detail:
      - name: Vercel
        version:
---

[秘境集落探索ツール](https://search-isolated-villages.com/)のフロントエンドです。

秘境集落や秘境施設を人口分布データに基づいた指標により地域ごとにランキングで出力し、それぞれの集落・施設を地図上で閲覧することができます。

[旧サービス](https://search-isolated-villages-2.herokuapp.com/)を以前より公開していましたが、そのフロントエンドを置き換えるプロジェクトです。旧サービスはそのままバックエンドサーバとして利用しています。
