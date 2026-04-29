/* ===============================
   STATE
================================ */

let role = null;
let index = 0;

const baseMeter = { clarity: 30, action: 30, tone: 30 };

/* ===============================
   CONTENT
================================ */

const items = [
  {
    text: "You need to be more proactive.",
    fixes: {
      manager: [
        {
          label: "Add a clear expectation",
          impact: "action",
          full:
            "I’ve noticed that in recent meetings, you wait to be prompted before sharing updates. Going forward, I’d like you to proactively bring updates to each meeting."
        },
        {
          label: "Add a specific example",
          impact: "clarity",
          full:
            "In the last two team meetings, you didn’t share progress updates unless asked. That’s what I mean by being proactive."
        }
      ],
      peer: [
        {
          label: "Clarify what you’re noticing",
          impact: "clarity",
          full:
            "I’ve noticed that in meetings, updates usually come only after someone asks. I wanted to share that observation with you."
        },
        {
          label: "Soften the tone",
          impact: "tone",
          full:
            "I want to share feedback from my perspective, with the goal of helping our meetings run more smoothly."
        }
      ]
    }
  },
  {
    text: "Your attitude in meetings isn’t great.",
    fixes: {
      manager: [
        {
          label: "Focus on observable behavior",
          impact: "clarity",
          full:
            "In yesterday’s meeting, you interrupted twice while others were speaking, which disrupted the discussion."
        }
      ],
      peer: [
        {
          label: "Remove judgment and describe impact",
          impact: "tone",
          full:
            "During yesterday’s meeting, interruptions made it harder for the group to hear everyone’s ideas."
        }
      ]
    }
  }
];

/* ===============================
   DOM ELEMENTS
================================ */

const roleSection = document.getElementById("roleSelect");
const game = document.getElementById("game");

const managerBtn = document.getElementById("managerBtn");
const peerBtn = document.getElementById("peerBtn");

const feedbackText = document.getElementById("feedbackText");
const choices = document.getElementById("choices");
const counter = document.getElementById("counter");
const result = document.getElementById("result");
const nextBtn = document.getElementById("next");

const roleBadge = document.getElementById("roleBadge");

const bars = {
  clarity: document.getElementById("clarity"),
  action: document.getElementById("action"),
  tone: document.getElementById("tone")
};

/* ===============================
   ROLE BUTTON EVENTS ✅
================================ */

managerBtn.onclick = () => startGame("manager");
peerBtn.onclick = () => startGame("peer");

/* ===============================
   START GAME
================================ */

function startGame(selectedRole) {
  role = selectedRole;
  index = 0;

  roleSection.style.display = "none";
  game.classList.add("active");
   game.style.display = "block";

  roleBadge.textContent =
    role === "manager" ? "Manager Path" : "Peer Path";

  loadItem();
}

/* ===============================
   LOAD ITEM
================================ */

function loadItem() {
  counter.textContent = `Item ${index + 1} of ${items.length}`;
  feedbackText.textContent = `“${items[index].text}”`;

  nextBtn.disabled = true;
  result.style.display = "none";

  Object.keys(bars).forEach(
    key => (bars[key].style.width = baseMeter[key] + "%")
  );

  choices.innerHTML = "";

  items[index].fixes[role].forEach(fix => {
    const el = document.createElement("div");
    el.className = "choice";
    el.textContent = fix.label;
    el.onclick = () => chooseFix(fix, el);
    choices.appendChild(el);
  });
}

/* ===============================
   FIX SELECTION
================================ */

function chooseFix(fix, el) {
  document.querySelectorAll(".choice")
    .forEach(c => c.classList.remove("selected"));

  el.classList.add("selected");

  bars[fix.impact].style.width = "85%";

  result.style.display = "block";
  result.innerHTML = `
    <strong>${role === "manager" ? "Manager" : "Peer"} version of the feedback:</strong>
    <p>${fix.full}</p>
  `;

  nextBtn.disabled = false;
}

/* ===============================
   NEXT
================================ */

nextBtn.onclick = () => {
  index++;
  if (index < items.length) {
    loadItem();
  } else {
    showCompletion();
  }
};

/* ===============================
   COMPLETE + REPLAY
================================ */

function showCompletion() {
  const otherRole = role === "manager" ? "peer" : "manager";
  const otherLabel = otherRole === "manager" ? "Manager" : "Peer";

  feedbackText.textContent = "✅ Completed";
  choices.innerHTML = `
    <p>
      You practiced improving feedback using the
      <strong>${role === "manager" ? "Manager" : "Peer"}</strong> lens.
    </p>
    <button id="replayBtn">🔁 Replay as ${otherLabel}</button>
  `;

  document.getElementById("replayBtn").onclick = () => {
    resetGame(otherRole);
  };

  nextBtn.style.display = "none";
}

