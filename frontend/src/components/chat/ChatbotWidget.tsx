import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, Sparkles, Shield, Cpu, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Message {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: Date;
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! I am your SafeCity AI Copilot. How can I assist you with security analysis or system status today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMessage.content })
      });

      if (!response.ok) {
        throw new Error('API Error');
      }

      const data = await response.json();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || "I'm sorry, I couldn't process that request.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "⚠️ Connection error or LLM unconfigured. Please check the backend logs.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* World-Class Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 w-16 h-16 rounded-full flex items-center justify-center z-50 overflow-hidden group cursor-pointer shadow-[0_0_40px_rgba(0,242,255,0.4)] border border-primary-500/50"
            style={{
              background: 'linear-gradient(135deg, #00F2FF 0%, #0088FF 100%)',
            }}
          >
            {/* Animated Glow Rings */}
            <div className="absolute inset-0 rounded-full border-2 border-white/20 scale-110 group-hover:scale-150 group-hover:opacity-0 transition-all duration-700 ease-out" />
            <div className="absolute inset-0 rounded-full border-2 border-white/10 scale-100 group-hover:scale-125 group-hover:opacity-0 transition-all duration-500 delay-100 ease-out" />
            
            {/* Light Sweep Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            
            {/* Core Icon */}
            <div className="relative z-10 flex items-center justify-center w-full h-full text-secondary-900 group-hover:rotate-12 transition-transform duration-300">
              <Cpu className="w-8 h-8 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Shield className="w-8 h-8 absolute group-hover:opacity-0 transition-opacity duration-300" />
            </div>
            
            {/* Online Pulse */}
            <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-white rounded-full border-2 border-[#0088FF] shadow-[0_0_10px_white] animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Premium Glassmorphic Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 40, scale: 0.9, filter: 'blur(10px)' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-8 right-8 w-[420px] max-w-[calc(100vw-2rem)] h-[650px] max-h-[calc(100dvh-6rem)] z-50 flex flex-col min-h-0 overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),0_0_80px_rgba(0,242,255,0.15)]"
            style={{
              background: 'rgba(8,12,24,0.6)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              border: '1px solid rgba(0,242,255,0.2)',
              boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.1)',
            }}
          >
            {/* Decorative Background Elements inside the chat window */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent-blue/10 rounded-full blur-[80px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

            {/* Sleek Header */}
            <div className="relative flex items-center justify-between px-6 py-5 shrink-0 overflow-hidden border-b border-primary-500/20 bg-gradient-to-r from-primary-500/10 via-transparent to-transparent">
              <div className="flex items-center gap-4 relative z-10">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-blue flex items-center justify-center shadow-[0_0_20px_rgba(0,242,255,0.4)]">
                    <Bot className="w-7 h-7 text-secondary-900" />
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-accent-green rounded-full border-2 border-[#0A0F1C] shadow-[0_0_10px_#00FF88] animate-pulse" />
                </div>
                <div>
                  <h3 className="text-white font-bold font-heading text-xl tracking-wide flex items-center gap-2 drop-shadow-md">
                    Security Copilot
                    <Sparkles className="w-4 h-4 text-primary-400" />
                  </h3>
                  <p className="text-xs text-primary-400 font-mono tracking-wider uppercase flex items-center gap-1.5 mt-0.5">
                    <Zap className="w-3 h-3" /> System Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="relative z-10 p-2.5 bg-white/5 hover:bg-white/10 rounded-full text-gray-300 hover:text-white transition-all duration-300 hover:rotate-90 border border-white/5 hover:border-white/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-primary-500/30 scrollbar-track-transparent relative z-10">
              {messages.map((message, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i === messages.length - 1 ? 0.1 : 0, type: 'spring', stiffness: 250 }}
                  key={message.id}
                  className={cn(
                    "flex max-w-[88%] gap-3",
                    message.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}
                >
                  <div className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-auto mb-1 shadow-lg",
                    message.role === 'user' 
                      ? "bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600" 
                      : "bg-gradient-to-br from-primary-500/30 to-primary-500/5 border border-primary-500/50 shadow-[0_0_15px_rgba(0,242,255,0.2)]"
                  )}>
                    {message.role === 'user' 
                      ? <User className="w-5 h-5 text-white" />
                      : <Bot className="w-5 h-5 text-primary-400" />
                    }
                  </div>
                  <div className={cn(
                    "px-5 py-4 text-[15px] leading-relaxed shadow-xl backdrop-blur-md",
                    message.role === 'user'
                      ? "bg-gradient-to-br from-primary-500 to-accent-blue text-black rounded-[24px] rounded-br-sm font-semibold shadow-[0_10px_25px_rgba(0,242,255,0.2)]"
                      : "bg-secondary-900/60 border border-primary-500/20 text-gray-100 rounded-[24px] rounded-bl-sm font-medium shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
                  )}>
                    {message.content}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex max-w-[88%] gap-3 mr-auto relative z-10"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500/30 to-primary-500/5 border border-primary-500/50 flex items-center justify-center shrink-0 mt-auto mb-1 shadow-[0_0_15px_rgba(0,242,255,0.2)]">
                    <Bot className="w-5 h-5 text-primary-400" />
                  </div>
                  <div className="px-5 py-4 bg-secondary-900/60 border border-primary-500/20 rounded-[24px] rounded-bl-sm flex items-center gap-2 shadow-xl backdrop-blur-md">
                    <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-2 h-2 bg-primary-500 rounded-full shadow-[0_0_8px_rgba(0,242,255,0.8)]" />
                    <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-primary-500 rounded-full shadow-[0_0_8px_rgba(0,242,255,0.8)]" />
                    <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-primary-500 rounded-full shadow-[0_0_8px_rgba(0,242,255,0.8)]" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} className="h-2" />
            </div>

            {/* Floating Pill Input Area */}
            <div className="p-6 pt-2 shrink-0 relative z-10">
              <form onSubmit={handleSubmit} className="relative flex items-center group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-accent-blue to-primary-500 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Copilot about anomalies..."
                  className="w-full relative bg-secondary-900/80 border border-primary-500/30 rounded-full pl-6 pr-14 py-4 text-[15px] text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:bg-secondary-900 transition-all duration-300 shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)] backdrop-blur-xl"
                />
                <div className="absolute right-2 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="p-3 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    title="Close Chat (Esc)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="p-3 rounded-full text-primary-500 hover:text-secondary-900 hover:bg-primary-500 disabled:text-gray-600 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,242,255,0.6)]"
                  >
                    <Send className="w-5 h-5 ml-0.5" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
