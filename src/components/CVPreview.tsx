import React from 'react';
import { Badge } from './ui/badge';

interface CVPreviewProps {
  data: any;
  templateStyle: string;
}

export const CVPreview: React.FC<CVPreviewProps> = ({ data, templateStyle }) => {
  const { personalInfo, experiences, skills, education } = data;
  
  // Modern template
  if (templateStyle === 'modern') {
    return (
      <div className="w-full h-full text-xs overflow-hidden bg-white font-sans">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4">
          <h1 className="text-lg font-bold">{personalInfo.fullName || 'Your Name'}</h1>
          <p className="text-sm opacity-90">{personalInfo.title || 'Professional Title'}</p>
        </div>
        
        {/* Contact info */}
        <div className="px-4 py-2 bg-gray-50 text-[8px] flex flex-wrap gap-2">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <span>📧</span> {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <span>📱</span> {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <span>📍</span> {personalInfo.location}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1">
              <span>🌐</span> {personalInfo.website}
            </span>
          )}
        </div>
        
        {/* Summary */}
        {personalInfo.summary && (
          <div className="p-3">
            <h2 className="text-sm font-semibold text-blue-600 border-b border-blue-600 mb-1">Professional Summary</h2>
            <p className="text-[8px] leading-tight line-clamp-3">{personalInfo.summary}</p>
          </div>
        )}
        
        {/* Experience */}
        {experiences.length > 0 && (
          <div className="p-3 pt-1">
            <h2 className="text-sm font-semibold text-blue-600 border-b border-blue-600 mb-1">Experience</h2>
            <div className="space-y-2">
              {experiences.slice(0, 2).map((exp, i) => (
                <div key={i} className="mb-1">
                  <div className="flex justify-between">
                    <p className="font-medium text-[9px]">{exp.position}</p>
                    <p className="text-[7px] text-gray-500">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                  </div>
                  <p className="text-[8px] text-gray-600">{exp.company}</p>
                  <p className="text-[7px] text-gray-500 line-clamp-1">{exp.description}</p>
                </div>
              ))}
              {experiences.length > 2 && (
                <p className="text-[7px] text-gray-400 italic">+ {experiences.length - 2} more experiences</p>
              )}
            </div>
          </div>
        )}
        
        {/* Skills */}
        {skills.length > 0 && (
          <div className="p-3 pt-1">
            <h2 className="text-sm font-semibold text-blue-600 border-b border-blue-600 mb-1">Skills</h2>
            <div className="flex flex-wrap gap-1">
              {skills.slice(0, 8).map((skill, i) => (
                <Badge key={i} className="text-[7px] bg-blue-100 text-blue-800 hover:bg-blue-100">{skill.name}</Badge>
              ))}
              {skills.length > 8 && (
                <p className="text-[7px] text-gray-400 italic">+ {skills.length - 8} more skills</p>
              )}
            </div>
          </div>
        )}
        {personalInfo.photo && (
          <div className="absolute top-2 right-2">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white"
              style={{ 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(${personalInfo.photo})`
              }}
            ></div>
          </div>
        )}
      </div>
    );
  }
  
  // Classic template
  if (templateStyle === 'classic') {
    return (
      <div className="w-full h-full text-xs overflow-hidden bg-white font-serif">
        {/* Header - Centered */}
        <div className="text-center p-4 pb-2">
          {personalInfo.photo && (
            <div className="flex justify-center mt-3 mb-2">
              <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-300"
                style={{ 
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundImage: `url(${personalInfo.photo})`
                }}
              ></div>
            </div>
          )}
          <h1 className="text-lg font-bold uppercase">{personalInfo.fullName || 'Your Name'}</h1>
          <p className="text-sm">{personalInfo.title || 'Professional Title'}</p>
          
          {/* Contact info - Horizontal */}
          <div className="mt-1 text-[7px] flex justify-center flex-wrap gap-x-2">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>• {personalInfo.phone}</span>}
            {personalInfo.location && <span>• {personalInfo.location}</span>}
          </div>
          
          <div className="mx-auto w-1/2 h-px bg-gray-400 my-2"></div>
        </div>
        
        {/* Summary */}
        {personalInfo.summary && (
          <div className="px-3 pt-1">
            <h2 className="text-sm font-semibold text-center uppercase">Professional Summary</h2>
            <div className="mx-auto w-1/4 h-px bg-gray-300 mb-1"></div>
            <p className="text-[8px] leading-tight text-center line-clamp-3">{personalInfo.summary}</p>
          </div>
        )}
        
        {/* Experience */}
        {experiences.length > 0 && (
          <div className="p-3 pt-2">
            <h2 className="text-sm font-semibold text-center uppercase">Experience</h2>
            <div className="mx-auto w-1/4 h-px bg-gray-300 mb-2"></div>
            <div className="space-y-2">
              {experiences.slice(0, 2).map((exp, i) => (
                <div key={i} className="mb-1">
                  <div className="flex justify-between">
                    <p className="font-bold text-[9px]">{exp.position}</p>
                    <p className="text-[7px] text-gray-600">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                  </div>
                  <p className="text-[8px] font-medium">{exp.company}</p>
                  <p className="text-[7px] text-gray-500 line-clamp-1">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
  
  // Creative template
  if (templateStyle === 'creative') {
    return (
      <div className="w-full h-full text-xs overflow-hidden bg-white font-sans flex">
        {/* Left sidebar */}
        <div className="w-1/3 bg-gray-800 text-white p-3">
          {personalInfo.photo && (
            <div className="mb-3 flex justify-center">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-600"
                style={{ 
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundImage: `url(${personalInfo.photo})`
                }}
              ></div>
            </div>
          )}
          <div className="mb-4">
            <h1 className="text-base font-bold">{personalInfo.fullName.split(' ')[0] || 'Name'}</h1>
            <h1 className="text-base font-bold">{personalInfo.fullName.split(' ').slice(1).join(' ') || ''}</h1>
            <p className="text-[8px] opacity-80 mt-1">{personalInfo.title || 'Professional Title'}</p>
          </div>
          
          {/* Contact */}
          <div className="space-y-1 mb-4">
            <h3 className="text-[9px] font-semibold uppercase tracking-wider">Contact</h3>
            {personalInfo.email && (
              <p className="text-[7px]">{personalInfo.email}</p>
            )}
            {personalInfo.phone && (
              <p className="text-[7px]">{personalInfo.phone}</p>
            )}
            {personalInfo.location && (
              <p className="text-[7px]">{personalInfo.location}</p>
            )}
          </div>
          
          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h3 className="text-[9px] font-semibold uppercase tracking-wider">Skills</h3>
              <div className="mt-1 space-y-1">
                {skills.slice(0, 5).map((skill, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <div className="flex space-x-0.5">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-1 h-1 rounded-full ${i < skill.level ? 'bg-white' : 'bg-gray-600'}`}
                        />
                      ))}
                    </div>
                    <span className="text-[7px]">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Main content */}
        <div className="w-2/3 p-3">
          {/* Summary */}
          {personalInfo.summary && (
            <div className="mb-3">
              <h2 className="text-[10px] font-bold uppercase text-gray-800 border-b border-gray-300 pb-0.5">Profile</h2>
              <p className="text-[7px] leading-tight mt-1 line-clamp-3">{personalInfo.summary}</p>
            </div>
          )}
          
          {/* Experience */}
          {experiences.length > 0 && (
            <div>
              <h2 className="text-[10px] font-bold uppercase text-gray-800 border-b border-gray-300 pb-0.5">Experience</h2>
              <div className="space-y-2 mt-1">
                {experiences.slice(0, 2).map((exp, i) => (
                  <div key={i} className="mb-1">
                    <p className="text-[9px] font-semibold">{exp.position}</p>
                    <div className="flex justify-between">
                      <p className="text-[7px] text-gray-600">{exp.company}</p>
                      <p className="text-[7px] text-gray-600">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                    </div>
                    <p className="text-[7px] text-gray-500 line-clamp-1 mt-0.5">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // Minimal template
  if (templateStyle === 'minimal') {
    return (
      <div className="w-full h-full text-xs overflow-hidden bg-white font-sans p-4">
        {/* Header */}
        <div className="flex justify-between">
          <div className="flex-grow">
            <h1 className="text-lg font-bold">{personalInfo.fullName || 'Your Name'}</h1>
            <p className="text-xs opacity-80">{personalInfo.title || 'Professional Title'}</p>
          </div>
          {personalInfo.photo && (
            <div className="w-10 h-10 rounded-sm overflow-hidden border border-gray-200"
              style={{ 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(${personalInfo.photo})`
              }}
            ></div>
          )}
        </div>
        
        {/* Contact info */}
        <div className="flex flex-wrap gap-x-3 text-[7px] text-gray-600 mt-1">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
        
        {/* Divider */}
        <div className="w-full h-px bg-gray-200 my-2"></div>
        
        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-3">
            <p className="text-[8px] leading-tight line-clamp-2">{personalInfo.summary}</p>
          </div>
        )}
        
        {/* Experience */}
        {experiences.length > 0 && (
          <div className="mb-3">
            <h2 className="text-[10px] font-medium">Experience</h2>
            <div className="space-y-1 mt-1">
              {experiences.slice(0, 2).map((exp, i) => (
                <div key={i} className="mb-1">
                  <div className="flex justify-between">
                    <p className="text-[9px]">{exp.position} • <span className="text-gray-600">{exp.company}</span></p>
                    <p className="text-[7px] text-gray-500">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                  </div>
                  <p className="text-[7px] text-gray-500 line-clamp-1">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-[10px] font-medium">Skills</h2>
            <div className="flex flex-wrap gap-1 mt-1">
              {skills.slice(0, 10).map((skill, i) => (
                <span key={i} className="text-[7px] bg-gray-100 px-1 py-0.5 rounded">{skill.name}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
  
  // Default fallback
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
      <p className="text-sm">Select a template to preview your CV</p>
    </div>
  );
}; 