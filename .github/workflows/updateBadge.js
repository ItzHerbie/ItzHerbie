const axios = require('axios');
const fs = require('fs');
const simpleGit = require('simple-git');

const BADGE_URL = 'https://tryhackme-badges.s3.amazonaws.com/146847.png';
const BADGE_PATH = './badge.png';
const git = simpleGit();

async function updateBadge() {
  try {
    // Fetch the badge image
    const response = await axios.get(BADGE_URL, { responseType: 'arraybuffer' });
    fs.writeFileSync(BADGE_PATH, response.data);

    // Add, commit, and push the changes
    await git.add(BADGE_PATH);
    await git.commit('Update badge');
    await git.push();
    console.log('Badge updated successfully.');
  } catch (error) {
    console.error('Failed to update badge:', error);
  }
}

updateBadge();
