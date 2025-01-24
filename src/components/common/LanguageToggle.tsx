import { useTranslation } from 'react-i18next';

export const LanguageToggle = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLanguage = i18n.language === 'ko' ? 'en' : 'ko';
    i18n.changeLanguage(nextLanguage);
    removeQuerystring();
  };

  return (
    <button onClick={toggleLanguage} className="underline">
      {t('language.toggle')}
    </button>
  );
};

const removeQuerystring = () => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.delete('lng');
  window.history.replaceState(
    null,
    '',
    `${window.location.pathname}${searchParams.toString() ? '?' + searchParams.toString() : ''}`,
  );
};
