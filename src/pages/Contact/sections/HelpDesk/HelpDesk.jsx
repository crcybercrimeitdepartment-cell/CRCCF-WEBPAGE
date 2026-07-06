import React from "react";
import { Headset, Mail, MessageCircle } from "lucide-react";
import { helpDeskData } from "./HelpDeskData";

const HelpDesk = () => (
  <section
    id="help-desk"
    className="scroll-mt-8 bg-bgSection p-8 rounded-3xl border border-slate-200/60 shadow-sm"
  >
    <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-200">
      <div className="p-2 bg-white rounded-lg shadow-sm text-primary">
        <Headset size={24} />
      </div>
      <h2 className="text-2xl font-bold text-textHeading">{helpDeskData.header.title}</h2>
    </div>

    {/* ✨ NEW CONTENT: A 2-column grid for Form and FAQ */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* LEFT COLUMN: Support Form */}
      <div className="bg-bgCard p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-textHeading mb-4 flex items-center gap-2">
          <Mail className="text-primary" size={20} /> {helpDeskData.form.title}
        </h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-textSec mb-1">
              {helpDeskData.form.fields.nameLabel}
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/50 outline-none bg-slate-50"
              placeholder={helpDeskData.form.fields.namePlaceholder}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-textSec mb-1">
              {helpDeskData.form.fields.issueLabel}
            </label>
            <textarea
              className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/50 outline-none bg-slate-50 h-32 resize-none"
              placeholder={helpDeskData.form.fields.issuePlaceholder}
            ></textarea>
          </div>
          <button
            type="button"
            className="w-full bg-primary-gradient text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all"
          >
            {helpDeskData.form.submitText}
          </button>
        </form>
      </div>

      {/* RIGHT COLUMN: Quick FAQ */}
      <div className="bg-bgCard p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-textHeading mb-4 flex items-center gap-2">
          <MessageCircle className="text-primary" size={20} /> {helpDeskData.faq.title}
        </h3>
        <div className="space-y-3">
          {helpDeskData.faq.items.map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <h4 className="font-bold text-sm text-textHeading">
                {item.question}
              </h4>
              <p className="text-xs text-textSec mt-1">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HelpDesk;
