import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import zh from './zh/translation.json';

i18n.use(LanguageDetector).init({
    resources: {
        // en: { translation: en },
        zh: { translation: zh },
    },
    fallbackLng: 'zh',
    debug: true,
    detection: {
        order: ['querystring', 'navigator', 'localStorage'],
        lookupQuerystring: 'lang',
    },
});
export const useTranslation = () => {
    return {
        t(...args: Parameters<typeof i18n['t']>) {
            return i18n.t(...args);
        },
    };
};
export default i18n;