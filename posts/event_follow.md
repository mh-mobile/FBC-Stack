---
title: EventFollow
date: '2021-06-07'
author: mh-mobile
code: 
  - repository: "https://github.com/mh-mobile/event_follow"
    description: "front/backend"
  - repository: "https://github.com/mh-mobile/event_follow_mobile"
    description: "mobile"
blog: https://mh-mobile.hatenablog.com/entry/2021/07/06/085442
website: https://eventfollow.app
published: true
stack:
  - name: Frontend
    detail:
      - name: Vue.js
        version: 2.6.12
      - name: TypeScript
        version: 
      - name: Nuxt.js
        version: 2.14.7
      - name: Jest
        version: 26.6.2
  - name: backend
    detail:
      - name: Ruby on Rails
        version: 6.1.3.1
      - name: Ruby
        version: 3.0.0
  - name: database
    detail:
      - name: PostgreSQL
        version: 5.4
  - name: Authentication
    detail:
      - name: Firebase Authentication
        version: 
  - name: infra
    detail:
      - name: Heroku
        version: 
      - name: Redis
        version: 
      - name: GitHub
        version: 
      - name: GitHub Actions
        version: 
      - name: Docker
        version: 

  - name: API連携
    detail:
      - name: Twitter API
        version:
      - name: Connpass API
        version:
      - name: Doorkeeper API
        version:
  - name: other
    detail:
      - name: Slack 
        version: 
      - name: OpenAPI 
        version: 
      - name: Storybook
        version: 
      - name: Sentry
        version: 
      - name: Skylight
        version: 5.0.0

---

イベントフォローは、自分の興味の方向に近い技術イベントを見逃してしまう問題を解決したい、技術イベント発見サービスです。ユーザーは Twitterの友達がシェアしたDoorkeeper、connpassのイベントを発見することができ、キーワードで検索することとは違い、検索せずに自分の興味の方向に近いイベントを発見できることが特徴です。


