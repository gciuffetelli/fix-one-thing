const items = [
  {
    text: "You need to be more proactive.",
    fixes: [
      { label: "Add a specific example", impact: "clarity", model: "In the last two team meetings, you didn’t share updates unless prompted." },
      { label: "Clarify what 'proactive' means", impact: "clarity", model: "By proactive, I mean sharing updates before being asked." },
      { label: "Add a clear next step", impact: "action", model: "Please bring at least one update to each meeting going forward." },
      { label: "Soften the tone", impact: "tone", model: "I want to share some feedback that can help you be more proactive." }
    ]
  },
  {
    text: "Your attitude in meetings hasn’t been great.",
    fixes: [
      { label: "Describe observable behavior", impact: "clarity", model: "In yesterday’s meeting, you interrupted twice while others were speaking." },
      { label: "Remove judgmental language", impact: "tone", model: "I want to focus on something I noticed in meetings." },
      { label: "Add impact", impact: "action", model: "This makes it harder for the team to fully share ideas." },
      { label: "Add next steps", impact: "action", model: "Please allow others to finish before responding." }
    ]
  },
  {
    text: "Good job overall, but try harder next time.",
    fixes: [
      { label: "Be more specific", impact: "clarity", model: "You handled the client questions clearly and calmly." },
      { label: "Add a concrete improvement", impact: "action", model: "Next time, include one data point to support your recommendation." },
      { label: "Remove vague praise", impact: "clarity", model: "I want to focus on one specific strength and one area to improve." },
      { label: "Strengthen tone", impact: "tone", model: "This feedback is meant to support your growth." }
    ]
  },
  {
    text: "You didn’t prepare enough for today.",
    fixes: [
      { label: "Add an example", impact: "clarity", model: "You hadn’t reviewed the agenda or pulled the requested data." },
      { label: "Avoid assumptions", impact: "tone", model: "I want to talk about today’s preparation." },
      { label: "Explain impact", impact: "action", model: "This delayed the conversation and required follow-up work." },
      { label: "Add expectation", impact: "action", model: "Please review the agenda and data requests beforehand." }
    ]
  },
  {
    text: "Be more confident when presenting.",
    fixes: [
      { label: "Focus on behavior", impact: "clarity", model: "You spoke quietly and didn’t make eye contact during the presentation." },
      { label: "Make it actionable", impact: "action", model: "Try pausing and projecting your voice when sharing key points." },
      { label: "Remove personality labels", impact: "tone", model: "Let’s talk about how the presentation came across." },
      { label: "Add encouragement", impact: "tone", model: "You had strong content, and this will help it land better." }
    ]
  }
];

let index = 0;
let baseMeter = { clarity: 30, action: 30, tone: 30 };

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

function loadItem() {
  const item = items[index];
  counter.textContent = `Item ${index + 1} of ${items.length}`;
  feedbackText.textContent = `“${item.text}”`;
  result.classList.add("hidden");
  nextBtn.disabled = true;

  Object.keys(bars).forEach(k => bars[k].style.width = baseMeter[k] + "%");

  choices.innerHTML = "";
  item.fixes.forEach(fix => {
    const btn = document.createElement("div");
    btn.className = "choice";
    btn.textContent = fix.label;
    btn.onclick = () => selectFix(fix, btn);
    choices.appendChild(btn);
  });
}

function selectFix(fix, btn) {
  document.querySelectorAll(".choice").forEach(c => c.classList.remove("selected"));
  btn.classList.add("selected");

  bars[fix.impact].style.width = "85%";

  result.classList.remove("hidden");
  result.innerHTML = `
    <strong>Nice choice.</strong>
    <p>This improves <strong>${fix.impact}</strong>.</p>
    <p><em>Example improvement:</em><br/>${fix.model}</p>
  `;

  nextBtn.disabled = false;
}

nextBtn.onclick = () => {
  index++;
  if (index < items.length) {
    loadItem();
  } else {
    document.querySelector("main").innerHTML = `
      <h1>✅ Completed</h1>
      <p>You practiced prioritizing the most impactful feedback improvements.</p>
      <p><strong>Key skill:</strong> Fixing the right thing first.</p>
    `;
  }
};

loadItem();
