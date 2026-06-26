// ✨ CHANGED: Imported MessageCircle instead of PlayCircle
import { MessageCircle } from "lucide-react";

// ✨ CHANGED: Component name updated
const LiveChat = () => (
  // --- MAIN SECTION WRAPPER ---
  <section
    id="live-chat"
    className="scroll-mt-8 bg-[#F8FAFC] p-6 sm:p-8 rounded-3xl border border-slate-200/60 shadow-sm"
  >
    {/* --- HEADER AREA --- */}
    <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-200">
      {/* Icon Box */}
      <div className="p-2 bg-white rounded-lg shadow-sm text-primary">
        <MessageCircle size={24} />
      </div>

      {/* Section Title */}
      <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
        Live Chat
      </h2>
    </div>

    {/* --- CHAT PLACEHOLDER AREA --- */}
    <div className="bg-primary/5 p-8 rounded-2xl border border-primary/20 border-dashed text-center flex flex-col items-center justify-center min-h-[250px] group">
      {/* The big chat icon in the middle with a subtle bounce on hover */}
      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:-translate-y-2 transition-transform duration-300">
        <MessageCircle size={40} className="text-primary opacity-80" />
      </div>

      {/* Placeholder Text */}
      <h3 className="text-lg font-bold text-slate-800">
        Need help? Let's talk!
      </h3>
      <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto">
        Our support team is online and ready to assist you. Click below to start
        a conversation.
      </p>

      {/* Fake Action Button */}
      <button className="mt-6 px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-md hover:shadow-lg hover:bg-primary/90 hover:-translate-y-0.5 transition-all flex items-center gap-2">
        <MessageCircle size={18} /> Start Chat Now
      </button>
    </div>
  </section>
);

export default LiveChat;
