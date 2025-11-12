import React, { useState } from 'react';
import { Play, MessageSquare, Mic, Volume2, Zap, AlertCircle, Copy, Check } from 'lucide-react';

const VoiceWebSocketDocs = () => {
  const [activeTab, setActiveTab] = useState('start');
  const [copiedCode, setCopiedCode] = useState(null);

  const copyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const tabs = [
    { id: 'start', label: 'Getting Started', icon: Play },
    { id: 'send', label: 'Send Audio', icon: Mic },
    { id: 'receive', label: 'Receive Response', icon: Volume2 },
    { id: 'barge', label: 'Barge-in', icon: Zap }
  ];

  const startMessage = {
    type: "start",
    token: "<YOUR_TOKEN>",
    session_id: "sess_1729958473000",
    agent_id: "agent-uuid",
    lang: "id",
    sr: 16000
  };

  const responses = {
    ready: { type: "ready", session_id: "sess_..." },
    sttReady: { type: "stt.ready" },
    partial: { type: "stt.partial", text: "Halo apa kabar" },
    final: { type: "stt.final", text: "Halo apa kabar hari ini?" },
    sentence: {
      stepType: "sentence",
      chatId: "9e4...",
      sentenceId: 123456,
      contentStep: "Halo! Senang bertemu dengan Anda.",
      audioBase64: "//uQxAA...",
      audioMime: "audio/mp3",
      chunkIndex: 0,
      isLastChunk: false,
      seq: 12
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Voice WebSocket API
        </h1>
        <p className="text-xl text-gray-600">
          Real-time voice conversations with STT and TTS streaming
        </p>
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-blue-600 font-semibold mb-1">Endpoint</div>
          <code className="text-sm bg-blue-100 px-2 py-1 rounded">
            ws://host:port/chat/agent/voice-ws
          </code>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="text-green-600 font-semibold mb-1">Audio Format</div>
          <div className="text-sm text-gray-700">
            PCM16LE, Mono, 16 kHz
          </div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="text-purple-600 font-semibold mb-1">Response</div>
          <div className="text-sm text-gray-700">
            Chunked MP3, 22.05 kHz
          </div>
        </div>
      </div>

      {/* Interactive Tabs */}
      <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
        <div className="flex border-b border-gray-200 bg-gray-50">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-4 py-3 flex items-center justify-center gap-2 transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium text-sm">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-6">
          {/* Getting Started Tab */}
          {activeTab === 'start' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  1. Connect to WebSocket
                </h3>
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <button
                    onClick={() => copyCode('const ws = new WebSocket("ws://your-host/chat/agent/voice-ws");\nws.binaryType = "arraybuffer";', 'connect')}
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  >
                    {copiedCode === 'connect' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <pre className="text-green-400 text-sm overflow-x-auto">
{`const ws = new WebSocket("ws://your-host/chat/agent/voice-ws");
ws.binaryType = "arraybuffer";`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  2. Send Start Message
                </h3>
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <button
                    onClick={() => copyCode(JSON.stringify(startMessage, null, 2), 'start')}
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  >
                    {copiedCode === 'start' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <pre className="text-green-400 text-sm overflow-x-auto">
{`ws.send(JSON.stringify(${JSON.stringify(startMessage, null, 2)}));`}
                  </pre>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <MessageSquare className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-blue-900 mb-2">Server Responses</div>
                    <div className="space-y-2 text-sm">
                      <div className="bg-white rounded p-2 border border-blue-100">
                        <code className="text-blue-700">{JSON.stringify(responses.ready)}</code>
                      </div>
                      <div className="bg-white rounded p-2 border border-blue-100">
                        <code className="text-blue-700">{JSON.stringify(responses.sttReady)}</code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Send Audio Tab */}
          {activeTab === 'send' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Audio Requirements
                </h3>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-gray-900">PCM16LE</div>
                    <div className="text-xs text-gray-600">Format</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-gray-900">Mono</div>
                    <div className="text-xs text-gray-600">1 Channel</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-gray-900">16 kHz</div>
                    <div className="text-xs text-gray-600">Sample Rate</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Recommended Frame Sizes
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded">
                    <span className="font-medium text-gray-900">20 ms</span>
                    <span className="text-sm text-gray-600">640 bytes</span>
                    <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">Recommended</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded">
                    <span className="font-medium text-gray-900">40 ms</span>
                    <span className="text-sm text-gray-600">1,280 bytes</span>
                    <span className="text-xs bg-gray-400 text-white px-2 py-1 rounded">Good</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded">
                    <span className="font-medium text-gray-900">50 ms</span>
                    <span className="text-sm text-gray-600">1,600 bytes</span>
                    <span className="text-xs bg-gray-400 text-white px-2 py-1 rounded">Acceptable</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Send Binary Audio
                </h3>
                <div className="bg-gray-900 rounded-lg p-4 relative">
                  <button
                    onClick={() => copyCode('ws.send(int16Array.buffer);', 'audio')}
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  >
                    {copiedCode === 'audio' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <pre className="text-green-400 text-sm">
{`// Send PCM16 audio frames
ws.send(int16Array.buffer);`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* Receive Response Tab */}
          {activeTab === 'receive' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Message Types
                </h3>
                
                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 font-medium text-gray-900">
                      Partial Transcript (while speaking)
                    </div>
                    <div className="p-4 bg-white">
                      <code className="text-sm text-gray-700">{JSON.stringify(responses.partial, null, 2)}</code>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 font-medium text-gray-900">
                      Final Transcript
                    </div>
                    <div className="p-4 bg-white">
                      <code className="text-sm text-gray-700">{JSON.stringify(responses.final, null, 2)}</code>
                    </div>
                  </div>

                  <div className="border border-green-200 rounded-lg overflow-hidden">
                    <div className="bg-green-50 px-4 py-2 font-medium text-green-900">
                      Agent Audio Response (Chunked MP3)
                    </div>
                    <div className="p-4 bg-white">
                      <code className="text-sm text-gray-700">{JSON.stringify(responses.sentence, null, 2)}</code>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-yellow-900 mb-1">Important</div>
                    <div className="text-sm text-yellow-800">
                      Audio comes in <strong>multiple chunks</strong>. Collect all chunks where <code className="bg-yellow-100 px-1 rounded">isLastChunk: false</code> then play when you receive <code className="bg-yellow-100 px-1 rounded">isLastChunk: true</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Barge-in Tab */}
          {activeTab === 'barge' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What is Barge-in?
                </h3>
                <p className="text-gray-700 mb-4">
                  Allows users to interrupt the AI agent mid-speech, just like natural conversations.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Server Triggers Barge
                </h3>
                <div className="bg-gray-900 rounded-lg p-4">
                  <pre className="text-green-400 text-sm">
{`{
  "type": "barge",
  "seq": 12,
  "reason": "content_partial"
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Gate Conditions
                </h3>
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3 font-semibold">Setting</th>
                      <th className="text-left p-3 font-semibold">Default</th>
                      <th className="text-left p-3 font-semibold">Meaning</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="p-3"><code className="bg-gray-100 px-2 py-1 rounded text-xs">MIN_PARTIAL_CHARS</code></td>
                      <td className="p-3">10</td>
                      <td className="p-3 text-gray-600">Min characters to trigger</td>
                    </tr>
                    <tr>
                      <td className="p-3"><code className="bg-gray-100 px-2 py-1 rounded text-xs">MIN_PARTIAL_WORDS</code></td>
                      <td className="p-3">2</td>
                      <td className="p-3 text-gray-600">Min words to trigger</td>
                    </tr>
                    <tr>
                      <td className="p-3"><code className="bg-gray-100 px-2 py-1 rounded text-xs">MIN_CONFIDENCE</code></td>
                      <td className="p-3">0.30</td>
                      <td className="p-3 text-gray-600">STT confidence threshold</td>
                    </tr>
                    <tr>
                      <td className="p-3"><code className="bg-gray-100 px-2 py-1 rounded text-xs">BARGE_COOLDOWN</code></td>
                      <td className="p-3">0.8s</td>
                      <td className="p-3 text-gray-600">Min time between barges</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="font-semibold text-blue-900 mb-2">What to do when barge happens:</div>
                <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
                  <li>Stop playing all audio from old <code className="bg-blue-100 px-1 rounded">seq</code></li>
                  <li>Update <code className="bg-blue-100 px-1 rounded">currentSeq</code> to new value</li>
                  <li>Only play audio matching new <code className="bg-blue-100 px-1 rounded">seq</code></li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Manual Barge-in
                </h3>
                <div className="bg-gray-900 rounded-lg p-4">
                  <pre className="text-green-400 text-sm">
{`// User clicks "Stop" button
ws.send(JSON.stringify({ type: "barge" }));`}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Try It Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-3">Ready to Try It?</h2>
        <p className="mb-6 text-blue-100">
          See a working implementation with full source code
        </p>
        <a
          href="https://github.com/yourusername/voice-websocket-example"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
        >
          <Play className="w-5 h-5" />
          View on GitHub
        </a>
      </div>
    </div>
  );
};

export default VoiceWebSocketDocs;