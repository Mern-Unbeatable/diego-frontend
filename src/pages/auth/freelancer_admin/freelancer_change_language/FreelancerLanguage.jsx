import ChooseLanguage from '../../../../components/common/ChooseLanguage';

const FreelancerLanguage = () => {
  const handleLanguageSelect = (language) => {
    console.log('Language selected:', language);
  };
  return (
    <div>
      <ChooseLanguage onSelectLanguage={handleLanguageSelect} />
    </div>
  );
};

export default FreelancerLanguage;
