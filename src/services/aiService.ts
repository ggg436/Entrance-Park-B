import axios from 'axios';

const GEMINI_API_KEY = 'AIzaSyBzVcNNEigBR9RJa1fKKKS6dTxJnRTpn-o';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export interface AISuggestionRequest {
  type: 'summary' | 'skills' | 'experience' | 'title';
  content: string;
  context?: string;
}

export const getAISuggestions = async (request: AISuggestionRequest): Promise<string[]> => {
  try {
    let prompt = '';
    
    switch(request.type) {
      case 'summary':
        prompt = `Generate a professional, compelling resume summary for a ${request.context || ''} professional. 
                  Make it concise (3-4 sentences), highlight key strengths, and be specific.
                  Use the following information as context: ${request.content}`;
        break;
      case 'skills':
        prompt = `Based on this work experience or job title: "${request.content}", 
                  suggest 8-10 relevant professional skills that would be impressive on a resume.
                  Return only the skills as a JSON array of strings, nothing else.`;
        break;
      case 'experience':
        prompt = `Enhance this job description to be more impactful for a resume: "${request.content}"
                  Focus on achievements, quantify results when possible, use strong action verbs, 
                  and keep it concise yet comprehensive. Return only the improved description, nothing else.`;
        break;
      case 'title':
        prompt = `Suggest 5 professional titles for someone with this experience: "${request.content}"
                  Return only the titles as a JSON array of strings, nothing else.`;
        break;
      default:
        prompt = request.content;
    }

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      }
    );

    let result = response.data.candidates[0].content.parts[0].text;
    
    // Try to parse as JSON if applicable
    if (request.type === 'skills' || request.type === 'title') {
      try {
        // Find JSON array in the string if there's extra text
        const jsonMatch = result.match(/\[.*\]/s);
        if (jsonMatch) {
          result = jsonMatch[0];
        }
        
        const parsed = JSON.parse(result);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch (e) {
        // If parsing fails, split by commas or newlines
        return result.split(/,|\n/).map(item => 
          item.trim().replace(/^["-\s]+|["-\s]+$/g, '')
        ).filter(item => item.length > 0);
      }
    }
    
    return [result];
  } catch (error) {
    console.error('Error getting AI suggestions:', error);
    return ['Failed to get AI suggestions. Please try again.'];
  }
};

export const generateCVSummary = async (cvData: any): Promise<string> => {
  try {
    // Create a comprehensive context from the CV data
    const experience = cvData.experiences.map((exp: any) => 
      `${exp.position} at ${exp.company} (${exp.startDate} - ${exp.current ? 'Present' : exp.endDate})`
    ).join(', ');
    
    const skills = cvData.skills.map((skill: any) => skill.name).join(', ');
    
    const context = `
      Name: ${cvData.personalInfo.fullName}
      Current Title: ${cvData.personalInfo.title}
      Experience: ${experience}
      Skills: ${skills}
    `;
    
    const prompt = `Generate a professional, compelling resume summary for this person.
                    Make it concise (3-4 sentences), highlight key strengths, and be specific.
                    Context: ${context}`;
                    
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 200,
        }
      }
    );
    
    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error generating CV summary:', error);
    return 'Failed to generate CV summary. Please try again or write your own summary.';
  }
};

export const enhanceJobDescription = async (description: string): Promise<string> => {
  try {
    const prompt = `Enhance this job description to be more impactful for a resume:
                    "${description}"
                    Focus on achievements, quantify results when possible, use strong action verbs, 
                    and keep it concise yet comprehensive. Return only the improved description.`;
                    
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 300,
        }
      }
    );
    
    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error enhancing job description:', error);
    return description;
  }
}; 