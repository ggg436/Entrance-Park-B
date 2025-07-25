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

// Add a new function to analyze resume content and provide job/course recommendations
export const analyzeResume = async (resumeText: string, availableJobs: any[], availableCourses: any[]): Promise<{
  skills: string[],
  missingSkills: string[],
  relevantJobs: any[],
  recommendedCourses: any[],
  overallFeedback: string,
  improvementAreas: string[],
  strengthAreas: string[],
  careerPathSuggestions: string[]
}> => {
  try {
    if (!resumeText || resumeText.trim().length < 50) {
      throw new Error("Resume text is too short for meaningful analysis");
    }

    // First, extract key information and skills from resume
    const extractionPrompt = `
      Analyze this resume text and extract the following information:
      1. A list of skills the person has (technical and soft skills)
      2. Their experience level (beginner, intermediate, senior)
      3. Their current or most recent job title
      4. Main industry experience
      5. Potential areas for improvement
      
      Return the results as a JSON object with these keys:
      {
        "skills": ["skill1", "skill2", ...],
        "experienceLevel": "level",
        "jobTitle": "title",
        "industry": "industry",
        "improvementAreas": ["area1", "area2", ...]
      }
      
      Resume: ${resumeText}
    `;
    
    const extractionResponse = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: extractionPrompt }] }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 1024,
        }
      }
    );
    
    // Parse the extraction result
    let extractedData: any = {
      skills: [],
      experienceLevel: "unknown",
      jobTitle: "unknown",
      industry: "unknown",
      improvementAreas: []
    };
    
    try {
      const extractionText = extractionResponse.data.candidates[0].content.parts[0].text;
      // Find JSON in the response
      const jsonMatch = extractionText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsedData = JSON.parse(jsonMatch[0]);
        extractedData = {
          ...extractedData,
          ...parsedData
        };
      }
    } catch (error) {
      console.error("Error parsing extraction result:", error);
      // Continue with default values
    }
    
    // Now, find job matches based on the extracted information
    const relevantJobs = availableJobs.filter(job => {
      // Simple matching based on position title or required skills (tags)
      const titleMatch = job.position.toLowerCase().includes(extractedData.jobTitle?.toLowerCase() || '');
      const industryMatch = job.tags.some((tag: string) => 
        tag.toLowerCase().includes(extractedData.industry?.toLowerCase() || '')
      );
      const skillMatch = extractedData.skills?.some((skill: string) => 
        job.position.toLowerCase().includes(skill.toLowerCase())
      );
      
      return titleMatch || industryMatch || skillMatch;
    }).slice(0, 5); // Top 5 matches
    
    // Find relevant courses based on missing skills and improvement areas
    const recommendedCourses = availableCourses.filter(course => {
      // Match courses to improvement areas or general field
      const titleMatch = course.title.toLowerCase().includes(extractedData.industry?.toLowerCase() || '');
      const improvementMatch = extractedData.improvementAreas?.some((area: string) => 
        course.title.toLowerCase().includes(area.toLowerCase())
      );
      
      return titleMatch || improvementMatch;
    }).slice(0, 5); // Top 5 matches
    
    // Finally, get comprehensive feedback and suggestions
    const feedbackPrompt = `
      As an expert career counselor and resume analyst, provide comprehensive feedback on this resume:
      
      Resume: ${resumeText}
      
      Based on this, provide:
      1. Overall assessment (strengths and weaknesses)
      2. Specific improvement areas (formatting, content, skills gaps)
      3. Key strengths to leverage
      4. Suggested career paths based on skills and experience
      5. Specific skills they might be missing for their target roles
      
      Format the response as a JSON object with these keys:
      {
        "overallFeedback": "detailed feedback paragraph",
        "improvementAreas": ["area1", "area2", ...],
        "strengthAreas": ["strength1", "strength2", ...],
        "careerPathSuggestions": ["path1", "path2", ...],
        "missingSkills": ["skill1", "skill2", ...]
      }
    `;
    
    const feedbackResponse = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: feedbackPrompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        }
      }
    );
    
    // Parse feedback response
    let feedbackData: any = {
      overallFeedback: "Analysis completed. See details below.",
      improvementAreas: [],
      strengthAreas: [],
      careerPathSuggestions: [],
      missingSkills: []
    };
    
    try {
      const feedbackText = feedbackResponse.data.candidates[0].content.parts[0].text;
      // Find JSON in the response
      const jsonMatch = feedbackText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsedData = JSON.parse(jsonMatch[0]);
        feedbackData = {
          ...feedbackData,
          ...parsedData
        };
      }
    } catch (error) {
      console.error("Error parsing feedback result:", error);
      // Continue with default values
    }
    
    // Return combined results
    return {
      skills: extractedData.skills || [],
      missingSkills: feedbackData.missingSkills || [],
      relevantJobs,
      recommendedCourses,
      overallFeedback: feedbackData.overallFeedback || "Analysis completed. See details below.",
      improvementAreas: feedbackData.improvementAreas || [],
      strengthAreas: feedbackData.strengthAreas || [],
      careerPathSuggestions: feedbackData.careerPathSuggestions || []
    };
    
  } catch (error) {
    console.error('Error analyzing resume:', error);
    return {
      skills: [],
      missingSkills: [],
      relevantJobs: [],
      recommendedCourses: [],
      overallFeedback: error instanceof Error ? 
        `There was an error analyzing your resume: ${error.message}` : 
        "There was an error analyzing your resume. Please try again.",
      improvementAreas: [],
      strengthAreas: [],
      careerPathSuggestions: []
    };
  }
}; 