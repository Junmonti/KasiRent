import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { MOCK_CONVERSATIONS, MOCK_MESSAGES } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Send, ArrowLeft, Image as ImageIcon } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

export default function Messages() {
  const [, setLocation] = useLocation();
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const activeConversation = MOCK_CONVERSATIONS.find(c => c.id === activeConversationId);
  const messages = activeConversationId ? (MOCK_MESSAGES[activeConversationId] || []) : [];

  const filteredConversations = MOCK_CONVERSATIONS.filter(c => 
    c.landlordName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.listingTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversationId) return;
    
    // In a real app, this would send to an API.
    // For mockup, we just clear the input.
    setNewMessage("");
  };

  return (
    <Layout>
      <div className="bg-slate-50 min-h-[calc(100vh-64px)] pb-20 md:pb-0">
        <div className="container mx-auto max-w-6xl h-[calc(100vh-64px-80px)] md:h-[calc(100vh-64px)] md:py-6">
          <div className="bg-white md:rounded-2xl shadow-sm border border-gray-100 flex h-full overflow-hidden">
            
            {/* Sidebar (Conversations List) */}
            <div className={cn(
              "w-full md:w-80 lg:w-96 flex flex-col border-r border-gray-100 h-full",
              activeConversationId ? "hidden md:flex" : "flex"
            )}>
              <div className="p-4 border-b border-gray-100">
                <h1 className="text-2xl font-bold text-slate-900 mb-4 font-heading">Messages</h1>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <Input 
                    placeholder="Search messages..." 
                    className="pl-9 bg-slate-50 border-transparent focus-visible:ring-emerald-500 rounded-xl"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.length > 0 ? (
                  filteredConversations.map(conv => (
                    <div 
                      key={conv.id}
                      onClick={() => setActiveConversationId(conv.id)}
                      className={cn(
                        "p-4 border-b border-gray-50 cursor-pointer transition-colors hover:bg-slate-50 flex gap-3",
                        activeConversationId === conv.id ? "bg-emerald-50/50" : ""
                      )}
                    >
                      <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-lg shrink-0">
                        {conv.landlordName.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="font-semibold text-slate-900 truncate pr-2">{conv.landlordName}</h3>
                          <span className="text-xs text-slate-500 shrink-0">{conv.lastMessageTime}</span>
                        </div>
                        <p className="text-xs text-emerald-600 font-medium truncate mb-1">{conv.listingTitle}</p>
                        <div className="flex justify-between items-center">
                          <p className={cn(
                            "text-sm truncate pr-2",
                            conv.unreadCount > 0 ? "font-medium text-slate-900" : "text-slate-500"
                          )}>
                            {conv.lastMessage}
                          </p>
                          {conv.unreadCount > 0 && (
                            <div className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                              {conv.unreadCount}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-slate-500 text-sm">
                    No conversations found.
                  </div>
                )}
              </div>
            </div>

            {/* Chat Area */}
            <div className={cn(
              "flex-1 flex flex-col h-full bg-slate-50/50",
              !activeConversationId ? "hidden md:flex" : "flex"
            )}>
              {activeConversationId && activeConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="h-16 px-4 border-b border-gray-100 flex items-center gap-3 bg-white">
                    <button 
                      onClick={() => setActiveConversationId(null)}
                      className="md:hidden p-2 -ml-2 text-slate-500"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold shrink-0">
                      {activeConversation.landlordName.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="font-semibold text-slate-900">{activeConversation.landlordName}</h2>
                      <Link href={`/listing/${activeConversation.listingId}`}>
                        <p className="text-xs text-slate-500 hover:text-emerald-600 truncate cursor-pointer transition-colors">
                          {activeConversation.listingTitle}
                        </p>
                      </Link>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, idx) => {
                      const isMe = msg.senderId === 'user1';
                      const showAvatar = !isMe && (idx === 0 || messages[idx - 1].senderId !== msg.senderId);
                      
                      return (
                        <div key={msg.id} className={cn("flex max-w-[80%]", isMe ? "ml-auto justify-end" : "")}>
                          {!isMe && (
                            <div className="w-8 shrink-0 mr-2">
                              {showAvatar && (
                                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold">
                                  {activeConversation.landlordName.charAt(0)}
                                </div>
                              )}
                            </div>
                          )}
                          <div>
                            <div className={cn(
                              "px-4 py-2.5 rounded-2xl text-sm",
                              isMe 
                                ? "bg-emerald-600 text-white rounded-tr-sm" 
                                : "bg-white text-slate-800 border border-gray-100 rounded-tl-sm shadow-sm"
                            )}>
                              {msg.text}
                            </div>
                            <div className={cn(
                              "text-[10px] text-slate-400 mt-1",
                              isMe ? "text-right" : "text-left"
                            )}>
                              {msg.timestamp}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Input Area */}
                  <div className="p-4 bg-white border-t border-gray-100">
                    <form onSubmit={handleSendMessage} className="flex gap-2 items-center">
                      <button type="button" className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <ImageIcon className="w-5 h-5" />
                      </button>
                      <Input 
                        placeholder="Write a message..." 
                        className="flex-1 rounded-full bg-slate-50 border-transparent focus-visible:ring-emerald-500"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                      <Button 
                        type="submit" 
                        size="icon" 
                        className="rounded-full bg-emerald-600 hover:bg-emerald-700 h-10 w-10 shrink-0"
                        disabled={!newMessage.trim()}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                    <Send className="w-8 h-8 text-slate-300 ml-1" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Your Messages</h3>
                  <p className="text-sm">Select a conversation from the sidebar or contact a landlord from a property listing.</p>
                </div>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </Layout>
  );
}