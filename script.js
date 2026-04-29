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
          label: "Clarify what you're noticing",
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
   DOM REFERENCES
================================ */

const roleSection = document.getElementById("roleSelect");
const game = document.getElementById("game");
const originalGameHTML = game.innerHTML;

let feedbackText, choices, counter, result, nextBtn;
const bars = {};

/* ===============================
   ROLE SELECTION
================================ */

function setRole(selectedRole) {
  role = selectedRole;
  index = 0;

  roleSection.style.display = "none";
  game.classList.add("active");

  document.getElementById("roleBadge").textContent =
    role === "manager" ? "Manager Path" : "Peer Path";

  hookElements();
  loadItem();
}

/* ===============================
   INIT / HOOK
================================ */

function hookElements() {
  feedbackText = document.getElementById("feedbackText");
  choices = document.getElementById("choices");
  counter = document.getElementById("counter");
  result = document.getElementById("result");
  nextBtn = document.getElementById("next");

  bars.clarity = document.getElementById("clarity");
  bars.action = document.getElementById("action");
  bars.tone = document.getElementById("tone");

  nextBtn.onclick = nextHandler;
}

/* ===============================
   LOAD ITEM
================================ */

function loadItem() {
  counter.textContent = `Item ${index + 1} of ${items.length}`;
  feedbackText.textContent = `“${items[index].text}”`;

  result.style.display = "none";
  nextBtn.disabled = true;

  Object.keys(bars).forEach(
    key => (bars[key].style.width = baseMeter[key] + "%")
  );

  choices.innerHTML = "";

  items[index].fixes[role].forEach(fix => {
    const el = document.createElement("div");
    el.className = "choice";
    el.textContent = fix.label;
    el.onclick = () => selectFix(fix, el);
    choices.appendChild(el);
  });
}

/* ===============================
   SELECT FIX
================================ */

function selectFix(fix, element) {
  document
    .querySelectorAll(".choice")
    .forEach(c => c.classList.remove("selected"));

  element.classList.add("selected");

  bars[fix.impact].style.width = "85%";

  result.style.display = "block";
  result.innerHTML = `
    <strong>
      ${role === "manager" ? "Manager" : "Peer"} version of the feedback:
    </strong>
    <p>${fix.full}</p>
  `;

  nextBtn.disabled = false;
}

/* ===============================
   NEXT / COMPLETE
================================ */

function nextHandler() {
  index++;
  if (index < items.length) {
    loadItem();
  } else {
    showCompletionScreen();
  }
}

/* ===============================
   COMPLETION + REPLAY
================================ */

function showCompletionScreen() {
  const otherRole = role === "manager" ? "peer" : "manager";
  const otherRoleLabel = otherRole === "manager" ? "Manager" : "Peer";

  game.innerHTML = `
    <div class="card">
      <h2>✅ Completed</h2>
      <p>
        You practiced improving feedback using the
        <strong>${role === "manager" ? "Manager" : "Peer"}</strong> lens.
      </p>

      <button onclick="resetGame('${otherRole}')">
        🔁 Replay as ${otherRoleLabel}
      </button>
    </div>
  `;
}

/* ===============================
   RESET GAME
================================ */

function resetGame(newRole) {
  role = newRole;
  index = 0;

  game.innerHTML = originalGameHTML;
  game.classList.add("active");

  hookElements();

  document.getElementById("roleBadge").textContent =
    role === "manager" ? "Manager Path" : "Peer Path";

  loadItem();
}
