const ADMIN_WALLET_ADDRESS = "0x05e09F7054EE4249be59b0a552D4F79AF44e22B2";
const PLATFORM_FEE = "0.001"; // ETH (Sepolia)

let provider, signer, userWallet;
let hasPaid = false;
let walletConnecting = false;

const connectWalletBtn = document.getElementById('connectWalletBtn');
const payFeeBtn = document.getElementById('payFeeBtn');
const walletAddressSpan = document.getElementById('walletAddress');
const paymentStatus = document.getElementById('paymentStatus');
const jobForm = document.getElementById('jobForm');
const msgDiv = document.getElementById('msg');
const token = localStorage.getItem('token');

// 🔐 Block job form if not logged in
if (!token) {
  msgDiv.textContent = "You must be logged in to post a job.";
  jobForm.querySelector('button[type="submit"]').disabled = true;
}

// ✅ Check if wallet is already connected
function isWalletConnected() {
  return window.ethereum && window.ethereum.selectedAddress;
}

// 🔗 Connect Wallet Logic
connectWalletBtn.addEventListener('click', async () => {
  if (walletConnecting) {
    paymentStatus.innerText = "Please wait — MetaMask is already connecting...";
    return;
  }

  walletConnecting = true;
  connectWalletBtn.disabled = true;

  try {
    if (typeof window.ethereum === "undefined") {
      paymentStatus.innerText = "🛑 MetaMask is not installed. Please install it to continue.";
      return;
    }

    // ✅ FIXED: Initialize provider and signer even when already connected
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();

    if (isWalletConnected()) {
      userWallet = window.ethereum.selectedAddress;
      walletAddressSpan.textContent =
        `Already connected: ${userWallet.slice(0, 6)}...${userWallet.slice(-4)}`;
      payFeeBtn.disabled = false;
      paymentStatus.innerText = ""; // clear any previous warning
      return;
    }

    // Request account access if not already connected
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    userWallet = accounts[0];
    signer = provider.getSigner();

    walletAddressSpan.textContent =
      `Connected: ${userWallet.slice(0, 6)}...${userWallet.slice(-4)}`;
    payFeeBtn.disabled = false;
    paymentStatus.innerText = "";

  } catch (err) {
    paymentStatus.innerText = "❌ Failed to connect wallet. Please try again.";
    console.error('MetaMask connection error:', err);
  } finally {
    walletConnecting = false;
    connectWalletBtn.disabled = false;
  }
});

// 💸 Pay the platform fee
payFeeBtn.addEventListener('click', async () => {
  if (!signer) {
    paymentStatus.innerText = "⚠️ Please connect your MetaMask wallet first.";
    return;
  }

  try {
    paymentStatus.innerText = "🔄 Processing payment... Please confirm in MetaMask.";

    const tx = await signer.sendTransaction({
      to: ADMIN_WALLET_ADDRESS,
      value: ethers.utils.parseEther(PLATFORM_FEE),
    });

    await tx.wait(); // wait for blockchain confirmation
    hasPaid = true;
    paymentStatus.innerText = "✅ Payment successful! You can now post your job.";
    payFeeBtn.disabled = true;

  } catch (err) {
    if (err.code === 4001) {
      paymentStatus.innerText = "❌ Payment cancelled by user.";
    } else {
      paymentStatus.innerText = "❌ Payment failed. Try again.";
    }
    console.error('Payment error:', err);
  }
});

// 📝 Post job handler
jobForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!hasPaid) {
    msgDiv.textContent = "⚠️ Please pay the 0.001 ETH platform fee before posting.";
    msgDiv.classList.remove('success');
    return;
  }

  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const skills = document.getElementById('skills').value
    .split(',').map(s => s.trim()).filter(Boolean);
  const budget = +document.getElementById('budget').value;

  if (!title || !description || !skills.length || !budget) {
    msgDiv.textContent = "All fields are required.";
    msgDiv.classList.remove('success');
    return;
  }

  try {
    const res = await fetch('http://localhost:5000/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ title, description, budget, skills })
    });

    const data = await res.json();

    if (res.ok) {
      msgDiv.textContent = "✅ Job posted successfully!";
      msgDiv.classList.add('success');
      jobForm.reset();
      hasPaid = false;
      payFeeBtn.disabled = false;
    } else {
      msgDiv.textContent = data.error || "❌ Failed to post job.";
      msgDiv.classList.remove('success');
    }

  } catch (err) {
    console.error('Job post error:', err);
    msgDiv.textContent = "❌ Server error while posting job.";
    msgDiv.classList.remove('success');
  }
});
