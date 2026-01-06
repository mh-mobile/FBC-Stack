---
title: 'Ruumarker'
date: '2022-08-12'
author: kasai441
code: 
  - repository: "https://github.com/kasai441/ruumarker"
    description: ""
blog: https://kasai441.hatenablog.com/entry/2022/08/22/080730 
website:
published: true
hasAudio: true
stack:
  - name: フロントエンド
    detail: 
      - name: Vue.js
        version: 3.2.31
      - name: Node.js
        version: 16.14
      - name: daisyUI
        version: 2.14.2
      - name: Tailwind CSS
        version: 3.0.24
      - name: Slim
        version: 4.1.0
      - name: Ruby
        version: 3.1.2

  - name: バックエンド
    detail:
      - name: Ruby on Rails
        version: 7.0.3.1
      - name: Ruby
        version: 3.1.2

  - name: ビルドツール
    detail:
      - name: Webpack
        version: 5.70.0

  - name: テスト
    detail:
      - name: RSpec
        version: 5.1.2
 
  - name: Linter/Formatter
    detail:
      - name: Rubocop
        version: 1.31.2
      - name: ESLint
        version: 7.32.0
      - name: Brakeman
        version: 5.2.3

  - name: データベース
    detail:
      - name: PostgreSQL
        version: 
 
  - name: CI/CD
    detail:
      - name: GitHub Actions
        version: 
 
  - name: インフラ
    detail:
      - name: Heroku
        version: 
      - name: Amazon S3
        version: 


---

引越しした時、不動産管理者に入居時の部屋の状況を報告するための書類を作成するためのサービスです。

キズの位置とその写真が載っている「入居時チェック表」を作成してPDFでダウンロードできます。

もし既にキズがあった場合に、自分の過失でないことをあらかじめ説明しておけば、不当な修繕費の請求を避けられるかもしれません。
