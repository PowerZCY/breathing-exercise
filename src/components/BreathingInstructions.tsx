'use client'

import { useTranslations } from 'next-intl';

export default function BreathingInstructions() {
  const t = useTranslations('instructions');

  const TextBlock = ({ textKey, section = 'intro' }: { textKey: string, section?: string }) => (
    <p className="mb-3">{t(`${section}.${textKey}`)}</p>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl mt-2 space-y-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        {t('title')}
      </h2>

      <div className="mb-6 leading-relaxed text-gray-700">
        <TextBlock textKey="text1" />
        <TextBlock textKey="text2" />
        <TextBlock textKey="text3" />
        <TextBlock textKey="text4" />
        <TextBlock textKey="text5" />
        <TextBlock textKey="text6" />
      </div>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">{t('benefits.title')}</h3>
        <div className="bg-blue-50 p-6 rounded-lg mb-8 border border-blue-100">
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {t.raw('benefits.list').map((benefit: string, index: number) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">{t('practice.title')}</h3>
        <ol className="list-decimal pl-6 space-y-3 text-gray-700">
          {t.raw('practice.steps').map((step: string, index: number) => (
            <li key={index} className="leading-relaxed">{step}</li>
          ))}
        </ol>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">{t('daily.title')}</h3>
        <div className="mb-4 leading-relaxed text-gray-700">
          <TextBlock textKey="daily1" section="daily" />
          <TextBlock textKey="daily2" section="daily" />
        </div>
      </section>

      <div className="bg-blue-50 p-6 rounded-lg mb-8 border border-blue-100">
        <h4 className="font-semibold mb-3 text-lg text-gray-800">{t('tips.title')}</h4>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          {t.raw('tips.list').map((tip: string, index: number) => (
            <li key={index} className="leading-relaxed">{tip}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6 leading-relaxed text-gray-700">
        {['conclusion1', 'conclusion2', 'conclusion3', 'conclusion4'].map((key) => (
          <TextBlock key={key} textKey={key} section="conclusion" />
        ))}
      </div>
    </div>
  );
}