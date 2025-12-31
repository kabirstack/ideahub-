// API Configuration for Frontend
const API_BASE_URL = 'http://localhost:5000/api';

// Student API Calls
const StudentAPI = {
    create: async (name, collegeId, section, branch) => {
        const response = await fetch(`${API_BASE_URL}/students`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, collegeId, section, branch })
        });
        return response.json();
    },

    get: async (collegeId) => {
        const response = await fetch(`${API_BASE_URL}/students/${collegeId}`);
        return response.json();
    },

    getAll: async () => {
        const response = await fetch(`${API_BASE_URL}/students`);
        return response.json();
    },

    updatePoints: async (collegeId, points) => {
        const response = await fetch(`${API_BASE_URL}/students/${collegeId}/points`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ points })
        });
        return response.json();
    }
};

// Ideas API Calls
const IdeaAPI = {
    create: async (title, description, category, needCollab, author, collegeId, section, branch) => {
        const response = await fetch(`${API_BASE_URL}/ideas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title,
                description,
                category,
                needCollab,
                author,
                collegeId,
                section,
                branch
            })
        });
        return response.json();
    },

    getAll: async (sortBy = 'recent') => {
        const response = await fetch(`${API_BASE_URL}/ideas?sortBy=${sortBy}`);
        return response.json();
    },

    getById: async (ideaId) => {
        const response = await fetch(`${API_BASE_URL}/ideas/${ideaId}`);
        return response.json();
    },

    getByAuthor: async (collegeId) => {
        const response = await fetch(`${API_BASE_URL}/ideas/author/${collegeId}`);
        return response.json();
    },

    update: async (ideaId, title, description, category) => {
        const response = await fetch(`${API_BASE_URL}/ideas/${ideaId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, category })
        });
        return response.json();
    },

    delete: async (ideaId) => {
        const response = await fetch(`${API_BASE_URL}/ideas/${ideaId}`, {
            method: 'DELETE'
        });
        return response.json();
    },

    upvote: async (ideaId, studentName, collegeId) => {
        const response = await fetch(`${API_BASE_URL}/ideas/${ideaId}/upvote`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studentName, collegeId })
        });
        return response.json();
    }
};

// Comments API Calls
const CommentAPI = {
    add: async (ideaId, text, author, collegeId) => {
        const response = await fetch(`${API_BASE_URL}/ideas/${ideaId}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, author, collegeId })
        });
        return response.json();
    },

    getByIdea: async (ideaId) => {
        const response = await fetch(`${API_BASE_URL}/ideas/${ideaId}/comments`);
        return response.json();
    },

    delete: async (commentId) => {
        const response = await fetch(`${API_BASE_URL}/comments/${commentId}`, {
            method: 'DELETE'
        });
        return response.json();
    }
};

// Collaboration API Calls
const CollaborationAPI = {
    request: async (ideaId, requesterName, requesterCollegeId, reason) => {
        const response = await fetch(`${API_BASE_URL}/collaborations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ideaId,
                requesterName,
                requesterCollegeId,
                reason
            })
        });
        return response.json();
    },

    getByIdea: async (ideaId) => {
        const response = await fetch(`${API_BASE_URL}/ideas/${ideaId}/collaborations`);
        return response.json();
    },

    getAll: async () => {
        const response = await fetch(`${API_BASE_URL}/collaborations`);
        return response.json();
    },

    updateStatus: async (collabId, status) => {
        const response = await fetch(`${API_BASE_URL}/collaborations/${collabId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        return response.json();
    }
};

// Analytics API Calls
const AnalyticsAPI = {
    getOverview: async () => {
        const response = await fetch(`${API_BASE_URL}/analytics/overview`);
        return response.json();
    },

    getCategories: async () => {
        const response = await fetch(`${API_BASE_URL}/analytics/categories`);
        return response.json();
    },

    getBranches: async () => {
        const response = await fetch(`${API_BASE_URL}/analytics/branches`);
        return response.json();
    },

    getTopAuthors: async () => {
        const response = await fetch(`${API_BASE_URL}/analytics/top-authors`);
        return response.json();
    },

    getTrending: async () => {
        const response = await fetch(`${API_BASE_URL}/analytics/trending`);
        return response.json();
    }
};

// Export API Calls
const ExportAPI = {
    getAll: async () => {
        const response = await fetch(`${API_BASE_URL}/export/all`);
        return response.json();
    }
};

// Health Check
const HealthAPI = {
    check: async () => {
        const response = await fetch(`${API_BASE_URL}/health`);
        return response.json();
    }
};
