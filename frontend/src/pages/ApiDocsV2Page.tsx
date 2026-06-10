import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Code2, Terminal, Play, Server, Lock, Search } from 'lucide-react';
import { PublicLayout } from '../components/layout';
import { Button } from '../components/ui/Button';

export function ApiDocsV2Page() {
  const [activeEndpoint, setActiveEndpoint] = useState('detections');
  const [activeLang, setActiveLang] = useState('curl');

  return (
    <PublicLayout>
      <main className="flex-1 pt-24 flex flex-col lg:flex-row overflow-hidden max-h-screen">
        {/* Left Sidebar - Navigation */}
        <div className="w-full lg:w-64 bg-surface border-r border-gray-800 overflow-y-auto hidden lg:block">
          <div className="p-6">
            <a href="/api-docs" className="inline-flex items-center text-primary-400 hover:text-primary-300 transition-colors mb-8 group font-mono text-sm">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              BACK TO OVERVIEW
            </a>
            
            <div className="relative mb-6">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search endpoints..." 
                className="w-full bg-black border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:border-primary-500 focus:outline-none"
              />
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Core API</h4>
                <div className="space-y-1">
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors">Authentication</button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors">Webhooks</button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors">Rate Limits</button>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Endpoints</h4>
                <div className="space-y-1">
                  <button onClick={() => setActiveEndpoint('detections')} className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${activeEndpoint === 'detections' ? 'bg-primary-500/10 text-primary-400 font-medium' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                    <span>Detections</span>
                    <span className="text-[10px] bg-accent-green/20 text-accent-green px-1.5 py-0.5 rounded font-mono">GET</span>
                  </button>
                  <button onClick={() => setActiveEndpoint('cameras')} className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${activeEndpoint === 'cameras' ? 'bg-primary-500/10 text-primary-400 font-medium' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                    <span>Cameras</span>
                    <span className="text-[10px] bg-accent-green/20 text-accent-green px-1.5 py-0.5 rounded font-mono">GET</span>
                  </button>
                  <button onClick={() => setActiveEndpoint('alerts')} className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${activeEndpoint === 'alerts' ? 'bg-primary-500/10 text-primary-400 font-medium' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                    <span>Trigger Alert</span>
                    <span className="text-[10px] bg-primary-500/20 text-primary-400 px-1.5 py-0.5 rounded font-mono">POST</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Panel - Documentation */}
        <div className="flex-1 overflow-y-auto bg-black p-8 lg:p-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-accent-green/20 text-accent-green text-sm font-mono font-bold rounded">GET</span>
              <h1 className="text-3xl font-bold text-white">/v2/detections</h1>
            </div>
            
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Retrieve a paginated list of real-time object detections across all camera feeds. This endpoint provides high-fidelity bounding box coordinates, confidence scores, and object classification labels.
            </p>

            <div className="h-px bg-gray-800 w-full mb-8"></div>

            <h3 className="text-xl font-bold text-white mb-6">Query Parameters</h3>
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 py-4 border-b border-gray-800/50">
                <div className="w-48 font-mono text-primary-400">camera_id<span className="ml-2 text-gray-600 text-sm italic">optional</span></div>
                <div className="flex-1 text-gray-300">
                  <div className="mb-2">Filter detections by a specific camera ID.</div>
                  <div className="text-sm font-mono text-gray-500">Example: cam_01H9X...</div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 py-4 border-b border-gray-800/50">
                <div className="w-48 font-mono text-primary-400">min_confidence<span className="ml-2 text-gray-600 text-sm italic">optional</span></div>
                <div className="flex-1 text-gray-300">
                  <div className="mb-2">Filter out detections below this confidence threshold (0.0 to 1.0).</div>
                  <div className="text-sm font-mono text-gray-500">Default: 0.5</div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 py-4 border-b border-gray-800/50">
                <div className="w-48 font-mono text-primary-400">limit<span className="ml-2 text-gray-600 text-sm italic">optional</span></div>
                <div className="flex-1 text-gray-300">
                  <div className="mb-2">Maximum number of results to return per page.</div>
                  <div className="text-sm font-mono text-gray-500">Default: 100, Max: 1000</div>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mt-12 mb-6">Response Attributes</h3>
            <div className="bg-surface border border-gray-800 rounded-xl p-6">
              <div className="space-y-4 font-mono text-sm">
                <div className="flex gap-4">
                  <span className="text-accent-green w-24">id</span>
                  <span className="text-gray-400">string</span>
                  <span className="text-gray-300 flex-1">Unique detection identifier</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-accent-green w-24">label</span>
                  <span className="text-gray-400">string</span>
                  <span className="text-gray-300 flex-1">Object class (e.g. "Person", "Vehicle")</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-accent-green w-24">confidence</span>
                  <span className="text-gray-400">float</span>
                  <span className="text-gray-300 flex-1">AI confidence score (0.0 - 1.0)</span>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="text-accent-green w-24">bbox</span>
                  <span className="text-gray-400">object</span>
                  <span className="text-gray-300 flex-1">
                    Normalized coordinates:
                    <div className="mt-2 pl-4 border-l border-gray-700 text-gray-400">
                      <div>x: float</div>
                      <div>y: float</div>
                      <div>w: float</div>
                      <div>h: float</div>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Code & Output */}
        <div className="w-full lg:w-[450px] bg-[#0A0D14] border-l border-gray-800 flex flex-col hidden lg:flex">
          {/* Language Selector */}
          <div className="flex items-center gap-1 border-b border-gray-800 p-2 bg-[#10141D]">
            <button onClick={() => setActiveLang('curl')} className={`px-4 py-2 text-sm rounded-lg font-mono transition-colors ${activeLang === 'curl' ? 'bg-primary-500/10 text-primary-400' : 'text-gray-500 hover:text-gray-300'}`}>cURL</button>
            <button onClick={() => setActiveLang('node')} className={`px-4 py-2 text-sm rounded-lg font-mono transition-colors ${activeLang === 'node' ? 'bg-primary-500/10 text-primary-400' : 'text-gray-500 hover:text-gray-300'}`}>Node.js</button>
            <button onClick={() => setActiveLang('python')} className={`px-4 py-2 text-sm rounded-lg font-mono transition-colors ${activeLang === 'python' ? 'bg-primary-500/10 text-primary-400' : 'text-gray-500 hover:text-gray-300'}`}>Python</button>
          </div>

          {/* Request Snippet */}
          <div className="p-4 flex-1">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Request</span>
            </div>
            <div className="bg-[#10141D] rounded-xl border border-gray-800 p-4 font-mono text-sm overflow-x-auto">
              {activeLang === 'curl' && (
                <pre className="text-gray-300">
<span className="text-primary-400">curl</span> --request GET \<br/>
  --url <span className="text-accent-green">'https://api.safecity.ai/v2/detections?limit=2'</span> \<br/>
  --header <span className="text-accent-green">'Authorization: Bearer YOUR_API_KEY'</span>
                </pre>
              )}
              {activeLang === 'node' && (
                <pre className="text-gray-300">
<span className="text-[#C678DD]">const</span> sdk = <span className="text-[#56B6C2]">require</span>(<span className="text-accent-green">'@safecity/api'</span>);<br/>
<br/>
sdk.<span className="text-[#61AFEF]">auth</span>(<span className="text-accent-green">'YOUR_API_KEY'</span>);<br/>
sdk.detections.<span className="text-[#61AFEF]">list</span>({"{"})<br/>
  <span className="text-[#E5C07B]">limit</span>: <span className="text-[#D19A66]">2</span><br/>
{"}"})<br/>
  .<span className="text-[#61AFEF]">then</span>(res =&gt; console.<span className="text-[#61AFEF]">log</span>(res))<br/>
  .<span className="text-[#61AFEF]">catch</span>(err =&gt; console.<span className="text-[#61AFEF]">error</span>(err));
                </pre>
              )}
              {activeLang === 'python' && (
                <pre className="text-gray-300">
<span className="text-[#C678DD]">import</span> safecity<br/>
<br/>
client = safecity.<span className="text-[#61AFEF]">Client</span>(api_key=<span className="text-accent-green">"YOUR_API_KEY"</span>)<br/>
<br/>
response = client.detections.<span className="text-[#61AFEF]">list</span>(<br/>
    limit=<span className="text-[#D19A66]">2</span><br/>
)<br/>
<br/>
<span className="text-[#56B6C2]">print</span>(response)
                </pre>
              )}
            </div>

            <div className="flex justify-between items-center mb-2 mt-8">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Response</span>
              <span className="text-xs text-accent-green font-mono">200 OK</span>
            </div>
            <div className="bg-[#10141D] rounded-xl border border-gray-800 p-4 font-mono text-sm overflow-x-auto text-[#ABB2BF]">
              <pre>
{`{
  "object": "list",
  "url": "/v2/detections",
  "has_more": false,
  "data": [
    {
      "id": "det_8xF3P9",
      "camera_id": "cam_01",
      "label": "Vehicle",
      "confidence": 0.94,
      "bbox": {
        "x": 0.45,
        "y": 0.60,
        "w": 0.12,
        "h": 0.18
      },
      "timestamp": "2024-10-15T14:23:45Z"
    },
    {
      "id": "det_9yG4Q1",
      "camera_id": "cam_02",
      "label": "Person",
      "confidence": 0.88,
      "bbox": {
        "x": 0.15,
        "y": 0.45,
        "w": 0.08,
        "h": 0.22
      },
      "timestamp": "2024-10-15T14:23:45Z"
    }
  ]
}`}
              </pre>
            </div>
          </div>
        </div>
      </main>
    </PublicLayout>
  );
}
