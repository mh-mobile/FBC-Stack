---
title: 'ワクチンプラン'
date: '2022-05-14'
author: haruna-tsujita
code: 
  - repository: "https://github.com/haruna-tsujita/vaccination-plan"
    description: ""
blog: https://napple29.hatenablog.com/entry/2022/09/06/083747
website: https://www.vaccination-plan.com/
published: true
stack:
  - name: Frontend
    detail:
      - name: Ruby
        version: 3.1.0
      - name: Slim
        version: 
      - name: JavaScript
        version:
      - name: Bulma
        version: 
  - name: backend
    detail:
      - name: Ruby on Rails
        version: 6.1.5
      - name: Ruby
        version: 3.1.0
  - name: database
    detail:
      - name: PostgreSQL
        version: 
  - name: infra
    detail:
      - name: GitHub Actions
        version: 

---

このサービスは乳幼児期のお子さんを育てている保護者を対象とした、予防接種の予定管理サービスです。 子どもの予防接種の計画を立てるのが大変という問題を解決したく、このサービスを考えました。

子どもの生年月日と前回の予防接種の記録を行うことで、他の予防接種との兼ね合いを考慮しながら、次の予防接種日を自動で計算します。

接種規定については日本小児科学会の推奨のデータを参考に作っています。 https://www.jpeds.or.jp/uploads/files/vaccine_schedule.pdf
