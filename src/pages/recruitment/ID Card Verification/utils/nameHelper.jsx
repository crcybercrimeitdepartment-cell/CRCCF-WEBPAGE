import React from 'react';
import { User } from 'lucide-react';

/**
 * Splits a full name string into firstName, middleName, and lastName.
 */
export function splitPersonName(fullName = "") {
    if (!fullName || typeof fullName !== "string") {
        return { firstName: "-", middleName: "-", lastName: "-" };
    }
    const clean = fullName.trim();
    if (!clean || clean === "-") {
        return { firstName: "-", middleName: "-", lastName: "-" };
    }
    const parts = clean.split(/\s+/).filter(Boolean);
    if (parts.length === 1) {
        return { firstName: parts[0], middleName: "-", lastName: "-" };
    }
    if (parts.length === 2) {
        return { firstName: parts[0], middleName: "-", lastName: parts[1] };
    }
    return {
        firstName: parts[0],
        middleName: parts.slice(1, -1).join(" "),
        lastName: parts[parts.length - 1]
    };
}

/**
 * Returns 3 label names: [Role] First Name, [Role] Middle Name, [Role] Last Name
 */
export function getPersonNameLabels(baseLabel = "Name") {
    const trimmed = (baseLabel || "Name").trim();
    if (!trimmed || /^name$/i.test(trimmed)) {
        return {
            firstLabel: "First Name",
            middleLabel: "Middle Name",
            lastLabel: "Last Name"
        };
    }
    if (/name$/i.test(trimmed)) {
        const prefix = trimmed.replace(/\s*name$/i, '').trim();
        return {
            firstLabel: `${prefix} First Name`,
            middleLabel: `${prefix} Middle Name`,
            lastLabel: `${prefix} Last Name`
        };
    }
    return {
        firstLabel: `${trimmed} First Name`,
        middleLabel: `${trimmed} Middle Name`,
        lastLabel: `${trimmed} Last Name`
    };
}

/**
 * Robust InfoField component preventing text overflow and clipping.
 */
export const InfoField = ({ icon: Icon, label, value, themeColor = "#0f4cd9", className = "" }) => (
    <div className={`flex items-start space-x-3 sm:space-x-4 p-4 bg-white rounded-2xl border border-slate-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-transparent transition-all duration-300 group h-full ${className}`}>
        {Icon && (
            <div 
                className="mt-0.5 p-2.5 rounded-xl transition-transform duration-300 group-hover:scale-110 shrink-0" 
                style={{ color: themeColor, backgroundColor: `${themeColor}15` }}
            >
                <Icon size={18} strokeWidth={2.5} />
            </div>
        )}
        <div className="min-w-0 flex-1 overflow-hidden">
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-1 break-words">{label}</p>
            <p className="text-[14px] sm:text-[15px] text-slate-800 font-semibold break-words leading-snug">{value || '-'}</p>
        </div>
    </div>
);

/**
 * Renders 3 InfoFields for First, Middle, and Last Name
 */
export const PersonNameFields = ({ 
    icon: Icon = User, 
    baseLabel,
    prefix,
    label,
    fullName = "", 
    name = "",
    themeColor = "#0f4cd9",
    firstName,
    middleName,
    lastName,
    className = ""
}) => {
    const rawLabel = baseLabel || prefix || label || "Name";
    const rawFull = fullName || name || "";
    const split = splitPersonName(rawFull);
    const fName = firstName !== undefined ? (firstName || "-") : split.firstName;
    const mName = middleName !== undefined ? (middleName || "-") : split.middleName;
    const lName = lastName !== undefined ? (lastName || "-") : split.lastName;

    const { firstLabel, middleLabel, lastLabel } = getPersonNameLabels(rawLabel);

    return (
        <div 
            className={`col-span-full grid grid-cols-1 sm:grid-cols-3 gap-4 w-full ${className}`}
            style={{ gridColumn: '1 / -1' }}
        >
            <InfoField icon={Icon} label={firstLabel} value={fName} themeColor={themeColor} />
            <InfoField icon={Icon} label={middleLabel} value={mName} themeColor={themeColor} />
            <InfoField icon={Icon} label={lastLabel} value={lName} themeColor={themeColor} />
        </div>
    );
};

/**
 * 3-input component for lookup form search (First Name, Middle Name, Last Name)
 */
export const PersonNameInputGroup = ({
    label = "Name",
    firstName,
    setFirstName,
    middleName,
    setMiddleName,
    lastName,
    setLastName,
    themeColor = "#0f4cd9",
    required = true,
    focusedInput,
    setFocusedInput
}) => {
    return (
        <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                {label}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                    <input 
                        type="text" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        onFocus={() => setFocusedInput && setFocusedInput('firstName')}
                        onBlur={() => setFocusedInput && setFocusedInput(null)}
                        className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none transition-all text-slate-700 text-sm font-medium"
                        style={ focusedInput === 'firstName' ? { borderColor: themeColor, boxShadow: `0 0 0 2px ${themeColor}33`, backgroundColor: 'white' } : {} }
                        placeholder="First Name *"
                        required={required}
                    />
                </div>
                <div>
                    <input 
                        type="text" 
                        value={middleName}
                        onChange={(e) => setMiddleName(e.target.value)}
                        onFocus={() => setFocusedInput && setFocusedInput('middleName')}
                        onBlur={() => setFocusedInput && setFocusedInput(null)}
                        className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none transition-all text-slate-700 text-sm font-medium"
                        style={ focusedInput === 'middleName' ? { borderColor: themeColor, boxShadow: `0 0 0 2px ${themeColor}33`, backgroundColor: 'white' } : {} }
                        placeholder="Middle Name"
                    />
                </div>
                <div>
                    <input 
                        type="text" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        onFocus={() => setFocusedInput && setFocusedInput('lastName')}
                        onBlur={() => setFocusedInput && setFocusedInput(null)}
                        className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none transition-all text-slate-700 text-sm font-medium"
                        style={ focusedInput === 'lastName' ? { borderColor: themeColor, boxShadow: `0 0 0 2px ${themeColor}33`, backgroundColor: 'white' } : {} }
                        placeholder="Last Name"
                    />
                </div>
            </div>
        </div>
    );
};
