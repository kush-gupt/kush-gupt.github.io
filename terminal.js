(() => {
  const output = document.getElementById("output");
  const screen = document.getElementById("screen");
  const typed = document.getElementById("typed");
  const hiddenInput = document.getElementById("hidden-input");
  const chipsBox = document.getElementById("chips");
  const PROMPT = "kush@atl:~$";

  const history = [];
  let histIdx = -1;

  const scroll = () => { screen.scrollTop = screen.scrollHeight; };

  function line(text = "", cls = "") {
    const div = document.createElement("div");
    div.className = "line " + cls;
    div.textContent = text;
    output.appendChild(div);
    scroll();
    return div;
  }

  function echo(cmd) {
    const div = document.createElement("div");
    div.className = "line cmd-echo";
    const p = document.createElement("span");
    p.className = "prompt";
    p.textContent = PROMPT + " ";
    div.appendChild(p);
    div.appendChild(document.createTextNode(cmd));
    output.appendChild(div);
    scroll();
  }

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  async function typeLines(lines, cps = 900) {
    for (const [text, cls] of lines) {
      const div = line("", cls);
      for (let i = 0; i <= text.length; i += 3) {
        div.textContent = text.slice(0, i);
        scroll();
        await sleep(1000 / cps * 3);
      }
      div.textContent = text;
    }
    scroll();
  }

  const BOOT = [
    ["loading profile ............ OK", "dim"],
    ["mounting /dev/ambition ..... OK", "dim"],
    ["", ""],
  ];

  const COMMANDS = {
    help: () => [
      ["available commands:", "amber"],
      ["  whoami       who is this guy", ""],
      ["  experience   where he's worked", ""],
      ["  achievements talks, press, open source", ""],
      ["  education    school", ""],
      ["  certs        alphabet soup, but earned", ""],
      ["  projects     things he's built", ""],
      ["  stack        tools of the trade", ""],
      ["  personal     the human behind the keyboard", ""],
      ["  contact      how to reach him", ""],
      ["  theme        toggle green / amber phosphor", ""],
      ["  clear        wipe the screen", ""],
      ["", ""],
    ],
    whoami: () => [
      ["Kushal Gupta — everyone calls me Kush.", "white"],
      ["Solutions Architect @ Databricks", ""],
      ["Federal Civilian team. Data + AI for government agencies.", "dim"],
      ["Atlanta, GA · linkedin.com/in/kushsgupta", "dim"],
      ["", ""],
    ],
    experience: () => [
      ["2026 – now    Solutions Architect, Databricks", "white"],
      ["              Pre-sales. Federal Civilian.", "dim"],
      ["              Data + AI for government agencies. Started July 2026.", "dim"],
      ["", ""],
      ["2021 – 2026   Solutions Architect, Red Hat", "white"],
      ["              First job out of college. Five years.", "dim"],
      ["              DOE team — HPC, science & space on OpenShift.", "dim"],
      ["              Helped NASA test AI for deep space missions.", "dim"],
      ["              National lab supercomputing (LLNL).", "dim"],
      ["", ""],
    ],
    achievements: () => [
      ["talks & stages", "amber"],
      ["  Flight Software Workshop     Edge AI inferencing: llama.cpp vs vLLM", ""],
      ["  HPSF Conference 2026         bootc + OpenCHAMI", ""],
      ["  CANOPIE-HPC Workshop @ SC25  presenter", ""],
      ["  NLIT Summit '25              Open source AI training with OSTI data", ""],
      ["  Red Hat/Dynatrace/Intel      AI-driven observability webinar", ""],
      ["", ""],
      ["media & writing", "amber"],
      ["  Federal News Network         'Building AI that works in government'", ""],
      ["  Red Hat blog                 RHEL in the cloud: PAYG vs BYOS", ""],
      ["  Red Hat blog                 Identity management + SSO", ""],
      ["  'AI-First Research Platform' acknowledged expert contributor", ""],
      ["", ""],
      ["open source & community", "amber"],
      ["  RamaLama                     17 PRs merged · 43 commits", ""],
      ["    MLX runtime                Apple Silicon inference support", "dim"],
      ["    model formats              safetensors-only repos, --gguf convert", "dim"],
      ["    caching + CI               HuggingFace/Ollama cache, system tests", "dim"],
      ["    vllm-cpu-arm               own container image for ARM CPUs", "dim"],
      ["  Minority Programmers Assoc.  organized 2020 #BLM hackathon", ""],
      ["", ""],
    ],
    education: () => [
      ["James Madison University", "white"],
      ["", ""],
    ],
    certs: () => [
      ["Red Hat Certified Architect (RHCA)", ""],
      ["Red Hat Certified Engineer (RHCE)", ""],
      ["Red Hat Certified System Administrator (RHCSA)", ""],
      ["Red Hat OpenShift Administration", ""],
      ["Red Hat OpenShift Development", ""],
      ["Advanced Automation with Ansible", ""],
      ["Containers, Kubernetes & OpenShift", ""],
      ["Microsoft Azure Fundamentals", ""],
      ["Microsoft Azure Administrator", ""],
      ["", ""],
    ],
    projects: () => [
      ["alexa-skills/              7 skills published since 2017", "white"],
      ["  └─ kush-roast           ~30 weekly users, 300+ sessions/week", "dim"],
      ["github.com/kush-gupt      64 public repos and counting", "white"],
      ["", ""],
    ],
    stack: () => [
      ["Kubernetes · OpenShift · Ansible · Databricks", ""],
      ["Python · Go · Bash · Terraform", "dim"],
      ["", ""],
    ],
    personal: () => [
      ["fiancée ..... Kate", ""],
      ["dog ......... Ted (20 lbs of opinions)", ""],
      ["fuel ........ DoorDash, Delta SkyMiles", "dim"],
      ["status ...... wedding loading… ████████░░ 80%", "amber"],
      ["", ""],
    ],
    contact: () => [
      ["github      github.com/kush-gupt", "white"],
      ["linkedin    linkedin.com/in/kushsgupta", "white"],
      ["", ""],
    ],
    date: () => [[new Date().toString(), ""] , ["", ""]],
    uptime: () => [["up 26 years, 0 crashes that mattered", ""], ["", ""]],
    ls: () => [
      ["whoami  experience  education  certs", ""],
      ["projects  stack  personal  contact", ""],
      ["", ""],
    ],
    sudo: () => [["[sudo] nice try.", "red"], ["", ""]],
    vim: () => [["you don't exit vim. vim exits you.", "dim"], ["", ""]],
    exit: () => [["logout… just kidding. there's no escape.", "dim"], ["", ""]],
    quit: () => [["logout… just kidding. there's no escape.", "dim"], ["", ""]],
  };

  const CHIPS = ["whoami", "experience", "achievements", "certs", "projects", "personal", "contact", "help"];

  function run(raw) {
    const cmd = raw.trim().toLowerCase();
    echo(raw.trim());
    if (!cmd) return;
    history.unshift(raw.trim());
    histIdx = -1;

    if (cmd === "clear") { output.innerHTML = ""; return; }
    if (cmd.startsWith("theme")) {
      const cur = getComputedStyle(document.documentElement).getPropertyValue("--green").trim();
      const root = document.documentElement.style;
      if (cur === "#33ff66") {
        root.setProperty("--green", "#ffb000");
        root.setProperty("--dim-green", "#8f5f1a");
        line("phosphor: amber", "amber");
      } else {
        root.setProperty("--green", "#33ff66");
        root.setProperty("--dim-green", "#1a8f3c");
        line("phosphor: green", "");
      }
      line("", "");
      return;
    }
    if (cmd.startsWith("cat ")) {
      const target = cmd.slice(4).trim();
      if (COMMANDS[target]) { COMMANDS[target]().forEach(([t, c]) => line(t, c)); }
      else line(`cat: ${target}: No such file`, "red");
      line("", "");
      return;
    }
    const fn = COMMANDS[cmd];
    if (fn) fn().forEach(([t, c]) => line(t, c));
    else {
      line(`command not found: ${cmd}`, "red");
      line("type 'help' for available commands", "dim");
      line("", "");
    }
  }

  // input wiring
  hiddenInput.addEventListener("input", () => { typed.textContent = hiddenInput.value; });
  hiddenInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const v = hiddenInput.value;
      hiddenInput.value = "";
      typed.textContent = "";
      run(v);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (histIdx < history.length - 1) {
        histIdx++;
        hiddenInput.value = history[histIdx] || "";
        typed.textContent = hiddenInput.value;
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx > 0) {
        histIdx--;
        hiddenInput.value = history[histIdx];
        typed.textContent = hiddenInput.value;
      } else {
        histIdx = -1;
        hiddenInput.value = "";
        typed.textContent = "";
      }
    }
  });

  screen.addEventListener("click", () => hiddenInput.focus());
  document.getElementById("window").addEventListener("click", (e) => {
    if (!e.target.classList.contains("chip")) hiddenInput.focus();
  });

  CHIPS.forEach(c => {
    const b = document.createElement("button");
    b.className = "chip";
    b.textContent = c;
    b.addEventListener("click", () => run(c));
    chipsBox.appendChild(b);
  });

  // boot
  (async () => {
    await typeLines(BOOT, 1400);
    await sleep(250);
    echo("whoami");
    COMMANDS.whoami().forEach(([t, c]) => line(t, c));
    line("type 'help' to poke around", "dim");
    line("", "");
    hiddenInput.focus();
  })();
})();
