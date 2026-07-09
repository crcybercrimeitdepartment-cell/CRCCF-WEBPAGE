import Fuse from 'fuse.js';
import { searchableData } from '../data/global/searchData';

let fuseInstance = null;

self.onmessage = (e) => {
  const { type, payload } = e.data;

  if (type === 'INIT') {
    // Precompute search string for O(1) string joining during search
    const processedData = searchableData.map(item => ({
      ...item,
      precomputedStr: [
        item.title || "",
        (item.aliases || []).join(" "),
        (item.tags || []).join(" "),
        (item.relatedTerms || []).join(" "),
        item.description || ""
      ].join(" ").toLowerCase()
    }));

    // Initialize Intelligent Ranking with weights
    fuseInstance = new Fuse(processedData, {
      keys: [
        { name: 'title', weight: 2.0 },
        { name: 'precomputedStr', weight: 1.0 }
      ],
      threshold: 0.35,
      distance: 100,
      includeMatches: true
    });
    
    self.postMessage({ type: 'INIT_DONE' });
  }

  if (type === 'SEARCH') {
    const { query, limit } = payload;
    if (fuseInstance && query) {
      const results = fuseInstance.search(query, { limit: limit || 15 });
      self.postMessage({ type: 'SEARCH_RESULTS', payload: { query, results } });
    } else {
      self.postMessage({ type: 'SEARCH_RESULTS', payload: { query, results: [] } });
    }
  }
};
