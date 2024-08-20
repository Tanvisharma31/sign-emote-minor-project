import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GoogleGenerativeAI, HarmCategory, HarmBlockThreshold} from '@google/generative-ai';
import {franc} from 'franc'; // For language detection

interface Intent {
  tag: string;
  patterns: string[];
  responses: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private intentsUrl = 'assets/intents.json';
  private apiKey = 'AIzaSyBHPRnck0_q8JcYHHIPq89zVL-pLMd6FrQ';
  private modelName = 'gemini-1.0-pro';
  private targetLanguage = 'en'; // Default language (English)

  constructor(private http: HttpClient) {}

  getIntents(): Observable<Intent[]> {
    return this.http.get<{intents: Intent[]}>(this.intentsUrl).pipe(map(data => data.intents || []));
  }

  async getResponse(input: string, intents: Intent[]): Promise<string> {
    input = input.toLowerCase();

    // Check intents for predefined responses
    for (const intent of intents) {
      if (intent.patterns.some(pattern => input.includes(pattern.toLowerCase()))) {
        return this.getRandomResponse(intent.responses);
      }
    }

    // Fallback to Google Generative AI for general questions
    return this.getGoogleGenerativeAIResponse(input);
  }

  private getRandomResponse(responses: string[]): string {
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  }

  private async getGoogleGenerativeAIResponse(prompt: string): Promise<string> {
    try {
      const genAI = new GoogleGenerativeAI(this.apiKey);
      const model = genAI.getGenerativeModel({model: this.modelName});

      const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      };

      const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ];

      const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [
          {
            role: 'user',
            parts: [{text: prompt}],
          },
        ],
      });

      const result = await chat.sendMessage(prompt);
      let responseText = await result.response.text();

      // Process response for links and images
      responseText = this.formatResponse(responseText);

      // Detect language and translate if necessary

      const detectedLang = franc(responseText);
      if (detectedLang !== this.targetLanguage) {
        responseText = await this.translateResponse(responseText, detectedLang, this.targetLanguage);
      }

      return responseText;
    } catch (error) {
      console.error('Error getting response from Google Generative AI:', error);
      return "I'm sorry, I encountered an error while processing your request.";
    }
  }

  private formatResponse(responseText: string): string {
    // Example pattern to detect URLs and images
    const urlPattern = /https?:\/\/[^\s]+/g;

    // Replace URLs with anchor tags
    responseText = responseText.replace(urlPattern, url => `<a href="${url}" target="_blank">${url}</a>`);

    // Check for common image file extensions
    const imagePattern = /\.(jpg|jpeg|png|gif)/i;
    responseText = responseText.replace(urlPattern, url =>
      imagePattern.test(url) ? `<img src="${url}" alt="Image" />` : `<a href="${url}" target="_blank">${url}</a>`
    );

    // Remove Markdown-style formatting
    responseText = responseText.replace(/\*\*(.*?)\*\*/g, '$1'); // Remove bold
    responseText = responseText.replace(/\*(.*?)\*/g, '$1'); // Remove italics

    return responseText;
  }

  private async translateResponse(text: string, sourceLang: string, targetLang: string): Promise<string> {
    // You can use Google Translate API or another translation service here
    // For demonstration, we'll use a placeholder function
    return this.mockTranslate(text, sourceLang, targetLang);
  }

  private async mockTranslate(text: string, sourceLang: string, targetLang: string): Promise<string> {
    // This is a placeholder function. Replace it with actual translation API logic.
    return text; // Return the text unchanged for now
  }
}
