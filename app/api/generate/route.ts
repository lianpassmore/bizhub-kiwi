// app/api/generate/route.ts
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { businessName, category, location } = await req.json();

    const prompt = `
      Write a professional, friendly, and local-focused "About Us" section (max 150 words) 
      and a list of 5 key services for a New Zealand business.
      Business Name: ${businessName}
      Category: ${category}
      Location: ${location}
      Tone: Trustworthy, Community-focused, Kiwi style.
    `;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    const content = completion.choices[0].message.content;

    return NextResponse.json({ result: content });
  } catch (error) {
    return NextResponse.json({ error: 'AI generation failed' }, { status: 500 });
  }
}