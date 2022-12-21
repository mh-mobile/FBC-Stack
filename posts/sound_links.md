---
title: SoundLinks 
date: '2020-06-30'
author: koheitakahashi
code: 
  - repository: "https://github.com/koheitakahashi/sound_links"
    description: ""
blog:
website:
published: false
stack:
  - name: frontend
    detail:
      - name: Ruby
        version: 3.0
      - name: Vue.js
        version: 3.0.7
      - name: TypeScript
        version: 4.2.3
      - name: Node.js
        version: 14.3
  - name: backend
    detail:
      - name: Ruby
        version: 3.0
      - name: Ruby on Rails
        version: 6.1
  - name: database
    detail:
      - name: PostgreSQL
        version: 13.2
  - name: API連携
    detail:
      - name: Apple Music API
        version: 
      - name: Spotify API
        version: 
      - name: KKBOX API
        version: 


  - name: infra
    detail:
      - name: CircleCI
        version:
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
