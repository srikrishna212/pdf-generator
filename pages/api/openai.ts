import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type Data = {
    error?: string;
    choices?: Array<{ text: string }>;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        const { prompt } = req.body;
        try {

            console.log(prompt)
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo', // or 'gpt-4'
                    messages: [
                        { role: 'system', content: 'You are a helpful assistant.' },
                        { role: 'user', content: prompt }
                    ],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:`Bearer ${process.env.OPENAI_API_KEY}`,
                    },
                }
            );
            console.log(response.data)   
            res.status(200).json(response.data);
        } catch (error: any) {
            console.log( error.message)
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Only POST requests are allowed' });
    }
}