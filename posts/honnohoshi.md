---
title: 本の星 
date: '2020-10-21'
author: yoshiokak
code: 
  - repository: "https://github.com/yoshiokak/honnohoshi"
    description: ""
blog:
website:
published: false
hasAudio: false
stack:
  - name: frontend
    detail:
      - name: Ruby
        version: 
      - name: Slim
        version: 
      - name: JavaScript
        version:

  - name: backend
    detail:
      - name: Ruby
        version: 
      - name: Ruby on Rails
        version: 

  - name: database
    detail:
      - name: PostgreSQL
        version: 
  - name: api連携
    detail:
      - name: 楽天API
        version: 

  - name: infra
    detail:
      - name: heroku
        version: 

---


本の星というサービスは、本の平均評価を1つのサービスで調べると評価に偏りがある場合があるため、複数サービスでの平均評価を知りたいが、その際にそれぞれのサービスで調べるのが面倒という問題を解決したい、複数サービスの本の平均星評価を知りたい人向けの、本の星評価横断検索サービスです。

ユーザーはISBNを入力すると、複数サービスでのその本の星評価を見ることができ、自分で複数のサービスを検索して本の星評価を調べるのとは違って、ISBNの入力のみで複数サービスの本の星評価を知ることができる事が特徴です。
