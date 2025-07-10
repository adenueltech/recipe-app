# 🍳 Recipe Finder App

A stunning, fully-featured Recipe Finder application built with **Next.js 15**, **React 19**, and **TypeScript**. This app demonstrates modern React development patterns, beautiful animations, and comprehensive functionality for discovering and managing recipes.

![Recipe Finder App](https://img.shields.io/badge/Built%20with-Next.js%2015-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🌟 Features

### 🔍 **Recipe Discovery**
- **Smart Search**: Search recipes by ingredients, dish names, or cuisine types
- **Advanced Filters**: Filter by cuisine, cooking time, difficulty level, and dietary preferences
- **Multiple Variations**: Get 6+ different variations of the same dish (e.g., Jollof Rice, Chinese Fried Rice, Paella)
- **Real-time Results**: Instant search results with beautiful loading animations

### 💖 **Favorites Management**
- **Save Recipes**: Add recipes to favorites with animated heart icons
- **Persistent Storage**: Favorites saved in local storage across sessions
- **Favorites Page**: Dedicated page to view all saved recipes
- **Quick Actions**: Easy add/remove from any recipe card

### 🎨 **Beautiful UI/UX**
- **Stunning Animations**: Framer Motion powered transitions and micro-interactions
- **Responsive Design**: Perfect on desktop, tablet, and mobile devices
- **Glass Morphism**: Modern backdrop blur effects and gradients
- **Interactive Elements**: Hover effects, loading states, and smooth transitions
- **Color-coded Difficulty**: Visual indicators for recipe complexity

### 🌍 **Global Cuisine Support**
- **Diverse Cuisines**: African, Asian, European, American, Middle Eastern, and more
- **Cultural Authenticity**: Real dishes from different culinary traditions
- **Regional Variations**: Multiple styles of the same dish from different cultures

## 🚀 Live Demo

**[View Live App](https://vercel.com/nueldev089-4968s-projects/v0-react-app-enhancements)**

## 📱 Screenshots

### Home Page - Recipe Search
Beautiful search interface with cuisine filters and animated recipe cards.

### Recipe Details
Comprehensive recipe information with ingredients, instructions, and nutritional data.

### Favorites Collection
Personal collection of saved recipes with easy management.

## 🛠️ Tech Stack

### **Frontend Framework**
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development

### **Styling & Animation**
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library
- **shadcn/ui** - High-quality component library
- **Lucide React** - Beautiful icon library

### **State Management**
- **React Context API** - Global state management
- **Custom Hooks** - Reusable stateful logic
- **Local Storage** - Persistent data storage

### **API Integration**
- **API Ninjas** - Recipe data provider
- **Custom Image Service** - Dynamic food photography
- **Error Handling** - Graceful fallbacks and error states

## 📂 Project Structure

\`\`\`
recipe-finder/
├── app/                          # Next.js App Router
│   ├── favorites/               # Favorites page
│   ├── recipe/[id]/            # Dynamic recipe details
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   ├── loading.tsx             # Loading UI
│   └── page.tsx                # Home page
├── components/                  # Reusable components
│   ├── ui/                     # shadcn/ui components
│   ├── loading-skeleton.tsx    # Loading placeholders
│   ├── navigation.tsx          # App navigation
│   ├── recipe-card.tsx         # Recipe display card
│   └── search-filters.tsx      # Search filter controls
├── contexts/                    # React Context providers
│   ├── favorites-context.tsx   # Favorites state management
│   └── recipe-context.tsx      # Recipe data management
├── hooks/                       # Custom React hooks
│   ├── use-favorites.ts        # Favorites logic
│   ├── use-recipe-details.ts   # Recipe details fetching
│   └── use-recipes.ts          # Recipe search logic
├── types/                       # TypeScript definitions
│   └── recipe.ts               # Recipe data types
└── public/                      # Static assets
    └── placeholder images
\`\`\`

## 🎯 React Concepts Demonstrated

### **React Basics**
- ✅ **JSX**: Semantic markup and component composition
- ✅ **Components**: Modular, reusable UI components
- ✅ **Props**: Data flow between components
- ✅ **State**: Local component state with useState

### **Advanced React**
- ✅ **useEffect**: Side effects and lifecycle management
- ✅ **Custom Hooks**: Reusable stateful logic
- ✅ **Context API**: Global state management
- ✅ **Error Boundaries**: Graceful error handling

### **Next.js Features**
- ✅ **App Router**: File-based routing system
- ✅ **Dynamic Routes**: Parameterized page routes
- ✅ **Loading States**: Built-in loading UI
- ✅ **Server Components**: Optimized rendering

### **Modern Patterns**
- ✅ **TypeScript**: Type-safe development
- ✅ **Performance**: Optimized with useCallback and useMemo
- ✅ **Accessibility**: ARIA labels and semantic HTML
- ✅ **Responsive Design**: Mobile-first approach

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ 
- **npm** or **yarn** or **pnpm**
- **API Ninjas Account** (optional - app works with demo data)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/recipe-finder.git
   cd recipe-finder
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Set up environment variables** (optional)
   \`\`\`bash
   # Create .env.local file
   NEXT_PUBLIC_API_NINJAS_KEY=your_api_key_here
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### API Setup (Optional)
The app works with demo data, but for real recipe data:

1. **Get API Key**: Sign up at [API Ninjas](https://api.api-ninjas.com/)
2. **Add to Environment**: Create `.env.local` with your API key
3. **Restart Server**: The app will automatically use real data

### Customization
- **Colors**: Modify `tailwind.config.ts` for custom color schemes
- **Animations**: Adjust Framer Motion settings in components
- **Recipes**: Add more demo recipes in `use-recipes.ts`

## 📱 Usage Guide

### **Searching Recipes**
1. **Enter Keywords**: Type ingredients or dish names
2. **Select Cuisine**: Choose from 15+ global cuisines
3. **Apply Filters**: Set cooking time, difficulty, dietary preferences
4. **Browse Results**: View multiple variations of each dish

### **Managing Favorites**
1. **Add to Favorites**: Click the heart icon on any recipe card
2. **View Collection**: Navigate to the Favorites page
3. **Remove Items**: Click the heart again to remove from favorites
4. **Persistent Storage**: Favorites are saved across browser sessions

### **Recipe Details**
1. **Click Recipe Card**: View full recipe information
2. **Check Ingredients**: Interactive ingredient checklist
3. **Follow Instructions**: Step-by-step cooking guide
4. **Save Recipe**: Add to favorites from detail page

## 🎨 Design System

### **Color Palette**
- **Primary**: Orange to Red gradient (`from-orange-400 to-red-500`)
- **Secondary**: Warm accent colors for different recipe types
- **Neutral**: Gray scale for text and backgrounds
- **Success**: Green for positive actions
- **Warning**: Yellow for attention states

### **Typography**
- **Headings**: Bold, clear hierarchy
- **Body Text**: Readable font sizes and line heights
- **Code**: Monospace for technical content

### **Spacing**
- **Consistent Scale**: 4px base unit system
- **Responsive**: Adaptive spacing for different screen sizes
- **Visual Rhythm**: Harmonious vertical spacing

## 🔄 State Management

### **Global State (Context)**
- **Recipes**: Search results and recipe data
- **Favorites**: User's saved recipes
- **UI State**: Loading states and error handling

### **Local State (useState)**
- **Search Query**: Current search input
- **Filters**: Applied search filters
- **UI Interactions**: Hover states, animations

### **Persistent State (localStorage)**
- **Favorites**: Saved across browser sessions
- **User Preferences**: Search history and settings

## 🚀 Performance Optimizations

### **React Optimizations**
- **useCallback**: Memoized event handlers
- **useMemo**: Expensive calculations cached
- **Lazy Loading**: Images loaded on demand
- **Code Splitting**: Automatic with Next.js

### **Image Optimization**
- **Next.js Image**: Optimized image delivery
- **Lazy Loading**: Images load as needed
- **Fallback System**: Graceful image error handling
- **Multiple Sources**: Primary and fallback image services

### **Bundle Optimization**
- **Tree Shaking**: Unused code eliminated
- **Dynamic Imports**: Components loaded on demand
- **Minification**: Production builds optimized

## 🧪 Testing

### **Manual Testing Checklist**
- ✅ Search functionality works
- ✅ Filters apply correctly
- ✅ Favorites add/remove properly
- ✅ Navigation works on all pages
- ✅ Responsive design on mobile
- ✅ Loading states display correctly
- ✅ Error handling works gracefully

### **Browser Compatibility**
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🚀 Deployment

### **Vercel (Recommended)**
1. **Connect Repository**: Link your GitHub repo to Vercel
2. **Environment Variables**: Add API keys in Vercel dashboard
3. **Deploy**: Automatic deployment on every push

### **Other Platforms**
- **Netlify**: Works with static export
- **Railway**: Full-stack deployment
- **Docker**: Containerized deployment

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### **Development Setup**
1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Make changes**: Follow the existing code style
4. **Test thoroughly**: Ensure all features work
5. **Submit PR**: Describe your changes clearly

### **Code Style**
- **TypeScript**: Use proper types for all data
- **ESLint**: Follow the configured rules
- **Prettier**: Format code consistently
- **Comments**: Document complex logic

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

### **APIs & Services**
- **[API Ninjas](https://api.api-ninjas.com/)** - Recipe data provider
- **[Lorem Picsum](https://picsum.photos/)** - Placeholder images
- **[Unsplash](https://unsplash.com/)** - Food photography

### **Libraries & Tools**
- **[Next.js](https://nextjs.org/)** - React framework
- **[Tailwind CSS](https://tailwindcss.com/)** - CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[shadcn/ui](https://ui.shadcn.com/)** - Component library
- **[Lucide React](https://lucide.dev/)** - Icon library

### **Inspiration**
- Modern recipe apps and food blogs
- Material Design principles
- Apple's Human Interface Guidelines

## 📞 Support

### **Getting Help**
- **Issues**: Report bugs on GitHub Issues
- **Discussions**: Ask questions in GitHub Discussions
- **Email**: Contact the maintainers directly

### **Documentation**
- **API Docs**: Detailed API integration guide
- **Component Docs**: Individual component documentation
- **Deployment Guide**: Step-by-step deployment instructions

---

**Built with ❤️ using React, Next.js, and modern web technologies**

*This project demonstrates comprehensive React development skills including hooks, context, routing, forms, animations, and API integration.*
