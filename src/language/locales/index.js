import en from '../english/translation.json' assert { type: 'json' };
import it from '../Italian/translation.json' assert { type: 'json' };
import ar from '../Arabic/translation.json' assert { type: 'json' };
import zh from '../Chinese/translation.json' assert { type: 'json' };
import enHomeView from '../english/homeView.json' assert { type: 'json' };
import itHomeView from '../Italian/homeView.json' assert { type: 'json' };
import arHomeView from '../Arabic/homeView.json' assert { type: 'json' };
import zhHomeView from '../Chinese/homeView.json' assert { type: 'json' };

export const resources = {
  en: { translation: { ...en, homeView: enHomeView } },
  it: { translation: { ...it, homeView: itHomeView } },
  ar: { translation: { ...ar, homeView: arHomeView } },
  zh: { translation: { ...zh, homeView: zhHomeView } },
};
