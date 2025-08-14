import { getTranslations } from 'next-intl/server';

const footerLinks = [
  { href: 'https://freetrivia.info/', text: 'Free Trivia Game' },
  { href: 'https://musicposter.org/en', text: 'Music Poster' },
  { href: 'https://imagenarration.com/en', text: 'Image Narration' },
  { href: 'https://describeyourself.org/en', text: 'Describe Yourself' },
  { href: 'https://newspaper-template.org/en', text: 'Newspaper Template' }
];

export default async function Footer() {
  const t = await getTranslations('footer');

  return (
    <footer className="w-full bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            {t('relatedLinks')}
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
          {footerLinks.map((link, index) => (
            <div key={index} className="text-center">
              <a
                href={link.href}
                target="_blank"
                className="inline-block text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium text-sm whitespace-nowrap px-2 py-1 rounded-md hover:bg-blue-50"
              >
                {link.text}
              </a>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}