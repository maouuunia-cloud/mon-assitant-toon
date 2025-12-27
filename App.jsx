import React, { useState, useEffect, useRef } from 'react';
import { Mic, MessageSquare, BookOpen, ArrowRight, Sparkles, Info } from 'lucide-react';

const WEBTOON_DATABASE = [
  {
    id: "753",
    name: "solo leveling",
    webUrl: "https://www.webtoons.com/en/action/solo-leveling/list?title_no=753",
    appUrl: "linewebtoon://title/list?titleNo=753"
  },
  {
    id: "123",
    name: "chevalier noir",
    webUrl: "https://www.webtoons.com/fr/action/le-chevalier-noir/list?title_no=123",
    appUrl: "linewebtoon://title/list?titleNo=123"
  },
  {
    id: "1320",
    name: "lore olympus",
    webUrl: "https://www.webtoons.com/en/romance/lore-olympus/list?title_no=1320",
    appUrl: "linewebtoon://title/list?titleNo=1320"
  }
];

const App = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Bonjour ! Dites : Lire Solo Leveling"
    }
  ]);

  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleCommand = (text) => {
    const input = text.toLowerCase();
    let response = "";
    let action = null;

    const foundWebtoon = WEBTOON_DATABASE.find(w => input.includes(w.name));

    if (foundWebtoon) {
      response = `Ouverture de "${foundWebtoon.name.toUpperCase()}" dans l'application...`;
      action = () => {
        window.location.href = foundWebtoon.appUrl;
        setTimeout(() => {
          window.location.href = foundWebtoon.webUrl;
        }, 1200);
      };
    } else {
      response = "Commande non reconnue.";
    }

    setMessages(prev => [...prev, { role: 'assistant', text: response }]);
    if (action) setTimeout(action, 800);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const query = inputValue;
    setMessages(prev => [...prev, { role: 'user', text: query }]);
    setInputValue("");
    setTimeout(() => handleCommand(query), 400);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-900 p-4">
      <div className="w-full max-w-sm h-[700px] bg-white rounded-[2.5rem] border-[8px] border-neutral-800 flex flex-col">
        <header className="px-6 py-6 border-b flex flex-col items-center">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-2">
            <Sparkles className="text-white" size={24} />
          </div>
          <h1 className="text-lg font-bold">Assistant TextToon</h1>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-neutral-100 text-neutral-800'
              }`}>
                <p className="text-xs font-medium">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex bg-neutral-100 rounded-full p-1">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-transparent px-4 py-2 outline-none text-xs font-bold"
            />
            <button type="submit" className="bg-indigo-600 text-white p-2 rounded-full">
              <ArrowRight size={18} />
            </button>
          </form>
          <div className="mt-2 text-center text-[8px] opacity-40">Assistant Privé</div>
        </div>
      </div>
    </div>
  );
};

export default App;
