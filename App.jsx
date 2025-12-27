import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MessageSquare, 
  BookOpen, 
  ArrowRight, 
  Sparkles, 
  Info 
} from 'lucide-react';

/**
 * BASE DE DONNÉES DES WEBTOONS
 * IDs officiels pour permettre la redirection directe
 */
const WEBTOON_DATABASE = [
  { id: "753", name: "solo leveling", url: "https://www.webtoons.com/en/action/solo-leveling/list?title_no=753" },
  { id: "123", name: "chevalier noir", url: "https://www.webtoons.com/fr/action/le-chevalier-noir/list?title_no=123" },
  { id: "1320", name: "lore olympus", url: "https://www.webtoons.com/en/romance/lore-olympus/list?title_no=1320" }
];

const App = () => {
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      text: "Bonjour ! Je suis votre assistant TextToon. Dites-moi : 'Lire Solo Leveling' ou 'Ouvrir mes messages'." 
    }
  ]);
  
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isListening]);

  const handleCommand = (text) => {
    const input = text.toLowerCase();
    let response = "";
    let action = null;

    const foundWebtoon = WEBTOON_DATABASE.find(w => input.includes(w.name));

    if (foundWebtoon) {
      response = `Je lance "${foundWebtoon.name.toUpperCase()}" dans votre application...`;
      action = () => window.location.href = foundWebtoon.url;
    } 
    else if (input.includes("message") || input.includes("sms")) {
      response = "J'ouvre votre application de messagerie native.";
      action = () => window.location.href = "sms:";
    } 
    else if (input.includes("webtoon") || input.includes("lire")) {
      response = "Ouverture du catalogue Webtoon.";
      action = () => window.location.href = "https://www.webtoons.com";
    } 
    else {
      response = "Désolé, je n'ai pas trouvé cette série ou cette commande.";
    }

    setMessages(prev => [...prev, { role: 'assistant', text: response }]);
    if (action) setTimeout(action, 1800);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const query = inputValue;
    setMessages(prev => [...prev, { role: 'user', text: query }]);
    setInputValue("");
    setTimeout(() => handleCommand(query), 600);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-900 font-sans p-4 text-center">
      {/* CADRE MOBILE */}
      <div className="w-full max-w-sm h-[700px] bg-white relative overflow-hidden shadow-2xl flex flex-col rounded-[2.5rem] border-[8px] border-neutral-800">
        
        <header className="px-6 py-6 border-b border-neutral-50 flex flex-col items-center">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg mb-2">
            <Sparkles className="text-white" size={24} />
          </div>
          <h1 className="text-lg font-bold text-neutral-800 tracking-tight">Assistant TextToon</h1>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-neutral-100 text-neutral-800 rounded-tl-none border border-neutral-200 text-left'
              }`}>
                <p className="text-xs font-medium leading-relaxed text-center">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-white border-t border-neutral-50">
          <form onSubmit={handleSubmit} className="flex items-center bg-neutral-100 rounded-full p-1 shadow-inner">
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Action..."
              className="flex-1 bg-transparent px-4 py-2 outline-none text-xs font-bold"
            />
            <button type="submit" className="bg-indigo-600 text-white p-2 rounded-full shadow-lg">
              <ArrowRight size={18} />
            </button>
          </form>
          <div className="mt-2 flex items-center justify-center gap-1 opacity-40">
            <Info size={10} />
            <span className="text-[8px] font-bold uppercase tracking-widest">Assistant Privé</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
