# 🚀 IdeaHub - Student Ideas Sharing Platform

A modern social media-style platform for students to share ideas, collaborate on projects, and earn points for contributions.

## ✨ Features

### For Students
- 📝 **Post Ideas** - Share your innovative ideas with the college community
- 👍 **Upvote & Like** - Show support for ideas you love
- 💬 **Comments** - Discuss and provide feedback on ideas
- 🤝 **Collaboration** - Request to collaborate on any idea
- 🏆 **Points & Badges** - Earn rewards for contributions
- 📊 **Profile Stats** - Track your posts, upvotes, and points
- 🎯 **Multiple Views** - Feed, My Ideas, and Collaboration Requests

### For Admins
- 📈 **Dashboard** - View trending ideas and popular themes
- 📊 **Analytics** - Category breakdown, branch statistics, top authors
- 🔍 **Search & Filter** - Find ideas by title, author, category
- 🤝 **Manage Collaborations** - View and manage collaboration requests
- 📥 **Export Data** - Download all ideas to Excel with student details
- 📌 **Insights** - Actionable insights from student contributions

## 🎯 Points System

Students earn points for:
- ✅ **Posting an Idea**: +10 points
- 👍 **Upvoting**: +5 points
- 💬 **Commenting**: +3 points
- 🤝 **Requesting Collaboration**: +2 points

## 📁 Project Structure

```
ideahub/
├── index.html                    # Role selector (Student/Admin)
├── student.html                  # Student dashboard & feed
├── admin.html                    # Admin dashboard & analytics
├── server.js                     # Node.js backend server
├── api-client.js                 # JavaScript API client
├── package.json                  # Node.js dependencies
├── .gitignore                    # Git ignore file
├── API_DOCUMENTATION.md          # Complete API reference
├── BACKEND_SETUP.md              # Backend setup guide
└── README.md                     # This file
```

## 🚀 Getting Started

### Frontend Only (No Backend)
1. Open `index.html` in your browser
2. Choose your role (Student/Admin)
3. Fill in your profile details
4. Start posting or analyzing!

### With Backend Server

#### Prerequisites
- Node.js (v14 or higher)
- npm

#### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ideahub.git
   cd ideahub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the backend server**
   ```bash
   npm start
   ```
   Server runs on `http://localhost:5000`

4. **Open frontend**
   - Open `index.html` in your browser
   - Frontend will connect to backend API

## 🔌 Technology Stack

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript
- LocalStorage (for client-side storage)

### Backend
- Node.js
- Express.js
- JSON file storage (can be upgraded to MongoDB/PostgreSQL)

## 📊 Database Schema

### Ideas
- ID, Title, Description
- Author, College ID, Section, Branch
- Category, Upvotes, Comments
- Collaboration needed flag
- Created/Updated timestamps

### Students
- ID, Name, College ID
- Section, Branch
- Points, Badges
- Created timestamp

### Comments
- ID, Text, Author
- Associated Idea ID
- Created timestamp

### Collaborations
- ID, Idea ID
- Requester Name, College ID
- Reason, Status (pending/approved/rejected)
- Created/Response timestamps

## 🔗 API Endpoints

All endpoints are documented in [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

### Key Endpoints
- `POST /api/students` - Create student
- `POST /api/ideas` - Create idea
- `POST /api/ideas/:ideaId/upvote` - Upvote idea
- `POST /api/ideas/:ideaId/comments` - Add comment
- `POST /api/collaborations` - Request collaboration
- `GET /api/analytics/overview` - Get dashboard stats
- `GET /api/export/all` - Export all data

## 🎨 Features Walkthrough

### Student Flow
1. **Login**: Select "Student" role
2. **Profile**: Enter name, College ID, Section, Branch
3. **Post**: Click "Post Your Idea" button
4. **Browse**: See all ideas in the feed
5. **Interact**: Like, comment, and collaborate
6. **Manage**: Check collaboration requests

### Admin Flow
1. **Login**: Select "Admin" role
2. **Dashboard**: View all statistics
3. **Analytics**: Analyze trends and insights
4. **Search**: Find specific ideas
5. **Export**: Download data to Excel

## 💾 Data Storage

- **Frontend**: Uses browser localStorage
- **Backend**: Uses JSON files in `data/` folder
- Can be easily upgraded to use MongoDB, PostgreSQL, or other databases

## 🚀 Deployment

### Frontend
- Deploy to Netlify, Vercel, GitHub Pages, or any static hosting

### Backend
- Deploy to Heroku, Railway, Render, or any Node.js hosting
- Update `API_BASE_URL` in `api-client.js` to point to production server

## 📝 Development

### Run with auto-reload
```bash
npm run dev
```

### Common Tasks
```bash
# Install packages
npm install package-name

# Remove packages
npm uninstall package-name

# Start in production
npm start
```

## 🛠️ Future Enhancements

- [ ] User authentication (JWT)
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] File uploads for attachments
- [ ] Real-time notifications (WebSockets)
- [ ] Advanced search and filters
- [ ] User roles and permissions
- [ ] Email notifications
- [ ] Mobile app
- [ ] Dark mode
- [ ] Trending algorithm

## 📄 License

This project is open source and available under the MIT License.

## 👥 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub.

## 🎉 Acknowledgments

- Built with ❤️ for student innovation
- Inspired by modern social media platforms
- Designed for college communities

---

**IdeaHub** - Where Student Ideas Come to Life! 🚀
