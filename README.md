# 🌙 Bedtime Stories - Magical Tales for Kids

A beautiful, interactive web app that creates personalized bedtime stories for children under 6 years old, complete with AI-generated narratives and illustrations.

## ✨ Features

- **Typeform-Style Multi-Step Form**: Seamless one-question-per-screen experience for story customization
- **AI-Powered Story Generation**: Uses OpenAI GPT-4 to create engaging, age-appropriate bedtime stories
- **Beautiful Anime-Style Illustrations**: AI-generated images for each chapter using OpenAI DALL-E 3
- **5-Chapter Stories**: Each story is structured into 5 chapters with a magical happy ending
- **Multi-Language Support**: Stories available in English (default), Hindi (हिंदी), and Assamese (অসমীয়া)
- **Instant Translation**: Fast language switching with localStorage caching (1-2 seconds)
- **PDF Export**: Download stories as beautifully formatted PDFs
- **LocalStorage Persistence**: All stories and progress saved locally - no authentication needed
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile devices
- **Sleek UI**: Minimal, elegant design inspired by modern children's apps

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenAI API key

### Installation

1. Clone the repository:
```bash
cd bedtime-story
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your API keys to `.env.local`:
```
OPENAI_API_KEY=your-openai-api-key-here
OPENAI_API_KEY_FALLBACK=your-fallback-api-key-here (optional)
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎨 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **AI**: OpenAI GPT-4o-mini (stories & morals), OpenAI DALL-E 3 (illustrations)
- **PDF Generation**: jsPDF
- **Storage**: Browser LocalStorage

## 📖 How to Use

1. **Create a Story**:
   - Click "Create New Story" on the home page
   - Answer 5 simple questions:
     - Select your preferred language
     - Choose a story genre
     - Define main characters
     - Pick story length
     - Add special wishes (optional)

2. **Read & Enjoy**:
   - Navigate through 5 beautifully illustrated chapters
   - Switch languages anytime
   - Track your reading progress

3. **Complete & Save**:
   - Enjoy the happy ending after chapter 5
   - Download as PDF
   - Create another story or return to home

## 🌍 Supported Languages

- 🇬🇧 **English** (Default)
- 🇮🇳 **Hindi** (हिंदी)
- 🇮🇳 **Assamese** (অসমীয়া) - Native Assamese script

## 📁 Project Structure

```
bedtime-story/
├── src/
│   ├── app/
│   │   ├── api/              # API routes for AI integration
│   │   ├── create/           # Multi-step form page
│   │   ├── story/            # Story reading pages
│   │   ├── page.tsx          # Home page
│   │   └── layout.tsx        # Root layout
│   ├── components/           # Reusable React components
│   ├── lib/
│   │   ├── types.ts          # TypeScript type definitions
│   │   ├── prompts.ts        # AI prompts for story generation
│   │   ├── localStorage.ts   # LocalStorage utilities
│   │   └── openai.ts         # OpenAI client
│   └── app/globals.css       # Global styles
├── .env.local                # Environment variables (not committed)
├── .env.example              # Example environment variables
└── package.json
```

## 🎯 Key Features Explained

### Multi-Step Form
Beautiful typeform-style interface with smooth transitions, progress tracking, and auto-save functionality.

### Story Generation
Stories are generated with:
- Age-appropriate content (under 6 years)
- 5 engaging chapters
- Educational themes (friendship, kindness, bravery, curiosity)
- A warm happy ending

### Translation System
- First translation: 1-2 seconds via OpenAI API
- Subsequent switches: Instant (from localStorage cache)
- Maintains storytelling tone across languages

### PDF Export
Download complete stories with:
- All 5 chapters
- Illustrations
- Happy ending
- Beautiful kid-friendly formatting

## 🔒 Privacy

- **No Authentication**: Stories are stored locally in your browser
- **No Server Storage**: Everything stays on your device
- **API Keys**: Only used for AI generation, never shared

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for story generation and illustrations | Yes |
| `OPENAI_API_KEY_FALLBACK` | Fallback OpenAI API key (used if primary fails) | No |

### API Key Fallback

The app supports automatic fallback to a secondary OpenAI API key:
- If `OPENAI_API_KEY` fails or is not set, the app will automatically try `OPENAI_API_KEY_FALLBACK`
- This is useful for rate limiting, quota management, or redundancy
- The fallback is automatic and transparent to users

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🌟 Credits

- **Story Generation**: OpenAI GPT-4o-mini
- **Illustrations**: OpenAI DALL-E 3
- **Design Inspiration**: Modern children's book apps and typeform
- **Made with**: ❤️ for bedtime adventures

---

**Sweet dreams and happy reading! 🌙✨**
