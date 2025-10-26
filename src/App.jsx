import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Ticket, LogOut, Plus, Edit2, Trash2, X, Menu } from 'lucide-react';

// 🧠 Authentication Context
export const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};


// 🧩 Custom Hook
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};


// Toast Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast ${type}`}>
      {type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
      <span>{message}</span>
      <button onClick={onClose} className="toast-close" aria-label="Close notification">
        <X size={16} />
      </button>
    </div>
  );
};

// Wave SVG Component
const WaveSVG = () => (
  <svg className="wave" viewBox="0 0 1440 320" preserveAspectRatio="none">
    <path
      fill="currentColor"
      d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
    />
  </svg>
);

// Responsive Navbar Component
const Navbar = ({ isAuthenticated, onNavigate, onLogout, currentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (page) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <h1 className="navbar-brand" onClick={() => handleNavClick(isAuthenticated ? 'dashboard' : 'landing')}>
            TicketFlow
          </h1>

          {/* Desktop Navigation */}
          <div className="navbar-links">
            {!isAuthenticated ? (
              <>
                <button className="nav-link" onClick={() => handleNavClick('landing')}>Home</button>
                <button className="btn btn-text" onClick={() => handleNavClick('login')}>Login</button>
                <button className="btn btn-primary" onClick={() => handleNavClick('signup')}>Sign Up</button>
              </>
            ) : (
              <>
                <button 
                  className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`} 
                  onClick={() => handleNavClick('dashboard')}
                >
                  Dashboard
                </button>
                <button 
                  className={`nav-link ${currentPage === 'tickets' ? 'active' : ''}`} 
                  onClick={() => handleNavClick('tickets')}
                >
                  Tickets
                </button>
                <button className="btn btn-outline" onClick={onLogout}>
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            {!isAuthenticated ? (
              <>
                <button className="mobile-nav-link" onClick={() => handleNavClick('landing')}>Home</button>
                <button className="mobile-nav-link" onClick={() => handleNavClick('login')}>Login</button>
                <button className="mobile-nav-link" onClick={() => handleNavClick('signup')}>Sign Up</button>
              </>
            ) : (
              <>
                <button 
                  className={`mobile-nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
                  onClick={() => handleNavClick('dashboard')}
                >
                  Dashboard
                </button>
                <button 
                  className={`mobile-nav-link ${currentPage === 'tickets' ? 'active' : ''}`}
                  onClick={() => handleNavClick('tickets')}
                >
                  Tickets
                </button>
                <button className="mobile-nav-link logout" onClick={() => { onLogout(); setIsMobileMenuOpen(false); }}>
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

// Footer Component
const Footer = () => (
  <footer className="footer">
    <div className="container">
      <p>&copy; 2025 TicketFlow. All rights reserved.</p>
      <p>Built with React for HNG Stage 2</p>
    </div>
  </footer>
);

// Landing Page
const LandingPage = ({ onNavigate }) => {
  return (
    <div className="page">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="decorative-circle circle-1"></div>
            <div className="decorative-circle circle-2"></div>
            <h1 className="hero-title">TicketFlow</h1>
            <p className="hero-subtitle">
              Manage your support tickets efficiently with our intuitive platform
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={() => onNavigate('login')}>
                Login
              </button>
              <button className="btn btn-secondary" onClick={() => onNavigate('signup')}>
                Get Started
              </button>
            </div>
          </div>
        </div>
        <WaveSVG />
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose TicketFlow?</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Easy Management</h3>
              <p>Create, update, and track tickets with ease</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Real-time Updates</h3>
              <p>Get instant notifications on ticket status changes</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Private</h3>
              <p>Your data is protected with industry-standard security</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Login Page
const LoginPage = ({ onNavigate, onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (formData.email === 'demo@test.com' && formData.password === 'password123') {
      onLogin();
    } else {
      setToast({ message: 'Invalid credentials. Try demo@test.com / password123', type: 'error' });
    }
  };

  return (
    <div className="page auth-page">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <div className="auth-container">
        <div className="auth-card">
          <h2>Welcome Back</h2>
          <p className="auth-subtitle">Log in to manage your tickets</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  setErrors({ ...errors, email: '' });
                }}
                className={errors.email ? 'error' : ''}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && <span className="error-message" id="email-error" role="alert">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  setErrors({ ...errors, password: '' });
                }}
                className={errors.password ? 'error' : ''}
                aria-describedby={errors.password ? 'password-error' : undefined}
              />
              {errors.password && <span className="error-message" id="password-error" role="alert">{errors.password}</span>}
            </div>

            <button type="submit" className="btn btn-primary btn-full">
              Log In
            </button>
          </form>

          <p className="auth-footer">
            Don't have an account?{' '}
            <button className="link-btn" onClick={() => onNavigate('signup')}>
              Sign Up
            </button>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Signup Page
const SignupPage = ({ onNavigate, onLogin }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setToast({ message: 'Account created successfully!', type: 'success' });
    setTimeout(() => onLogin(), 1500);
  };

  return (
    <div className="page auth-page">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <div className="auth-container">
        <div className="auth-card">
          <h2>Create Account</h2>
          <p className="auth-subtitle">Join TicketFlow today</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  setErrors({ ...errors, name: '' });
                }}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message" role="alert">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  setErrors({ ...errors, email: '' });
                }}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message" role="alert">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  setErrors({ ...errors, password: '' });
                }}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-message" role="alert">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => {
                  setFormData({ ...formData, confirmPassword: e.target.value });
                  setErrors({ ...errors, confirmPassword: '' });
                }}
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <span className="error-message" role="alert">{errors.confirmPassword}</span>}
            </div>

            <button type="submit" className="btn btn-primary btn-full">
              Sign Up
            </button>
          </form>

          <p className="auth-footer">
            Already have an account?{' '}
            <button className="link-btn" onClick={() => onNavigate('login')}>
              Log In
            </button>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Dashboard
const Dashboard = () => {
  const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
  
  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    inProgress: tickets.filter(t => t.status === 'in_progress').length,
    closed: tickets.filter(t => t.status === 'closed').length,
  };

  return (
    <div className="page dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h2>Dashboard</h2>
          <p className="page-description">Overview of your ticket management system</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon total">📊</div>
            <div className="stat-content">
              <h3>Total Tickets</h3>
              <p className="stat-number">{stats.total}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon open">🟢</div>
            <div className="stat-content">
              <h3>Open Tickets</h3>
              <p className="stat-number">{stats.open}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon progress">🟡</div>
            <div className="stat-content">
              <h3>In Progress</h3>
              <p className="stat-number">{stats.inProgress}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon closed">⚫</div>
            <div className="stat-content">
              <h3>Closed Tickets</h3>
              <p className="stat-number">{stats.closed}</p>
            </div>
          </div>
        </div>

        <div className="decorative-circle circle-dashboard-1"></div>
        <div className="decorative-circle circle-dashboard-2"></div>
      </div>

      <Footer />
    </div>
  );
};

// Ticket Management
const TicketsPage = ({ onNavigate }) => {
  const [tickets, setTickets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', status: 'open', priority: 'medium' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    setTickets(savedTickets);
  }, []);

  const saveTickets = (newTickets) => {
    localStorage.setItem('tickets', JSON.stringify(newTickets));
    setTickets(newTickets);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    else if (formData.title.trim().length < 3) newErrors.title = 'Title must be at least 3 characters';
    
    if (!['open', 'in_progress', 'closed'].includes(formData.status)) {
      newErrors.status = 'Status must be: open, in_progress, or closed';
    }
    
    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (editingTicket) {
      const updated = tickets.map(t => 
        t.id === editingTicket.id ? { ...formData, id: t.id, createdAt: t.createdAt } : t
      );
      saveTickets(updated);
      setToast({ message: 'Ticket updated successfully!', type: 'success' });
    } else {
      const newTicket = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };
      saveTickets([...tickets, newTicket]);
      setToast({ message: 'Ticket created successfully!', type: 'success' });
    }

    resetForm();
  };

  const handleEdit = (ticket) => {
    setEditingTicket(ticket);
    setFormData({ title: ticket.title, description: ticket.description, status: ticket.status, priority: ticket.priority });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      saveTickets(tickets.filter(t => t.id !== id));
      setToast({ message: 'Ticket deleted successfully!', type: 'success' });
    }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', status: 'open', priority: 'medium' });
    setEditingTicket(null);
    setShowModal(false);
    setErrors({});
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'open': return 'status-open';
      case 'in_progress': return 'status-progress';
      case 'closed': return 'status-closed';
      default: return '';
    }
  };

  return (
    <div className="page tickets-page">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="container">
        <div className="tickets-header">
          <div>
            <h2>Ticket Management</h2>
            <p className="page-description">Create, view, edit, and manage all your tickets</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={18} />
            New Ticket
          </button>
        </div>

        {tickets.length === 0 ? (
          <div className="empty-state">
            <Ticket size={64} />
            <h3>No tickets yet</h3>
            <p>Create your first ticket to get started</p>
          </div>
        ) : (
          <div className="tickets-grid">
            {tickets.map(ticket => (
              <div key={ticket.id} className="ticket-card">
                <div className="ticket-header">
                  <h3>{ticket.title}</h3>
                  <span className={`status-badge ${getStatusClass(ticket.status)}`}>
                    {ticket.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="ticket-description">{ticket.description || 'No description'}</p>
                <div className="ticket-meta">
                  <span className="priority">Priority: {ticket.priority}</span>
                  <span className="date">{new Date(ticket.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="ticket-actions">
                  <button className="btn-icon" onClick={() => handleEdit(ticket)} title="Edit" aria-label="Edit ticket">
                    <Edit2 size={18} />
                  </button>
                  <button className="btn-icon delete" onClick={() => handleDelete(ticket.id)} title="Delete" aria-label="Delete ticket">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={resetForm}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingTicket ? 'Edit Ticket' : 'Create New Ticket'}</h3>
              <button className="btn-icon" onClick={resetForm} aria-label="Close modal">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title *</label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                    setErrors({ ...errors, title: '' });
                  }}
                  className={errors.title ? 'error' : ''}
                  aria-describedby={errors.title ? 'title-error' : undefined}
                />
                {errors.title && <span className="error-message" id="title-error" role="alert">{errors.title}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value });
                    setErrors({ ...errors, description: '' });
                  }}
                  rows="4"
                  className={errors.description ? 'error' : ''}
                  aria-describedby={errors.description ? 'description-error' : undefined}
                />
                {errors.description && <span className="error-message" id="description-error" role="alert">{errors.description}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="status">Status *</label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => {
                      setFormData({ ...formData, status: e.target.value });
                      setErrors({ ...errors, status: '' });
                    }}
                    className={errors.status ? 'error' : ''}
                    aria-describedby={errors.status ? 'status-error' : undefined}
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="closed">Closed</option>
                  </select>
                  {errors.status && <span className="error-message" id="status-error" role="alert">{errors.status}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="priority">Priority</label>
                  <select
                    id="priority"
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={resetForm}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingTicket ? 'Update' : 'Create'} Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

// Main App Component
export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('ticketapp_session');
    if (session) {
      setIsAuthenticated(true);
      setCurrentPage('dashboard');
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem('ticketapp_session', JSON.stringify({ user: 'demo', timestamp: Date.now() }));
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('ticketapp_session');
      setIsAuthenticated(false);
      setCurrentPage('landing');
    }
  };

  const handleNavigate = (page) => {
    if (['dashboard', 'tickets'].includes(page) && !isAuthenticated) {
      setCurrentPage('login');
      return;
    }
    setCurrentPage(page);
  };

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        
        .page { min-height: 100vh; display: flex; flex-direction: column; }
        
        .container { max-width: 1440px; margin: 0 auto; padding: 0 2rem; width: 100%; }
        
        /* Navbar Styles */
        .navbar { background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1); padding: 1rem 0; position: sticky; top: 0; z-index: 100; }
        
        .navbar-content { display: flex; justify-content: space-between; align-items: center; }
        
        .navbar-brand { font-size: 1.5rem; font-weight: 700; color: #667eea; cursor: pointer; transition: color 0.3s; }
        
        .navbar-brand:hover { color: #5a67d8; }
        
        .navbar-links { display: flex; gap: 1rem; align-items: center; }
        
        .nav-link { background: none; border: none; color: #4a5568; cursor: pointer; font-size: 1rem; font-weight: 500; padding: 0.5rem 1rem; transition: color 0.3s; position: relative; }
        
        .nav-link:hover { color: #667eea; }
        
        .nav-link.active { color: #667eea; }
        
        .nav-link.active::after { content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 60%; height: 2px; background: #667eea; }
        
        .mobile-menu-btn { display: none; background: none; border: none; cursor: pointer; padding: 0.5rem; color: #4a5568; }
        
        .mobile-menu { display: none; }
        
        /* Mobile Menu */
        @media (max-width: 768px) {
          .navbar-links { display: none; }
          
          .mobile-menu-btn { display: block; }
          
          .mobile-menu { display: flex; flex-direction: column; gap: 0.5rem; padding: 1rem 0; border-top: 1px solid #e2e8f0; margin-top: 1rem; }
          
          .mobile-nav-link { background: none; border: none; padding: 1rem; text-align: left; font-size: 1rem; color: #4a5568; cursor: pointer; border-radius: 8px; transition: background 0.3s; display: flex; align-items: center; gap: 0.5rem; }
          
          .mobile-nav-link:hover { background: #f7fafc; }
          
          .mobile-nav-link.active { background: #667eea; color: white; }
          
          .mobile-nav-link.logout { color: #e53e3e; }
        }
        
        /* Hero Section */
        .hero { position: relative; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 8rem 0 12rem; overflow: hidden; }
        
        .hero-content { position: relative; z-index: 2; text-align: center; }
        
        .hero-title { font-size: 4rem; font-weight: 700; margin-bottom: 1rem; }
        
        .hero-subtitle { font-size: 1.5rem; margin-bottom: 2rem; opacity: 0.9; }
        
        .hero-buttons { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
        
        .wave { position: absolute; bottom: 0; left: 0; width: 100%; height: 150px; color: white; }
        
        /* Decorative Circles */
        .decorative-circle { position: absolute; border-radius: 50%; opacity: 0.1; background: white; }
        
        .circle-1 { width: 300px; height: 300px; top: 10%; right: 10%; }
        
        .circle-2 { width: 200px; height: 200px; bottom: 20%; left: 5%; }
        
        .circle-dashboard-1 { width: 150px; height: 150px; top: 20%; right: 5%; background: #667eea; }
        
        .circle-dashboard-2 { width: 100px; height: 100px; bottom: 30%; left: 10%; background: #764ba2; }
        
        /* Buttons */
        .btn { padding: 0.75rem 1.5rem; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s; display: inline-flex; align-items: center; gap: 0.5rem; font-family: inherit; }
        
        .btn-primary { background: #667eea; color: white; }
        
        .btn-primary:hover { background: #5a67d8; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3); }
        
        .btn-secondary { background: white; color: #667eea; }
        
        .btn-secondary:hover { background: #f7fafc; }
        
        .btn-outline { background: transparent; border: 2px solid currentColor; color: #667eea; }
        
        .btn-outline:hover { background: rgba(102, 126, 234, 0.1); }
        
        .btn-text { background: none; border: none; color: #667eea; padding: 0.5rem 1rem; }
        
        .btn-full { width: 100%; justify-content: center; }
        
        .btn-icon { background: none; border: none; cursor: pointer; padding: 0.5rem; border-radius: 4px; color: #667eea; transition: all 0.2s; }
        
        .btn-icon:hover { background: #f7fafc; }
        
        .btn-icon.delete { color: #e53e3e; }
        
        .btn-icon.delete:hover { background: #fff5f5; }
        
        .link-btn { background: none; border: none; color: #667eea; cursor: pointer; font-weight: 600; text-decoration: underline; font-family: inherit; }
        
        /* Features Section */
        .features { padding: 5rem 0; background: white; }
        
        .section-title { font-size: 2.5rem; text-align: center; margin-bottom: 3rem; color: #2d3748; }
        
        .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
        
        .feature-card { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); text-align: center; transition: transform 0.3s; }
        
        .feature-card:hover { transform: translateY(-5px); }
        
        .feature-icon { font-size: 3rem; margin-bottom: 1rem; }
        
        .feature-card h3 { font-size: 1.5rem; margin-bottom: 0.5rem; color: #2d3748; }
        
        .feature-card p { color: #718096; }
        
        /* Auth Pages */
        .auth-page { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; flex-direction: column; flex: 1; padding: 2rem 0; }
        
        .auth-container { flex: 1; display: flex; align-items: center; justify-content: center; padding: 2rem 0; }
        
        .auth-card { background: white; padding: 3rem; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); max-width: 450px; width: 100%; }
        
        .auth-card h2 { font-size: 2rem; margin-bottom: 0.5rem; color: #2d3748; }
        
        .auth-subtitle { color: #718096; margin-bottom: 2rem; }
        
        .auth-footer { text-align: center; margin-top: 1.5rem; color: #718096; }
        
        .demo-credentials { margin-top: 1.5rem; padding: 1rem; background: #f7fafc; border-radius: 8px; font-size: 0.875rem; text-align: center; color: #4a5568; }
        
        /* Forms */
        .form-group { margin-bottom: 1.5rem; }
        
        .form-group label { display: block; font-weight: 600; margin-bottom: 0.5rem; color: #2d3748; }
        
        .form-group input, .form-group textarea, .form-group select { width: 100%; padding: 0.75rem; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 1rem; font-family: inherit; transition: all 0.2s; }
        
        .form-group input:focus, .form-group textarea:focus, .form-group select:focus { outline: none; border-color: #667eea; box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1); }
        
        .form-group input.error, .form-group textarea.error, .form-group select.error { border-color: #e53e3e; }
        
        .form-row { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        
        .error-message { color: #e53e3e; font-size: 0.875rem; margin-top: 0.25rem; display: block; }
        
        /* Dashboard */
        .dashboard-page { background: #f7fafc; }
        
        .dashboard-header { padding: 3rem 0 2rem; }
        
        .dashboard-header h2 { font-size: 2.5rem; color: #2d3748; margin-bottom: 0.5rem; }
        
        .page-description { color: #718096; font-size: 1.125rem; }
        
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-bottom: 3rem; position: relative; z-index: 1; }
        
        .stat-card { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); display: flex; gap: 1.5rem; align-items: center; transition: transform 0.3s; }
        
        .stat-card:hover { transform: translateY(-5px); box-shadow: 0 8px 30px rgba(0,0,0,0.12); }
        
        .stat-icon { font-size: 3rem; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 12px; flex-shrink: 0; }
        
        .stat-icon.total { background: #e6f2ff; }
        .stat-icon.open { background: #d4f4dd; }
        .stat-icon.progress { background: #fff4cc; }
        .stat-icon.closed { background: #e2e8f0; }
        
        .stat-content h3 { font-size: 1rem; color: #718096; margin-bottom: 0.25rem; font-weight: 600; }
        
        .stat-number { font-size: 2.5rem; font-weight: 700; color: #2d3748; }
        
        /* Tickets Page */
        .tickets-page { background: #f7fafc; }
        
        .tickets-header { display: flex; justify-content: space-between; align-items: center; padding: 3rem 0 2rem; flex-wrap: wrap; gap: 1rem; }
        
        .tickets-header h2 { font-size: 2.5rem; color: #2d3748; margin-bottom: 0.5rem; }
        
        .tickets-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 1.5rem; padding-bottom: 3rem; }
        
        .ticket-card { background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); transition: all 0.3s; position: relative; }
        
        .ticket-card:hover { transform: translateY(-5px); box-shadow: 0 8px 25px rgba(0,0,0,0.12); }
        
        .ticket-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem; gap: 1rem; }
        
        .ticket-header h3 { font-size: 1.25rem; color: #2d3748; margin: 0; flex: 1; word-break: break-word; }
        
        .status-badge { padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem; font-weight: 600; text-transform: capitalize; white-space: nowrap; }
        
        .status-open { background: #d4f4dd; color: #22543d; }
        .status-progress { background: #fff4cc; color: #975a16; }
        .status-closed { background: #e2e8f0; color: #2d3748; }
        
        .ticket-description { color: #718096; margin-bottom: 1rem; line-height: 1.6; }
        
        .ticket-meta { display: flex; justify-content: space-between; align-items: center; font-size: 0.875rem; color: #718096; margin-bottom: 1rem; padding-top: 1rem; border-top: 1px solid #e2e8f0; }
        
        .priority { text-transform: capitalize; font-weight: 600; }
        
        .ticket-actions { display: flex; gap: 0.5rem; justify-content: flex-end; }
        
        .empty-state { text-align: center; padding: 5rem 2rem; color: #718096; }
        
        .empty-state svg { margin-bottom: 1rem; color: #cbd5e0; }
        
        .empty-state h3 { font-size: 1.5rem; color: #2d3748; margin-bottom: 0.5rem; }
        
        /* Modal */
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1rem; }
        
        .modal { background: white; border-radius: 16px; max-width: 600px; width: 100%; max-height: 90vh; overflow-y: auto; }
        
        .modal-header { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem; border-bottom: 1px solid #e2e8f0; }
        
        .modal-header h3 { font-size: 1.5rem; color: #2d3748; margin: 0; }
        
        .modal form { padding: 1.5rem; }
        
        .modal-actions { display: flex; gap: 1rem; justify-content: flex-end; padding-top: 1rem; border-top: 1px solid #e2e8f0; margin-top: 1rem; }
        
        /* Toast */
        .toast { position: fixed; top: 2rem; right: 2rem; background: white; padding: 1rem 1.5rem; border-radius: 8px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); display: flex; align-items: center; gap: 0.75rem; z-index: 2000; animation: slideIn 0.3s ease; min-width: 300px; }
        
        @keyframes slideIn { from { transform: translateX(400px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        
        .toast.success { border-left: 4px solid #48bb78; }
        .toast.error { border-left: 4px solid #e53e3e; }
        
        .toast-close { background: none; border: none; cursor: pointer; padding: 0.25rem; margin-left: auto; color: #718096; }
        
        .toast-close:hover { color: #2d3748; }
        
        /* Footer */
        .footer { background: #2d3748; color: white; padding: 2rem 0; margin-top: auto; text-align: center; }
        
        .footer p { margin: 0.25rem 0; opacity: 0.8; font-size: 0.875rem; }
        
        /* Responsive */
        @media (max-width: 768px) {
          .hero-title { font-size: 2.5rem; }
          .hero-subtitle { font-size: 1.2rem; }
          .hero { padding: 5rem 0 8rem; }
          .container { padding: 0 1rem; }
          .feature-grid { grid-template-columns: 1fr; }
          .stats-grid { grid-template-columns: 1fr; }
          .tickets-grid { grid-template-columns: 1fr; }
          .form-row { grid-template-columns: 1fr; }
          .tickets-header { flex-direction: column; align-items: stretch; }
          .tickets-header .btn { width: 100%; }
          .toast { right: 1rem; left: 1rem; min-width: auto; }
          .modal { margin: 1rem; }
          .auth-card { padding: 2rem 1.5rem; }
        }
        
        @media (max-width: 480px) {
          .hero-title { font-size: 2rem; }
          .section-title { font-size: 2rem; }
          .dashboard-header h2, .tickets-header h2 { font-size: 2rem; }
        }
      `}</style>

      <AuthContext.Provider value={{ isAuthenticated, login: handleLogin, logout: handleLogout }}>
        {currentPage !== 'landing' && (
          <Navbar 
            isAuthenticated={isAuthenticated} 
            onNavigate={handleNavigate} 
            onLogout={handleLogout}
            currentPage={currentPage}
          />
        )}
        
        {currentPage === 'landing' && <LandingPage onNavigate={handleNavigate} />}
        {currentPage === 'login' && <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} />}
        {currentPage === 'signup' && <SignupPage onNavigate={handleNavigate} onLogin={handleLogin} />}
        {currentPage === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
        {currentPage === 'tickets' && <TicketsPage onNavigate={handleNavigate} />}
      </AuthContext.Provider>
    </>
  );
}
            