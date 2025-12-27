import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  Smartphone, 
  MessageSquare, 
  BookOpen, 
  ArrowRight, 
  Sparkles,
  Info
} from 'lucide-react';

/**
 * CONFIGURATION : Base de données des Webtoons
 * Ces liens utilisent les identifiants officiels pour ouvrir l'app native
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
      text: "Bonjour ! Je suis votre assistant TextToon. Je peux ouvrir vos SMS ou lancer un épisode spécifique pour vous. Essayez de dire : 'Lire Solo Leveling'." 
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
      response = `C'est parti ! J'ouvre l'épisode de "${foundWebtoon.name.toUpperCase()}" dans votre application Webtoon...`;
      action = () => window.location.href = foundWebtoon.url;
    } 
    else if (input.includes("message") || input.includes("sms") || input.includes("texto")) {
      response = "Compris. J'ouvre votre application de messagerie native...";
      action = () => window.location.href = "sms:";
    } 
    else if (input.includes("webtoon") || input.includes("lire")) {
      response = "J'ouvre l'application Webtoon sur votre catalogue.";
      action = () => window.location.href = "https://www.webtoons.com";
    } 
    else {
      response = "Désolé, je n'ai pas trouvé cette commande. Vous pouvez dire 'Ouvrir mes SMS' ou 'Lire [Titre du manga]'.";
    }

    setMessages(prev => [...prev, { role: 'assistant', text: response }]);
    if (action) setTimeout(action, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const query = inputValue;
    setMessages(prev => [...prev, { role: 'user', text: query }]);
    setInputValue("");
    setTimeout(() => handleCommand(query), 600);
  };

  const toggleMic = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      const commands = ["Lire Solo Leveling", "Ouvrir mes messages"];
      const randomCmd = commands[Math.floor(Math.random() * commands.length)];
      setMessages(prev => [...prev, { role: 'user', text: `(Vocal) ${randomCmd}` }]);
      handleCommand(randomCmd);
    }, 2500);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-950 font-sans p-2">
      <div className="w-full max-w-md h-[100dvh] bg-white relative overflow-hidden shadow-2xl flex flex-col sm:h-[820px] sm:rounded-[3rem] border-[10px] border-slate-900">
        
        <div className="h-8 flex justify-between items-center px-8 pt-4 text-[12px] font-bold text-slate-400">
          <span>9:41</span>
          <div className="flex gap-2 items-center">
            <div className="w-4 h-2 bg-slate-300 rounded-sm"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        <header className="px-6 py-4 text-center border-b border-slate-50">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-2 shadow-indigo-200">
            <Sparkles className="text-white" size={32} />
          </div>
          <h1 className="text-xl font-black text-slate-800 tracking-tight text-center">TextToon AI</h1>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 hide-scrollbar" ref={scrollRef}>
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'
              }`}>
                <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
          {isListening && (
            <div className="flex justify-start">
              <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none border border-slate-200 flex gap-2 items-center">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-2 text-center">Écoute...</span>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-2 flex gap-2 overflow-x-auto no-scrollbar pb-4">
          {["Lire Solo Leveling", "Ouvrir mes SMS", "Chevalier Noir"].map((s) => (
            <button 
              key={s} 
              onClick={() => handleCommand(s)} 
              className="whitespace-nowrap px-4 py-2 bg-white rounded-full text-[11px] font-bold text-slate-600 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 transition shadow-sm"
            >
              {s}
            </button>
          ))}
        </div>

        <div className="p-6 bg-white border-t border-slate-50">
          <form onSubmit={handleSubmit} className="flex items-center bg-slate-100 rounded-[2rem] p-2 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100 shadow-inner">
            <button 
              type="button" 
              onClick={toggleMic}
              className={`p-3 rounded-full transition-colors ${isListening ? 'bg-red-500 text-white animate-pulse' : 'text-slate-400 hover:bg-slate-200'}`}
            >
              <Mic size={22} />
            </button>
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Écrivez votre commande..."
              className="flex-1 bg-transparent px-3 py-2 outline-none text-sm font-semibold text-slate-700"
            />
            <button type="submit" className="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition active:scale-90 flex items-center justify-center">
              <ArrowRight size={22} />
            </button>
          </form>
          
          <div className="mt-4 flex items-start gap-2 px-2">
            <Info size={12} className="text-slate-300 mt-0.5" />
            <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest text-center">
              Technologie Deep Link • Mode Privé
            </p>
          </div>
        </div>

        <div className="h-1.5 w-32 bg-slate-200 rounded-full mx-auto mb-2"></div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .hide-scrollbar { scrollbar-width: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default App;
