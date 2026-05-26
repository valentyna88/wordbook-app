# 📚 WordBook - Vocabulary Learning App

Mobile application for learning and managing English vocabulary.

## ✨ Features

### Vocabulary management

- Add new words
- Edit words
- Delete words
- View all saved words
- Mark words as:
  - Learning
  - Known

### Practice mode

- Practice learning words
- Navigate between words
- Reveal translations
- Listen to word pronunciation
- Mark words as:
  - Still learning
  - I know this
- Practice result screen
- Repeat practice session

### Ready-made word packs

- Browse word packs by category
- View pack details
- Practice pack words
- Listen to pronunciation inside packs

## 🛠 Tech Stack

- React Native
- Expo
- TypeScript
- Expo Router
- React Context API

## Getting Started

Install dependencies:

```bash
npm install
```

Run the app:

```bash
npx expo start
```

## Project Structure

```txt
app/
├── (tabs)/ # Main tab navigation
├── add-word/ # Add word screens
├── edit-word/ # Edit word screens
├── word-details/ # Word details screen
├── word-pack/ # Pack details
└── word-pack-practice/ # Pack practice

src/
├── components/           # Reusable UI components
├── constants/            # App constants
├── context/              # Global state
├── features/             # Feature-based structure
│   ├── library/
│   ├── practice/
│   └── words/
```

## 🛠 Status

Currently under active development.

Planned features:

- Statistics screen
- Progress tracking
- Learning journey
- Search and filters improvements

```

```
