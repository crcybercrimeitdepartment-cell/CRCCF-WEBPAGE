import { useState } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import pageData from "../../../data/report/VictimRightsAndSupport/../../../data/report/VictimRightsAndSupport/DigitalJusticeSupportServicesDataPage";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function FolderCover({ isOpen, onClick }) {
  const folderColor = "bg-[#ebd7b6]";
  const folderBorder = "border-[#d1ba95]";

  return (
    <motion.div
      onClick={onClick}
      className={cn(
        "absolute inset-0 z-50 cursor-pointer origin-bottom",
        "flex flex-col preserve-3d",
        isOpen ? "pointer-events-none" : ""
      )}
      initial={false}
      animate={{
        rotateX: isOpen ? 160 : 0,
        y: 0,
        opacity: isOpen ? 0 : 1,
      }}
      transition={{
        rotateX: { duration: 3.0, ease: "easeInOut" },
        opacity: { duration: 0.2, delay: isOpen ? 2.8 : 0 },
      }}
    >
      <div className="relative w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]">
        <div className={cn(
          "absolute top-0 left-0 w-[28%] h-5",
          folderColor,
          "rounded-tr-xl border-t border-r",
          folderBorder
        )}>
          <div className="absolute -right-3 bottom-0 w-3 h-3 overflow-hidden">
            <div className={cn("w-6 h-6 bg-transparent rounded-full absolute top-[-100%] left-0 shadow-[0_0_0_15px_#ebd7b6]")} />
            <div className={cn("w-6 h-6 bg-transparent rounded-full absolute top-[-100%] left-0 border border-[#d1ba95]")} />
          </div>
        </div>
        <div className={cn(
          "absolute top-0 right-0 w-[28%] h-5",
          folderColor,
          "rounded-tl-xl border-t border-l",
          folderBorder
        )}>
          <div className="absolute -left-3 bottom-0 w-3 h-3 overflow-hidden">
            <div className={cn("w-6 h-6 bg-transparent rounded-full absolute top-[-100%] right-0 shadow-[0_0_0_15px_#ebd7b6]")} />
            <div className={cn("w-6 h-6 bg-transparent rounded-full absolute top-[-100%] right-0 border border-[#d1ba95]")} />
          </div>
        </div>
        <div className={cn(
          "absolute top-5 left-0 right-0 bottom-0",
          folderColor,
          "border-x border-b",
          folderBorder,
          "flex flex-col items-center justify-start pt-24"
        )}>
          <div className="z-10 w-3/4 max-w-md pointer-events-none">
            <div className="border-y-2 border-black/20 py-6 px-4 text-center">
              <h2 className="text-xs font-bold tracking-[0.3em] text-black/40 mb-3 uppercase">
                Official Case File
              </h2>
              <h1 className="font-serif text-3xl font-black text-black/70 tracking-widest uppercase leading-tight drop-shadow-sm">
                {pageData.title.split('–')[0].trim() || "Report Of"} <br /> Cyber Crime <br /> Victims
              </h1>
              <div className="mt-5 flex justify-between items-center text-xs font-mono font-bold text-black/30">
                <span>REF: CCV-2026</span>
                <span>RESTRICTED</span>
              </div>
            </div>
            <div className="mt-6 text-center">
              <span className="inline-block border-2 border-red-800/40 text-red-800/40 font-bold px-3 py-1 rounded text-sm tracking-widest rotate-[-3deg]">
                CONFIDENTIAL
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FolderPage({
  record,
  index,
  currentPage,
  totalPages,
  onNext,
  onPrev,
  isFolderOpen
}) {
  const isTurned = index < currentPage;

  return (
    <motion.div
      style={{
        transformOrigin: "top",
        zIndex: totalPages - index,
        backfaceVisibility: "hidden",
        top: `${index * 2}px`,
        left: `${index * 1}px`,
        right: `-${index * 1}px`,
        bottom: `-${index * 2}px`,
      }}
      initial={false}
      animate={{
        rotateX: isTurned ? 30 : 0,
        rotateZ: isTurned ? 15 : 0,
        x: isTurned ? 300 : 0,
        y: isTurned ? -800 : 0,
        opacity: isTurned ? 0 : 1,
        scale: isTurned ? 0.9 : 1,
      }}
      transition={{
        duration: 0.8,
        ease: "easeInOut"
      }}
      className={cn(
        "absolute inset-0 bg-white rounded-md shadow-sm border border-neutral-200",
        "flex flex-col origin-top preserve-3d",
        isTurned ? "pointer-events-none" : "pointer-events-auto"
      )}
    >
      <div className={cn(
        "flex justify-between items-center px-8 pt-8 pb-4 bg-white z-10",
        !isFolderOpen && "opacity-0 pointer-events-none"
      )}>
        <button
          onClick={onPrev}
          disabled={index === 0}
          className={cn(
            "px-5 py-2 rounded-md font-sans text-xs font-bold tracking-widest uppercase transition-all shadow-sm flex items-center gap-2",
            index === 0
              ? "bg-neutral-100 text-neutral-400 border border-neutral-200 opacity-50 cursor-not-allowed"
              : "bg-[#4a90e2] hover:bg-[#357abd] text-white border border-[#357abd] active:scale-95 cursor-pointer"
          )}
        >
          <span>←</span> PREVIOUS
        </button>
        <span className="font-mono text-xs font-bold text-neutral-400 tracking-widest">
          PAGE {index + 1} OF {totalPages}
        </span>
        <button
          onClick={onNext}
          disabled={index === totalPages - 1}
          className={cn(
            "px-5 py-2 rounded-md font-sans text-xs font-bold tracking-widest uppercase transition-all shadow-sm flex items-center gap-2",
            index === totalPages - 1
              ? "bg-neutral-100 text-neutral-400 border border-neutral-200 opacity-50 cursor-not-allowed"
              : "bg-[#4a90e2] hover:bg-[#357abd] text-white border border-[#357abd] active:scale-95 cursor-pointer"
          )}
        >
          NEXT <span>→</span>
        </button>
      </div>
      <div className={cn(
        "flex-1 overflow-y-auto px-8 pb-8 folder-scroll relative",
        !isFolderOpen && "pointer-events-none"
      )}>
        <div className="mt-8">
          <h3 className="font-bold text-neutral-800 text-2xl mb-2 tracking-tight border-l-4 border-[#4a90e2] pl-5 uppercase">
            {record.heading}
          </h3>
          <p className="text-neutral-700 text-lg leading-relaxed pl-6 border-l-4 border-transparent whitespace-pre-line">
            {record.content}
          </p>
        </div>
        <div className="h-10" />
      </div>
    </motion.div>
  );
}

export default function DigitalJusticeSupportServicesPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const folderColor = "bg-[#ebd3a8]";

  const handleNext = () => {
    if (currentPage < pageData.sections.length - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const toggleFolder = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setTimeout(() => setCurrentPage(0), 500);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto perspective-[1500px]">
      <div className="relative w-full h-[600px] preserve-3d drop-shadow-[20px_20px_30px_rgba(0,0,0,0.4)]">
        <div className={cn(
          "absolute inset-0 top-6",
          folderColor,
          "border border-[#c1ad80]",
          "flex flex-col preserve-3d transition-transform duration-500",
          isOpen ? "translate-y-2" : ""
        )}>
          <button
            onClick={toggleFolder}
            className={cn(
              "absolute right-[10%] w-[50%] h-8",
              "-top-[31px]",
              folderColor,
              "border-t border-x border-[#c1ad80]",
              "rounded-t-xl flex items-center justify-center cursor-pointer",
              "z-0"
            )}
            title="Click to Close Folder"
          >
            <span className="font-sans text-[13px] font-bold tracking-widest text-red-800/80 uppercase">
              CONFIDENTIAL {isOpen && " (CLICK TO CLOSE)"}
            </span>
          </button>
          <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.15)] pointer-events-none" />
          <div className="absolute inset-x-3 inset-y-4 preserve-3d bg-white shadow-md border border-neutral-200" style={{ transform: 'translateZ(1px)' }}>
            <div className="absolute inset-0 bg-white border border-neutral-200 transform translate-x-1 translate-y-1" />
            <div className="absolute inset-0 bg-white border border-neutral-200 transform translate-x-0.5 translate-y-0.5" />
            {pageData.sections.map((record, index) => (
              <FolderPage
                key={record.id}
                record={record}
                index={index}
                currentPage={currentPage}
                totalPages={pageData.sections.length}
                onNext={handleNext}
                onPrev={handlePrev}
                isFolderOpen={isOpen}
              />
            ))}
          </div>
        </div>
        <div className={cn("absolute inset-0 top-6 preserve-3d", isOpen && "pointer-events-none")} style={{ transform: 'translateZ(5px)' }}>
          <FolderCover isOpen={isOpen} onClick={toggleFolder} />
        </div>
      </div>
      <div className="text-center mt-6 text-[#60694b] font-mono text-sm animate-pulse drop-shadow-sm font-semibold">
        {isOpen ? "CLICK THE 'CONFIDENTIAL' TAB TO CLOSE THE FOLDER" : "CLICK ANYWHERE ON THE FOLDER TO OPEN"}
      </div>
    </div>
  );
}
