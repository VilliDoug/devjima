-- =====================
-- DevJima Seed Data v2
-- =====================
-- Run this in Supabase SQL Editor
-- All user passwords: password123
-- BCrypt hash: $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVrSWAGSpa

-- Clear existing data
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
-- =====================
INSERT INTO users (username, email, password, display_name, bio, preferred_lang, role, country) VALUES
('tanaka_dev',    'tanaka@devjima.com',    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVrSWAGSpa', 'Tanaka Hiroshi',  'Backend engineer at a Tokyo fintech. Java lover, occasional Rust tinkerer.', 'ja', 'USER', 'Japan'),
('sarah_codes',   'sarah@devjima.com',     '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVrSWAGSpa', 'Sarah Mitchell',  'Canadian dev living in Osaka. Frontend at heart, full-stack by necessity.', 'en', 'USER', 'Canada'),
('yamamoto_k',    'yamamoto@devjima.com',  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVrSWAGSpa', 'Yamamoto Kenji',  'SRE at a major Japanese e-commerce company. Kubernetes and observability.', 'ja', 'USER', 'Japan'),
('mike_in_tokyo', 'mike@devjima.com',      '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVrSWAGSpa', 'Mike Peterson',   'American software engineer, 3 years in Tokyo. Bridging dev cultures.', 'en', 'USER', 'USA'),
('suzuki_ai',     'suzuki@devjima.com',    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVrSWAGSpa', 'Suzuki Aiko',     'ML engineer focused on NLP for Japanese language processing.', 'ja', 'USER', 'Japan'),
('lars_jp',       'lars@devjima.com',      '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVrSWAGSpa', 'Lars Eriksson',   'Swedish dev working remotely for a Japanese startup.', 'en', 'USER', 'Sweden'),
('nakamura_t',    'nakamura@devjima.com',  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVrSWAGSpa', 'Nakamura Tomo',   'iOS developer at a gaming company in Shibuya. Swift and UIKit.', 'ja', 'USER', 'Japan'),
('priya_dev',     'priya@devjima.com',     '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVrSWAGSpa', 'Priya Sharma',    'Indian engineer navigating the Japanese job market. Writes about visa processes.', 'en', 'USER', 'India'),
('kobayashi_r',   'kobayashi@devjima.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVrSWAGSpa', 'Kobayashi Ryo',   'Full-stack developer at a startup in Fukuoka. React and Spring Boot.', 'ja', 'USER', 'Japan'),
('emma_tokyo',    'emma@devjima.com',      '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LPVrSWAGSpa', 'Emma Clarke',     'British UX engineer in Tokyo. Obsessed with accessibility and design systems.', 'en', 'USER', 'UK');

-- =====================
-- TAGS (10)
-- =====================
INSERT INTO tags (name, slug) VALUES
('career',        'career'),
('java',          'java'),
('culture',       'culture'),
('frontend',      'frontend'),
('career-advice', 'career-advice'),
('react',         'react'),
('devlife',       'devlife'),
('interview',     'interview'),
('infrastructure','infrastructure'),
('mobile',        'mobile');

-- =====================
-- POSTS (50)
-- =====================
INSERT INTO posts (author_id, title, slug, body, language, published) VALUES
(1, 'Spring BootとKotlinを組み合わせる理由', 'spring-boot-kotlin-reasons',
'# Spring BootとKotlinを組み合わせる理由

JavaからKotlinに移行して半年が経ちました。その理由と実際の経験を共有します。

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

モノリスから始めて、本当に必要になったときに分割することをお勧めします。', 'ja', true),

(1, 'テスト駆動開発を日本のチームに導入した話', 'tdd-introduction-japanese-team',
'# テスト駆動開発を日本のチームに導入した話

TDDを懐疑的なチームに導入するまでの1年間を振り返ります。

## 最初の抵抗

「テストを先に書くと時間がかかる」という意見が多数でした。

## 結果

バグ起因の障害が40%減少。チームの半数がTDDを実践するように。

```java
@Test
void shouldReturnUserWhenValidIdProvided() {
    Long userId = 1L;
    User expectedUser = new User(userId, "testuser");
    when(userRepository.findById(userId)).thenReturn(Optional.of(expectedUser));
    User result = userService.getUserById(userId);
    assertThat(result).isEqualTo(expectedUser);
}
```', 'ja', true),

(2, 'Surviving Your First Japanese Tech Interview', 'surviving-japanese-tech-interview',
'# Surviving Your First Japanese Tech Interview

After three failed attempts and one success, here is everything I wish I had known.

## The Process is Longer Than You Think

Japanese companies typically have 3-5 interview rounds. Be patient.

## Technical Tests

Many companies use coding tests on platforms like HackerRank. Brush up on algorithms.

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

- Decision making is slow
- Overtime culture still exists in many places

Overall? I would not trade it. But go in with realistic expectations.', 'en', true),

(2, 'React vs Vue: A Frontend Dev in Japan Weighs In', 'react-vs-vue-japan-perspective',
'# React vs Vue: A Frontend Dev in Japan Weighs In

Having worked at two Japanese companies - one React shop, one Vue shop - here is my honest comparison.

## React in Japan

React is dominant in startups and foreign-affiliated companies.

## Vue in Japan

Vue has a surprisingly strong following in Japan. The documentation in Japanese is excellent.

## My Take

For career flexibility in Japan, **React** is the safer bet.', 'en', true),

(2, 'How I Learned Japanese Through Code', 'learning-japanese-through-code',
'# How I Learned Japanese Through Code

Unconventional method? Maybe. Effective? Absolutely.

## Reading Error Messages

Japanese stack traces forced me to learn technical vocabulary fast.

## Commenting in Japanese

I started writing my code comments in Japanese. My colleagues appreciated it and corrected my grammar naturally.

## Result

After 18 months, I passed JLPT N3.', 'en', true),

(2, 'The Loneliness Nobody Warns You About', 'loneliness-foreign-developer-japan',
'# The Loneliness Nobody Warns You About

This is the post I was too proud to write for two years.

## What It Looks Like

Not dramatic loneliness. Quiet loneliness. The kind where you have a great day and no one to tell about it.

## What Helped

Finding a community. DevJima type spaces where people share the same experience.

It gets better. Much better.', 'en', true),

(3, 'Kubernetesクラスターの監視設計', 'kubernetes-monitoring-design',
'# Kubernetesクラスターの監視設計

本番環境で2年間Kubernetesを運用した経験から監視の設計をまとめます。

## 3つの柱

1. **メトリクス** - Prometheus + Grafana
2. **ログ** - Fluentd + Elasticsearch
3. **トレース** - Jaeger

```yaml
- alert: HighErrorRate
  expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.1
  for: 5m
```

深夜のアラートで目が覚めた回数は数えきれません。', 'ja', true),

(3, 'インシデント対応の記録', 'incident-response-log',
'# インシデント対応の記録

先月の大規模障害から学んだことを共有します。

## 何が起きたか

データベース接続プールの枯渇により、APIが全台503を返し始めました。

## 根本原因

コネクションリークが徐々に蓄積していたことが判明。

## 再発防止

- コネクション数のダッシュボード追加
- 週次レビューの実施

失敗から学ぶことが大切です。', 'ja', true),

(3, 'SREとして働くということ', 'working-as-sre-japan',
'# SREとして働くということ

日本でSREとして3年働いた経験を振り返ります。

## 開発とインフラの橋渡し

SREの役割は単なるインフラ管理ではありません。

## エラーバジェット

```
エラーバジェット = 1 - SLO
例: 99.9%のSLOなら月43分のダウンタイムが許容範囲
```

啓蒙活動も仕事のうちだと思っています。', 'ja', true),

(3, 'オンコール対応を人間的にする方法', 'humane-oncall-practices',
'# オンコール対応を人間的にする方法

3ヶ月でオンコールの呼び出し回数が60%減少。チームの満足度が向上しました。

## 改善のステップ

全アラートを「即時対応必要」「翌朝対応可」「不要」に分類。70%が後者2つでした。

エンジニアも人間です。', 'ja', true),

(4, 'Getting a Developer Visa for Japan: Complete Guide', 'developer-visa-japan-guide',
'# Getting a Developer Visa for Japan: Complete Guide

## The Engineer Visa Requirements

- A job offer from a Japanese company
- Relevant degree OR 10 years of experience
- Clean immigration record

## The Process Timeline

1. Company submits Certificate of Eligibility
2. Wait 1-3 months for COE
3. Apply at Japanese embassy

Feel free to ask questions in the comments.', 'en', true),

(4, 'Culture Shock: My First Week at a Japanese Company', 'culture-shock-japanese-company',
'# Culture Shock: My First Week at a Japanese Company

## Meeting Culture

Meetings here are for consensus confirmation, not decision making. Decisions happen beforehand (nemawashi). This confused me for months.

## The Silence

In Western meetings, silence feels awkward. Here it means people are thinking. Do not rush to fill it.

Three years in, I still learn something new about the culture every month.', 'en', true),

(4, 'Salary Negotiation in Japan as a Foreign Engineer', 'salary-negotiation-japan-foreign',
'# Salary Negotiation in Japan as a Foreign Engineer

## The Myth

"Japanese companies have fixed salary bands, you cannot negotiate." This is largely false for experienced foreign engineers.

## How to Negotiate

Come with data from OpenWork, Glassdoor, and Levels.fyi.

## My Experience

I negotiated 15% above the initial offer by presenting market comparables. Politely. With data. It worked.', 'en', true),

(4, 'Remote Work in Japan: The Reality', 'remote-work-japan-reality',
'# Remote Work in Japan: The Reality

## The Progress

Many companies adopted hybrid models. This is real progress compared to 2019.

## My Current Situation

Hybrid: 3 days office, 2 days home. Honestly it works well.

Do not expect full remote at a traditional Japanese company anytime soon.', 'en', true),

(4, 'What 3 Years in Japan Taught Me About Software Quality', 'japan-software-quality-lessons',
'# What 3 Years in Japan Taught Me About Software Quality

## Monozukuri Applies to Code

The craft of making things well is taken seriously here.

## Testing Is Not Optional

The Japanese engineers I work with write more tests than any team I worked with in the US. Not because management requires it - because they care.

I am a better engineer for having worked here.', 'en', true),

(5, '日本語NLPの現状と課題', 'japanese-nlp-current-state',
'# 日本語NLPの現状と課題

## 分かち書きの問題

英語と違い、日本語は単語間にスペースがありません。

```python
import fugashi
tagger = fugashi.Tagger()
text = "東京で働くエンジニアです"
for word in tagger(text):
    print(word.surface)
```

LLMの発展により、日本語NLPは急速に改善されています。', 'ja', true),

(5, 'PyTorchで始める機械学習入門', 'pytorch-ml-introduction',
'# PyTorchで始める機械学習入門

```python
import torch
import torch.nn as nn

model = nn.Sequential(
    nn.Linear(10, 64),
    nn.ReLU(),
    nn.Linear(64, 1)
)
```

焦らず基礎から積み上げることが大切です。', 'ja', true),

(5, 'AIエンジニアとして日本で働く', 'ai-engineer-working-japan',
'# AIエンジニアとして日本で働く

日本のAI市場は急成長中ですが、人材不足が深刻です。

## 給与水準

AIエンジニアの給与は上昇しています。大手企業では年収1000万円を超える求人も珍しくなくなりました。

この分野に興味がある方はぜひ話しましょう。', 'ja', true),

(6, 'Agile in Japan: What Works and What Doesn''t', 'agile-japan-what-works',
'# Agile in Japan: What Works and What Doesn''t

## What Works Well

**Daily standups** translate perfectly. The structured nature appeals to Japanese work culture.

## What Struggles

**Sprint planning** can be slow. Consensus-building takes time.

Culture is not an obstacle to Agile - it is a design constraint.', 'en', true),

(6, 'Working at a Japanese Startup vs Enterprise', 'japanese-startup-vs-enterprise',
'# Working at a Japanese Startup vs Enterprise

## The Startup

Pros: English working language, more autonomy, faster decisions.
Cons: Less job security, visa complications if company fails.

## The Enterprise

Pros: Visa stability, strong benefits.
Cons: Slow decision making, Japanese-only communication.

Start with a mid-size company or foreign-affiliated firm.', 'en', true),

(6, 'The Art of Reading Japanese Job Descriptions', 'reading-japanese-job-descriptions',
'# The Art of Reading Japanese Job Descriptions

## Red Flags

- **裁量労働制** (discretionary labor system) - research this carefully
- **自己成長意欲** without specifics - often means long hours

## Green Flags

- Specific tech stack listed
- Salary range published

Never apply based on the job posting alone.', 'en', true),

(7, 'SwiftUIとUIKitの使い分け', 'swiftui-vs-uikit-japan',
'# SwiftUIとUIKitの使い分け

## SwiftUIを使うべき場面

- 新規プロジェクト
- iOS 16以上のみサポート

## UIKitを使うべき場面

- 既存の大規模コードベース
- 複雑なアニメーション

現場ではUIKitも書けることが重要です。', 'ja', true),

(7, 'ゲーム会社でエンジニアとして働くということ', 'working-game-company-engineer',
'# ゲーム会社でエンジニアとして働くということ

## 良いところ

- ゲームが好きな人が集まっている
- 技術的に面白い問題が多い

## 大変なところ

- リリース前は忙しい
- 課金系のシステムは責任が重い

ゲームが好きなら、おすすめの職場環境です。', 'ja', true),

(7, 'モバイルアプリのパフォーマンス最適化', 'mobile-app-performance-optimization',
'# モバイルアプリのパフォーマンス最適化

```swift
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

(8, 'From India to Japan: A Developer''s Immigration Journey', 'india-to-japan-developer-immigration',
'# From India to Japan: A Developer''s Immigration Journey

## The Job Search

Six months of evenings and weekends on applications, technical tests, and video interviews.

**What worked:**
- LinkedIn with Japanese language skills listed prominently
- Applying to foreign-affiliated Japanese companies first

One year in - absolutely no regrets.', 'en', true),

(8, 'Technical Interview Prep for Japanese Companies', 'tech-interview-prep-japanese-companies',
'# Technical Interview Prep for Japanese Companies

## What They Test

1. Data structures and algorithms (LeetCode medium)
2. System design (for senior roles)
3. Code review ability

## Resources

- Paiza (Japanese coding platform, very useful)
- AtCoder (competitive programming, popular in Japan)', 'en', true),

(8, 'N2 Japanese: Is It Really Enough for Tech Work?', 'n2-japanese-tech-work',
'# N2 Japanese: Is It Really Enough for Tech Work?

## Where N2 Is Enough

- International tech companies with Japanese offices
- Startups with English-friendly cultures

## My Honest Assessment

I passed N2 and struggled my first six months. Get as much listening practice as possible.', 'en', true),

(9, 'フクオカのエンジニア事情', 'fukuoka-engineer-scene',
'# フクオカのエンジニア事情

## フクオカの魅力

- 生活コストが東京の約60%
- スタートアップ支援が充実
- 食べ物が美味しい（重要）

東京にこだわらない選択肢として検討してみてください。', 'ja', true),

(9, 'コードレビューで成長するための心構え', 'code-review-growth-mindset',
'# コードレビューで成長するための心構え

```
Bad: "これは間違っています"
Good: "こうすると理由でより良くなると思います"
```

日本のチームでは、直接的な批判は避ける傾向があります。丁寧さと明確さのバランスが大切です。', 'ja', true),

(9, 'Spring BootとReactの組み合わせで感じること', 'spring-boot-react-thoughts',
'# Spring BootとReactの組み合わせで感じること

## 良い点

- バックエンドとフロントエンドの責務が明確
- CORSの設定でよく詰まる（笑）

```
backend/  - Spring Boot (Gradle)
frontend/ - Next.js (TypeScript)
```

フルスタックは大変ですが、全体を把握できる楽しさがあります。', 'ja', true),

(9, 'なぜ私はコードレビューに時間をかけるのか', 'why-i-invest-in-code-review',
'# なぜ私はコードレビューに時間をかけるのか

## 数字で見ると

- 徹底した四半期：本番バグ 3件
- 緩めた四半期：本番バグ 11件

数字は嘘をつきません。', 'ja', true),

(10, 'Design Systems in Japanese Companies: A UX Engineer''s View', 'design-systems-japanese-companies',
'# Design Systems in Japanese Companies: A UX Engineer''s View

## Building Buy-In

I introduced it gradually: started with a color token document, added spacing scale, built the first component (a button).

## My Advice

Call it a "component library" not a "design system" in Japan. The former sounds practical, the latter sounds academic.', 'en', true),

(10, 'Accessibility Is Not a Western Concept', 'accessibility-not-western-concept',
'# Accessibility Is Not a Western Concept

## Japan Has Strong Accessibility Laws

The Act for Eliminating Discrimination against Persons with Disabilities has real implications for digital products.

## What You Can Do

- Sufficient color contrast
- Keyboard navigation
- Screen reader testing

Accessibility is good design. Full stop.', 'en', true),

(10, 'Tokyo vs Osaka for Tech Workers: An Honest Comparison', 'tokyo-vs-osaka-tech-workers',
'# Tokyo vs Osaka for Tech Workers: An Honest Comparison

## Jobs

Tokyo wins. The concentration of tech companies is unmatched.

## Cost of Living

Osaka wins. Rent is roughly 30% cheaper.

Build your career in Tokyo. Consider Osaka once you are established and remote work is possible.', 'en', true),

(10, 'Why I Turned Down a 20% Raise to Stay in Japan', 'turned-down-raise-stay-japan',
'# Why I Turned Down a 20% Raise to Stay in Japan

## The Honest Reason

I love it here. That is allowed to be a factor.

The right job is not always the highest-paying job.', 'en', true),

(2, 'TypeScript Tips I Use Every Day', 'typescript-tips-daily',
'# TypeScript Tips I Use Every Day

```typescript
const name = user?.profile?.displayName ?? "Anonymous";

function isString(value: unknown): value is string {
    return typeof value === "string";
}

type PartialUser = Partial<User>;
```

Small things that make the codebase significantly more maintainable.', 'en', true),

(4, 'Japanese Tech Vocabulary Every Foreign Engineer Needs', 'japanese-tech-vocabulary',
'# Japanese Tech Vocabulary Every Foreign Engineer Needs

| Japanese | Romaji | Meaning |
|----------|--------|---------|
| 仕様 | shiyou | Specification |
| 不具合 | fuguai | Bug |
| 本番 | honban | Production |
| 開発 | kaihatsu | Development |

Print this out. Seriously.', 'en', true),

(1, 'チームでのGit運用ベストプラクティス', 'git-team-best-practices',
'# チームでのGit運用ベストプラクティス

## コミットメッセージの規約

```
feat: ユーザー認証機能を追加
fix: ログイン時のバグを修正
refactor: DTOマッパーを整理
```

PRは小さく保つことが重要です。大きなPRはレビューが雑になりがちです。', 'ja', true),

(3, 'インフラエンジニアからSREへの転換', 'infra-to-sre-transition',
'# インフラエンジニアからSREへの転換

SREはインフラエンジニアの進化系ではなく、開発とインフラの融合です。

コードを書けるインフラエンジニアを目指すことが、SREへの最短ルートです。', 'ja', true),

(5, 'データサイエンティストとMLエンジニアの違い', 'data-scientist-vs-ml-engineer',
'# データサイエンティストとMLエンジニアの違い

データサイエンティストはモデルを作り、MLエンジニアはそれを本番環境で動かします。

日本企業ではこの区別が曖昧なことが多く、両方できることが求められます。', 'ja', true),

(6, 'Why Swedish Engineers Love Japan', 'swedish-engineers-japan',
'# Why Swedish Engineers Love Japan

The attention to detail, the craftsmanship culture, the food. But mostly the engineering standards.

Swedish and Japanese work cultures have more in common than you might think - both value consensus, quality, and doing things properly.', 'en', true),

(7, 'iOSアプリのメモリ管理入門', 'ios-memory-management',
'# iOSアプリのメモリ管理入門

```swift
class ViewController: UIViewController {
    weak var delegate: ViewControllerDelegate?
}
```

weakとunownedの使い分けを理解することが、メモリリーク防止の第一歩です。', 'ja', true),

(8, 'Navigating Japanese Office Culture as a Foreign Engineer', 'navigating-japanese-office-culture',
'# Navigating Japanese Office Culture as a Foreign Engineer

## The Business Card Ceremony

I nearly committed several etiquette crimes before a colleague saved me.

## Nomikai

Optional but socially important. My Japanese improved dramatically from these evenings.', 'en', true),

(10, 'Building Accessible UIs for Japanese Users', 'accessible-ui-japanese-users',
'# Building Accessible UIs for Japanese Users

## Font Size

Japanese characters are complex. Aim for 14px minimum.

## Screen Readers

NVDA and PC-Talker are common in Japan. Test with both if you can.

The web should work for everyone.', 'en', true);

-- =====================
-- POST TAGS
-- =====================
INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, 1 FROM posts p WHERE p.slug IN (
    'surviving-japanese-tech-interview', 'developer-visa-japan-guide',
    'salary-negotiation-japan-foreign', 'india-to-japan-developer-immigration',
    'n2-japanese-tech-work', 'japanese-startup-vs-enterprise', 'ai-engineer-working-japan'
);

INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, 2 FROM posts p WHERE p.slug IN (
    'spring-boot-kotlin-reasons', 'java-21-new-features',
    'tdd-introduction-japanese-team', 'spring-boot-react-thoughts'
);

INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, 3 FROM posts p WHERE p.slug IN (
    'japan-code-review-culture', 'working-japanese-tech-reality',
    'culture-shock-japanese-company', 'agile-japan-what-works',
    'loneliness-foreign-developer-japan', 'japan-software-quality-lessons',
    'fukuoka-engineer-scene', 'navigating-japanese-office-culture'
);

INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, 4 FROM posts p WHERE p.slug IN (
    'react-vs-vue-japan-perspective', 'typescript-tips-daily',
    'design-systems-japanese-companies', 'accessible-ui-japanese-users',
    'spring-boot-react-thoughts'
);

INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, 5 FROM posts p WHERE p.slug IN (
    'salary-negotiation-japan-foreign', 'surviving-japanese-tech-interview',
    'technical-interview-prep-japanese-companies', 'reading-japanese-job-descriptions',
    'tokyo-vs-osaka-tech-workers', 'turned-down-raise-stay-japan'
);

INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, 6 FROM posts p WHERE p.slug IN (
    'react-vs-vue-japan-perspective', 'typescript-tips-daily'
);

INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, 7 FROM posts p WHERE p.slug IN (
    'working-japanese-tech-reality', 'remote-work-japan-reality',
    'loneliness-foreign-developer-japan', 'why-i-invest-in-code-review',
    'working-as-sre-japan', 'working-game-company-engineer',
    'turned-down-raise-stay-japan', 'fukuoka-engineer-scene'
);

INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, 8 FROM posts p WHERE p.slug IN (
    'surviving-japanese-tech-interview', 'technical-interview-prep-japanese-companies',
    'reading-japanese-job-descriptions'
);

INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, 9 FROM posts p WHERE p.slug IN (
    'kubernetes-monitoring-design', 'incident-response-log',
    'working-as-sre-japan', 'humane-oncall-practices', 'infra-to-sre-transition'
);

INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, 10 FROM posts p WHERE p.slug IN (
    'swiftui-vs-uikit-japan', 'working-game-company-engineer',
    'mobile-app-performance-optimization', 'ios-memory-management'
);

-- =====================
-- COMMENTS (50)
-- =====================
INSERT INTO comments (post_id, author_id, body, language, deleted) VALUES
((SELECT id FROM posts WHERE slug='surviving-japanese-tech-interview'), 3, 'とても参考になりました。私も同じ経験をしました。面接の準備は本当に大切ですね。', 'ja', false),
((SELECT id FROM posts WHERE slug='surviving-japanese-tech-interview'), 4, 'Great post! I went through 4 rounds at my current company. The cultural fit interview was definitely the hardest part.', 'en', false),
((SELECT id FROM posts WHERE slug='surviving-japanese-tech-interview'), 8, 'I would add that preparing in Japanese, even if your Japanese is not perfect, shows real commitment.', 'en', false),

((SELECT id FROM posts WHERE slug='japan-code-review-culture'), 2, 'This matches my experience exactly. The indirectness took some getting used to but I actually prefer it now.', 'en', false),
((SELECT id FROM posts WHERE slug='japan-code-review-culture'), 9, '日系と外資の違いは本当に大きいですね。どちらにも良さがあると思います。', 'ja', false),

((SELECT id FROM posts WHERE slug='spring-boot-kotlin-reasons'), 2, 'Kotlin looks great! Does the learning curve affect team velocity much initially?', 'en', false),
((SELECT id FROM posts WHERE slug='spring-boot-kotlin-reasons'), 9, 'KotlinとSpring Bootの組み合わせは私のチームでも検討中です。参考になります！', 'ja', false),

((SELECT id FROM posts WHERE slug='working-japanese-tech-reality'), 3, '外資系から見ると日系企業の特徴がよくわかります。どちらにも良さがありますね。', 'ja', false),
((SELECT id FROM posts WHERE slug='working-japanese-tech-reality'), 6, 'The nemawashi point is so true. Once you understand it, decisions actually feel less frustrating.', 'en', false),
((SELECT id FROM posts WHERE slug='working-japanese-tech-reality'), 7, '「誰も教えてくれないこと」シリーズ、もっと書いてほしいです！', 'ja', false),

((SELECT id FROM posts WHERE slug='developer-visa-japan-guide'), 8, 'Thank you for this! One question - did you need to get your degree officially translated?', 'en', false),
((SELECT id FROM posts WHERE slug='developer-visa-japan-guide'), 2, 'Super helpful. I am starting this process now and the COE timeline is the most stressful part.', 'en', false),
((SELECT id FROM posts WHERE slug='developer-visa-japan-guide'), 6, 'I can confirm the timeline. Mine took 13 weeks. Start early!', 'en', false),

((SELECT id FROM posts WHERE slug='kubernetes-monitoring-design'), 1, 'Prometheusのアラート設定、もう少し詳しく教えていただけますか？', 'ja', false),
((SELECT id FROM posts WHERE slug='kubernetes-monitoring-design'), 5, '監視の三本柱、よく整理されていますね。私のチームでも同じ構成を使っています。', 'ja', false),

((SELECT id FROM posts WHERE slug='react-vs-vue-japan-perspective'), 1, 'Vue.jsのドキュメントが日本語で充実しているのは確かですね。初学者にはVueが入りやすいかも。', 'ja', false),
((SELECT id FROM posts WHERE slug='react-vs-vue-japan-perspective'), 6, 'Fully agree on React for career flexibility. Though I learned a lot from Vue.', 'en', false),

((SELECT id FROM posts WHERE slug='loneliness-foreign-developer-japan'), 4, 'Thank you for writing this. The first six months were genuinely hard for me too.', 'en', false),
((SELECT id FROM posts WHERE slug='loneliness-foreign-developer-japan'), 6, 'This post needed to be written. Communities like DevJima help a lot.', 'en', false),
((SELECT id FROM posts WHERE slug='loneliness-foreign-developer-japan'), 8, 'I felt seen reading this. The quiet loneliness description is perfect.', 'en', false),

((SELECT id FROM posts WHERE slug='japanese-nlp-current-state'), 1, 'fugashiライブラリ、使いやすいですよね。MeCabと比較してどうですか？', 'ja', false),
((SELECT id FROM posts WHERE slug='japanese-nlp-current-state'), 9, 'LLMの日本語対応が急速に改善されているのを実感しています。', 'ja', false),

((SELECT id FROM posts WHERE slug='salary-negotiation-japan-foreign'), 8, 'This is so important. Many foreign engineers just accept the first offer without negotiating.', 'en', false),
((SELECT id FROM posts WHERE slug='salary-negotiation-japan-foreign'), 2, 'The language allowance tip is gold. I had no idea that was negotiable.', 'en', false),
((SELECT id FROM posts WHERE slug='salary-negotiation-japan-foreign'), 6, 'Data-driven negotiation works everywhere. Good reminder.', 'en', false),

((SELECT id FROM posts WHERE slug='agile-japan-what-works'), 3, 'スプリントレビューも日本のチームではやり方を工夫する必要がありますよね。', 'ja', false),
((SELECT id FROM posts WHERE slug='agile-japan-what-works'), 4, 'The written pre-meeting idea is brilliant. Stealing this for my team.', 'en', false),

((SELECT id FROM posts WHERE slug='swiftui-vs-uikit-japan'), 2, 'SwiftUIのアニメーション、まだUIKitに追いついていない部分がありますよね。', 'en', false),
((SELECT id FROM posts WHERE slug='swiftui-vs-uikit-japan'), 8, 'Great comparison. We are slowly migrating to SwiftUI at my company.', 'en', false),

((SELECT id FROM posts WHERE slug='india-to-japan-developer-immigration'), 6, 'Thanks for being so honest about the first three months. Managing expectations is important.', 'en', false),
((SELECT id FROM posts WHERE slug='india-to-japan-developer-immigration'), 2, 'The flexibility on location tip is underrated. Not everyone needs to be in Tokyo.', 'en', false),

((SELECT id FROM posts WHERE slug='fukuoka-engineer-scene'), 4, 'Fukuoka is seriously underrated. The startup scene there is growing fast.', 'en', false),
((SELECT id FROM posts WHERE slug='fukuoka-engineer-scene'), 2, 'フクオカは食べ物が美味しいので大賛成です！エンジニアとしてのキャリアも作れますね。', 'en', false),

((SELECT id FROM posts WHERE slug='java-21-new-features'), 9, 'Virtual ThreadsはWebアプリのスループット改善に大きく貢献しますね。', 'ja', false),
((SELECT id FROM posts WHERE slug='java-21-new-features'), 2, 'Record patterns are my favorite addition. Makes pattern matching so much cleaner.', 'en', false),

((SELECT id FROM posts WHERE slug='tdd-introduction-japanese-team'), 2, 'The gradual approach is key. Forcing TDD on a team never works.', 'en', false),
((SELECT id FROM posts WHERE slug='tdd-introduction-japanese-team'), 9, '数字で効果を示すのが説得力ありますね。うちのチームでも試してみます。', 'ja', false),

((SELECT id FROM posts WHERE slug='design-systems-japanese-companies'), 1, 'コンポーネントライブラリという言い方、確かに受け入れられやすいですね。参考になります。', 'ja', false),
((SELECT id FROM posts WHERE slug='design-systems-japanese-companies'), 4, 'The naming insight is genuinely useful. Academic vs practical framing matters a lot in Japan.', 'en', false),

((SELECT id FROM posts WHERE slug='typescript-tips-daily'), 1, 'Generic constraintsのパターン、実務でよく使います。わかりやすい説明ですね。', 'ja', false),
((SELECT id FROM posts WHERE slug='typescript-tips-daily'), 9, 'The utility types section is so useful. Partial and Readonly save a lot of boilerplate.', 'en', false),

((SELECT id FROM posts WHERE slug='working-as-sre-japan'), 4, 'The error budget concept is still not well understood at many Japanese companies.', 'en', false),
((SELECT id FROM posts WHERE slug='working-as-sre-japan'), 1, 'SREの布教活動、本当に大変ですよね。でも徐々に認知されてきていると思います。', 'ja', false),

((SELECT id FROM posts WHERE slug='culture-shock-japanese-company'), 8, 'The business card story is hilarious and relatable. I had a similar panic moment.', 'en', false),
((SELECT id FROM posts WHERE slug='culture-shock-japanese-company'), 6, 'Nomikai really does improve your Japanese faster than any class.', 'en', false),

((SELECT id FROM posts WHERE slug='n2-japanese-tech-work'), 4, 'The gap between JLPT and real usage is massive. N2 tests are not designed for workplace Japanese.', 'en', false),
((SELECT id FROM posts WHERE slug='n2-japanese-tech-work'), 2, 'Keigo was the hardest part for me. No JLPT test prepares you for it.', 'en', false),

((SELECT id FROM posts WHERE slug='pytorch-ml-introduction'), 3, 'PyTorchの入門記事、わかりやすいです。Kaggleとの組み合わせで学ぶのが効率的ですね。', 'ja', false),

((SELECT id FROM posts WHERE slug='humane-oncall-practices'), 4, 'The 70% unnecessary alerts finding is shocking but I believe it completely.', 'en', false),
((SELECT id FROM posts WHERE slug='humane-oncall-practices'), 2, 'Runbooks are so undervalued. They save lives at 3am.', 'en', false);
