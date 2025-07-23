const form = document.getElementById('profileForm');
const msg = document.getElementById('msg');
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user') || '{}');

// Redirect if not logged in
if (!token) {
  msg.textContent = "You must be logged in to edit your profile.";
  form.querySelector('button[type="submit"]').disabled = true;
}

// Prefill name if available
if (user.name) {
  document.getElementById('name').value = user.name;
}

// Load existing profile from backend
async function loadProfile() {
  try {
    const res = await fetch('http://localhost:5000/api/profile', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    if (!res.ok) return;
    const data = await res.json();

    if (data.profile) {
      document.getElementById('bio').value = data.profile.bio || '';
      document.getElementById('linkedin').value = data.profile.linkedin || '';
      document.getElementById('wallet').value = data.profile.walletAddress || '';
      document.getElementById('skills').value =
        data.profile.skills?.join(', ') || '';
    }
  } catch (e) {
    console.error("Error loading profile:", e);
  }
}
loadProfile();

// Save profile handler
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  msg.textContent = '';

  const name = document.getElementById('name').value.trim();
  const bio = document.getElementById('bio').value.trim();
  const linkedin = document.getElementById('linkedin').value.trim();
  const walletAddress = document.getElementById('wallet').value.trim();
  const skills = document.getElementById('skills').value
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  if (!name) {
    msg.textContent = "Name is required.";
    msg.classList.remove('success');
    msg.classList.add('msg');
    return;
  }

  try {
    const res = await fetch('http://localhost:5000/api/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ name, bio, linkedin, walletAddress, skills })
    });

    const data = await res.json();
    if (res.ok) {
      msg.textContent = "Profile saved successfully!";
      msg.classList.add('success');
      localStorage.setItem('user', JSON.stringify({ ...user, name }));
    } else {
      msg.textContent = data.error || 'Profile update failed.';
      msg.classList.remove('success');
    }
  } catch (err) {
    console.error(err);
    msg.textContent = "Error updating profile.";
    msg.classList.remove('success');
  }
});

// 🧠 AI Skill Suggestion Button Logic
document.getElementById('suggestBtn').addEventListener('click', () => {
  const bio = document.getElementById('bio').value.toLowerCase();

  const skillKeywords = [
    "javascript", "react", "next.js", "vue", "node.js", "express",
    "python", "django", "flask", "java", "spring", "html", "css",
    "tailwind", "mongodb", "mysql", "postgres", "sql",
    "solidity", "web3.js", "ethers.js", "blockchain", "ai",
    "ml", "nlp", "aws", "firebase", "devops", "docker", "kubernetes", "git"
  ];

  const suggestedSkills = skillKeywords.filter(skill =>
    bio.includes(skill)
  );

  const skillsInput = document.getElementById('skills');
  const existingSkills = skillsInput.value
    .split(',')
    .map(s => s.trim().toLowerCase())
    .filter(Boolean);

  const combinedSkills = Array.from(
    new Set([...existingSkills, ...suggestedSkills])
  ).sort();

  skillsInput.value = combinedSkills.join(', ');
  msg.textContent = "✅ Suggested skills from bio added.";
  msg.classList.add('success');
});
