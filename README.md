# Gyan Yudh - Gamified Learning Platform

A gamified learning platform for B.Tech students with team-based challenges and XP progression.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Sri5654/gyan-yudh-frontend.git
cd gyan-yudh-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🏗️ Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── ErrorBoundary.js
│   ├── Navbar.js
│   └── ProtectedRoute.js
├── contexts/           # React contexts
│   └── AuthContext.js
├── pages/             # Main pages
│   ├── Dashboard.js
│   ├── Team.js
│   ├── EarnXP.js
│   ├── CodingArena.js
│   ├── Leaderboard.js
│   ├── Login.js
│   └── Register.js
└── App.js            # Main app component
```

## 🎮 Features

- **Dashboard**: Personal stats, team rankings, daily quests
- **Team Management**: Squad members, achievements, progress tracking  
- **Coding Arena**: Multi-language code editor with problem solving
- **XP System**: Earn points through various activities
- **Leaderboard**: Global and team rankings with podium display

## 🔧 Configuration

The app uses mock data for demonstration. To connect to a real backend:

1. Update the API endpoints in `AuthContext.js`
2. Replace mock data with actual API calls
3. Configure environment variables for production

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Deploy automatically on push to main branch

### Manual Deployment
1. Build the project: `npm run build`
2. Deploy the `build` folder to your hosting service

## 🛠️ Troubleshooting

### Common Issues

1. **White screen on deployment**: Check browser console for errors
2. **Build failures**: Ensure all dependencies are installed
3. **Routing issues**: Verify `vercel.json` configuration for SPA routing

### Development

- Use `npm start` for development with hot reload
- Check browser console for any JavaScript errors
- Ensure all imports are correctly spelled and paths are accurate

## 📝 License

This project is for educational purposes.

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
