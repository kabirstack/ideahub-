# IdeaHub - Backend Setup Guide

## 📦 What's Included

### Files Created:
1. **server.js** - Main Express backend server with all API endpoints
2. **package.json** - Project dependencies and scripts
3. **api-client.js** - JavaScript client library for frontend to communicate with backend
4. **API_DOCUMENTATION.md** - Complete API reference guide

### Data Storage:
- `data/ideas.json` - All student ideas
- `data/students.json` - Student profiles and points
- `data/collaborations.json` - Collaboration requests
- `data/comments.json` - All comments

---

## 🚀 Quick Start

### Step 1: Install Dependencies
Open PowerShell in your project directory and run:
```powershell
npm install
```

This will install:
- **express** - Web framework
- **cors** - Cross-Origin Resource Sharing
- **body-parser** - Parse JSON requests
- **uuid** - Generate unique IDs
- **nodemon** - Auto-reload during development

### Step 2: Start the Server
```powershell
npm start
```

Or for development with auto-reload:
```powershell
npm run dev
```

You should see:
```
🚀 IdeaHub Backend Server running on http://localhost:5000
```

### Step 3: Test the Server
Open your browser and visit:
```
http://localhost:5000/api/health
```

You should see:
```json
{
  "status": "Server is running",
  "timestamp": "2025-12-31T..."
}
```

---

## 🔌 Using with Frontend

### Option 1: Include API Client in Frontend

Add this to your HTML files before other scripts:
```html
<script src="api-client.js"></script>
```

### Option 2: Direct API Calls

Use fetch() directly in your frontend:
```javascript
// Get all ideas
fetch('http://localhost:5000/api/ideas')
  .then(res => res.json())
  .then(ideas => console.log(ideas));

// Create new idea
fetch('http://localhost:5000/api/ideas', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'My Idea',
    description: 'Description here',
    category: 'tech',
    needCollab: false,
    author: 'John Doe',
    collegeId: 'CSE001',
    section: 'A',
    branch: 'CSE'
  })
})
.then(res => res.json())
.then(idea => console.log('Idea created:', idea));
```

---

## 📊 API Endpoints Summary

### Students
- `POST /api/students` - Create/Update student
- `GET /api/students/:collegeId` - Get student profile
- `GET /api/students` - Get all students
- `PUT /api/students/:collegeId/points` - Update points

### Ideas
- `POST /api/ideas` - Create idea
- `GET /api/ideas` - Get all ideas (with sorting)
- `GET /api/ideas/:ideaId` - Get idea by ID
- `GET /api/ideas/author/:collegeId` - Get student's ideas
- `PUT /api/ideas/:ideaId` - Update idea
- `DELETE /api/ideas/:ideaId` - Delete idea
- `POST /api/ideas/:ideaId/upvote` - Upvote idea

### Comments
- `POST /api/ideas/:ideaId/comments` - Add comment
- `GET /api/ideas/:ideaId/comments` - Get comments
- `DELETE /api/comments/:commentId` - Delete comment

### Collaborations
- `POST /api/collaborations` - Request collaboration
- `GET /api/collaborations` - Get all requests
- `GET /api/ideas/:ideaId/collaborations` - Get requests for idea
- `PUT /api/collaborations/:collabId` - Update request status

### Analytics
- `GET /api/analytics/overview` - Dashboard stats
- `GET /api/analytics/categories` - Category breakdown
- `GET /api/analytics/branches` - Branch breakdown
- `GET /api/analytics/top-authors` - Top 10 authors
- `GET /api/analytics/trending` - Top 10 ideas

### Export
- `GET /api/export/all` - Export all data for Excel

---

## 💾 Data Structure

### Idea Object
```json
{
  "id": "uuid-string",
  "title": "Idea Title",
  "description": "Full description",
  "category": "tech|social|education|health|environment|other",
  "needCollab": true,
  "author": "John Doe",
  "collegeId": "CSE001",
  "section": "A",
  "branch": "CSE",
  "upvotes": 5,
  "upvoters": ["CSE001", "CSE002"],
  "commentCount": 2,
  "points": 10,
  "createdAt": "2025-12-31T...",
  "updatedAt": "2025-12-31T..."
}
```

### Student Object
```json
{
  "id": "uuid-string",
  "name": "John Doe",
  "collegeId": "CSE001",
  "section": "A",
  "branch": "CSE",
  "points": 50,
  "badges": [],
  "createdAt": "2025-12-31T..."
}
```

### Comment Object
```json
{
  "id": "uuid-string",
  "ideaId": "idea-uuid",
  "text": "Comment text",
  "author": "Jane Smith",
  "collegeId": "CSE002",
  "createdAt": "2025-12-31T..."
}
```

### Collaboration Object
```json
{
  "id": "uuid-string",
  "ideaId": "idea-uuid",
  "requesterName": "Jane Smith",
  "requesterCollegeId": "CSE002",
  "reason": "I want to collaborate because...",
  "status": "pending|approved|rejected",
  "createdAt": "2025-12-31T...",
  "responseAt": null
}
```

---

## 📝 Points System

Automatic point allocation:
- ✅ Create idea = +10 points
- 👍 Upvote = +5 points
- 💬 Comment = +3 points
- 🤝 Collab request = +2 points

Points are awarded to the student's account automatically when actions occur.

---

## 🛠️ Development

### Project Structure
```
kkk/
├── server.js                 # Main backend server
├── api-client.js            # Frontend API client
├── package.json             # Dependencies
├── API_DOCUMENTATION.md     # Full API docs
├── BACKEND_SETUP.md         # This file
├── data/                    # Data storage
│   ├── ideas.json
│   ├── students.json
│   ├── collaborations.json
│   └── comments.json
├── index.html               # Role selector
├── student.html             # Student interface
└── admin.html               # Admin dashboard
```

### Common Commands

```powershell
# Install dependencies
npm install

# Start server (production)
npm start

# Start with auto-reload (development)
npm run dev

# Install specific package
npm install package-name

# Uninstall package
npm uninstall package-name
```

---

## 🐛 Troubleshooting

### Port Already in Use
If port 5000 is already in use, edit `server.js` and change:
```javascript
const PORT = 5000;  // Change to 5001, 5002, etc.
```

### CORS Errors
If frontend is on a different origin, it's already configured to accept all origins. If you need more control, edit the CORS setup in `server.js`.

### Data Not Persisting
Check that the `data/` folder is writable. All JSON files should be in the `data/` directory.

### Cannot Connect to Server
- Ensure server is running: `npm start`
- Check that port 5000 is correct
- Verify firewall settings

---

## 🔮 Future Enhancements

Consider implementing:
1. **MongoDB/PostgreSQL** - Replace JSON file storage with database
2. **Authentication** - JWT tokens for user sessions
3. **File Uploads** - Support for attachments
4. **Email Notifications** - Send alerts for collaboration
5. **WebSockets** - Real-time updates
6. **Advanced Search** - Full-text search on ideas
7. **Pagination** - Limit API responses
8. **Caching** - Redis for performance
9. **Rate Limiting** - Prevent abuse
10. **Logging** - Better error tracking

---

## 📞 API Response Format

### Success Response
```json
{
  "id": "...",
  "data": "..."
}
```

### Error Response
```json
{
  "error": "Description of what went wrong"
}
```

---

## ✅ Verification Checklist

- [ ] Node.js installed
- [ ] Dependencies installed (`npm install`)
- [ ] Server starts without errors (`npm start`)
- [ ] Health endpoint works (`http://localhost:5000/api/health`)
- [ ] Data folder created
- [ ] JSON files generated in data folder
- [ ] Frontend can make API calls to backend

---

**Backend setup complete!** 🎉 Your IdeaHub backend is ready to serve requests from the frontend.
