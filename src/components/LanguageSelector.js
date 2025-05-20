import React, { useContext } from 'react';
import { LanguageContext } from './LanguageContext';

const LanguageSelector = () => {
  const { language, changeLanguage } = useContext(LanguageContext);

  return (
    <div>
      <select value={language} onChange={(e) => changeLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="am">Amharic</option>
      </select>
    </div>
  );
};

export default LanguageSelector;