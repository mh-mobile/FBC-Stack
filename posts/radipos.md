---
title: Radipos 
date: '2020-02-25'
author: dtanakab
code: 
  - repository: "https://github.com/dtanakab/radipos"
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
      - name: Vue.js
        version: 
      - name: JavaScript
        version: 
  - name: backend
    detail:
      - name: Ruby
        version: 
      - name: Ruby on Rails
        version: 
      - name: RSpec
        version: 
  - name: infra
    detail:
      - name: CircleCI
        version:

---
Radipos というサービスは、
ラジオ番組にメールを投稿する際の手間が煩わしいという問題を解決する
ハガキ職人向けのメール送信サービスです。

ユーザーは、ラジオ番組のコーナーを選択し、
投稿する内容箇所を入力するだけでラジオ番組へ投稿ができ、
自身で聞いた番組を思い出して、あるいは、
番組ブログを見て、宛先/件名/コーナーを確認し、
宛先/件名/ラジオネーム/住所/年齢/名前/投稿ネタを都度入力しメールを送る場合とは違って、
（あらかじめ用意されている）番組とコーナーを選択し、
投稿内容さえ入力すれば、残りは番組情報/マイページ情報をもとに、
用意されたメールのフォーマットが埋めて送信する機能が備わっている事が特徴です。
