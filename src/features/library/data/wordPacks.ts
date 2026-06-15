import { Word } from "@/features/words/types/word.types";

export type WordPackItem = Word;

export type WordPack = {
  id: string;
  title: string;
  description: string;
  category: string;
  words: WordPackItem[];
};

export const wordPacks: WordPack[] = [
  {
    id: "travel-basics",
    title: "Travel Basics",
    description: "Essential words for trips and holidays",
    category: "Travel",
    words: [
      {
        id: "travel-airport",
        word: "airport",
        translation: "аеропорт",
        example: "The airport is very busy today.",
        status: "learning",
        category: "Travel",
      },
      {
        id: "travel-ticket",
        word: "ticket",
        translation: "квиток",
        example: "I bought a ticket online.",
        status: "learning",
        category: "Travel",
      },
      {
        id: "travel-passport",
        word: "passport",
        translation: "паспорт",
        example: "Don't forget your passport.",
        status: "learning",
        category: "Travel",
      },
      {
        id: "travel-hotel",
        word: "hotel",
        translation: "готель",
        example: "We stayed at a small hotel.",
        status: "learning",
        category: "Travel",
      },
      {
        id: "travel-luggage",
        word: "luggage",
        translation: "багаж",
        example: "My luggage is heavy.",
        status: "learning",
        category: "Travel",
      },
    ],
  },
  {
    id: "daily-english",
    title: "Daily English",
    description: "Common words for everyday conversations",
    category: "Daily",
    words: [
      {
        id: "daily-morning",
        word: "morning",
        translation: "ранок",
        example: "I drink coffee every morning.",
        status: "learning",
        category: "Daily",
      },
      {
        id: "daily-evening",
        word: "evening",
        translation: "вечір",
        example: "See you in the evening.",
        status: "learning",
        category: "Daily",
      },
      {
        id: "daily-today",
        word: "today",
        translation: "сьогодні",
        example: "Today is a good day.",
        status: "learning",
        category: "Daily",
      },
      {
        id: "daily-tomorrow",
        word: "tomorrow",
        translation: "завтра",
        example: "I will call you tomorrow.",
        status: "learning",
        category: "Daily",
      },
      {
        id: "daily-always",
        word: "always",
        translation: "завжди",
        example: "She always helps me.",
        status: "learning",
        category: "Daily",
      },
    ],
  },
  {
    id: "work-essentials",
    title: "Work Essentials",
    description: "Useful vocabulary for work and office life",
    category: "Work",
    words: [
      {
        id: "work-meeting",
        word: "meeting",
        translation: "зустріч",
        example: "We have a meeting at ten.",
        status: "learning",
        category: "Work",
      },
      {
        id: "work-deadline",
        word: "deadline",
        translation: "дедлайн",
        example: "The deadline is tomorrow.",
        status: "learning",
        category: "Work",
      },
      {
        id: "work-task",
        word: "task",
        translation: "завдання",
        example: "This task is important.",
        status: "learning",
        category: "Work",
      },
      {
        id: "work-project",
        word: "project",
        translation: "проєкт",
        example: "I work on a new project.",
        status: "learning",
        category: "Work",
      },
      {
        id: "work-team",
        word: "team",
        translation: "команда",
        example: "Our team is friendly.",
        status: "learning",
        category: "Work",
      },
    ],
  },
];
