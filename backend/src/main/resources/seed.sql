-- =====================
-- DevJima Seed Data
-- =====================
-- Run this in pgAdmin to seed!
-- IMPORTANT: Update passwords if needed (all set to BCrypt hash of 'password123')

-- Clear existing data (order matters due to foreign keys)
DELETE FROM post_tags;
DELETE FROM comments;
DELETE FROM posts;
DELETE FROM tags;
DELETE FROM users;

-- Reset sequences
ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE posts_id_seq RESTART WITH 1;
ALTER SEQUENCE tags_id_seq RESTART WITH 1;
ALTER SEQUENCE comments_id_seq RESTART WITH 1;

-- =====================
-- USERS (10)
-- Password for all: password123
-- BCrypt hash: $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVrSWAGSpa
-- =====================
INSERT INTO users (username, email, password, display_name, bio, preferred_lang, role) VALUES
('tanaka_dev',    'tanaka@devjima.com',   '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVrSWAGSpa', 'Tanaka Hiroshi',  'Backend engineer at a Tokyo fintech. Java lover, occasional Rust tinkerer. Always curious about how things work under the hood.', 'ja', 'USER'),
('sarah_codes',   'sarah@devjima.com',    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVrSWAGSpa', 'Sarah Mitchell',  'Canadian dev living in Osaka. Frontend at heart, full-stack by necessity. Writes about surviving Japanese tech culture.', 'en', 'USER'),
('yamamoto_k',    'yamamoto@devjima.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVrSWAGSpa', 'Yamamoto Kenji',  'SRE at a major Japanese e-commerce company. Kubernetes, observability, and the occasional midnight incident report.', 'ja', 'USER'),
('mike_in_tokyo', 'mike@devjima.com',     '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVrSWAGSpa', 'Mike Peterson',   'American software engineer, 3 years in Tokyo. Bridging the gap between Western and Japanese dev culture one post at a time.', 'en', 'USER'),
('suzuki_ai',     'suzuki@devjima.com',   '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVrSWAGSpa', 'Suzuki Aiko',     'ML engineer focused on NLP for Japanese language processing. Python, PyTorch, and too much coffee.', 'ja', 'USER'),
('lars_jp',       'lars@devjima.com',     '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVrSWAGSpa', 'Lars Eriksson',   'Swedish dev working remotely for a Japanese startup. Interested in how Agile translates across cultures.', 'en', 'USER'),
('nakamura_t',    'nakamura@devjima.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVrSWAGSpa', 'Nakamura Tomo',   'iOS developer at a gaming company in Shibuya. Swift, UIKit, and the occasional Unity experiment.', 'ja', 'USER'),
('priya_dev',     'priya@devjima.com',    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVrSWAGSpa', 'Priya Sharma',    'Indian engineer navigating the Japanese job market. Writes about visa processes, interviews, and life as a foreign dev in Japan.', 'en', 'USER'),
('kobayashi_r',   'kobayashi@devjima.com','$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVrSWAGSpa', 'Kobayashi Ryo',   'Full-stack developer at a startup in Fukuoka. React, Spring Boot, and a strong opinion about code reviews.', 'ja', 'USER'),
('emma_tokyo',    'emma@devjima.com',     '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVrSWAGSpa', 'Emma Clarke',     'British UX engineer in Tokyo. Obsessed with accessibility, design systems, and making Japanese apps easier to use.', 'en', 'USER');

-- =====================
-- TAGS (8)
-- =====================
INSERT INTO tags (name, slug) VALUES
('career',       'career'),
('java',         'java'),
('culture',      'culture'),
('frontend',     'frontend'),
('career-advice','career-advice'),
('react',        'react'),
('devlife',      'devlife'),
('interview',    'interview');

-- =====================
-- POSTS (50)
-- =====================
INSERT INTO posts (author_id, title, slug, body, language, published) VALUES

-- tanaka_dev (1) - Japanese posts
(1, 'Spring BootとKotlinを組み合わせる理由', 'spring-boot-kotlin-reasons',
'# Spring BootとKotlinを組み合わせる理由

JavaからKotlinに移行   て半年が経ちました。その理由と実際の経験を共有します。

## Null安全性

KotlinはNull安全をコンパイル時に保証します。

```kotlin
val name: String? = null
val length = name?.length ?: 0
```

## データクラス

```kotlin
data class UserDTO(
    val id: Long,
    val username: String,
    val email: String
)
```

ボイラープレートが大幅に減りました。Javaと比べると生産性が上がったと感じています。', 'ja', true),

(1, '日本のコードレビュー文化について', 'japan-code-review-culture',
'# 日本のコードレビュー文化について

外資系企業と日系企業でコードレビューのスタイルが大きく違うと感じています。

## 日系企業の特徴

- 丁寧な言葉遣い
- 修正依頼より提案という形式
- チーム全員のサインオフが必要なことも

## 外資系の特徴

- 直接的なフィードバック
- 速いイテレーション
- 少人数での承認

どちらが良いとは言えませんが、文化の違いを理解することが重要です。', 'ja', true),

(1, 'Java 21の新機能まとめ', 'java-21-new-features',
'# Java 21の新機能まとめ

Java 21はLTSリリースとして重要なアップデートがあります。

## Virtual Threads

```java
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    executor.submit(() -> System.out.println("Virtual thread!"));
}
```

## Record Patterns

```java
if (obj instanceof Point(int x, int y)) {
    System.out.println("x=" + x + ", y=" + y);
}
```

パフォーマンスと開発体験の両方が改善されました。', 'ja', true),

(1, 'マイクロサービスの落とし穴', 'microservices-pitfalls',
'# マイクロサービスの落とし穴

マイクロサービスは銀の弾丸ではありません。実際に経験した問題を共有します。

## 分散トランザクション

単一のデータベーストランザクションが複数サービスにまたがると一貫性の保証が難しくなります。

## デバッグの複雑さ

ローカルで全サービスを動かすのが大変です。

## ネットワーク遅延

サービス間通信のオーバーヘッドを常に意識する必要があります。

モノリスから始めて、本当に必要になったときに分割することをお勧めします。', 'ja', true),

(1, 'チームでのGit運用ベストプラクティス', 'git-team-best-practices',
'# チームでのGit運用ベストプラクティス

5人以上のチームで効果的にGitを使うためのルールを紹介します。

## コミットメッセージの規約

```
feat: ユーザー認証機能を追加
fix: ログイン時のバグを修正
refactor: DTOマッパーを整理
```

## ブランチ戦略

- `main` - 本番環境
- `develop` - 開発環境
- `feature/xxx` - 機能開発

## コードレビュー

PRは小さく保つことが重要です。大きなPRはレビューが雑になりがちです。', 'ja', true),

-- sarah_codes (2) - English posts
(2, 'Surviving Your First Japanese Tech Interview', 'surviving-japanese-tech-interview',
'# Surviving Your First Japanese Tech Interview

After three failed attempts and one success, here is everything I wish I had known.

## The Process is Longer Than You Think

Japanese companies typically have 3-5 interview rounds. Be patient.

## Technical Tests

Many companies use coding tests on platforms like HackerRank or their own systems. Brush up on algorithms - they take them seriously here.

## The Cultural Fit Interview

This is often the most important round. They want to know:

- Why Japan specifically?
- Long term career goals
- How you handle conflict in a team

## My Advice

**Learn basic Japanese.** Even a conversational level shows serious commitment and will set you apart from other foreign candidates.', 'en', true),

(2, 'What Nobody Tells You About Working in Japanese Tech', 'working-japanese-tech-reality',
'# What Nobody Tells You About Working in Japanese Tech

I have been here two years now. Here is the unfiltered truth.

## The Good

- Job security is genuinely different here
- Teams are collaborative, not competitive
- Work quality is taken very seriously

## The Challenging

- Decision making is slow (nemawashi is real)
- Overtime culture still exists in many places
- Documentation is often in Japanese only

## The Surprising

The attention to detail is incredible. Code reviews are thorough and respectful. Nobody ships something they are not proud of.

Overall? I would not trade it. But go in with realistic expectations.', 'en', true),

(2, 'React vs Vue: A Frontend Dev in Japan Weighs In', 'react-vs-vue-japan-perspective',
'# React vs Vue: A Frontend Dev in Japan Weighs In

Having worked at two Japanese companies - one React shop, one Vue shop - here is my honest comparison.

## React in Japan

React is dominant in startups and foreign-affiliated companies. The ecosystem is huge and hiring is easier.

## Vue in Japan

Vue has a surprisingly strong following in Japan. Many mid-size Japanese companies use it. The documentation in Japanese is excellent.

## My Take

For career flexibility in Japan, **React** is the safer bet. But Vue is genuinely pleasant to work with and you should not dismiss it.

```tsx
// React
const [count, setCount] = useState(0);

// Vue
const count = ref(0);
```

Both are good. Choose based on your team, not hype.', 'en', true),

(2, 'How I Learned Japanese Through Code', 'learning-japanese-through-code',
'# How I Learned Japanese Through Code

Unconventional method? Maybe. Effective? Absolutely.

## Reading Error Messages

Japanese stack traces and error messages forced me to learn technical vocabulary fast. Nothing motivates like a production bug at 2am.

## Commenting in Japanese

I started writing my code comments in Japanese. My colleagues appreciated it and corrected my grammar naturally.

## Reading Japanese Tech Blogs

Zenn and Qiita are goldmines. The technical content is high quality and the Japanese is consistent.

## Result

After 18 months of this approach, I passed JLPT N3. Not fluent, but functional enough for daily work communication.', 'en', true),

(2, 'Building Accessible UIs for Japanese Users', 'accessible-ui-japanese-users',
'# Building Accessible UIs for Japanese Users

Accessibility in Japan has some unique challenges worth knowing about.

## Font Size

Japanese characters are complex. The minimum readable size is larger than Latin text - aim for 14px minimum.

## Furigana Support

For content that might be read by older users, consider adding furigana support for kanji.

## Color Contrast

Japanese design often favors subtle colors that can fail WCAG contrast ratios. Push back on this.

## Screen Readers

NVDA and PC-Talker are common in Japan. Test with both if you can.

The web should work for everyone. Japanese users deserve the same accessibility standards as anyone else.', 'en', true),

-- yamamoto_k (3) - Japanese posts
(3, 'Kubernetesクラスターの監視設計', 'kubernetes-monitoring-design',
'# Kubernetesクラスターの監視設計

本番環境で2年間Kubernetesを運用した経験から監視の設計をまとめます。

## 3つの柱

1. **メトリクス** - Prometheus + Grafana
2. **ログ** - Fluentd + Elasticsearch
3. **トレース** - Jaeger

## アラートの設計

アラートは多すぎると無視されます。本当に重要なものだけに絞ることが大切です。

```yaml
- alert: HighErrorRate
  expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.1
  for: 5m
```

## 教訓

深夜のアラートで目が覚めた回数は数えきれません。適切な閾値設定が睡眠を守ります。', 'ja', true),

(3, 'インシデント対応の記録', 'incident-response-log',
'# インシデント対応の記録

先月の大規模障害から学んだことを共有します（詳細は伏せます）。

## 何が起きたか

データベース接続プールの枯渇により、APIが全台503を返し始めました。

## 初動対応

1. アラート受信（深夜2時   
2. ステータスページ更新
3. 原因調査開始

## 根本原因

コネクションリークが徐々に蓄積していたことが判明。定期的なモニタリングで早期発見できたはずです。

## 再発防止

- コネクション数のダッシュボード追加
- 週次レビューの実施

失敗から学ぶことが大切です。', 'ja', true),

(3, 'SREとして働くということ', 'working-as-sre-japan',
'# SREとして働くということ

日本でSREとして3年働いた経験を振り返ります。

## 開発とインフラの橋渡し

SREの役割は単なるインフラ管理ではありません。開発チームと協力して信頼性を作り込むことです。

## エラーバジェット

```
エラーバジェット = 1 - SLO
例: 99.9%のSLOなら月43分のダウンタイムが許容範囲
```

## 日本企業でのSRE

まだSREという概念が浸透していない企業も多く、インフラエンジニアとの区別が曖昧なことがあります。

啓蒙活動も仕事のうちだと思っています。', 'ja', true),

-- mike_in_tokyo (4) - English posts
(4, 'Getting a Developer Visa for Japan: Complete Guide', 'developer-visa-japan-guide',
'# Getting a Developer Visa for Japan: Complete Guide

I went through this process two years ago. Here is everything you need to know.

## The Engineer/Specialist in Humanities Visa

This is the most common visa for software engineers. Requirements:

- A job offer from a Japanese company
- Relevant degree OR 10 years of experience
- Clean immigration record

## The Process Timeline

1. Company submits Certificate of Eligibility (COE) application
2. Wait 1-3 months for COE
3. Apply at Japanese embassy in your country
4. Receive visa within 5 business days

## Tips

- Your company HR will handle most of this
- Keep all your educational documents certified and translated
- Start the process early - COE can take longer than expected

Feel free to ask questions in the comments.', 'en', true),

(4, 'Culture Shock: My First Week at a Japanese Company', 'culture-shock-japanese-company',
'# Culture Shock: My First Week at a Japanese Company

Nothing could have fully prepared me for this. Here is what surprised me most.

## The Business Card Ceremony

I knew about meishi koukan intellectually. Experiencing it is different. I nearly committed several etiquette crimes before a colleague saved me.

## Meeting Culture

Meetings here are for consensus confirmation, not decision making. Decisions happen in smaller conversations beforehand (nemawashi). This confused me for months.

## The Silence

In Western meetings, silence feels awkward. Here it means people are thinking. Do not rush to fill it.

## The After Work Drinks

Nomikai are optional but socially important. I go when I can. My Japanese improved dramatically from these evenings.

Three years in, I still learn something new about the culture every month.', 'en', true),

(4, 'Remote Work in Japan: The Reality', 'remote-work-japan-reality',
'# Remote Work in Japan: The Reality

Post-COVID, remote work in Japan is... complicated.

## The Progress

Many companies adopted hybrid models. This is real progress compared to 2019.

## The Resistance

Some companies have reversed course entirely. The hanko culture and in-person communication preference run deep.

## For Foreign Engineers

Remote work is actually more accessible for us. International hiring often comes with remote-first arrangements.

## My Current Situation

Hybrid: 3 days office, 2 days home. Honestly it works well. I get the social benefits of office time without the daily commute exhaustion.

The trend is positive but do not expect full remote at a traditional Japanese company anytime soon.', 'en', true),

(4, 'Salary Negotiation in Japan as a Foreign Engineer', 'salary-negotiation-japan-foreign',
'# Salary Negotiation in Japan as a Foreign Engineer

This topic does not get discussed enough. Let me be direct.

## The Myth

"Japanese companies have fixed salary bands, you cannot negotiate."

This is partially true for new graduates. For experienced foreign engineers, it is largely false.

## What You Can Negotiate

- Base salary (within band, sometimes above)
- Housing allowance
- Language allowance (yes, this is a thing)
- Remote work flexibility

## How to Negotiate

Research market rates on:
- OpenWork (日本語)
- Glassdoor
- Levels.fyi

Come with data. Japanese managers respond to data.

## My Experience

I negotiated 15% above the initial offer by presenting market comparables. Politely. With data. It worked.', 'en', true),

-- suzuki_ai (5) - Japanese posts
(5, '日本語NLPの現状と課題', 'japanese-nlp-current-state',
'# 日本語NLPの現状と課題

日本語は自然言語処理において特有の難しさがあります。

## 分かち書きの問題

英語と違い、日本語は単語間にスペースがありません。

```python
import fugashi
tagger = fugashi.Tagger()
text = "東京で働くエンジニアです"
for word in tagger(text):
    print(word.surface)
```

## 敬語の処理

敬語、丁寧語、謙譲語の区別は感情分析を複雑にします。

## 今後の展望

LLMの発展により、日本語NLPは急速に改善されています。GPT-4やClaude 3の日本語能力は2年前とは別物です。', 'ja', true),

(5, 'PyTorchで始める機械学習入門', 'pytorch-ml-introduction',
'# PyTorchで始める機械学習入門

機械学習を始めたいエンジニア向けの実践的な入門です。

## テンソルの基本

```python
import torch

x = torch.tensor([1.0, 2.0, 3.0])
y = torch.tensor([4.0, 5.0, 6.0])
print(x + y)  # tensor([5., 7., 9.])
```

## 簡単なニューラルネットワーク

```python
import torch.nn as nn

model = nn.Sequential(
    nn.Linear(10, 64),
    nn.ReLU(),
    nn.Linear(64, 1)
)
```

## おすすめリソース

- PyTorch公式チュートリアル（日本語あり）
- fast.ai
- Kaggle

焦らず基礎から積み上げることが大切です。', 'ja', true),

-- lars_jp (6) - English posts
(6, 'Agile in Japan: What Works and What Doesn''t', 'agile-japan-what-works',
'# Agile in Japan: What Works and What Doesn''t

I have been running Agile ceremonies at a Japanese startup for 18 months. Here is my honest assessment.

## What Works Well

**Daily standups** translate perfectly. The format respects everyone''s time and the structured nature appeals to Japanese work culture.

**Retrospectives** work surprisingly well once trust is established. Teams are honest in writing even when they are not verbally.

## What Struggles

**Sprint planning** can be slow. Consensus-building takes time and two-week sprints can feel rushed.

**Saying no to scope creep** is culturally difficult. "The customer is always right" runs deep.

## My Adaptation

I added a written pre-meeting where everyone shares thoughts before the actual meeting. Participation went up significantly.

Culture is not an obstacle to Agile - it is a design constraint.', 'en', true),

(6, 'Working at a Japanese Startup vs Enterprise', 'japanese-startup-vs-enterprise',
'# Working at a Japanese Startup vs Enterprise

I have done both. Here is the comparison nobody writes honestly about.

## The Startup

**Pros:**
- English is often the working language
- More autonomy
- Faster decisions
- International team

**Cons:**
- Less job security
- Visa complications if company fails
- Benefits are fewer

## The Enterprise

**Pros:**
- Visa stability
- Strong benefits (housing allowance etc)
- Deep learning about Japanese business culture

**Cons:**
- Slow decision making
- Often Japanese-only communication
- Career growth can be opaque

## My Recommendation for New Arrivals

Start with a mid-size company or foreign-affiliated firm. You get stability without the full rigidity of a large Japanese enterprise.', 'en', true),

-- nakamura_t (7) - Japanese posts
(7, 'SwiftUIとUIKitの使い分け', 'swiftui-vs-uikit-japan',
'# SwiftUIとUIKitの使い分け

2024年現在、iOSアプリ開発においてSwiftUIとUIKitをどう使い分けるべきか考えます。

## SwiftUIを   うべき場面

- 新規プロジェクト
- iOS 16以上のみサポート
- シンプルなUI

## UIKitを使うべき場面

- 既存の大規模コードベース
- 複雑なアニメーション
- UICollectionViewの高度なカスタマイズ

## 現実

日本のゲーム会社では、まだUIKitが主流です。SwiftUIの採用は増えていますが、完全移行には時間がかかりそうです。

個人的にはSwiftUIが好きですが、現場ではUIKitも書けることが重要です。', 'ja', true),

(7, 'ゲーム会社でエンジニアとして働くということ', 'working-game-company-engineer',
'# ゲーム会社でエンジニアとして働くということ

ゲーム会社のエンジニア職は他の業界と少し違います。

## 良いところ

- ゲームが好きな人が集まっている
- 技術的に面白い問題が多い
- 社内ゲームが遊び放題

## 大変なところ

- リリース前は忙しい
- ゲームの品質へのこだわりが強く、仕様変更が多い
- 課金系のシステムは責任が重い

## 技術スタック

iOSエンジニアとして、Swift + Unityのブリッジ部分を担当することが多いです。Unityは独特の世界観があって面白いです。

ゲームが好きなら、おすすめの職場環境です。', 'ja', true),

-- priya_dev (8) - English posts
(8, 'From India to Japan: A Developer''s Immigration Journey', 'india-to-japan-developer-immigration',
'# From India to Japan: A Developer''s Immigration Journey

This is the post I wish I had found when I was researching the move.

## Why Japan

The combination of technical excellence, quality of life, and career opportunity was compelling. Also I had been studying Japanese for two years.

## The Job Search

I applied from India while employed. Six months of evenings and weekends on applications, technical tests, and video interviews.

**What worked:**
- LinkedIn with Japanese language skills listed prominently
- Applying to foreign-affiliated Japanese companies first
- Being flexible on location (not just Tokyo)

## The Visa Process

My company handled the CoE application. It took 11 weeks. During that time I handed in my notice and packed.

## The Reality Check

The first three months were genuinely hard. The language barrier is real even with N2. Give yourself grace.

One year in - absolutely no regrets.', 'en', true),

(8, 'Technical Interview Prep for Japanese Companies', 'tech-interview-prep-japanese-companies',
'# Technical Interview Prep for Japanese Companies

Based on my experience interviewing at 8 Japanese companies.

## What They Test

Most companies test:
1. Data structures and algorithms (LeetCode medium difficulty)
2. System design (for senior roles)
3. Code review ability (reading and critiquing code)

## What Is Different From Western Companies

- Less competitive programming focus
- More practical coding exercises
- System design is less abstract, more business-focused

## The Coding Test Format

Many Japanese companies use their own internal tests, not LeetCode. They often involve:
- Building a small feature
- Fixing bugs in existing code
- Writing tests

## My Prep Strategy

1. LeetCode easy/medium for 4 weeks
2. System design study
3. Read about the company in Japanese (shows initiative)

## Resources

- Paiza (Japanese coding platform, very useful)
- AtCoder (competitive programming, popular in Japan)', 'en', true),

-- kobayashi_r (9) - Japanese posts
(9, 'フクオカのエンジニア事情', 'fukuoka-engineer-scene',
'# フクオカのエンジニア事情

東京以外でエンジニアとして働くことを考えている方へ。

## フクオカの魅力

- 生活コストが東京の約60%
- スタートアップ支援が充実
- 自然と都市のバランス
- 食べ物が美味しい（重要）

## エンジニア市場

フクオカのIT企業は増えています。特にスタートアップシーン。ただし東京と比べると求人数は少ないです。

## リモートワークとの相性

東京の  社でリモートワークしながらフクオカに住む、というパターンが増えています。これは賢いと思います。

## 海外エンジニアへ

フクオカは英語が通じる場所も増えており、国際化が進んでいます。東京にこだわらない選択肢として検討してみてください。', 'ja', true),

(9, 'コードレビューで成長するための心構え', 'code-review-growth-mindset',
'# コードレビューで成長するための心構え

3年間のコードレビューから学んだことをまとめます。

## レビューを受ける側として

批判ではなく学びの機会として捉えること。最初は難しいですが、慣れると宝の山です。

## レビューする側として

```
Bad: "これは間違っています"
Good: "こうすると〜の理由でより良くなると思います"
```

## 具体的なテクニック

1. コメントは質問形式にする
2. 良いコードは褒める
3. nit（細かい指摘）はnit:とラベルする

## 文化的な観点

日本のチームでは、直接的な批判は避ける傾向があります。これはコードレビューでも同様です。丁寧さと明確さのバランスが大切です。', 'ja', true),

(9, 'Spring BootとReactの組み合わせで感じること', 'spring-boot-react-thoughts',
'# Spring BootとReactの組み合わせで感じること

フルスタックとして両方書いて気づいたことを共有します。

## 良い点

- バックエンドとフロントエンドの責務が明確
- 型安全性がTypeScript + Javaの組み合わせで向上
- APIファーストな設計が自然と身につく

## 大変な点

- コンテキストスイッチが多い
- デプロイの複雑さ
- CORSの設定でよく詰まる（笑）

## おすすめの構成

```
backend/  - Spring Boot (Gradle)
frontend/ - Next.js (TypeScript)
```

モノレポにすることでGit管理が楽になります。

フルスタックは大変ですが、全体を把握できる楽しさがあります。', 'ja', true),

-- emma_tokyo (10) - English posts
(10, 'Design Systems in Japanese Companies: A UX Engineer''s View', 'design-systems-japanese-companies',
'# Design Systems in Japanese Companies: A UX Engineer''s View

Two years building and evangelising design systems in Japan. Here is what I learned.

## The Challenge

Japanese web design has strong conventions. Users expect dense information layouts that feel cluttered to Western eyes. Both are valid - they serve different cognitive models.

## Building Buy-In

The concept of a design system did not exist at my first company. I introduced it gradually:

1. Started with a color token document
2. Added spacing scale
3. Built the first component (a button)
4. Let the component library grow organically

## The Result

After 18 months we had 40 components and onboarding new frontend engineers took days instead of weeks.

## My Advice

Call it a "component library" not a "design system" in Japan. The former sounds practical, the latter sounds academic.', 'en', true),

(10, 'Accessibility Is Not a Western Concept', 'accessibility-not-western-concept',
'# Accessibility Is Not a Western Concept

I hear "accessibility is less important in Japan" sometimes. I want to push back on this.

## Japan Has Strong Accessibility Laws

The Act for Eliminating Discrimination against Persons with Disabilities (障害者差別解消法) has real implications for digital products.

## The Aging Population

Japan has the world''s oldest population. Designing for older users is not a nice-to-have, it is a business necessity.

## What I See in Practice

Many Japanese web products fail basic accessibility checks. This is a gap and an opportunity.

## What You Can Do

Start with the basics:
- Sufficient color contrast
- Keyboard navigation
- Screen reader testing
- Meaningful alt text

These four things alone would improve most Japanese websites significantly.

Accessibility is good design. Full stop.', 'en', true),

(10, 'Tokyo vs Osaka for Tech Workers: An Honest Comparison', 'tokyo-vs-osaka-tech-workers',
'# Tokyo vs Osaka for Tech Workers: An Honest Comparison

I have lived in both. Here is my comparison.

## Jobs

Tokyo wins. The concentration of tech companies, especially international ones, is unmatched. Osaka is growing but Tokyo is still far ahead.

## Cost of Living

Osaka wins. Rent is roughly 30% cheaper. Food is cheaper and, many argue, better.

## Quality of Life

This is personal. Tokyo is electric and exhausting. Osaka is friendlier and more relaxed. I preferred Osaka for day-to-day life.

## For Foreign Engineers

Tokyo is the safer career choice. More English-friendly environments, more international companies, larger expat community.

## My Conclusion

Build your career in Tokyo. Consider Osaka once you are established and remote work is possible. Or just enjoy both - the shinkansen makes the commute between them absurdly easy.', 'en', true),

-- More posts to reach 50
(2, 'TypeScript Tips I Use Every Day', 'typescript-tips-daily',
'# TypeScript Tips I Use Every Day

After two years of TypeScript in production, these are the patterns I reach for constantly.

## Optional Chaining

```typescript
const name = user?.profile?.displayName ?? "Anonymous";
```

## Type Guards

```typescript
function isString(value: unknown): value is string {
    return typeof value === "string";
}
```

## Utility Types

```typescript
type PartialUser = Partial<User>;
type ReadonlyConfig = Readonly<Config>;
type UserKeys = keyof User;
```

## Generic Constraints

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}
```

Small things that make the codebase significantly more maintainable.', 'en', true),

(4, 'Japanese Tech Vocabulary Every Foreign Engineer Needs', 'japanese-tech-vocabulary',
'# Japanese Tech Vocabulary Every Foreign Engineer Needs

You do not need to be fluent to work in Japan. But these words will save you in meetings.

## Essential Terms

| Japanese | Romaji | Meaning |
|----------|--------|---------|
| 仕様 | shiyou | Specification |
| 不具合 | fuguai | Bug |
| 改修 | kaishuu | Fix/Improvement |
| 本番 | honban | Production |
| 開発 | kaihatsu | Development |
| リリース | riirisu | Release |

## In Meetings

- **確認します** (kakunin shimasu) - I will confirm
- **大丈夫です** (daijoubu desu) - It is fine / No problem
- **少々お待ちください** (shoushou omachi kudasai) - Please wait a moment

## On Slack

Japanese engineers use a lot of emoji and short acknowledgements. **了解** (ryoukai) means understood. **承知しました** (shouchi shimashita) is more formal.

Print this out. Seriously.', 'en', true),

(6, 'The Art of Reading Japanese Job Descriptions', 'reading-japanese-job-descriptions',
'# The Art of Reading Japanese Job Descriptions

Japanese job postings have patterns once you know what to look for.

## Red Flags

- **自己成長意欲** (self-growth motivation) without specifics - often means long hours
- **風通しの良い職場** (good communication) - sometimes means the opposite
- **裁量労働制** (discretionary labor system) - research this carefully

## Green Flags

- Specific tech stack listed
- Concrete team size mentioned
- Clear remote work policy
- Salary range published (this is still rare but increasing)

## The Unstated Requirements

Many Japanese postings understate Japanese language requirements. If the entire posting is in Japanese and they mention "global team," assume N2 minimum is expected.

## My Process

Use DeepL, then cross-reference with Glassdoor Japan and OpenWork for culture information. Never apply based on the job posting alone.', 'en', true),

(8, 'N2 Japanese: Is It Really Enough for Tech Work?', 'n2-japanese-tech-work',
'# N2 Japanese: Is It Really Enough for Tech Work?

Short answer: depends on the company. Long answer: read on.

## Where N2 Is Enough

- International tech companies with Japanese offices
- Startups with English-friendly cultures
- Remote roles for overseas companies

## Where You Need More

- Traditional Japanese enterprises
- Client-facing roles
- Management positions

## The Gap Between JLPT and Real Usage

JLPT N2 tests reading and listening in formal contexts. Actual workplace Japanese involves:
- Keigo (honorific language)
- Technical jargon
- Fast casual conversation
- Regional dialects in some cases

## My Honest Assessment

I passed N2 and struggled my first six months. The test does not prepare you for the rhythm of real workplace conversation. Get as much listening practice as possible.', 'en', true),

(1, 'テスト駆動開発を日本のチームに導入した話', 'tdd-introduction-japanese-team',
'# テスト駆動開発を日本のチームに導入した話

TDDを懐疑的なチームに導入するまでの1年間を振り返ります。

## 最初の抵抗

「テストを先に書くと時間がかかる」という意見が多数でした。

## アプローチ

1. まず自分だけが実践してデモする
2. カバレッジの数値を見せる
3. バグ件数の変化を記録する

## 3ヶ月後

バグ起因の障害が40%減少。チームの興味が湧いてきました。

## 6ヶ月後

チームの半数がTDDを実践するように。

```java
@Test
void shouldReturnUserWhenValidIdProvided() {
    // given
    Long userId = 1L;
    User expectedUser = new User(userId, "testuser");
    when(userRepository.findById(userId)).thenReturn(Optional.of(expectedUser));

    // when
    User result = userService.getUserById(userId);

    // then
    assertThat(result).isEqualTo(expectedUser);
}
```

地道な積み重ねが文化を変えます。', 'ja', true),

(3, 'オンコール対応を人間的にする方法', 'humane-oncall-practices',
'# オンコール対応を人間的にする方法

SREとしてオンコールローテーションを改善した経験を共有します。

## 問題の把握

最初の状態：
- アラートが多すぎる（週100件超）
- 深夜の呼び出しが日常的
- チームの疲弊が深刻

## 改善のステップ

### Step 1: アラートの棚卸し

全アラートを「即時対応必要」「翌朝対応可」「不要」に分類。70%が後者2つでした。

### Step 2: ランブックの整備

手順書を整備することで、半寝状態でも対応できるように。

## 結果

3ヶ月でオンコールの呼び出し回数が60%減少。チームの満足度が向上しました。

エンジニアも人間です。', 'ja', true),

(5, 'AIエンジニアとして日本で働く', 'ai-engineer-working-japan',
'# AIエンジニアとして日本で働く

日本のAI業界の現状と、MLエンジニアとしての経験をまとめます。

## 市場の現状

日本のAI市場は急成長中ですが、人材不足が深刻です。特に自然言語処理の専門家は需要が高い。

## 日本語データの課題

高品質な日本語の教師データは英語に比べて少ないです。これは課題でもあり、チャンスでもあります。

## 給与水準

AIエンジニアの給与は上昇しています。大手企業では年収1000万円を超える求人も珍しくなくなりました。

## おすすめの学習リソース

- JSAI（人工知能学会）の論文
- PFN（Preferred Networks）のブログ
- Kaggleの日本語コンペ

この分野に興味がある方はぜひ話しましょう。', 'ja', true),

(7, 'モバイルアプリのパフォーマンス最適化', 'mobile-app-performance-optimization',
'# モバイルアプリのパフォーマンス最適化

ゲームアプリのパフォーマンスを改善した経験から学んだことを共有します。

## プロファイリングが最初

推測でなく計測から始めること。Xcodeのインストゥルメンツは強力なツールです。

## よくあるボトルネック

1. 不必要なUI更新
2. メインスレッドでのI/O処理
3. 画像のサイズ最適化不足

## 具体的な改善例

```swift
// Before: メインスレッドでデータ取得
func loadData() {
    let data = fetchFromAPI() // NG
    updateUI(data)
}

// After: バックグラウンドで処理
func loadData() {
    Task {
        let data = await fetchFromAPIAsync()
        await MainActor.run {
            updateUI(data)
        }
    }
}
```

地道な最適化の積み重ねがユーザー体験を大きく改善します。', 'ja', true),

(10, 'Why I Turned Down a 20% Raise to Stay in Japan', 'turned-down-raise-stay-japan',
'# Why I Turned Down a 20% Raise to Stay in Japan

A recruiter from a London company contacted me last month. The offer was genuinely good. I said no. Here is why.

## The Numbers

London offer: 20% higher base salary.
Tokyo reality: Lower taxes, subsidised housing, no commute costs.
Net difference: About 5% in London''s favour.

## The Quality of Life Calculation

Healthcare here is exceptional and affordable. The city is safe. The food is remarkable. Public transport is the best I have experienced anywhere.

## The Career Calculation

I am learning things in Japan I could not learn anywhere else. The problems are different. The constraints are different. This makes me a better engineer.

## The Honest Reason

I love it here. That is allowed to be a factor.

The right job is not always the highest-paying job.', 'en', true),

(9, 'なぜ私はコードレビューに時間をかけるのか', 'why-i-invest-in-code-review',
'# なぜ私はコードレビューに時間をかけるのか

コードレビューに週の20%の時間を使っています。それでも続ける理由。

## 技術的負債の予防

後で直すより、今指摘する方が10倍安い。これは経験上の確信です。

## チームの成長

コードレビューは最も効率的な技術移転の手段だと思っています。

## 自分自身の成長

他人のコードを読むことで、自分では気づかないパターンを発見できます。

## 数字で見ると

弊チームでは、コードレビューを徹底した四半期と緩めた四半期を比較したことがあります。

- 徹底した四半期：本番バグ 3件
- 緩めた四半期：本番バグ 11件

数字は嘘をつきません。', 'ja', true),

(2, 'The Loneliness Nobody Warns You About', 'loneliness-foreign-developer-japan',
'# The Loneliness Nobody Warns You About

This is the post I was too proud to write for two years.

## The First Six Months

I was so focused on work, on language study, on the excitement of a new country that I did not notice. Then I did.

## What It Looks Like

Not dramatic loneliness. Quiet loneliness. The kind where you have a great day and no one to tell about it.

## What Helped

**Finding a community.** DevJima type spaces - online and offline - where people share the same experience.

**Being honest with myself.** I needed to actively build friendships, not wait for them.

**The Japanese friends who were patient with my terrible Japanese.** I owe them a lot.

## Why I Am Writing This

Because someone moving here needs to read it. The adventure is real. The difficulty is also real. You can hold both.

It gets better. Much better. But knowing that the hard part is normal helps.', 'en', true),

(4, 'What 3 Years in Japan Taught Me About Software Quality', 'japan-software-quality-lessons',
'# What 3 Years in Japan Taught Me About Software Quality

Japanese engineering culture changed how I think about software permanently.

## Monozukuri Applies to Code

The craft of making things well is taken seriously here. Code is not just a means to an end - it is something to be proud of.

## The Cost of Bugs Is Understood

At my company, a production bug is treated as a serious event regardless of severity. Post-mortems are thorough and blameless.

## Testing Is Not Optional

The Japanese engineers I work with write more tests than any team I worked with in the US. Not because management requires it - because they care.

## What I Brought Back to My Thinking

- Slow down before shipping
- The next person to read this code is a colleague who deserves clarity
- Pride in craft is professional, not pretentious

I am a better engineer for having worked here.', 'en', true);

-- =====================
-- POST TAGS
-- =====================
-- career tag (1)
INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, 1 FROM posts p WHERE p.slug IN (
    'surviving-japanese-tech-interview',
    'getting-a-developer-visa-japan-guide',
    'salary-negotiation-japan-foreign',
    'india-to-japan-developer-immigration',
    'n2-japanese-tech-work',
    'japanese-startup-vs-enterprise',
    'ai-engineer-working-japan'
);

-- java tag (2)
INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, 2 FROM posts p WHERE p.slug IN (
    'spring-boot-kotlin-reasons',
    'java-21-new-features',
    'tdd-introduction-japanese-team',
    'spring-boot-react-thoughts'
);

-- culture tag (3)
INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, 3 FROM posts p WHERE p.slug IN (
    'japan-code-review-culture',
    'working-japanese-tech-reality',
    'culture-shock-japanese-company',
    'agile-japan-what-works',
    'loneliness-foreign-developer-japan',
    'japan-software-quality-lessons',
    'fukuoka-engineer-scene'
);

-- frontend tag (4)
INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, 4 FROM posts p WHERE p.slug IN (
    'react-vs-vue-japan-perspective',
    'typescript-tips-daily',
    'design-systems-japanese-companies',
    'accessible-ui-japanese-users',
    'swiftui-vs-uikit-japan'
);

-- career-advice tag (5)
INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, 5 FROM posts p WHERE p.slug IN (
    'salary-negotiation-japan-foreign',
    'surviving-japanese-tech-interview',
    'technical-interview-prep-japanese-companies',
    'reading-japanese-job-descriptions',
    'tokyo-vs-osaka-tech-workers',
    'turned-down-raise-stay-japan'
);

-- react tag (6)
INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, 6 FROM posts p WHERE p.slug IN (
    'react-vs-vue-japan-perspective',
    'typescript-tips-daily',
    'spring-boot-react-thoughts'
);

-- devlife tag (7)
INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, 7 FROM posts p WHERE p.slug IN (
    'working-japanese-tech-reality',
    'remote-work-japan-reality',
    'loneliness-foreign-developer-japan',
    'why-i-invest-in-code-review',
    'working-as-sre-japan',
    'working-game-company-engineer',
    'turned-down-raise-stay-japan'
);

-- interview tag (8)
INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, 8 FROM posts p WHERE p.slug IN (
    'surviving-japanese-tech-interview',
    'technical-interview-prep-japanese-companies',
    'reading-japanese-job-descriptions'
);
