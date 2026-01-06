---
title: Subs.mine
date: '2023-05-08'
author: 'maimux2x'
code:
  - repository: 'https://github.com/maimux2x/subsc.mine'
    description: ''
blog: https://maimux2x.hatenablog.com/entry/2023/05/10/081029
website:
published: true
hasAudio: true
stack:
  - name: フロントエンド
    detail:
      - name: Ruby
        version: 3.1.2
      - name: Slim
        version: 5.1.0
      - name: JavaScript
        version:
      - name: Tailwind CSS
        version:
      - name: Hotwire
        version:
      - name: Stimulus
        version: 1.2.1
      - name: Turbo
        version: 1.4.0

  - name: バックエンド
    detail:
      - name: Ruby
        version: 3.1.2
      - name: Ruby on Rails
        version: 7.0.4
      - name: jsbundling-rails
        version: 1.1.1
      - name: slim-rails
        version: 3.6.2

  - name: ビルドツール
    detail:
      - name: webpack
        version: 5.78.0

  - name: Linter/Formatter
    detail:
      - name: ESlint
        version: 8.37.0
      - name: Prettier
        version: 2.8.7
      - name: Rubocop
        version: 1.49.0
      - name: slim_lint
        version: 0.24.0

  - name: テスト
    detail:
      - name: RSpec
        version: 6.0.1

  - name: データベース
    detail:
      - name: PostgreSQL
        version:

  - name: インフラ
    detail:
      - name: Fly.io
        version:

  - name: CI/CD
    detail:
      - name: GitHub Actions
        version:
---

Subsc.mine は複数のサブスクリプションサービスを契約している人向けの、利用サブスク一覧ツールです。 利用しているサブスクと更新日を一覧画面で確認することができ、自動でカレンダーアプリに更新日を連携することが可能です。

#### 特徴

- 以下の項目を登録し、一覧画面で確認が可能です
  - サービス名
  - お支払基準日
  - 次回お支払日
  - 金額
  - ステータス（継続中か停止中か）
  - 周期
- お支払基準日から次回お支払日を 本日 を起点に自動で計算します
- iCalendar 形式でカレンダーアプリと連携が可能です
- 一時的にサブスクの利用を止める場合、ステータスを「停止」に変更し、カレンダー連携から除外できます
- 停止から再開する場合、新しいお支払基準日を設定すると改めて次回お支払日を算出しカレンダーと連携できます
