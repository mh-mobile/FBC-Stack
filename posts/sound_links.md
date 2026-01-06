---
title: SoundLinks 
date: '2021-12-06'
author: koheitakahashi
code: 
  - repository: https://github.com/koheitakahashi/sound_links
    description: ""
blog: https://docs.koheitakahashi.com/entry/2021/12/06/070000
website:
published: true
hasAudio: true
stack:
  - name: フロントエンド
    detail:
      - name: Vue.js
        version: 3.0.7
      - name: TypeScript
        version: 4.2.3
      - name: Node.js
        version: 14.3

  - name: バックエンド
    detail:
      - name: Ruby
        version: 3.0.3
      - name: Ruby on Rails (APIモード)
        version: 6.1

  - name: Linter/Formatter
    detail:
      - name: ESLint
        version: 6.8.0
      - name: Prettier
        version: 2.5.1
      - name: Rubocop
        version: 1.23.0

  - name: テスト
    detail:
      - name: Cypress
        version: 3.8.3
      - name: Jest
        version: 24.9.0
      - name: RSpec
        version: 3.10.1

  - name: データベース
    detail:
      - name: PostgreSQL
        version: 13.2

  - name: ミドルウェア
    detail:
      - name: nginx
        version: 

  - name: 環境構築
    detail:
      - name: Docker
        version: 
      - name: Docker Compose
        version: 

  - name: API連携
    detail:
      - name: Apple Music API
        version: 
      - name: Spotify API
        version: 
      - name: KKBOX API
        version: 

  - name: CI/CD
    detail:
      - name: CircleCI
        version:

  - name: AWS
    detail:
      - name: Amazon Route 53
        version: 
      - name: Amazon ECR
        version: 
      - name: Amazon ECS
        version: 
      - name: ALB
        version: 

---

「SoundLinks」は、

「楽曲を共有したい時に、音楽配信サービスごとに楽曲のリンクを探すのが面倒という問題」を解決したい

「楽曲を共有したい人」 向けの、

「音楽プラットフォーム横断検索サービス」です。

ユーザーは「楽曲のタイトルを入力すると、各音楽配信サービス毎の楽曲リンクを取得すること」ができ、

「自分でそれぞれの音楽配信サービス内を検索して、リンクを取得する場合」とは違って、

「一度に複数の音楽配信サービスのリンクを取得できること」が備わっている事が特徴です。

音楽配信サービスの利用規約の問題から、SoundLinksで対応している音楽配信サービスは、APIが外部に公開されている必要があります。 そのため、[Spotify](https://www.spotify.com/)・[Apple Music](https://www.apple.com/apple-music)・[KKBOX](https://www.kkbox.com/jp/ja) に対応しています。 他の音楽配信サービスにおいては、APIが公開され次第対応する予定です。
