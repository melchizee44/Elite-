import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Search, Trash2, CheckCircle, Eye, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/src/lib/utils';

export default function AdminMessages() {
  const [messages, setMessages] = useState([
    { id: '1', name: 'John Doe', email: 'john@example.com', phone: '08012345678', subject: 'Enquiry about shoes', message: 'Hello, I would like to know if you have the classic loafers in size 44.', createdAt: Date.now() - 3600000, isRead: false },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '08098765432', subject: 'Delivery status', message: 'Hi, I placed an order yesterday. When should I expect delivery?', createdAt: Date.now() - 86400000, isRead: true },
  ]);

  const [selectedMessage, setSelectedMessage] = useState<typeof messages[0] | null>(null);
  const [search, setSearch] = useState('');

  const filteredMessages = messages.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) || 
    m.email.toLowerCase().includes(search.toLowerCase()) || 
    m.subject.toLowerCase().includes(search.toLowerCase()) || 
    m.message.toLowerCase().includes(search.toLowerCase())
  );

  const toggleRead = (id: string) => {
    setMessages(messages.map(m => m.id === id ? { ...m, isRead: !m.isRead } : m));
  };

  const deleteMessage = (id: string) => {
    if (window.confirm('Delete this message?')) {
      setMessages(messages.filter(m => m.id !== id));
      if (selectedMessage?.id === id) setSelectedMessage(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-[#2D2D2D]">Customer Messages</h1>
        <p className="text-gray-500">Manage enquiries and feedback from your customers.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Messages List */}
        <div className="lg:col-span-1 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden h-[calc(100vh-250px)] flex flex-col">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-200 focus:ring-1 focus:ring-[#FB7701] outline-none text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-grow overflow-y-auto custom-scrollbar">
            {filteredMessages.length === 0 ? (
              <div className="py-20 text-center text-gray-400">No messages found.</div>
            ) : (
              <div className="divide-y divide-gray-50">
                {filteredMessages.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setSelectedMessage(m);
                      if (!m.isRead) toggleRead(m.id);
                    }}
                    className={cn(
                      "w-full text-left p-6 transition-all hover:bg-gray-50 flex flex-col space-y-2",
                      selectedMessage?.id === m.id ? "bg-[#FB7701]/5 border-l-4 border-[#FB7701]" : "border-l-4 border-transparent",
                      !m.isRead && "font-bold"
                    )}
                  >
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-[#2D2D2D] truncate max-w-[150px]">{m.name}</p>
                      <p className="text-[10px] text-gray-400 uppercase font-bold">{format(m.createdAt, 'MMM d')}</p>
                    </div>
                    <p className="text-xs text-[#FB7701] line-clamp-1">{m.subject}</p>
                    <p className="text-xs text-gray-500 line-clamp-1 italic">"{m.message}"</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Message Content */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[calc(100vh-250px)]">
          {selectedMessage ? (
            <div className="flex flex-col h-full">
              <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#FB7701]/10 rounded-full flex items-center justify-center text-[#FB7701] font-bold text-xl">
                    {selectedMessage.name[0]}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#2D2D2D]">{selectedMessage.name}</h2>
                    <p className="text-xs text-gray-500">{selectedMessage.email} • {selectedMessage.phone}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => toggleRead(selectedMessage.id)}
                    className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-[#FB7701] transition-colors shadow-sm"
                  >
                    <CheckCircle className={cn("w-5 h-5", !selectedMessage.isRead && "opacity-50")} />
                  </button>
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteMessage(selectedMessage.id);
                    }}
                    className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-red-500 transition-colors shadow-sm"
                  >
                    <Trash2 className="w-5 h-5 pointer-events-none" />
                  </button>
                </div>
              </div>
              <div className="flex-grow p-10 overflow-y-auto space-y-8 custom-scrollbar">
                <div className="space-y-2">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Subject</p>
                  <h3 className="text-2xl font-bold text-[#2D2D2D]">{selectedMessage.subject}</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-[10px] font-bold text-gray-400 uppercase">
                    <Clock className="w-3 h-3" />
                    <span>RECEIVED ON {format(selectedMessage.createdAt, 'PPP p')}</span>
                  </div>
                  <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 min-h-[200px]">
                    <p className="text-[#2D2D2D] leading-relaxed whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                </div>
              </div>
              <div className="p-8 border-t border-gray-100 bg-gray-50/30">
                <a 
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                  className="bg-[#2D2D2D] text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-black transition-colors flex items-center w-fit"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  REPLY TO MESSAGE
                </a>
              </div>
            </div>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-center p-20 space-y-6">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center">
                <Eye className="w-10 h-10 text-gray-200" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-300 uppercase tracking-widest">Select a message</h3>
                <p className="text-gray-400 text-sm max-w-xs mx-auto">Click on a message from the sidebar to view its full content and respond.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
