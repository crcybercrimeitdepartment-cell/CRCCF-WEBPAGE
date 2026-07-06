import {
  createElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ArrowLeft,
  Building2,
  ChevronRight,
  Globe2,
  Mail,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import BuildingTransition from "../../components/BuildingTransition/BuildingTransition";
import BranchMarquee from "../../components/BranchMarquee/BranchMarquee";
import { Globe } from "../../components/ui/globe";
import { branchDetailsData } from "./BranchDetailsData";

const normalize = (value) =>
  String(value || "")
    .trim()
    .toLowerCase();

const phoneHref = (phone) =>
  `tel:${String(phone || "").replace(/[^\d+]/g, "")}`;

const useTypewriterPlaceholder = (phrases, isPaused) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [characterIndex, setCharacterIndex] = useState(
    () => phrases[0]?.length || 0,
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const phrase = phrases[phraseIndex % Math.max(phrases.length, 1)] || "";

  useEffect(() => {
    if (isPaused || !phrase) return undefined;

    const isPhraseComplete = characterIndex === phrase.length;
    const isPhraseEmpty = characterIndex === 0;
    const delay = isPhraseComplete
      ? 1500
      : isPhraseEmpty && isDeleting
        ? 260
        : isDeleting
          ? 32
          : 68;

    const timer = window.setTimeout(() => {
      if (isPhraseComplete && !isDeleting) {
        setIsDeleting(true);
        return;
      }

      if (isPhraseEmpty && isDeleting) {
        setIsDeleting(false);
        setPhraseIndex((current) => (current + 1) % phrases.length);
        return;
      }

      setCharacterIndex((current) => current + (isDeleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [
    characterIndex,
    isDeleting,
    isPaused,
    phrase,
    phrases.length,
  ]);

  return phrase.slice(0, characterIndex);
};

const findByKeys = (keys) =>
  branchDetailsData.constants.locationHints.find((hint) => hint.keys.some((key) => keys.includes(key)));

const findHintFromText = (text) =>
  branchDetailsData.constants.locationHints.find((hint) => hint.keys.some((key) => text.includes(key)));

const findLocationHint = (branch) => {
  const branchIdText = normalize(branch.branchId);
  const cityStateAddressText = normalize(
    `${branch.city || ""} ${branch.state || ""} ${branch.address || ""}`,
  );
  const identityText = normalize(
    `${branch.name || ""} ${branch.branchId || ""}`,
  );

  if (
    branchIdText === "cr/bbsr/01" ||
    branchIdText.includes("bhubaneswar")
  ) {
    return findByKeys(["bbsr", "bhubaneswar"]);
  }

  if (branchIdText.includes("hyd") || branchIdText.includes("hyderabad")) {
    return findByKeys(["hyderabad", "hyd"]);
  }

  if (
    branchIdText.includes("blr") ||
    branchIdText.includes("bengaluru") ||
    branchIdText.includes("bangalore")
  ) {
    return findByKeys(["bengaluru", "bangalore", "blr"]);
  }

  if (
    branchIdText.includes("bishakhapatnam") ||
    branchIdText.includes("visakhapatnam") ||
    branchIdText.includes("vizag")
  ) {
    return findByKeys(["visakhapatnam", "bishakhapatnam", "vizag"]);
  }

  if (branchIdText.includes("switzerland")) {
    return findByKeys(["switzerland", "swiss"]);
  }

  if (branchIdText.includes("malaysia") || branchIdText.includes("malasia")) {
    return findByKeys(["malaysia", "malasia"]);
  }

  if (branchIdText.includes("indonesia")) {
    return findByKeys(["indonesia"]);
  }

  if (branchIdText.includes("bhutan")) {
    return findByKeys(["bhutan"]);
  }

  if (branchIdText.includes("usa") || branchIdText.includes("us")) {
    return findByKeys(["usa", "united states"]);
  }

  if (branchIdText.includes("uk") || branchIdText.includes("london")) {
    return findByKeys(["uk", "united kingdom", "london"]);
  }

  if (branchIdText.includes("sg") || branchIdText.includes("singapore")) {
    return findByKeys(["singapore", "sg"]);
  }

  const directLocation = findHintFromText(cityStateAddressText);
  if (directLocation) return directLocation;

  return findHintFromText(`${identityText} ${cityStateAddressText}`);
};

const prepareBranches = (branches) =>
  branches.map((branch) => {
    const hint = findLocationHint(branch);
    const [latOffset, lngOffset] =
      branchDetailsData.constants.clusterOffsets[
        Math.abs(Number(branch.id) || 0) % branchDetailsData.constants.clusterOffsets.length
      ];

    const displayCity =
      hint?.displayCity || branch.displayCity || branch.city || "Unknown City";
    const displayState =
      hint?.displayState ||
      branch.displayState ||
      branch.state ||
      "Unknown State";
    const country = hint?.country || branch.country || "India";
    const region = hint?.region || branch.region || branch.state || "India";

    const latitude =
      Number(hint?.latitude ?? branch.latitude ?? 20.2961) + latOffset;
    const longitude =
      Number(hint?.longitude ?? branch.longitude ?? 85.8245) + lngOffset;

    return {
      ...branch,
      displayCity,
      displayState,
      country,
      region,
      latitude,
      longitude,
      searchText: normalize(
        `${branch.name || ""} ${branch.city || ""} ${branch.state || ""} ${
          branch.branchId || ""
        } ${branch.email || ""} ${branch.phone || ""} ${
          branch.address || ""
        } ${displayCity} ${displayState} ${country} ${region}`,
      ),
    };
  });

const toTransitionBranch = (branch) => ({
  ...branch,
  city: branch.displayCity || branch.city,
  state: branch.displayState || branch.state,
});

const BranchDetails = () => {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [transitionBranch, setTransitionBranch] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeBranchId, setActiveBranchId] = useState(null);
  const [globeFocusRequest, setGlobeFocusRequest] = useState(0);
  const [hasManualBranchSelection, setHasManualBranchSelection] =
    useState(false);

  const enrichedBranches = useMemo(() => prepareBranches(branchDetailsData.branches), []);

  const searchPrompts = useMemo(() => {
    const seenCities = new Set();
    const locationPrompts = [];

    enrichedBranches.forEach((branch) => {
      if (seenCities.has(branch.displayCity) || locationPrompts.length >= 6) {
        return;
      }

      seenCities.add(branch.displayCity);
      locationPrompts.push(
        `Search ${branch.displayCity}, ${branch.country}`,
      );
    });

    const branchIdPrompts = enrichedBranches
      .slice(0, 3)
      .map((branch) => `Try branch ID ${branch.branchId}`);

    return [branchDetailsData.texts.heading.findBranch, ...locationPrompts, ...branchIdPrompts];
  }, [enrichedBranches]);

  const filteredBranches = useMemo(() => {
    const query = normalize(searchQuery);

    return enrichedBranches.filter(
      (branch) => !query || branch.searchText.includes(query),
    );
  }, [enrichedBranches, searchQuery]);

  const isSearchActive = Boolean(searchQuery.trim());



  const topBranches = useMemo(
    () => filteredBranches.slice(0, 50),
    [filteredBranches],
  );

  const resolvedActiveBranchId = useMemo(() => {
    if (!topBranches.length) return null;

    return topBranches.some((branch) => branch.id === activeBranchId)
      ? activeBranchId
      : topBranches[0].id;
  }, [activeBranchId, topBranches]);

  const activeBranch = useMemo(() => {
    if (resolvedActiveBranchId === null || !filteredBranches.length) {
      return null;
    }

    return (
      filteredBranches.find((branch) => branch.id === resolvedActiveBranchId) ||
      null
    );
  }, [filteredBranches, resolvedActiveBranchId]);

  const globeMarkers = useMemo(
    () =>
      filteredBranches.map((branch) => ({
        location: [branch.latitude, branch.longitude],
        size: branch.id === activeBranch?.id ? 0.085 : 0.035,
        color:
          branch.id === activeBranch?.id
            ? branchDetailsData.constants.activeMarkerColor
            : branchDetailsData.constants.defaultMarkerColor,
      })),
    [activeBranch?.id, filteredBranches],
  );

  const globeConfig = useMemo(() => ({
    dark: 1,
    diffuse: 1.2,
    mapSamples: 18000,
    mapBrightness: 6,
    baseColor: [0.1, 0.3, 0.6],
    markerColor: branchDetailsData.constants.defaultMarkerColor,
    glowColor: [0.1, 0.3, 0.6],
  }), []);

  const handleSelectBranch = useCallback((branch) => {
    setHasManualBranchSelection(true);
    setActiveBranchId(branch.id);
    setGlobeFocusRequest((request) => request + 1);
  }, []);

  const handlePreviewBranch = useCallback(
    (branch) => {
      if (
        !branch ||
        hasManualBranchSelection ||
        isSearchActive ||
        selectedBranch ||
        transitionBranch
      ) {
        return;
      }

      setActiveBranchId(branch.id);
      setGlobeFocusRequest((request) => request + 1);
    },
    [
      hasManualBranchSelection,
      isSearchActive,
      selectedBranch,
      transitionBranch,
    ],
  );

  const handleOpenProfile = useCallback(
    (branch) => {
      if (!branch || transitionBranch) return;
      setTransitionBranch(toTransitionBranch(branch));
    },
    [transitionBranch],
  );

  const handleProfileReady = useCallback((branch) => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setSelectedBranch(branch);
  }, []);

  const handleTransitionComplete = useCallback(() => {
    setTransitionBranch(null);
  }, []);

  const handleBack = useCallback(() => {
    setSelectedBranch(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      {transitionBranch && (
        <BuildingTransition
          branch={transitionBranch}
          onProfileReady={handleProfileReady}
          onComplete={handleTransitionComplete}
        />
      )}

      {!selectedBranch ? (
        <main
          id="branch-details"
          className="relative min-h-screen w-full overflow-x-hidden bg-[#f5f8fb] px-4 py-5 text-slate-950 sm:px-6 sm:py-7 lg:px-8 lg:py-8"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_12%_0%,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_88%_4%,rgba(99,102,241,0.10),transparent_32%)]" />

          <div className="relative mx-auto w-full max-w-[1400px]">
            <DirectoryHeading
              searchQuery={searchQuery}
              onSearchChange={(query) => {
                setSearchQuery(query);
                setHasManualBranchSelection(false);
                setActiveBranchId(null);
              }}
              searchPrompts={searchPrompts}
              resultCount={filteredBranches.length}
            />

            {filteredBranches.length === 0 ? (
              <EmptyState
                searchQuery={searchQuery}
                onClear={() => setSearchQuery("")}
              />
            ) : (
              <div className="mt-6 space-y-5 sm:mt-7 sm:space-y-6">
                <BranchMarquee
                  ariaLabel="Primary branch network"
                  branches={topBranches}
                  activeBranch={activeBranch}
                  startNumber={1}
                  onSelect={handleSelectBranch}
                  onActiveInView={handlePreviewBranch}
                  showUniqueOnly={isSearchActive}
                  autoStepMs={branchDetailsData.constants.autoBranchRotationMs}
                />

                <section className="grid min-w-0 items-stretch gap-5 xl:grid-cols-2 xl:gap-6">
                  <GlobeCommandCenter
                    activeBranch={activeBranch}
                    globeMarkers={globeMarkers}
                    globeConfig={globeConfig}
                    globeFocusRequest={globeFocusRequest}
                  />

                  <SelectedBranchDetailCard
                    key={activeBranch?.id || "branch-detail-empty"}
                    branch={activeBranch}
                    onOpenProfile={handleOpenProfile}
                    isOpening={Boolean(transitionBranch)}
                  />
                </section>
              </div>
            )}
          </div>
        </main>
      ) : (
        <main className="min-h-screen w-full bg-[#f4f7fb] p-3 sm:p-6 lg:p-10">
          <BranchProfileDetail branch={selectedBranch} onBack={handleBack} />
        </main>
      )}
    </>
  );
};

const DirectoryHeading = ({
  searchQuery,
  onSearchChange,
  searchPrompts,
  resultCount,
}) => {
  const animatedPlaceholder = useTypewriterPlaceholder(
    searchPrompts,
    Boolean(searchQuery),
  );

  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="min-w-0">
        <h1 className="text-[2rem] font-black leading-none tracking-[-0.05em] text-slate-950 sm:text-[2.65rem]">
          {branchDetailsData.texts.heading.titlePrefix}
          <span className="bg-[linear-gradient(90deg,#0B6FF4_0%,#009EEB_52%,#00B8D9_100%)] bg-clip-text text-transparent">
            {branchDetailsData.texts.heading.titleHighlight}
          </span>
        </h1>
        <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-slate-500">
          {branchDetailsData.texts.heading.description}
        </p>
      </div>

      <div className="group relative mx-auto w-full max-w-[400px] transition-transform duration-300 focus-within:-translate-y-0.5 md:mx-0 md:w-[400px] md:shrink-0">
        <Search
          size={18}
          className="pointer-events-none absolute left-5 top-1/2 z-10 -translate-y-1/2 text-sky-600 transition-all duration-300 group-focus-within:scale-110 group-focus-within:text-cyan-700"
          aria-hidden="true"
        />
        <input
          type="text"
          inputMode="search"
          enterKeyHint="search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Escape" && searchQuery) {
              onSearchChange("");
              event.currentTarget.blur();
            }
          }}
          placeholder={animatedPlaceholder}
          aria-label="Search global branches"
          aria-describedby="branch-search-status"
          className={`h-[60px] w-full rounded-full border border-white/90 bg-white/95 pl-[52px] text-sm font-bold text-slate-900 shadow-[0_10px_30px_rgba(15,23,42,0.09)] outline-none backdrop-blur-xl transition-all duration-300 placeholder:font-semibold placeholder:text-slate-400 hover:border-cyan-200 hover:shadow-[0_12px_34px_rgba(15,23,42,0.12)] focus:border-cyan-400 focus:bg-white focus:shadow-[0_14px_38px_rgba(8,145,178,0.16)] focus:ring-4 focus:ring-cyan-500/10 ${
            searchQuery ? "pr-32" : "pr-6"
          }`}
        />
        {searchQuery && (
          <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1.5">
            <span className="rounded-full bg-cyan-50 px-2 py-1 text-[8px] font-black uppercase tracking-[0.08em] text-cyan-700">
              {resultCount} found
            </span>
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40"
              aria-label="Clear branch search"
            >
              <X size={13} strokeWidth={3} aria-hidden="true" />
            </button>
          </div>
        )}
        <span id="branch-search-status" className="sr-only" aria-live="polite">
          {searchQuery
            ? `${resultCount} branch${resultCount === 1 ? "" : "es"} found`
            : "Type a city, state, country, or branch ID"}
        </span>
      </div>
    </header>
  );
};

const EmptyState = ({ searchQuery, onClear }) => (
  <section className="mt-5 flex min-h-[520px] flex-col items-center justify-center rounded-[2rem] border border-white bg-white px-6 text-center shadow-[0_20px_70px_rgba(15,23,42,0.07)]">
    <div className="flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-slate-950 text-cyan-200 shadow-xl">
      <Search size={34} aria-hidden="true" />
    </div>
    <h2 className="mt-6 text-2xl font-black text-slate-950">
      {branchDetailsData.texts.emptyState.title}
    </h2>
    <p className="mt-2 max-w-md text-sm font-medium leading-relaxed text-slate-500">
      {branchDetailsData.texts.emptyState.description(searchQuery)}
    </p>
    <button
      type="button"
      onClick={onClear}
      className="mt-6 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition-all hover:-translate-y-0.5 hover:bg-slate-800"
    >
      {branchDetailsData.texts.emptyState.clearSearch}
    </button>
  </section>
);

const GlobeCommandCenter = ({
  activeBranch,
  globeMarkers,
  globeConfig,
  globeFocusRequest,
}) => (
    <section
      className="relative min-w-0 w-full overflow-hidden rounded-[1.75rem] border border-sky-100 bg-white p-3 shadow-[0_24px_70px_rgba(14,165,233,0.14)] sm:p-3.5"
    style={{
      background:
        "radial-gradient(circle at 50% 42%, rgba(103, 232, 249, 0.28), transparent 38%), radial-gradient(circle at 12% 14%, rgba(14, 165, 233, 0.12), transparent 30%), linear-gradient(135deg, #ffffff 0%, #f8fcff 54%, #eef9ff 100%)",
    }}
  >
    <div className="pointer-events-none absolute inset-0 opacity-35 bg-[linear-gradient(rgba(14,165,233,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.08)_1px,transparent_1px)] bg-[size:42px_42px]" />

    <div className="relative z-10">
      <div>
        <div className="inline-flex items-center gap-1.5 text-[8px] font-black uppercase tracking-[0.2em] text-sky-600 sm:text-[9px]">
          <Globe2 size={13} aria-hidden="true" />
          {branchDetailsData.texts.globe.label}
        </div>
        <h2 className="mt-0.5 text-base font-black tracking-tight text-slate-950 sm:text-lg">
          {branchDetailsData.texts.globe.title}
        </h2>
      </div>
    </div>

    <div className="relative z-10 mx-auto mt-2 h-[260px] w-full overflow-hidden rounded-[1.25rem] border border-sky-100 bg-[radial-gradient(circle_at_50%_42%,rgba(125,249,255,0.22),transparent_42%),linear-gradient(180deg,#ffffff_0%,#f4fbff_100%)] sm:h-[325px] md:h-[355px] xl:h-[365px] 2xl:h-[390px]">
      <Globe
        className="!max-w-[290px] sm:!max-w-[370px] md:!max-w-[405px] xl:!max-w-[415px] 2xl:!max-w-[445px]"
        markers={globeMarkers}
        config={globeConfig}
        focusLocation={
          activeBranch
            ? [activeBranch.latitude, activeBranch.longitude]
            : null
        }
        focusRequest={globeFocusRequest}
      />
    </div>

    {activeBranch && (
      <div className="relative z-20 mt-2 flex min-w-0 items-center justify-between gap-3 rounded-[1rem] border border-sky-100 bg-white/90 px-3 py-2.5 shadow-[0_12px_30px_rgba(14,165,233,0.12)] backdrop-blur-xl sm:px-3.5">
        <div className="min-w-0">
          <span className="flex items-center gap-1.5 text-[7px] font-black uppercase tracking-[0.19em] text-sky-600 sm:text-[8px]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF6524] shadow-[0_0_8px_rgba(255,101,36,0.8)]" />
            {branchDetailsData.texts.globe.highlightedBranch}
          </span>
          <strong className="mt-0.5 block truncate text-xs font-black text-slate-950 sm:text-sm">
            {activeBranch.displayCity}, {activeBranch.country}
          </strong>
        </div>
        <span className="shrink-0 rounded-full border border-sky-100 bg-sky-50 px-2.5 py-1.5 text-[8px] font-black uppercase tracking-[0.08em] text-slate-600 sm:text-[9px]">
            {activeBranch.branchId}
        </span>
      </div>
    )}

  </section>
);

const SelectedBranchDetailCard = ({ branch, onOpenProfile, isOpening }) => {
  if (!branch) return null;

  return (
    <article
      className="branch-detail-card-enter flex min-w-0 h-full w-full self-stretch overflow-hidden rounded-[1.75rem] border border-white bg-white/95 shadow-[0_20px_55px_rgba(15,23,42,0.09)] backdrop-blur-xl flex-col"
    >
      <div className="relative min-h-[180px] overflow-hidden bg-slate-950 sm:min-h-[220px] xl:min-h-[285px]">
          <img
            src={branch.image}
            alt={branch.displayCity + " branch building"}
            className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/5" />
          <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-2">
            <span className="rounded-full border border-white/15 bg-slate-950/60 px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.16em] text-cyan-100 backdrop-blur-md">
              {branchDetailsData.texts.card.selectedBranch}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-300 px-2.5 py-1.5 text-[8px] font-black uppercase tracking-[0.1em] text-emerald-950">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-800" />
              {branchDetailsData.texts.card.online}
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="line-clamp-2 text-xl font-black leading-tight tracking-[-0.035em] text-white">
              {branch.name}
            </h2>
            <p className="mt-2 flex items-center gap-1.5 text-xs font-bold text-cyan-200">
              <MapPin size={13} aria-hidden="true" />
              {branch.displayCity}, {branch.displayState}, {branch.country}
            </p>
          </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-4 xl:p-5">
          <div className="grid grid-cols-2 gap-2.5 xl:gap-3">
            <DetailCell label={branchDetailsData.texts.card.branchId} value={branch.branchId} />
            <DetailCell label={branchDetailsData.texts.card.region} value={branch.region} />
            <DetailCell label={branchDetailsData.texts.card.primaryContact} value={branch.primaryContact} />
            <DetailCell label={branchDetailsData.texts.card.role} value={branch.role} />
          </div>

          <div className="mt-auto grid grid-cols-2 gap-2.5 pt-4 xl:gap-3 xl:pt-5">
            <button
              type="button"
              onClick={() => onOpenProfile(branch)}
              disabled={isOpening}
              className="col-span-2 flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-xs font-black text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-slate-800 disabled:pointer-events-none disabled:opacity-60"
            >
              <Building2 size={16} aria-hidden="true" />
              {branchDetailsData.texts.card.viewProfile}
              <ChevronRight size={14} aria-hidden="true" />
            </button>
            <a
              href={phoneHref(branch.phone)}
              className="flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-3 py-3 text-[11px] font-black text-white transition-colors hover:bg-indigo-700"
            >
              <Phone size={14} aria-hidden="true" />
              Call
            </a>
            <a
              href={"mailto:" + branch.email}
              className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-3 text-[11px] font-black text-slate-800 transition-colors hover:border-cyan-300 hover:bg-cyan-50"
            >
              <Mail size={14} aria-hidden="true" />
              Email
            </a>
          </div>
      </div>
    </article>
  );
};

const DetailCell = ({ label, value }) => (
  <div className="min-w-0 rounded-xl border border-slate-100 bg-slate-50/80 p-2.5">
    <span className="block truncate text-[7px] font-black uppercase tracking-[0.14em] text-slate-400">
      {label}
    </span>
    <strong className="mt-1 block truncate text-[10px] font-black text-slate-800">
      {value || branchDetailsData.texts.card.na}
    </strong>
  </div>
);

const BranchProfileDetail = ({ branch, onBack }) => {
  const city = branch.displayCity || branch.city;
  const state = branch.displayState || branch.state;
  const contactInitials = String(branch.primaryContact || "Branch Team")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div className="mx-auto w-full max-w-[1180px] animate-[fadeInUp_0.4s_ease-out]">
      <header className="mb-4 flex items-center gap-3 sm:mb-5">
        <button
          type="button"
          onClick={onBack}
          className="group inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-100 bg-white text-slate-600 shadow-sm transition-all hover:-translate-x-0.5 hover:border-cyan-200 hover:text-slate-950 hover:shadow-md"
          aria-label="Return to global branch directory"
        >
          <ArrowLeft size={19} aria-hidden="true" />
        </button>

        <div className="min-w-0">
          <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#0B6FF4]">
            {branchDetailsData.texts.profile.titlePrefix}
          </p>
          <h1 className="mt-0.5 text-lg font-black tracking-tight text-slate-950 sm:text-xl">
            {branch.name}
          </h1>
        </div>
      </header>

      <section className="grid overflow-hidden rounded-[1.9rem] border border-cyan-100/80 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)] lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
        <div className="flex min-w-0 flex-col bg-[linear-gradient(135deg,#ffffff_0%,#f5fbff_48%,#eef9ff_100%)] p-5 sm:p-7 lg:p-9">
          <div className="order-1">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#0B6FF4]">
              {branch.branchId}
            </p>
            <h2 className="mt-2 bg-[linear-gradient(90deg,#101828_0%,#0B3B7A_48%,#009EEB_100%)] bg-clip-text text-3xl font-black leading-tight tracking-[-0.035em] text-transparent sm:text-4xl lg:text-5xl">
              {branch.name}
            </h2>
            <p className="mt-3 flex items-start gap-2 text-sm font-bold leading-relaxed text-[#344767] sm:text-base">
              <MapPin
                size={18}
                className="mt-0.5 shrink-0 text-[#009EEB]"
                aria-hidden="true"
              />
              <span>
                {city}, {state}, {branch.country}
              </span>
            </p>
          </div>

          <div className="order-2 mt-5 grid grid-cols-2 gap-2.5 sm:max-w-md lg:hidden">
            <a
              href={phoneHref(branch.phone)}
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#0B6FF4] px-3 py-3 text-[11px] font-black text-white shadow-[0_12px_28px_rgba(11,111,244,0.22)] transition-colors hover:bg-[#075fd1]"
            >
              <Phone size={14} aria-hidden="true" />
              Call
            </a>
            <a
              href={`mailto:${branch.email}`}
              className="flex items-center justify-center gap-2 rounded-2xl border border-cyan-100 bg-white px-3 py-3 text-[11px] font-black text-slate-800 transition-colors hover:border-cyan-300 hover:bg-cyan-50"
            >
              <Mail size={14} aria-hidden="true" />
              Email
            </a>
          </div>

          <div className="order-3 mt-5 flex items-center gap-3.5 rounded-[1.35rem] border border-cyan-100 bg-white/85 p-4 shadow-[0_14px_34px_rgba(15,23,42,0.06)]">
            <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-cyan-200 shadow-lg sm:h-14 sm:w-14 sm:text-base">
              {contactInitials || "BT"}
            </span>
            <div className="min-w-0">
              <p className="text-[8px] font-black uppercase tracking-[0.16em] text-[#0B6FF4]">
                Primary contact
              </p>
              <h3 className="mt-1 break-words text-base font-black text-slate-950 sm:text-lg">
                {branch.primaryContact || "Branch Team"}
              </h3>
              <p className="mt-0.5 text-xs font-bold text-slate-500">
                {branch.role || "Branch Representative"}
              </p>
            </div>
          </div>

          <div className="order-4 mt-5 hidden grid-cols-2 gap-2.5 sm:max-w-md lg:grid">
            <a
              href={phoneHref(branch.phone)}
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#0B6FF4] px-3 py-3 text-[11px] font-black text-white shadow-[0_12px_28px_rgba(11,111,244,0.22)] transition-colors hover:bg-[#075fd1]"
            >
              <Phone size={14} aria-hidden="true" />
              {branchDetailsData.texts.card.call}
            </a>
            <a
              href={`mailto:${branch.email}`}
              className="flex items-center justify-center gap-2 rounded-2xl border border-cyan-100 bg-white px-3 py-3 text-[11px] font-black text-slate-800 transition-colors hover:border-cyan-300 hover:bg-cyan-50"
            >
              <Mail size={14} aria-hidden="true" />
              {branchDetailsData.texts.card.email}
            </a>
          </div>
        </div>

        <div className="relative min-h-[260px] overflow-hidden bg-slate-950 sm:min-h-[340px] lg:min-h-full">
          <img
            src={branch.image}
            alt={city + " branch office"}
            className="absolute inset-0 h-full w-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(16,24,40,0.72)_0%,rgba(11,59,122,0.42)_52%,rgba(0,158,235,0.18)_100%)]" />
          <div className="absolute bottom-4 left-4 right-4 rounded-[1.35rem] border border-white/15 bg-slate-950/55 p-4 backdrop-blur-md sm:bottom-5 sm:left-5 sm:right-5">
            <p className="text-[8px] font-black uppercase tracking-[0.18em] text-cyan-100">
              {branchDetailsData.texts.profile.officeAddress}
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-white/90">
              {branch.address || branchDetailsData.texts.profile.addressNotAvailable}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-[1.75rem] border border-cyan-100/80 bg-white p-5 shadow-[0_18px_55px_rgba(15,23,42,0.06)] sm:mt-5 sm:p-7 lg:p-8">
        <div className="border-b border-slate-100 pb-5">
          <h2 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">
            {branchDetailsData.texts.profile.branchInfo}
          </h2>
          <p className="mt-1 text-sm font-medium text-slate-500">
            {branchDetailsData.texts.profile.branchInfoDesc}
          </p>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <ProfileField
            icon={Building2}
            label={branchDetailsData.texts.profile.labels.branchId}
            value={branch.branchId}
          />
          <ProfileField
            icon={ShieldCheck}
            label={branchDetailsData.texts.profile.labels.serialNo}
            value={branch.serialNo}
          />
          <ProfileField icon={MapPin} label={branchDetailsData.texts.profile.labels.city} value={city} />
          <ProfileField icon={MapPin} label={branchDetailsData.texts.profile.labels.state} value={state} />
          <ProfileField icon={Globe2} label={branchDetailsData.texts.profile.labels.country} value={branch.country} />
          <ProfileField icon={Globe2} label={branchDetailsData.texts.profile.labels.region} value={branch.region} />
        </div>
      </section>
    </div>
  );
};

const ProfileField = ({ icon, label, value }) => (
  <div className="flex min-w-0 items-center gap-3 rounded-[1.25rem] border border-cyan-100/80 bg-slate-50/70 p-3.5 shadow-[0_10px_26px_rgba(15,23,42,0.04)] sm:p-4">
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#009EEB] shadow-sm ring-1 ring-cyan-100">
      {createElement(icon, { size: 18, "aria-hidden": true })}
    </span>
    <div className="min-w-0">
      <span className="block text-[8px] font-black uppercase tracking-[0.15em] text-slate-400">
        {label}
      </span>
      <strong className="mt-1 block break-words text-sm font-black leading-5 text-slate-800">
        {value || branchDetailsData.texts.card.na}
      </strong>
    </div>
  </div>
);

export default BranchDetails;
