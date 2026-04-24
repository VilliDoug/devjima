import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).end();

    const { text, targetLang } = req.body;

    try {
        const response = await fetch('https://api-free.deepl.com/v2/translate', {
            method: 'POST',
            headers: {
                'Authorization': `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: [text],
                target_lang: targetLang,
                tag_handling: 'html',
                ignore_tags: ['code', 'pre']
            })
        });
        const data = await response.json();
        res.status(200).json({ translatedText: data.translations[0].text });
    } catch {
        res.status(500).json({ error: 'Translation failed' });
    }
}