# IdeaHub Backend API Documentation

## Overview
IdeaHub is a student ideas sharing platform backend built with Node.js and Express.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. **Navigate to project directory**
```bash
cd path/to/kkk
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the server**
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The server will start on `http://localhost:5000`

---

## API Endpoints

### STUDENTS

#### Create/Update Student
```
POST /api/students
Content-Type: application/json

{
  "name": "John Doe",
  "collegeId": "CSE001",
  "section": "A",
  "branch": "CSE"
}

Response: Student object with id, points, badges
```

#### Get Student
```
GET /api/students/:collegeId

Response: Student object
```

#### Get All Students
```
GET /api/students

Response: Array of student objects
```

#### Update Student Points
```
PUT /api/students/:collegeId/points
Content-Type: application/json

{
  "points": 10
}

Response: Updated student object
```

---

### IDEAS

#### Create Idea
```
POST /api/ideas
Content-Type: application/json

{
  "title": "AI Chatbot for Campus",
  "description": "A chatbot to help students with queries...",
  "category": "tech",
  "needCollab": true,
  "author": "John Doe",
  "collegeId": "CSE001",
  "section": "A",
  "branch": "CSE"
}

Response: Idea object with id, upvotes, createdAt
Status: 201 Created
```

#### Get All Ideas
```
GET /api/ideas?sortBy=recent
Query params: sortBy (recent | trending | popular)

Response: Array of idea objects
```

#### Get Idea by ID
```
GET /api/ideas/:ideaId

Response: Idea object
```

#### Get Ideas by Author
```
GET /api/ideas/author/:collegeId

Response: Array of author's ideas
```

#### Update Idea
```
PUT /api/ideas/:ideaId
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description",
  "category": "social"
}

Response: Updated idea object
```

#### Delete Idea
```
DELETE /api/ideas/:ideaId

Response: Deleted idea object
```

---

### UPVOTES

#### Upvote/Un-upvote Idea
```
POST /api/ideas/:ideaId/upvote
Content-Type: application/json

{
  "studentName": "John Doe",
  "collegeId": "CSE001"
}

Response: Updated idea object with new upvote count
```

---

### COMMENTS

#### Add Comment
```
POST /api/ideas/:ideaId/comments
Content-Type: application/json

{
  "text": "Great idea!",
  "author": "Jane Smith",
  "collegeId": "CSE002"
}

Response: Comment object with id, createdAt
Status: 201 Created
```

#### Get Comments for Idea
```
GET /api/ideas/:ideaId/comments

Response: Array of comment objects
```

#### Delete Comment
```
DELETE /api/comments/:commentId

Response: Deleted comment object
```

---

### COLLABORATIONS

#### Request Collaboration
```
POST /api/collaborations
Content-Type: application/json

{
  "ideaId": "uuid-of-idea",
  "requesterName": "Jane Smith",
  "requesterCollegeId": "CSE002",
  "reason": "I have expertise in backend development..."
}

Response: Collaboration request object
Status: 201 Created
```

#### Get Collaboration Requests for Idea
```
GET /api/ideas/:ideaId/collaborations

Response: Array of collaboration objects for that idea
```

#### Get All Collaboration Requests
```
GET /api/collaborations

Response: Array of all collaboration requests
```

#### Update Collaboration Status
```
PUT /api/collaborations/:collabId
Content-Type: application/json

{
  "status": "approved"
}

Valid statuses: pending, approved, rejected

Response: Updated collaboration object
```

---

### ANALYTICS

#### Get Dashboard Overview
```
GET /api/analytics/overview

Response: {
  "totalIdeas": 45,
  "totalStudents": 120,
  "totalUpvotes": 342,
  "totalComments": 89,
  "pendingCollaborations": 12,
  "approvedCollaborations": 5,
  "avgUpvotesPerIdea": 7.6,
  "totalPointsAwarded": 4500
}
```

#### Get Category Statistics
```
GET /api/analytics/categories

Response: {
  "tech": 15,
  "social": 8,
  "education": 12,
  ...
}
```

#### Get Branch Statistics
```
GET /api/analytics/branches

Response: {
  "CSE": 20,
  "ECE": 15,
  "Mechanical": 10
}
```

#### Get Top Authors
```
GET /api/analytics/top-authors

Response: [
  { "author": "John Doe", "count": 5 },
  { "author": "Jane Smith", "count": 4 },
  ...
]
```

#### Get Trending Ideas
```
GET /api/analytics/trending

Response: [
  {
    "id": "uuid",
    "title": "AI Chatbot",
    "author": "John",
    "upvotes": 15,
    "comments": 3
  },
  ...
]
```

---

### EXPORT

#### Export All Data
```
GET /api/export/all

Response: {
  "ideas": [...],
  "students": [...]
}

Returns data formatted for Excel export
```

---

### HEALTH CHECK

```
GET /api/health

Response: { "status": "Server is running", "timestamp": "..." }
```

---

## Data Storage

All data is stored in JSON files located in the `data/` directory:
- `data/ideas.json` - All ideas
- `data/students.json` - All students
- `data/comments.json` - All comments
- `data/collaborations.json` - All collaboration requests

---

## Points System

Students earn points for:
- **Posting an idea**: 10 points
- **Upvoting**: 5 points
- **Adding a comment**: 3 points
- **Requesting collaboration**: 2 points

---

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (missing/invalid parameters)
- `404` - Not Found
- `500` - Server Error

Error response format:
```json
{
  "error": "Error message describing what went wrong"
}
```

---

## CORS Configuration

The backend is configured to accept requests from any origin. You can modify the CORS settings in `server.js` if needed.

---

## Future Enhancements

- [ ] Database integration (MongoDB, PostgreSQL)
- [ ] User authentication
- [ ] File uploads for idea attachments
- [ ] Email notifications
- [ ] Real-time updates with WebSockets
- [ ] Advanced search and filtering
- [ ] User roles and permissions
