import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowLeft, Send, Smile, Image, Info, ChevronRight } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import AvatarCircle from '@/components/AvatarCircle';
import { chatGroups, chatMessages, ChatGroup } from '@/data/mockData';

export default function ChatsPage() {
  const [activeChat, setActiveChat] = useState<ChatGroup | null>(null);
  const [message, setMessage] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  const joined = chatGroups.filter(c => c.joined);
  const discover = chatGroups.filter(c => !c.joined);

  if (activeChat) {
    return (
      <AppLayout>
        <div className="flex flex-col h-[calc(100vh-5rem)]">
          {/* Chat Header */}
          <div className="flex items-center gap-3 px-4 h-14 border-b border-border bg-card shrink-0">
            <button onClick={() => setActiveChat(null)} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-xl">{activeChat.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-foreground truncate">{activeChat.name}</div>
              <div className="text-xs text-muted-foreground">{activeChat.memberCount} members</div>
            </div>
            <button className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <Info className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {chatMessages.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className={`flex gap-2 ${msg.isSelf ? 'justify-end' : 'justify-start'}`}
              >
                {!msg.isSelf && <AvatarCircle name={msg.sender} size="sm" className="mt-auto" />}
                <div className={`max-w-[75%] ${msg.isSelf ? 'items-end' : 'items-start'}`}>
                  {!msg.isSelf && (
                    <div className="text-[11px] font-semibold text-muted-foreground mb-0.5 ml-1">{msg.sender}</div>
                  )}
                  <div className={`px-3.5 py-2 rounded-2xl text-sm leading-relaxed ${
                    msg.isSelf
                      ? 'gradient-primary text-primary-foreground rounded-br-md'
                      : 'bg-muted text-foreground rounded-bl-md'
                  }`}>
                    {msg.text}
                  </div>
                  <div className={`text-[10px] text-muted-foreground mt-0.5 ${msg.isSelf ? 'text-right mr-1' : 'ml-1'}`}>{msg.time}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input Bar */}
          <div className="shrink-0 px-4 py-3 border-t border-border bg-card">
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <Smile className="w-5 h-5" />
              </button>
              <button className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <Image className="w-5 h-5" />
              </button>
              <input
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Message..."
                className="flex-1 h-10 px-4 rounded-full bg-muted text-sm outline-none placeholder:text-muted-foreground"
              />
              <button className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground shadow-sm">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-14">
          <h2 className="text-xl font-bold text-foreground">Chats</h2>
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="w-9 h-9 rounded-full bg-muted flex items-center justify-center"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-6 overflow-hidden"
            >
              <input
                placeholder="Search chats..."
                className="w-full h-10 px-4 rounded-xl bg-muted text-sm outline-none mb-3 placeholder:text-muted-foreground"
                autoFocus
              />
              <div className="flex gap-2 mb-3">
                {['All', 'City', 'Company', 'Interests', 'Events'].map(chip => (
                  <button key={chip} className="px-3 py-1 rounded-full border border-border text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-primary transition-colors">
                    {chip}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* My Chats */}
        <div className="px-6">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">My Chats</h3>
          <div className="space-y-1">
            {joined.map(chat => (
              <button
                key={chat.id}
                onClick={() => setActiveChat(chat)}
                className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-muted/50 transition-colors text-left"
              >
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl shrink-0">
                  {chat.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-foreground truncate">{chat.name}</span>
                    <span className="text-[10px] text-muted-foreground shrink-0 ml-2">{chat.lastMessage.time}</span>
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {chat.lastMessage.sender}: {chat.lastMessage.text}
                  </div>
                </div>
                {chat.unreadCount > 0 && (
                  <div className="w-5 h-5 rounded-full bg-destructive flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-destructive-foreground">{chat.unreadCount}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Discover */}
        <div className="px-6 mt-6">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Discover</h3>
          <div className="space-y-2">
            {discover.map(chat => (
              <div
                key={chat.id}
                className="flex items-center gap-3 p-3 rounded-2xl border border-border bg-card"
              >
                <div className="w-12 h-12 rounded-full bg-muted/60 flex items-center justify-center text-2xl shrink-0 opacity-60">
                  {chat.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-foreground">{chat.name}</div>
                  <div className="text-xs text-muted-foreground">{chat.memberCount} members · {chat.description}</div>
                </div>
                <button className="px-3 py-1.5 rounded-full gradient-primary text-primary-foreground text-xs font-bold shrink-0">
                  Join
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
