// UI translations for all supported languages

import { Language } from '@/lib/types';

export interface TranslationStrings {
  // Home page
  'home.title': string;
  'home.subtitle': string;
  'home.createButton': string;
  'home.yourCollection': string;
  'home.footer': string;
  
  // Story card
  'storyCard.chapters': string;
  'storyCard.progress': string;
  'storyCard.continueReading': string;
  'storyCard.deleteConfirm': string;
  
  // Form steps
  'form.step.label': string;
  'form.step.of': string;
  'form.step1.question': string;
  'form.step2.question': string;
  'form.step2.placeholder': string;
  'form.step3.question': string;
  'form.step3.placeholder': string;
  'form.step4.question': string;
  'form.step4.placeholder': string;
  
  // Form navigation
  'form.back': string;
  'form.next': string;
  'form.createStory': string;
  'form.pressEnter': string;
  
  // Generating page
  'generating.preparing': string;
  'generating.creating': string;
  'generating.illustration': string;
  'generating.ready': string;
  'generating.error': string;
  'generating.tryAgain': string;
  'generating.wait': string;
  
  // Chapter view
  'chapter.label': string;
  'chapter.moralTitle': string;
  
  // Language selector
  'language.label': string;
  
  // Chapter page
  'chapterPage.backToHome': string;
  'chapterPage.translating': string;
  'chapterPage.loadingStory': string;
  'chapterPage.chapterNotFound': string;
  'chapterPage.goToChapter1': string;
  'chapterPage.chapterOf': string;
  'chapterPage.previous': string;
  'chapterPage.next': string;
  'chapterPage.preparing': string;
  'chapterPage.retry': string;
  'chapterPage.createNewStory': string;
}

export const translations: Record<Language, TranslationStrings> = {
  english: {
    // Home page
    'home.title': 'Bedtime Stories',
    'home.subtitle': 'Magical tales for sweet dreams',
    'home.createButton': 'Create New Story',
    'home.yourCollection': 'Your Magical Collection',
    'home.footer': 'Made with ❤️ for bedtime adventures',
    
    // Story card
    'storyCard.chapters': 'chapters',
    'storyCard.progress': 'Progress',
    'storyCard.continueReading': 'Continue Reading →',
    'storyCard.deleteConfirm': 'Are you sure you want to delete',
    
    // Form steps
    'form.step.label': 'Step',
    'form.step.of': 'of',
    'form.step1.question': 'Which language would you like your story in?',
    'form.step2.question': 'What kind of story would you like?',
    'form.step2.placeholder': 'e.g., Space adventure, Magical forest, Underwater journey...',
    'form.step3.question': 'Who are the main characters? (Include their genders)',
    'form.step3.placeholder': 'e.g., A brave girl astronaut, A friendly boy dragon, A curious non-binary rabbit...',
    'form.step4.question': 'Any special wishes for your story?',
    'form.step4.placeholder': 'Optional: Add any special elements you\'d like in the story...',
    
    // Form navigation
    'form.back': '← Back',
    'form.next': 'Next →',
    'form.createStory': 'Create Story',
    'form.pressEnter': 'Press Enter ↵',
    
    // Generating page
    'generating.preparing': 'Preparing your magical story...',
    'generating.creating': 'Creating your story...',
    'generating.illustration': '🎨 Creating first chapter illustration...',
    'generating.ready': '🎉 Your story is ready!',
    'generating.error': 'Oops! Something went wrong. Please try again.',
    'generating.tryAgain': 'Try Again',
    'generating.wait': 'This might take a moment...',
    
    // Chapter view
    'chapter.label': 'Chapter',
    'chapter.moralTitle': 'Moral of the Story',
    
    // Language selector
    'language.label': 'Language:',
    
    // Chapter page
    'chapterPage.backToHome': '← Back to Home',
    'chapterPage.translating': 'Translating story... This will only take a moment!',
    'chapterPage.loadingStory': 'Loading story...',
    'chapterPage.chapterNotFound': 'Chapter not found',
    'chapterPage.goToChapter1': 'Go to Chapter 1',
    'chapterPage.chapterOf': 'of',
    'chapterPage.previous': '← Previous',
    'chapterPage.next': 'Next →',
    'chapterPage.preparing': 'Preparing...',
    'chapterPage.retry': 'Retry →',
    'chapterPage.createNewStory': 'Create New Story',
  },
  
  hindi: {
    // Home page
    'home.title': 'सोने से पहले की कहानियाँ',
    'home.subtitle': 'मीठे सपनों के लिए जादुई कहानियाँ',
    'home.createButton': 'नई कहानी बनाएं',
    'home.yourCollection': 'आपका जादुई संग्रह',
    'home.footer': 'सोने से पहले के रोमांच के लिए ❤️ से बनाया गया',
    
    // Story card
    'storyCard.chapters': 'अध्याय',
    'storyCard.progress': 'प्रगति',
    'storyCard.continueReading': 'पढ़ना जारी रखें →',
    'storyCard.deleteConfirm': 'क्या आप वाकई हटाना चाहते हैं',
    
    // Form steps
    'form.step.label': 'चरण',
    'form.step.of': 'में से',
    'form.step1.question': 'आप अपनी कहानी किस भाषा में चाहते हैं?',
    'form.step2.question': 'आप किस तरह की कहानी चाहते हैं?',
    'form.step2.placeholder': 'जैसे, अंतरिक्ष यात्रा, जादुई जंगल, पानी के नीचे की यात्रा...',
    'form.step3.question': 'मुख्य पात्र कौन हैं? (उनके लिंग बताएं)',
    'form.step3.placeholder': 'जैसे, एक बहादुर लड़की अंतरिक्ष यात्री, एक दोस्ताना लड़का ड्रैगन, एक जिज्ञासु खरगोश...',
    'form.step4.question': 'आपकी कहानी के लिए कोई विशेष इच्छा?',
    'form.step4.placeholder': 'वैकल्पिक: कहानी में आप जो भी विशेष तत्व चाहते हैं, उसे जोड़ें...',
    
    // Form navigation
    'form.back': '← पीछे',
    'form.next': 'आगे →',
    'form.createStory': 'कहानी बनाएं',
    'form.pressEnter': 'Enter दबाएं ↵',
    
    // Generating page
    'generating.preparing': 'आपकी जादुई कहानी तैयार की जा रही है...',
    'generating.creating': 'आपकी कहानी बनाई जा रही है...',
    'generating.illustration': '🎨 पहले अध्याय का चित्र बनाया जा रहा है...',
    'generating.ready': '🎉 आपकी कहानी तैयार है!',
    'generating.error': 'ओह! कुछ गलत हो गया। कृपया पुनः प्रयास करें।',
    'generating.tryAgain': 'पुनः प्रयास करें',
    'generating.wait': 'इसमें थोड़ा समय लग सकता है...',
    
    // Chapter view
    'chapter.label': 'अध्याय',
    'chapter.moralTitle': 'कहानी की सीख',
    
    // Language selector
    'language.label': 'भाषा:',
    
    // Chapter page
    'chapterPage.backToHome': '← होम पर वापस जाएं',
    'chapterPage.translating': 'कहानी का अनुवाद हो रहा है... इसमें केवल एक पल लगेगा!',
    'chapterPage.loadingStory': 'कहानी लोड हो रही है...',
    'chapterPage.chapterNotFound': 'अध्याय नहीं मिला',
    'chapterPage.goToChapter1': 'अध्याय 1 पर जाएं',
    'chapterPage.chapterOf': 'में से',
    'chapterPage.previous': '← पिछला',
    'chapterPage.next': 'अगला →',
    'chapterPage.preparing': 'तैयारी हो रही है...',
    'chapterPage.retry': 'पुनः प्रयास करें →',
    'chapterPage.createNewStory': 'नई कहानी बनाएं',
  },
  
  assamese: {
    // Home page
    'home.title': 'শোৱাৰ আগৰ কাহিনী',
    'home.subtitle': 'মধুৰ সপোনৰ বাবে যাদুকৰী কাহিনী',
    'home.createButton': 'নতুন কাহিনী সৃষ্টি কৰক',
    'home.yourCollection': 'আপোনাৰ যাদুকৰী সংগ্ৰহ',
    'home.footer': 'শোৱাৰ আগৰ দুঃসাহসিক কামৰ বাবে ❤️ ৰে নিৰ্মিত',
    
    // Story card
    'storyCard.chapters': 'অধ্যায়',
    'storyCard.progress': 'অগ্ৰগতি',
    'storyCard.continueReading': 'পঢ়া অব্যাহত ৰাখক →',
    'storyCard.deleteConfirm': 'আপুনি নিশ্চিতভাৱে মচি পেলাব বিচাৰে',
    
    // Form steps
    'form.step.label': 'পদক্ষেপ',
    'form.step.of': 'ৰ',
    'form.step1.question': 'আপুনি আপোনাৰ কাহিনী কোন ভাষাত বিচাৰে?',
    'form.step2.question': 'আপুনি কি ধৰণৰ কাহিনী বিচাৰে?',
    'form.step2.placeholder': 'উদাহৰণস্বৰূপে, মহাকাশ দুঃসাহসিক, যাদুকৰী অৰণ্য, পানীৰ তলৰ যাত্ৰা...',
    'form.step3.question': 'মুখ্য চৰিত্ৰবোৰ কোন? (তেওঁলোকৰ লিংগ উল্লেখ কৰক)',
    'form.step3.placeholder': 'উদাহৰণস্বৰূপে, এগৰাকী সাহসী ছোৱালী মহাকাশচাৰী, এটা বন্ধুত্বপূৰ্ণ ল\'ৰা ড্ৰেগন, এটা কৌতূহলী শহাপহু...',
    'form.step4.question': 'আপোনাৰ কাহিনীৰ বাবে কিবা বিশেষ ইচ্ছা?',
    'form.step4.placeholder': 'ঐচ্ছিক: কাহিনীত আপুনি বিচৰা যিকোনো বিশেষ উপাদান যোগ কৰক...',
    
    // Form navigation
    'form.back': '← পিছলৈ',
    'form.next': 'পৰৱৰ্তী →',
    'form.createStory': 'কাহিনী সৃষ্টি কৰক',
    'form.pressEnter': 'Enter টিপক ↵',
    
    // Generating page
    'generating.preparing': 'আপোনাৰ যাদুকৰী কাহিনী প্ৰস্তুত কৰা হৈছে...',
    'generating.creating': 'আপোনাৰ কাহিনী সৃষ্টি কৰা হৈছে...',
    'generating.illustration': '🎨 প্ৰথম অধ্যায়ৰ চিত্ৰ সৃষ্টি কৰা হৈছে...',
    'generating.ready': '🎉 আপোনাৰ কাহিনী প্ৰস্তুত!',
    'generating.error': 'ওহ! কিবা ভুল হ\'ল। অনুগ্ৰহ কৰি পুনৰ চেষ্টা কৰক।',
    'generating.tryAgain': 'পুনৰ চেষ্টা কৰক',
    'generating.wait': 'এইটো কিছু সময় ল\'ব পাৰে...',
    
    // Chapter view
    'chapter.label': 'অধ্যায়',
    'chapter.moralTitle': 'কাহিনীৰ শিক্ষা',
    
    // Language selector
    'language.label': 'ভাষা:',
    
    // Chapter page
    'chapterPage.backToHome': '← ঘৰলৈ উভতি যাওক',
    'chapterPage.translating': 'কাহিনী অনুবাদ কৰা হৈছে... ইয়াত কেৱল এক মুহূৰ্ত লাগিব!',
    'chapterPage.loadingStory': 'কাহিনী লোড হৈছে...',
    'chapterPage.chapterNotFound': 'অধ্যায় পোৱা নগ\'ল',
    'chapterPage.goToChapter1': 'অধ্যায় ১ লৈ যাওক',
    'chapterPage.chapterOf': 'ৰ',
    'chapterPage.previous': '← আগৰটো',
    'chapterPage.next': 'পৰৱৰ্তী →',
    'chapterPage.preparing': 'প্ৰস্তুত কৰা হৈছে...',
    'chapterPage.retry': 'পুনৰ চেষ্টা কৰক →',
    'chapterPage.createNewStory': 'নতুন কাহিনী সৃষ্টি কৰক',
  },
};

export const getTranslation = (language: Language, key: keyof TranslationStrings): string => {
  return translations[language][key] || translations.english[key];
};

