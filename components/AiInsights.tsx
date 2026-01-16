
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

interface AiInsightsProps {
  jobData: any;
}

const AiInsights: React.FC<AiInsightsProps> = ({ jobData }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateInsight = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Analyze this loan batch processing job and provide a professional 3-sentence summary of findings. Focus on risks and common failure reasons.
      Job Data: ${JSON.stringify(jobData)}`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      setInsight(response.text || "Unable to generate insights at this time.");
    } catch (error) {
      console.error(error);
      setInsight("Error: Could not connect to the intelligence engine.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-indigo-600 rounded-2xl p-6 md:p-8 text-white shadow-xl shadow-indigo-600/20 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none group-hover:scale-110 transition-transform">
        <span className="material-symbols-outlined text-[120px]">psychology</span>
      </div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
        <div className="shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/20">
          <span className="material-symbols-outlined text-[32px]">auto_awesome</span>
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-black mb-2">Gemini AI Analysis</h3>
          {insight ? (
            <p className="text-indigo-50 leading-relaxed text-sm animate-in fade-in slide-in-from-bottom-2 duration-700">
              {insight}
            </p>
          ) : (
            <p className="text-indigo-100 text-sm">
              Use the intelligence engine to analyze the outcomes and failure patterns for this batch.
            </p>
          )}
        </div>

        <button 
          onClick={generateInsight}
          disabled={loading}
          className="shrink-0 px-6 py-3 bg-white text-indigo-600 rounded-xl font-black text-sm hover:bg-indigo-50 transition-all disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              Analyzing...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-lg">bolt</span>
              {insight ? 'Regenerate' : 'Generate Insights'}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AiInsights;
