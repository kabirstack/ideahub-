const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Data files
const dataDir = path.join(__dirname, 'data');
const ideasFile = path.join(dataDir, 'ideas.json');
const studentsFile = path.join(dataDir, 'students.json');
const collaborationsFile = path.join(dataDir, 'collaborations.json');
const commentsFile = path.join(dataDir, 'comments.json');

// Initialize data directory and files
function initializeDataFiles() {
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    if (!fs.existsSync(ideasFile)) {
        fs.writeFileSync(ideasFile, JSON.stringify([]));
    }
    if (!fs.existsSync(studentsFile)) {
        fs.writeFileSync(studentsFile, JSON.stringify([]));
    }
    if (!fs.existsSync(collaborationsFile)) {
        fs.writeFileSync(collaborationsFile, JSON.stringify([]));
    }
    if (!fs.existsSync(commentsFile)) {
        fs.writeFileSync(commentsFile, JSON.stringify([]));
    }
}

// Helper functions to read/write JSON files
function readData(file) {
    try {
        return JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch (error) {
        return [];
    }
}

function writeData(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// ============= STUDENT ENDPOINTS =============

// Get or Create Student
app.post('/api/students', (req, res) => {
    const { name, collegeId, section, branch } = req.body;

    if (!name || !collegeId) {
        return res.status(400).json({ error: 'Name and College ID are required' });
    }

    const students = readData(studentsFile);
    let student = students.find(s => s.collegeId === collegeId);

    if (!student) {
        student = {
            id: uuidv4(),
            name,
            collegeId,
            section,
            branch,
            points: 0,
            badges: [],
            createdAt: new Date().toISOString()
        };
        students.push(student);
        writeData(studentsFile, students);
    } else {
        // Update student info
        student.name = name;
        student.section = section;
        student.branch = branch;
        writeData(studentsFile, students);
    }

    res.json(student);
});

// Get Student by College ID
app.get('/api/students/:collegeId', (req, res) => {
    const students = readData(studentsFile);
    const student = students.find(s => s.collegeId === req.params.collegeId);

    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    }

    res.json(student);
});

// Update Student Points
app.put('/api/students/:collegeId/points', (req, res) => {
    const { points } = req.body;
    const students = readData(studentsFile);
    const student = students.find(s => s.collegeId === req.params.collegeId);

    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    }

    student.points = (student.points || 0) + points;
    writeData(studentsFile, students);
    res.json(student);
});

// Get all students
app.get('/api/students', (req, res) => {
    const students = readData(studentsFile);
    res.json(students);
});

// ============= IDEAS ENDPOINTS =============

// Create Idea
app.post('/api/ideas', (req, res) => {
    const { title, description, category, needCollab, author, collegeId, section, branch } = req.body;

    if (!title || !description || !author || !collegeId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const ideas = readData(ideasFile);
    const idea = {
        id: uuidv4(),
        title,
        description,
        category: category || 'other',
        needCollab: needCollab || false,
        author,
        collegeId,
        section,
        branch,
        upvotes: 0,
        upvoters: [],
        commentCount: 0,
        points: 10,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    ideas.push(idea);
    writeData(ideasFile, ideas);

    // Award points to student
    const students = readData(studentsFile);
    const student = students.find(s => s.collegeId === collegeId);
    if (student) {
        student.points = (student.points || 0) + 10;
        writeData(studentsFile, students);
    }

    res.status(201).json(idea);
});

// Get all ideas
app.get('/api/ideas', (req, res) => {
    const ideas = readData(ideasFile);
    const sortBy = req.query.sortBy || 'recent'; // recent, trending, popular

    let sorted = [...ideas];
    
    if (sortBy === 'trending') {
        sorted.sort((a, b) => b.upvotes - a.upvotes);
    } else if (sortBy === 'popular') {
        sorted.sort((a, b) => (b.commentCount || 0) - (a.commentCount || 0));
    } else {
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    res.json(sorted);
});

// Get idea by ID
app.get('/api/ideas/:ideaId', (req, res) => {
    const ideas = readData(ideasFile);
    const idea = ideas.find(i => i.id === req.params.ideaId);

    if (!idea) {
        return res.status(404).json({ error: 'Idea not found' });
    }

    res.json(idea);
});

// Get ideas by author
app.get('/api/ideas/author/:collegeId', (req, res) => {
    const ideas = readData(ideasFile);
    const userIdeas = ideas.filter(i => i.collegeId === req.params.collegeId);
    res.json(userIdeas);
});

// Update idea
app.put('/api/ideas/:ideaId', (req, res) => {
    const { title, description, category } = req.body;
    const ideas = readData(ideasFile);
    const idea = ideas.find(i => i.id === req.params.ideaId);

    if (!idea) {
        return res.status(404).json({ error: 'Idea not found' });
    }

    if (title) idea.title = title;
    if (description) idea.description = description;
    if (category) idea.category = category;
    idea.updatedAt = new Date().toISOString();

    writeData(ideasFile, ideas);
    res.json(idea);
});

// Delete idea
app.delete('/api/ideas/:ideaId', (req, res) => {
    const ideas = readData(ideasFile);
    const index = ideas.findIndex(i => i.id === req.params.ideaId);

    if (index === -1) {
        return res.status(404).json({ error: 'Idea not found' });
    }

    const deletedIdea = ideas.splice(index, 1);
    writeData(ideasFile, ideas);
    res.json(deletedIdea[0]);
});

// ============= UPVOTE ENDPOINTS =============

// Upvote idea
app.post('/api/ideas/:ideaId/upvote', (req, res) => {
    const { studentName, collegeId } = req.body;
    const ideas = readData(ideasFile);
    const idea = ideas.find(i => i.id === req.params.ideaId);

    if (!idea) {
        return res.status(404).json({ error: 'Idea not found' });
    }

    if (idea.upvoters.includes(collegeId)) {
        // Remove upvote
        idea.upvotes--;
        idea.upvoters = idea.upvoters.filter(v => v !== collegeId);
    } else {
        // Add upvote
        idea.upvotes++;
        idea.upvoters.push(collegeId);

        // Award points
        const students = readData(studentsFile);
        const student = students.find(s => s.collegeId === collegeId);
        if (student) {
            student.points = (student.points || 0) + 5;
            writeData(studentsFile, students);
        }
    }

    writeData(ideasFile, ideas);
    res.json(idea);
});

// ============= COMMENT ENDPOINTS =============

// Add comment
app.post('/api/ideas/:ideaId/comments', (req, res) => {
    const { text, author, collegeId } = req.body;

    if (!text || !author || !collegeId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const ideas = readData(ideasFile);
    const idea = ideas.find(i => i.id === req.params.ideaId);

    if (!idea) {
        return res.status(404).json({ error: 'Idea not found' });
    }

    const comments = readData(commentsFile);
    const comment = {
        id: uuidv4(),
        ideaId: req.params.ideaId,
        text,
        author,
        collegeId,
        createdAt: new Date().toISOString()
    };

    comments.push(comment);
    idea.commentCount = (idea.commentCount || 0) + 1;

    writeData(commentsFile, comments);
    writeData(ideasFile, ideas);

    // Award points
    const students = readData(studentsFile);
    const student = students.find(s => s.collegeId === collegeId);
    if (student) {
        student.points = (student.points || 0) + 3;
        writeData(studentsFile, students);
    }

    res.status(201).json(comment);
});

// Get comments for idea
app.get('/api/ideas/:ideaId/comments', (req, res) => {
    const comments = readData(commentsFile);
    const ideaComments = comments.filter(c => c.ideaId === req.params.ideaId);
    res.json(ideaComments);
});

// Delete comment
app.delete('/api/comments/:commentId', (req, res) => {
    const comments = readData(commentsFile);
    const index = comments.findIndex(c => c.id === req.params.commentId);

    if (index === -1) {
        return res.status(404).json({ error: 'Comment not found' });
    }

    const deletedComment = comments.splice(index, 1);
    writeData(commentsFile, comments);

    // Update idea comment count
    const ideas = readData(ideasFile);
    const idea = ideas.find(i => i.id === deletedComment[0].ideaId);
    if (idea) {
        idea.commentCount = Math.max(0, (idea.commentCount || 1) - 1);
        writeData(ideasFile, ideas);
    }

    res.json(deletedComment[0]);
});

// ============= COLLABORATION ENDPOINTS =============

// Request collaboration
app.post('/api/collaborations', (req, res) => {
    const { ideaId, requesterName, requesterCollegeId, reason } = req.body;

    if (!ideaId || !requesterName || !requesterCollegeId || !reason) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const collaborations = readData(collaborationsFile);
    const collab = {
        id: uuidv4(),
        ideaId,
        requesterName,
        requesterCollegeId,
        reason,
        status: 'pending',
        createdAt: new Date().toISOString(),
        responseAt: null
    };

    collaborations.push(collab);
    writeData(collaborationsFile, collaborations);

    // Award points
    const students = readData(studentsFile);
    const student = students.find(s => s.collegeId === requesterCollegeId);
    if (student) {
        student.points = (student.points || 0) + 2;
        writeData(studentsFile, students);
    }

    res.status(201).json(collab);
});

// Get collaborations for idea
app.get('/api/ideas/:ideaId/collaborations', (req, res) => {
    const collaborations = readData(collaborationsFile);
    const ideaCollabs = collaborations.filter(c => c.ideaId === req.params.ideaId);
    res.json(ideaCollabs);
});

// Get all collaboration requests
app.get('/api/collaborations', (req, res) => {
    const collaborations = readData(collaborationsFile);
    res.json(collaborations);
});

// Update collaboration status
app.put('/api/collaborations/:collabId', (req, res) => {
    const { status } = req.body;
    const collaborations = readData(collaborationsFile);
    const collab = collaborations.find(c => c.id === req.params.collabId);

    if (!collab) {
        return res.status(404).json({ error: 'Collaboration request not found' });
    }

    if (!['pending', 'approved', 'rejected'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }

    collab.status = status;
    collab.responseAt = new Date().toISOString();
    writeData(collaborationsFile, collaborations);

    res.json(collab);
});

// ============= ANALYTICS ENDPOINTS =============

// Get dashboard analytics
app.get('/api/analytics/overview', (req, res) => {
    const ideas = readData(ideasFile);
    const students = readData(studentsFile);
    const collaborations = readData(collaborationsFile);
    const comments = readData(commentsFile);

    const analytics = {
        totalIdeas: ideas.length,
        totalStudents: students.length,
        totalUpvotes: ideas.reduce((sum, i) => sum + (i.upvotes || 0), 0),
        totalComments: comments.length,
        pendingCollaborations: collaborations.filter(c => c.status === 'pending').length,
        approvedCollaborations: collaborations.filter(c => c.status === 'approved').length,
        avgUpvotesPerIdea: ideas.length > 0 ? (ideas.reduce((sum, i) => sum + (i.upvotes || 0), 0) / ideas.length).toFixed(2) : 0,
        totalPointsAwarded: students.reduce((sum, s) => sum + (s.points || 0), 0)
    };

    res.json(analytics);
});

// Get category statistics
app.get('/api/analytics/categories', (req, res) => {
    const ideas = readData(ideasFile);
    const categories = {};

    ideas.forEach(idea => {
        const cat = idea.category || 'other';
        categories[cat] = (categories[cat] || 0) + 1;
    });

    res.json(categories);
});

// Get branch statistics
app.get('/api/analytics/branches', (req, res) => {
    const ideas = readData(ideasFile);
    const branches = {};

    ideas.forEach(idea => {
        const branch = idea.branch || 'Unknown';
        branches[branch] = (branches[branch] || 0) + 1;
    });

    res.json(branches);
});

// Get top authors
app.get('/api/analytics/top-authors', (req, res) => {
    const ideas = readData(ideasFile);
    const authors = {};

    ideas.forEach(idea => {
        authors[idea.author] = (authors[idea.author] || 0) + 1;
    });

    const topAuthors = Object.entries(authors)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([author, count]) => ({ author, count }));

    res.json(topAuthors);
});

// Get trending ideas
app.get('/api/analytics/trending', (req, res) => {
    const ideas = readData(ideasFile);
    const trending = ideas
        .sort((a, b) => b.upvotes - a.upvotes)
        .slice(0, 10)
        .map(idea => ({
            id: idea.id,
            title: idea.title,
            author: idea.author,
            upvotes: idea.upvotes,
            comments: idea.commentCount || 0
        }));

    res.json(trending);
});

// ============= EXPORT ENDPOINTS =============

// Export all data
app.get('/api/export/all', (req, res) => {
    const ideas = readData(ideasFile);
    const students = readData(studentsFile);
    const comments = readData(commentsFile);

    const exportData = {
        ideas: ideas.map(idea => ({
            'Idea Title': idea.title,
            'Description': idea.description,
            'Author Name': idea.author,
            'College ID': idea.collegeId,
            'Section': idea.section,
            'Branch': idea.branch,
            'Category': idea.category,
            'Upvotes': idea.upvotes,
            'Comments': idea.commentCount || 0,
            'Collaboration Needed': idea.needCollab ? 'Yes' : 'No',
            'Created Date': idea.createdAt
        })),
        students: students.map(s => ({
            'Name': s.name,
            'College ID': s.collegeId,
            'Section': s.section,
            'Branch': s.branch,
            'Points': s.points || 0,
            'Ideas Posted': ideas.filter(i => i.collegeId === s.collegeId).length,
            'Total Upvotes Received': ideas.filter(i => i.collegeId === s.collegeId).reduce((sum, i) => sum + i.upvotes, 0)
        }))
    };

    res.json(exportData);
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Initialize and start server
initializeDataFiles();

app.listen(PORT, () => {
    console.log(`🚀 IdeaHub Backend Server running on http://localhost:${PORT}`);
    console.log(`📊 API Documentation:`);
    console.log(`   - Students: POST /api/students, GET /api/students`);
    console.log(`   - Ideas: GET/POST /api/ideas, GET /api/ideas/:ideaId`);
    console.log(`   - Upvotes: POST /api/ideas/:ideaId/upvote`);
    console.log(`   - Comments: GET/POST /api/ideas/:ideaId/comments`);
    console.log(`   - Collaborations: GET/POST /api/collaborations`);
    console.log(`   - Analytics: GET /api/analytics/overview`);
    console.log(`   - Health: GET /api/health`);
});
