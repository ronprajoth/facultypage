const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

// Serve main HTML
app.get('/', (req, res) => {
  res.sendFile(require('path').join(__dirname, 'cia3.html'));
});

// Faculty database
const facultyData = {
  'bharath@gmail.com': {
    password: 'beeps',
    name: 'Dr. JYOTHI MANDALA',
    qualification: 'BTech, MTech, PhD',
    designation: 'Professor',
    joinDate: '22nd March 1989',
    email: 'bharath@gmail.com',
    supervisor: 'Dr. Harsha Vardhan YM',
    linkedin: 'https://linkedin.com/in/jyothi',
    qualifications: [
      'BTech (PSG College of Technology)',
      'MTech (PSG College of Technology)',
      'Ph.D. Computer Science Engineering'
    ],
    research: ['Cybersecurity', 'Cryptography', 'OOP'],
    expertise: ['Software Engineering', 'Design Thinking']
  },

  'bejoy@christuniversity.in': {
    password: 'password123',
    name: 'Dr. Bejoy B J',
    qualification: 'BTech, PhD',
    designation: 'Associate Professor',
    joinDate: '15th August 2005',
    email: 'bejoy@christuniversity.in',
    supervisor: 'Dr. Xavier P',
    linkedin: 'https://linkedin.com/in/bejoy',
    qualifications: [
      'BTech (IIT Madras)',
      'PhD (Christ University)'
    ],
    research: ['Artificial Intelligence', 'Machine Learning'],
    expertise: ['Data Science', 'Programming']
  },

  'deepa@christuniversity.in': {
    password: 'password123',
    name: 'Dr. Deepa Yogesh',
    qualification: 'MTech, PhD',
    designation: 'Assistant Professor',
    joinDate: '1st January 2010',
    email: 'deepa@christuniversity.in',
    supervisor: 'Dr. Suma L',
    linkedin: 'https://linkedin.com/in/deepa',
    qualifications: [
      'MTech (RV College of Engineering)',
      'PhD (VTU)'
    ],
    research: ['Cloud Computing', 'Network Security'],
    expertise: ['Cybersecurity', 'Database Management']
  },

  'daniel@christuniversity.in': {
    password: 'password123',
    name: 'Dr. Daniel D',
    qualification: 'BSc, MSc, PhD',
    designation: 'Lecturer',
    joinDate: '10th September 2018',
    email: 'daniel@christuniversity.in',
    supervisor: 'Dr. Kiran K',
    linkedin: 'https://linkedin.com/in/daniel',
    qualifications: [
      'BSc (Christ University)',
      'MSc (Christ University)',
      'PhD (Christ University)'
    ],
    research: ['Software Engineering', 'Human-Computer Interaction'],
    expertise: ['Web Development', 'UI/UX']
  }
};

// Login API
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = facultyData[email];

  if (!user || user.password !== password) {
    return res.json({ success: false, message: 'Invalid email or password' });
  }

  const { password: _, ...userData } = user; // exclude password
  res.json({ success: true, user: userData });
});

// Faculty details API
app.get('/faculty/:email', (req, res) => {
  const email = req.params.email;
  const user = facultyData[email];

  if (!user) {
    return res.status(404).json({ error: 'Faculty not found' });
  }

  const { password: _, ...userData } = user; // exclude password
  res.json(userData);
});

// Faculty list API (without passwords)
app.get('/faculty', (req, res) => {
  const list = Object.values(facultyData).map(({ password, ...rest }) => rest);
  res.json(list);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
