import { useEffect, useMemo, useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { formatEuro } from '../../utils/courseMedia';

const getFeatureLabel = (feature) => {
  if (typeof feature === 'string') return feature;
  return feature?.label || '';
};

const isPricingFeature = (feature) =>
  typeof feature === 'object' && feature?.type === 'pricing';

const isIncludedFeature = (feature) =>
  typeof feature === 'string' ||
  (typeof feature === 'object' && feature?.type === 'feature');

const PricingCardsModal = ({ isOpen, onClose, courseSlug, pricing }) => {
  const { t } = useTranslation();
  const [selectedCompanyTierId, setSelectedCompanyTierId] = useState(null);

  const singleUser = pricing?.singleUser;
  const company = pricing?.company;
  const checkoutSlug = courseSlug || '';

  const companyPricingTiers = useMemo(
    () => (company?.features || []).filter(isPricingFeature),
    [company?.features],
  );

  const companyIncludedFeatures = useMemo(
    () => (company?.features || []).filter(isIncludedFeature),
    [company?.features],
  );

  useEffect(() => {
    if (!isOpen) return;
    setSelectedCompanyTierId(companyPricingTiers[0]?.id ?? null);
  }, [isOpen, companyPricingTiers]);

  if (!isOpen) return null;

  const selectedCompanyTier = companyPricingTiers.find(
    (tier) => tier.id === selectedCompanyTierId,
  );

  const companyCheckoutUrl =
    selectedCompanyTierId && checkoutSlug
      ? `/training/course/checkout?slug=${encodeURIComponent(checkoutSlug)}&plan=company&tier=${encodeURIComponent(selectedCompanyTierId)}`
      : null;

  const singleCheckoutUrl = checkoutSlug
    ? `/training/course/checkout?slug=${encodeURIComponent(checkoutSlug)}&plan=single`
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 rounded-full bg-white p-2 shadow-lg transition hover:bg-gray-100"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>

        <div className="mx-auto w-full max-w-4xl">
          <p className="mb-8 text-gray-700">
            {t('trainingPages.section12.frameLabel')}
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
              <h3 className="mb-3 text-xl font-bold text-gray-800">
                {singleUser?.title ||
                  t('trainingPages.section12.singleCourse.title')}
              </h3>
              <p className="mb-8 text-sm text-gray-600">
                {t('trainingPages.section12.singleCourse.description')}
              </p>

              <div className="mb-6 text-3xl font-bold text-gray-800">
                {formatEuro(singleUser?.price)}
              </div>

              <div className="mb-8 space-y-3">
                {(singleUser?.features || []).map((feature) => (
                  <div
                    key={getFeatureLabel(feature)}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm text-gray-700">
                      {getFeatureLabel(feature)}
                    </span>
                  </div>
                ))}
              </div>

              {singleCheckoutUrl ? (
                <Link
                  to={singleCheckoutUrl}
                  className="block w-full rounded-full bg-[#73BFA1] py-3 text-center font-semibold text-white transition hover:bg-[#5fa889]"
                >
                  {t('trainingPages.section12.select')}
                </Link>
              ) : (
                <button
                  type="button"
                  disabled
                  className="block w-full cursor-not-allowed rounded-full bg-gray-300 py-3 text-center font-semibold text-white"
                >
                  {t('trainingPages.section12.select')}
                </button>
              )}
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
              <h3 className="mb-2 text-xl font-bold text-gray-800">
                {company?.title ||
                  t('trainingPages.section12.companyPackage.title')}
              </h3>
              <p className="mb-2 text-sm text-gray-600">
                {company?.description ||
                  t('trainingPages.section12.companyPackage.description')}
              </p>

              <p className="mb-4 text-sm font-semibold text-gray-700">
                {t('trainingPages.section12.companyPackage.subtitle')}
              </p>

              {companyPricingTiers.length > 0 ? (
                <div className="mb-4 space-y-2">
                  <p className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
                    {t('trainingPages.section12.companyPackage.selectTier')}
                  </p>
                  {companyPricingTiers.map((tier) => {
                    const isSelected = tier.id === selectedCompanyTierId;
                    const label = getFeatureLabel(tier);

                    return (
                      <label
                        key={tier.id || label}
                        className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition ${
                          isSelected
                            ? 'border-[#73BFA1] bg-[#F1F9F6] ring-1 ring-[#73BFA1]'
                            : 'border-gray-200 hover:border-[#73BFA1]/60'
                        }`}
                      >
                        <input
                          type="radio"
                          name="company-pricing-tier"
                          value={tier.id}
                          checked={isSelected}
                          onChange={() => setSelectedCompanyTierId(tier.id)}
                          className="h-4 w-4 accent-[#73BFA1]"
                        />
                        <div className="flex flex-1 items-center justify-between gap-3">
                          <span className="text-sm text-gray-700">{label}</span>
                          <span className="text-sm font-semibold text-gray-900">
                            {formatEuro(tier.price)}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              ) : null}

              {companyIncludedFeatures.length > 0 ? (
                <div className="mb-6 space-y-3">
                  {companyIncludedFeatures.map((feature) => {
                    const label = getFeatureLabel(feature);
                    if (!label) return null;

                    return (
                      <div
                        key={feature?.id || label}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle className="h-5 w-5 text-[#73BFA1]" />
                        <span className="text-sm text-gray-700">{label}</span>
                      </div>
                    );
                  })}
                </div>
              ) : null}

              {selectedCompanyTier ? (
                <p className="mb-4 text-sm text-gray-600">
                  {t('trainingPages.section12.companyPackage.selectedTier', {
                    label: getFeatureLabel(selectedCompanyTier),
                    price: formatEuro(selectedCompanyTier.price),
                  })}
                </p>
              ) : null}

              {companyCheckoutUrl ? (
                <Link
                  to={companyCheckoutUrl}
                  className="block w-full rounded-full bg-[#73BFA1] py-3 text-center font-semibold text-white transition hover:bg-[#5fa889]"
                >
                  {t('trainingPages.section12.select')}
                </Link>
              ) : (
                <button
                  type="button"
                  disabled
                  className="block w-full cursor-not-allowed rounded-full bg-gray-300 py-3 text-center font-semibold text-white"
                >
                  {t('trainingPages.section12.companyPackage.selectTierFirst')}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCardsModal;
