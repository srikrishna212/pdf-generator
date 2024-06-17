'use client'

import axios, { AxiosResponse } from "axios";
import { FormEvent, useState } from "react";
import saveAs from 'file-saver'

type Choice = {
    message: {
        content: string
    };
};


type OpenAIResponse = {
    choices: Choice[];
};


const PdfViewer = () => {
    const [prompt, setPrompt] = useState<string>('');
    const [result, setResult] = useState<string>('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post<OpenAIResponse>('/api/openai', { prompt });
            setResult(response.data?.choices[0]?.message.content);
        } catch (error) {
            console.error('Error fetching response:', error);
        }
    };

    const handleDownload = async(e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/pdf', 
                { html: result }, 
                {
                responseType: 'blob', // Tell Axios to expect a blob response
                headers: {
                  'Content-Type': 'application/json',
                }});
            saveAs( new Blob([response?.data]), 'download.pdf')
            
        } catch (error) {
            console.error('Error fetching response:', error);
        }
    }

    return  <div style={{ padding: '2rem' }}>
    <h1>OpenAI Text Generator</h1>
    <form onSubmit={handleSubmit}>
        <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={5}
            cols={50}
            placeholder="Enter your prompt here"
        ></textarea>
        <br />
        <button type="submit">Generate</button>
         <br/>     
        <button type="button" onClick={handleDownload}>Download PDF</button>
    </form>
    {result && (
        <div>
            <h2>Result:</h2>
            <p>{result}</p>
        </div>
    )}
</div>

}

export default PdfViewer