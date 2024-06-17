'use client'

import axios from "axios";
import {
    Button,
    Stack,
    Paper
  } from '@mui/material'
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

        <Stack direction='row' spacing={1}>
           <Button type="submit">
             Generate
            </Button>
            <Button onClick={handleDownload}>
            Download PDF
            </Button>  
        </Stack>
       
    </form>
    {result && (
        <Paper sx={{p: 4}}>
            <h2>Result:</h2>
            <p>{result}</p>
        </Paper>
    )}
</div>

}

export default PdfViewer