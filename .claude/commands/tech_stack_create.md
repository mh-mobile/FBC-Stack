# 概要

自作サービスの技術スタックのマークダウンを作成するスラッシュコマンドです

# 前提

・技術スタックのマークダウンのフォーマットは、posts/campus.mdのマークダウンを参考にしてください。
・記載しているパスはプロジェクトルートからの相対パスです。

# 実施手順

- git worktreeで新規に新規にブランチを作ってください。
- .claude/post_source/$ARGUMENTS.yamlを情報元として読み込んでください。
- yamlの情報をもとに、技術スタックのマークダウンをposts/$ARGUMENTS.mdとして作成してください。技術スタックはGitHubリポジトリやブログの内容を読んで作成してください。
- .claude/post_source/$ARGUMENTS.yamlとposts/$ARGUMENTS.mdをコミットしてください。
- コミットした変更内容をプッシュして、mainブランチに対してPRを作成してください。

