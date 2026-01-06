---
title: 'YOYAKU HUB'
date: '2025-08-19'
author: su-su-su-su
code:
  - repository: 'https://github.com/su-su-su-su/yoyaku-hub'
    description: ''
blog: 'https://susu-blog.hatenablog.com/entry/2025/08/19/134706'
website: 'https://www.yoyakuhub.jp/'
published: true
hasAudio: false
stack:
  - name: フロントエンド
    detail:
      - name: Hotwire
      - name: Tailwind CSS

  - name: バックエンド
    detail:
      - name: Ruby
        version: 3.3.5
      - name: Ruby on Rails
        version: 7.2.1.1

  - name: テスト
    detail:
      - name: RSpec

  - name: Linter/Formatter
    detail:
      - name: RuboCop
      - name: ESLint

  - name: インフラ
    detail:
      - name: Docker
      - name: Capistrano
---

フリーランス美容師の予約、会計、顧客の管理システムです。

##### 特徴

YOYAKU HUB というサービスは、予約終了の 30 分後に予約が入ると、その 30 分は施術に使えない隙間時間になり、予約枠が効率的に埋まらない問題を解決したいフリーランス美容師向けの、web 予約です。
ユーザーは、予約の前後に隙間時間ができる場合は自動的に検出し、その時間の表示を変えて他の時間へ促すことで、予約枠を最適に管理することができます。また、他のサービスとは違って予約の柔軟な管理機能が備わっていることが特徴です。
