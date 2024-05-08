import Fuse from 'fuse.js';

import languages from '../../../assets/data/GDELT_options/processedLanguages.json';
import themes from '../../../assets/data/GDELT_options/processedThemes.json';

const fuseOptions = {
  isCaseSensitive: false,
  includeScore: true,
  keys: [
    "key",
  ]
};


export function getLanguageSearch() {
  return new Fuse(languages, fuseOptions);
}

export function getThemeSearch() {
  return new Fuse(themes, fuseOptions);
}

