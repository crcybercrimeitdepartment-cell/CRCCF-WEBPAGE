import { Headset, Mail, MessageCircle } from "lucide-react";

const HelpDesk = () => (
  <section
    id="help-desk"
    className="scroll-mt-8 bg-bgSection p-8 rounded-3xl border border-slate-200/60 shadow-sm"
  >
    <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-200">
      <div className="p-2 bg-white rounded-lg shadow-sm text-primary">
        <Headset size={24} />
      </div>
      <h2 className="text-2xl font-bold text-textHeading">Help Desk</h2>
    </div>

    {/* ✨ NEW CONTENT: A 2-column grid for Form and FAQ */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* LEFT COLUMN: Support Form */}
      <div className="bg-bgCard p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-textHeading mb-4 flex items-center gap-2">
          <Mail className="text-primary" size={20} /> Submit a Ticket
        </h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-textSec mb-1">
              Your Name
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/50 outline-none bg-slate-50"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-textSec mb-1">
              Issue Description
            </label>
            <textarea
              className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/50 outline-none bg-slate-50 h-32 resize-none"
              placeholder="How can we help you?"
            ></textarea>
          </div>
          <button
            type="button"
            className="w-full bg-primary-gradient text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* RIGHT COLUMN: Quick FAQ */}
      <div className="bg-bgCard p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-textHeading mb-4 flex items-center gap-2">
          <MessageCircle className="text-primary" size={20} /> Frequently Asked
        </h3>
        <div className="space-y-3">
          {/* FAQ Item 1 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <h4 className="font-bold text-sm text-textHeading">
              How long does support take?
            </h4>
            <p className="text-xs text-textSec mt-1">
              We typically reply within 24 business hours.
            </p>
          </div>
          {/* FAQ Item 2 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <h4 className="font-bold text-sm text-textHeading">
              Can I call instead?
            </h4>
            <p className="text-xs text-textSec mt-1">
              Yes! Check the Branch Details tab for our 800 number.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HelpDesk;
