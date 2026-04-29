let role = null;
let index = 0;

const baseMeter = { clarity: 30, action: 30, tone: 30 };

const items = [
  {
    text: "You need to be more proactive.",
    fixes: {
      manager: [
        {
          label: "Add a clear expectation",
          impact: "action",
          full: "I’ve noticed that in recent meetings, you wait to be prompted before sharing updates. Going forward, I’d like you to proactively bring updates to each meeting."
        },
        {
          label: "Add a specific example",
          impact: "clarity",
          full: "In the last two team meetings, you didn’t share progress updates unless asked. That’s what I mean by being proactive."
        }
      ],
      peer: [
        {
          label: "Clarify what you’re noticing",
          impact: "clarity",
          full: "I’ve noticed that in meetings, updates usually come only after someone asks. I wanted to share that observation with you."
        },
        {
          label: "Soften the tone",
          impact: "tone",
          full: "I want to share some feedback from my perspective, with the goal of helping our meetings run more smoothly."
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
          full: "In yesterday’s meeting, you interrupted twice while others were speaking, which impacted the discussion."
        }
      ],
      peer: [
        {
          label: "Remove judgment and describe impact",
          impact: "tone",
          full: "During yesterday’s meeting, interruptions made it harder for the group to hear everyone’s ideas."
        }
      ]
    }
  }
];

const roleSection = document.getElementById("roleSelect");
const game = document.getElementById("game");
const feedbackText = document.getElementById("feedbackText");
const choices = document.getElementById("choices");
const counter = document.getElementById("counter");
const result = document.getElementById("result");
const nextBtn = document.getElementById("next");

const bars = {
  clarity: document.getElementById("clarity"),
  action: document.getElementById("action"),
  tone: document.getElementById("tone")
};

function setRole(r) {
  role = r;
  roleSection.classList.add("hidden");
  game.classList.remove("hidden");
  loadItem();
}

function loadItem() {
  counter.textContent = `Item ${index + 1} of ${items.length}`;
  feedbackText.textContent = `“${items[index].text}”`;
  result.classList.add("hidden");
  nextBtn.disabled = true;

  Object.keys(bars).forEach(k => bars[k].style.width = baseMeter[k] + "%");

  choices.innerHTML = "";
  items[index].fixes[role].forEach(fix => {
    const c = document.createElement("div");
    c.className = "choice";
    c.textContent = fix.label;
    c.onclick = () => selectFix(fix, c);
    choices.appendChild(c);
  });
}

function selectFix(fix, el) {
  document.querySelectorAll('.choice').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');

  bars[fix.impact].style.width = "85%";

  result.classList.remove("hidden");
  result.innerHTML = `
    <strong>Updated feedback (${role === 'manager' ? 'Manager' : 'Peer'})</strong>
    <p>${fix.full}</p>
  `;

  nextBtn.disabled = false;
}

nextBtn.onclick = () => {
  index++;
  if (index < items.length) loadItem();
  else game.innerHTML = '<h2>✅ Completed</h2><p>You practiced improving feedback using the lens of your role.</p>';
};
