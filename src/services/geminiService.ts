import axios from 'axios';

// Gemini API configuration
const GEMINI_API_KEY = 'AIzaSyBup4S5hVGJv8pmMCtaS7Y0dC5QHMUU-7c';
// Updated to use Gemini 2.0 Flash model
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';

// Message interface
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Gemini API expects a different format than OpenAI/OpenRouter
// This function converts our standard ChatMessage format to Gemini format
function convertToGeminiFormat(messages: ChatMessage[]): any {
  // Extract system message if present
  const systemMessage = messages.find(msg => msg.role === 'system');
  const systemContent = systemMessage?.content || '';
  
  // Filter out system messages as Gemini doesn't have a direct system message concept
  const conversationMessages = messages.filter(msg => msg.role !== 'system');
  
  // Format as Gemini API expects
  const contents = [];
  
  // If we have a system message, we'll prepend it to the first user message
  // or add it as a user message if there are no user messages
  if (systemContent && conversationMessages.length > 0) {
    for (let i = 0; i < conversationMessages.length; i++) {
      const msg = conversationMessages[i];
      
      // For the first user message, prepend the system content
      if (i === 0 && msg.role === 'user') {
        contents.push({
          role: 'user',
          parts: [{ text: `${systemContent}\n\n${msg.content}` }]
        });
      } else {
        // Map roles to Gemini format
        const role = msg.role === 'assistant' ? 'model' : 'user';
        contents.push({
          role,
          parts: [{ text: msg.content }]
        });
      }
    }
  } else {
    // No system message or no conversation messages
    // Just map each message directly
    conversationMessages.forEach(msg => {
      const role = msg.role === 'assistant' ? 'model' : 'user';
      contents.push({
        role,
        parts: [{ text: msg.content }]
      });
    });
    
    // If we only have a system message, add it as a user message
    if (systemContent && conversationMessages.length === 0) {
      contents.push({
        role: 'user',
        parts: [{ text: systemContent }]
      });
    }
  }
  
  return contents;
}

/**
 * Send a chat completion request to Gemini API
 * @param messages Array of chat messages
 * @returns Promise with the chat completion response
 */
export async function getChatCompletion(messages: ChatMessage[]): Promise<string> {
  try {
    // Convert messages to Gemini format
    const contents = convertToGeminiFormat(messages);
    
    // Request configuration for Gemini 2.0 Flash
    const requestBody = {
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
        topP: 0.95,
        topK: 40
      }
    };

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data && response.data.candidates && response.data.candidates.length > 0) {
      // Extract the response content from the Gemini API response
      return response.data.candidates[0].content.parts[0].text;
    } else {
      console.error('Invalid response format from Gemini API:', response.data);
      return "I'm having trouble processing your request at the moment. Please try again shortly.";
    }
  } catch (error: any) {
    console.error('Error calling Gemini API:', error);
    
    let errorMessage = 'Failed to get response from AI assistant. Please try again.';
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error data:', error.response.data);
      console.error('Error status:', error.response.status);
      
      if (error.response.data && error.response.data.error) {
        errorMessage = `AI error: ${error.response.data.error.message || 'Unknown error'}`;
      } else if (error.response.status === 401 || error.response.status === 403) {
        errorMessage = 'Authentication error with AI service. Please check API key configuration.';
      } else if (error.response.status === 429) {
        errorMessage = 'Rate limit exceeded. Please try again in a few moments.';
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
      errorMessage = 'Network error - no response received from AI service.';
    }
    
    return errorMessage;
  }
}

/**
 * Generate treatment recommendations for plant diseases using Gemini API
 * @param diseaseName The name of the detected disease
 * @param plantType The type of plant (if known)
 * @param symptoms Array of observed symptoms
 * @returns Promise with treatment recommendations
 */
export async function generateTreatmentRecommendations(
  diseaseName: string,
  plantType: string = 'crop',
  symptoms: string[] = []
): Promise<any> {
  try {
    console.log(`Generating treatment recommendations for ${diseaseName} on ${plantType}`);
    
    // Create a detailed prompt for the AI
    const symptomsText = symptoms.length > 0 
      ? `with the following symptoms: ${symptoms.join(', ')}`
      : '';
    
    const prompt = `You are an agricultural expert specializing in plant diseases and treatments.
    Provide detailed, practical treatment recommendations for farmers for ${diseaseName} affecting ${plantType} plants ${symptomsText}.
    Format your response as JSON with four sections: immediate steps, preventive measures,
    organic treatment options, and expected recovery timeframe. Each section should have 3-5
    specific, actionable recommendations that are appropriate for small-scale farmers in Nepal.
    
    Return ONLY a JSON object with these keys:
    {
      "immediate": ["step 1", "step 2", "step 3", ...],
      "preventive": ["measure 1", "measure 2", "measure 3", ...],
      "organic": ["option 1", "option 2", "option 3", ...],
      "timeframe": "Expected recovery timeframe"
    }`;

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 1000,
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 15000 // 15 seconds timeout
      }
    );

    if (response.data && response.data.candidates && response.data.candidates.length > 0) {
      const content = response.data.candidates[0].content.parts[0].text;
      console.log('Received treatment recommendations:', content);
      
      try {
        // Extract JSON from the response (it might be wrapped in markdown code blocks)
        const jsonMatch = content.match(/```json\s*({[\s\S]*?})\s*```|({[\s\S]*?})/);
        const jsonContent = jsonMatch ? (jsonMatch[1] || jsonMatch[2]) : content;
        
        // Parse the JSON response
        const parsedResponse = JSON.parse(jsonContent);
        
        // Validate that the response has the expected structure
        if (!parsedResponse.immediate || !parsedResponse.preventive || 
            !parsedResponse.organic || !parsedResponse.timeframe) {
          throw new Error('Invalid response format from AI');
        }
        
        return {
          immediate: parsedResponse.immediate,
          preventive: parsedResponse.preventive,
          organic: parsedResponse.organic,
          timeframe: parsedResponse.timeframe
        };
      } catch (parseError) {
        console.error('Error parsing AI response:', parseError);
        throw new Error('Failed to parse treatment recommendations');
      }
    } else {
      console.error('Invalid response format:', response.data);
      throw new Error('Invalid response from AI service');
    }
  } catch (error: any) {
    console.error('Error generating treatment recommendations:', error);
    
    // Return default recommendations if API fails
    return {
      immediate: [
        "Remove and isolate affected plants",
        "Prune away visibly infected parts",
        "Apply appropriate treatment based on disease type",
        "Ensure proper watering practices"
      ],
      preventive: [
        "Implement crop rotation",
        "Maintain adequate plant spacing for airflow",
        "Use disease-resistant varieties when available",
        "Practice regular monitoring and inspection"
      ],
      organic: [
        "Apply neem oil solution to affected areas",
        "Use garlic or chili spray as natural deterrent",
        "Introduce beneficial insects to control pests",
        "Apply compost tea to boost plant immunity"
      ],
      timeframe: "Recovery typically takes 2-3 weeks with proper treatment and care"
    };
  }
} 