---
title: 'MAAKS'
date: '2024-01-07'
author: YukiWatanabe824
code: 
  - repository: "https://github.com/YukiWatanabe824/MAAKS"
    description: "MAAKS(マークス)は、サイクリング中の事故を減らための道路上の自転車事故やトラブルを共有するサービスです。"
blog: https://yukiwatanabe.hatenablog.com/entry/maaks_launch
website: "https://maaks.jp/"
published: true
stack:
  - name: フロントエンド
    detail:
      - name: HotWire
        version: 
      - name: turbo-rails
        version: 1.4.0
      - name: stimulus-rails
        version: 1.2.1
      - name: Tailwind CSS
      - name: daisyUI

  - name: バックエンド
    detail: 
      - name: Ruby
        version: 3.2.2
      - name: Ruby on Rails
        version: 7.0.5

  - name: データベース
    detail:
      - name: PostgreSQL

  - name: 認証
    detail:
      - name: devise
        version: 4.9
      - name: omniauth-google-oauth2

  - name: リンター/フォーマッター
    detail:
      - name: Rubocop
        version: 1.53.1
      - name: ESLint
        version: 8.33.0
      - name: Prettier
        version: 2.8.4

  - name: テスティングフレームワーク
    detail:
      - name: minitest

  - name: RDBMS
    detail:
      - name: PostgreSQL

  - name: インフラ
    detail:
      - name: Fly.io

  - name: CI/CD
    detail:
      - name: GitHub Actions

  - name: 外部ストレージ
    detail:
      - name: Amazon S3

  - name: 外部サービス
    detail:
      - name: MapBox GL JS

---

MAAKSはサイクリング中の事故を減らすための道路上の自転車事故やトラブルを共有するサービスです。ユーザーは地図上で他のユーザーが投稿した事故の情報やレポートを確認することができ、サイクリングルート設定時・走行時の危険予測が可能です。属コミュニティ化していた「危ないスポットの情報」をコミュニティの枠を超えて確認できるようになることで、より安全で楽しいライドに役立ちます。
