import React, { useState, useRef } from 'react';
import { Upload, FileVideo, PlayCircle, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Card } from '../ui';
import toast from 'react-hot-toast';

export const VideoUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a video file first');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}/analyze-upload`, {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setResult(data.results || data);
      toast.success('Forensic analysis complete!');
    } catch (err: any) {
      toast.error(`Analysis failed: ${err.message || 'Server error'}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
          <FileVideo className="w-5 h-5 text-primary-500" />
          Forensic Video Analysis
        </h3>
      </div>
      
      <div className="space-y-4">
        <div 
          className="border-2 border-dashed border-gray-700/50 rounded-lg p-6 text-center hover:border-primary-500/50 transition-colors cursor-pointer bg-secondary-900/20"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
          <p className="text-sm text-gray-400">
            {file ? file.name : 'Click to select a video file for analysis'}
          </p>
          <input 
            type="file" 
            accept="video/*" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>

        <button
          onClick={handleUpload}
          disabled={!file || isUploading}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-primary-600 hover:bg-primary-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing Video...
            </>
          ) : (
            <>
              <PlayCircle className="w-5 h-5" />
              Run AI Analysis
            </>
          )}
        </button>

        {result && (
          <div className="mt-4 p-4 rounded-lg bg-secondary-900/50 border border-gray-800">
            <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent-green" />
              Analysis Results
            </h4>
            <div className="text-xs text-gray-400 space-y-1">
              <p>Status: {result.status}</p>
              <p>Events Detected: {result.total_events || 0}</p>
              {result.total_events > 0 && (
                <p className="text-accent-red flex items-center gap-1 mt-2">
                  <AlertTriangle className="w-3 h-3" />
                  Alerts generated and sent to feed!
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
