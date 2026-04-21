import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowLeft, Send, Smile, Image, Info, Plus, X, Check, Lock, Users } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import AvatarCircle from '@/components/AvatarCircle';
import { chatGroups, chatMessages, ChatGroup, interns } from '@/data/mockData';
import { useAppContext } from '@/context/AppContext';

type View = 'list' | 'chat' | 'new-chat';
type NewChatStep = 'type' | 'people' | 'name';
type ChatType = 'private' | 'group';

interface LocalMessage {
  id: string;
  sender: string;
  senderPhoto: string;
  text: string;
  time: string;
  isSelf: boolean;
}

export default function ChatsPage() {
  const { hotspotChats } = useAppContext();

  const [view, setView] = useState<View>('list');
  const [activeChat, setActiveChat] = useState<ChatGroup | null>(null);
  const [activeChatMsgs, setActiveChatMsgs] = useState<LocalMessage[]>([]);
  const [message, setMessage] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [myChats, setMyChats] = useState(chatGroups.filter(c => c.joined));
  const [discover, setDiscover] = useState(chatGroups.filter(c => !c.joined));

  // New chat state
  const [newChatStep, setNewChatStep] = useState<NewChatStep>('type');
  const [chatType, setChatType] = useState<ChatType>('group');
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [groupName, setGroupName] = useState('');
  const [groupEmoji, setGroupEmoji] = useState('💬');

  const atlantaInterns = interns.filter(i => i.city === 'Atlanta');

  // Merge hotspot chats with my chats — hotspot chats come first
  const allMyChats = [
    ...hotspotChats.map(hc => ({
      id: hc.id,
      name: hc.name,
      type: 'interest' as const,
      emoji: hc.emoji,
      memberCount: hc.members,
      description: 'Hotspot chat',
      lastMessage: { sender: hc.msgs[hc.msgs.length - 1]?.s || '', text: hc.last, time: hc.time },
      unreadCount: hc.unread,
      joined: true,
    })),
    ...myChats,
  ];

  const openChat = (chat: ChatGroup) => {
    setActiveChat(chat);
    // Check if it's a hotspot chat — load its messages from context
    const hotspotChat = hotspotChats.find(hc => hc.id === chat.id);
    if (hotspotChat) {
      setActiveChatMsgs(hotspotChat.msgs.map((m, i) => ({
        id: `hm-${i}`,
        sender: m.s,
        senderPhoto: '',
        text: m.t,
        time: m.time,
        isSelf: m.self,
      })));
    } else {
      setActiveChatMsgs(chatMessages);
    }
    setView('chat');
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    const now = new Date();
    const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    setActiveChatMsgs(prev => [...prev, {
      id: `m${Date.now()}`,
      sender: 'You',
      senderPhoto: '',
      text: message.trim(),
      time,
      isSelf: true,
    }]);
    setMessage('');
  };

  const togglePerson = (id: string) => {
    setSelectedPeople(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const createChat = () => {
    const selectedInterns = atlantaInterns.filter(i => selectedPeople.includes(i.id));
    const name = chatType === 'private'
      ? selectedInterns[0]?.name || 'New Chat'
      : groupName || `${selectedInterns[0]?.name?.split(' ')[0]} & ${selectedInterns.length - 1} others`;

    const newChat: ChatGroup = {
      id: `custom-${Date.now()}`,
      name,
      type: 'interest',
      emoji: chatType === 'private' ? '👤' : groupEmoji,
      memberCount: selectedPeople.length + 1,
      description: chatType === 'private' ? 'Private chat' : 'Group chat',
      lastMessage: { sender: '', text: 'No messages yet', time: 'now' },
      unreadCount: 0,
      joined: true,
    };

    setMyChats(prev => [newChat, ...prev]);
    setActiveChatMsgs([]);
    setView('chat');
    setActiveChat(newChat);
    setSelectedPeople([]);
    setGroupName('');
    setNewChatStep('type');
  };

  const s = {
    input: { flex: 1, height: '40px', border: '1.5px solid #E5E5E5', borderRadius: '10px', padding: '0 12px', fontSize: '14px', color: '#111', background: '#fff', outline: 'none', fontFamily: 'Inter, system-ui, sans-serif' } as React.CSSProperties,
  };

  // Chat view
  if (view === 'chat' && activeChat) {
    const isHotspot = hotspotChats.some(hc => hc.id === activeChat.id);
    return (
      <AppLayout>
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 5rem)', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 16px', height: '56px', borderBottom: '1px solid #F0F0F0', background: '#fff', flexShrink: 0 }}>
            <button onClick={() => { setView('list'); setActiveChat(null); }} style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#F5F5F5', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ArrowLeft style={{ width: '16px', height: '16px', color: '#111' }} />
            </button>
            <span style={{ fontSize: '22px' }}>{activeChat.emoji}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{activeChat.name}</div>
              <div style={{ fontSize: '12px', color: isHotspot ? '#16A34A' : '#999' }}>
                {isHotspot ? '🟢 Live hotspot chat' : `${activeChat.memberCount} members`}
              </div>
            </div>
            <button style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#F5F5F5', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Info style={{ width: '16px', height: '16px', color: '#111' }} />
            </button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {activeChatMsgs.map((msg, i) => (
              <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
                style={{ display: 'flex', justifyContent: msg.isSelf ? 'flex-end' : 'flex-start', gap: '8px' }}>
                {!msg.isSelf && <AvatarCircle name={msg.sender} size="sm" className="mt-auto" />}
                <div style={{ maxWidth: '75%', display: 'flex', flexDirection: 'column', alignItems: msg.isSelf ? 'flex-end' : 'flex-start' }}>
                  {!msg.isSelf && <div style={{ fontSize: '11px', fontWeight: '600', color: '#999', marginBottom: '2px', marginLeft: '4px' }}>{msg.sender}</div>}
                  <div style={{ padding: '9px 13px', borderRadius: '16px', fontSize: '14px', lineHeight: '1.4', background: msg.isSelf ? '#111' : '#F5F5F5', color: msg.isSelf ? '#fff' : '#111', borderBottomRightRadius: msg.isSelf ? '4px' : '16px', borderBottomLeftRadius: msg.isSelf ? '16px' : '4px' }}>
                    {msg.text}
                  </div>
                  <div style={{ fontSize: '10px', color: '#bbb', marginTop: '3px', marginLeft: msg.isSelf ? '0' : '4px', marginRight: msg.isSelf ? '4px' : '0' }}>{msg.time}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ padding: '10px 16px 14px', borderTop: '1px solid #F0F0F0', background: '#fff', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <button style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#F5F5F5', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Smile style={{ width: '18px', height: '18px', color: '#888' }} />
            </button>
            <button style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#F5F5F5', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Image style={{ width: '18px', height: '18px', color: '#888' }} />
            </button>
            <input
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Message..."
              style={{ flex: 1, height: '38px', borderRadius: '50px', border: '1.5px solid #E5E5E5', padding: '0 14px', fontSize: '14px', color: '#111', background: '#F9F9F9', outline: 'none', fontFamily: 'Inter, system-ui, sans-serif' }}
            />
            <button onClick={sendMessage} style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#111', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Send style={{ width: '16px', height: '16px', color: '#fff' }} />
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

  // New chat view
  if (view === 'new-chat') {
    return (
      <AppLayout>
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 5rem)', fontFamily: 'Inter, system-ui, sans-serif' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 16px', height: '56px', borderBottom: '1px solid #F0F0F0', flexShrink: 0 }}>
            <button onClick={() => { setView('list'); setNewChatStep('type'); setSelectedPeople([]); }} style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#F5F5F5', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <X style={{ width: '16px', height: '16px', color: '#111' }} />
            </button>
            <div style={{ flex: 1, fontSize: '16px', fontWeight: '700', color: '#111' }}>New chat</div>
            {newChatStep === 'people' && selectedPeople.length > 0 && (
              <button onClick={() => chatType === 'private' ? createChat() : setNewChatStep('name')}
                style={{ background: '#111', color: '#fff', border: 'none', borderRadius: '50px', padding: '7px 16px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
                {chatType === 'private' ? 'Start' : 'Next'}
              </button>
            )}
            {newChatStep === 'name' && (
              <button onClick={createChat} style={{ background: '#22C55E', color: '#fff', border: 'none', borderRadius: '50px', padding: '7px 16px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
                Create
              </button>
            )}
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px' }}>
            <AnimatePresence mode="wait">
              {newChatStep === 'type' && (
                <motion.div key="type" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div style={{ fontSize: '13px', color: '#999', marginBottom: '16px' }}>What kind of chat do you want to start?</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button onClick={() => { setChatType('private'); setNewChatStep('people'); }}
                      style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px', border: '1.5px solid #E5E5E5', borderRadius: '16px', background: '#fff', cursor: 'pointer', textAlign: 'left' }}>
                      <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#F0F0F0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Lock style={{ width: '20px', height: '20px', color: '#111' }} />
                      </div>
                      <div>
                        <div style={{ fontSize: '15px', fontWeight: '700', color: '#111', marginBottom: '3px' }}>Private message</div>
                        <div style={{ fontSize: '13px', color: '#999' }}>Just you and one other intern</div>
                      </div>
                    </button>
                    <button onClick={() => { setChatType('group'); setNewChatStep('people'); }}
                      style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px', border: '1.5px solid #E5E5E5', borderRadius: '16px', background: '#fff', cursor: 'pointer', textAlign: 'left' }}>
                      <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#F0F0F0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Users style={{ width: '20px', height: '20px', color: '#111' }} />
                      </div>
                      <div>
                        <div style={{ fontSize: '15px', fontWeight: '700', color: '#111', marginBottom: '3px' }}>Group chat</div>
                        <div style={{ fontSize: '13px', color: '#999' }}>Add multiple interns to a shared chat</div>
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}

              {newChatStep === 'people' && (
                <motion.div key="people" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div style={{ fontSize: '13px', color: '#999', marginBottom: '12px' }}>
                    {chatType === 'private' ? 'Choose one intern to message' : 'Select interns to add to the group'}
                  </div>
                  {selectedPeople.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                      {selectedPeople.map(id => {
                        const intern = atlantaInterns.find(i => i.id === id);
                        return (
                          <div key={id} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#111', color: '#fff', borderRadius: '50px', padding: '5px 10px 5px 6px', fontSize: '12px', fontWeight: '600' }}>
                            <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px' }}>
                              {intern?.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            {intern?.name.split(' ')[0]}
                            <button onClick={() => togglePerson(id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', display: 'flex', padding: 0 }}>
                              <X style={{ width: '12px', height: '12px' }} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#F5F5F5', borderRadius: '10px', padding: '8px 12px', marginBottom: '14px' }}>
                    <Search style={{ width: '14px', height: '14px', color: '#999' }} />
                    <input placeholder="Search interns..." style={{ border: 'none', background: 'none', outline: 'none', fontSize: '14px', color: '#111', flex: 1, fontFamily: 'Inter, system-ui, sans-serif' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {atlantaInterns.map(intern => {
                      const selected = selectedPeople.includes(intern.id);
                      const isDisabled = chatType === 'private' && selectedPeople.length >= 1 && !selected;
                      return (
                        <button key={intern.id} onClick={() => !isDisabled && togglePerson(intern.id)}
                          style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '12px', border: 'none', background: selected ? '#F0FDF4' : '#fff', cursor: isDisabled ? 'default' : 'pointer', opacity: isDisabled ? 0.4 : 1, textAlign: 'left' }}>
                          <AvatarCircle name={intern.name} size="md" />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#111' }}>{intern.name}</div>
                            <div style={{ fontSize: '12px', color: '#999' }}>{intern.company} · {intern.pod}</div>
                          </div>
                          <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: `2px solid ${selected ? '#22C55E' : '#E5E5E5'}`, background: selected ? '#22C55E' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            {selected && <Check style={{ width: '12px', height: '12px', color: '#fff' }} />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {newChatStep === 'name' && (
                <motion.div key="name" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div style={{ fontSize: '13px', color: '#999', marginBottom: '20px' }}>Give your group a name and pick an emoji.</div>
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#111', marginBottom: '10px' }}>Emoji</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {['💬', '🏀', '🍔', '🎉', '🏋️', '☕', '🎮', '🌃', '📈', '💻', '🎨', '🧳'].map(e => (
                        <button key={e} onClick={() => setGroupEmoji(e)}
                          style={{ width: '44px', height: '44px', borderRadius: '12px', border: `2px solid ${groupEmoji === e ? '#111' : '#E5E5E5'}`, background: groupEmoji === e ? '#F5F5F5' : '#fff', fontSize: '22px', cursor: 'pointer' }}>
                          {e}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#111', marginBottom: '8px' }}>Group name</div>
                    <input value={groupName} onChange={e => setGroupName(e.target.value)}
                      placeholder="e.g. Weekend crew, Gym squad..."
                      style={{ ...s.input, width: '100%', height: '48px', borderRadius: '12px' }} autoFocus />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#111', marginBottom: '10px' }}>{selectedPeople.length} members</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {selectedPeople.map(id => {
                        const intern = atlantaInterns.find(i => i.id === id);
                        return (
                          <div key={id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                            <AvatarCircle name={intern?.name || ''} size="md" />
                            <span style={{ fontSize: '11px', color: '#666' }}>{intern?.name.split(' ')[0]}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </AppLayout>
    );
  }

  // Main chat list
  return (
    <AppLayout>
      <div style={{ maxWidth: '480px', margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 16px 8px' }}>
          <span style={{ fontSize: '22px', fontWeight: '800', color: '#111', letterSpacing: '-0.5px' }}>Chats</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setSearchOpen(!searchOpen)} style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#F5F5F5', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Search style={{ width: '16px', height: '16px', color: '#111' }} />
            </button>
            <button onClick={() => setView('new-chat')} style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#111', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Plus style={{ width: '16px', height: '16px', color: '#fff' }} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden', padding: '0 16px 10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#F5F5F5', borderRadius: '10px', padding: '8px 12px', marginBottom: '8px' }}>
                <Search style={{ width: '14px', height: '14px', color: '#999' }} />
                <input placeholder="Search chats..." style={{ border: 'none', background: 'none', outline: 'none', fontSize: '14px', color: '#111', flex: 1, fontFamily: 'Inter, system-ui, sans-serif' }} autoFocus />
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {['All', 'City', 'Company', 'Interests', 'Events'].map(chip => (
                  <button key={chip} style={{ padding: '5px 12px', borderRadius: '50px', border: '1px solid #E5E5E5', background: '#fff', fontSize: '12px', fontWeight: '500', color: '#666', cursor: 'pointer' }}>{chip}</button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* My Chats — includes hotspot chats */}
        <div style={{ padding: '4px 16px 0' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#999', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>My Chats</div>
          {allMyChats.map(chat => (
            <button key={chat.id} onClick={() => openChat(chat)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 8px', borderRadius: '14px', border: 'none', background: '#fff', cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ position: 'relative', width: '46px', height: '46px', flexShrink: 0 }}>
                <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>{chat.emoji}</div>
                {/* Green dot for hotspot live chats */}
                {hotspotChats.some(hc => hc.id === chat.id) && (
                  <div style={{ position: 'absolute', bottom: 1, right: 1, width: '12px', height: '12px', borderRadius: '50%', background: '#22C55E', border: '2px solid #fff' }} />
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{chat.name}</span>
                  <span style={{ fontSize: '11px', color: '#bbb', flexShrink: 0, marginLeft: '8px' }}>{chat.lastMessage.time}</span>
                </div>
                <div style={{ fontSize: '13px', color: '#999', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {chat.lastMessage.sender ? `${chat.lastMessage.sender}: ` : ''}{chat.lastMessage.text}
                </div>
              </div>
              {chat.unreadCount > 0 && (
                <div style={{ background: '#111', color: '#fff', borderRadius: '50px', fontSize: '11px', fontWeight: '700', padding: '2px 7px', flexShrink: 0 }}>{chat.unreadCount}</div>
              )}
            </button>
          ))}
        </div>

        {/* Discover */}
        <div style={{ padding: '16px 16px 80px' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#999', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Discover</div>
          {discover.map(chat => (
            <div key={chat.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', border: '1px solid #F0F0F0', borderRadius: '14px', marginBottom: '8px', background: '#fff' }}>
              <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', opacity: 0.6, flexShrink: 0 }}>{chat.emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#111' }}>{chat.name}</div>
                <div style={{ fontSize: '12px', color: '#999' }}>{chat.memberCount} members · {chat.description}</div>
              </div>
              <button onClick={() => { setDiscover(prev => prev.filter(c => c.id !== chat.id)); setMyChats(prev => [{ ...chat, joined: true }, ...prev]); }}
                style={{ background: '#111', color: '#fff', border: 'none', borderRadius: '50px', padding: '7px 14px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', flexShrink: 0 }}>
                Join
              </button>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}