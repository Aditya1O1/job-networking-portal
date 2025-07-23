const jobContainer = document.getElementById('jobContainer');
const skillInput = document.getElementById('skillInput');
const searchBtn = document.getElementById('searchSkillBtn');
const clearBtn = document.getElementById('clearSkillBtn');

async function fetchJobs(skill = '') {
  try {
    let url = 'http://localhost:5000/api/jobs';
    if (skill && skill.trim() !== '') {
      url += `?skill=${encodeURIComponent(skill.trim())}`;
    }

    const res = await fetch(url);
    const jobs = await res.json();
    jobContainer.innerHTML = '';

    if (!jobs.length) {
      jobContainer.innerHTML = '<p>No jobs found.</p>';
      return;
    }

    jobs.forEach(job => {
      const jobDiv = document.createElement('div');
      jobDiv.className = 'job-card';

      jobDiv.innerHTML = `
        <div class="job-title">${job.title}</div>
        <div class="job-description">${job.description}</div>
        <div class="job-skills">
          ${job.skills.map(skill => `<span>${skill}</span>`).join(' ')}
        </div>
        <div class="job-budget">💰 Budget: ₹${job.budget}</div>
      `;

      jobContainer.appendChild(jobDiv);
    });
  } catch (err) {
    jobContainer.innerHTML = '<p>Error loading jobs. Please check the console.</p>';
    console.error(err);
  }
}

// Event listeners for search & clear
searchBtn.addEventListener('click', () => {
  const skill = skillInput.value;
  fetchJobs(skill);
});

clearBtn.addEventListener('click', () => {
  skillInput.value = '';
  fetchJobs();
});

// Initial load
fetchJobs();
