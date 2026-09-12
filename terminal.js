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

  function line(text = "", cls = "", url = "") {
    const div = document.createElement("div");
    div.className = "line " + cls;
    // turn leading spaces into real indent so wrapped lines align under it
    const m = text.match(/^ +/);
    if (m) {
      div.style.paddingLeft = m[0].length + "ch";
      text = text.slice(m[0].length);
    }
    if (url) {
      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = text;
      div.appendChild(a);
    } else {
      div.textContent = text;
    }
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
      ["  theme        toggle databricks / green phosphor", ""],
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
      ["[2026–now] Solutions Architect, Databricks", "white"],
      ["  Pre-sales. Federal Civilian.", "dim"],
      ["  Data + AI for government agencies.", "dim"],
      ["", ""],
      ["[2025–2026] Senior Solution Architect, Red Hat", "white"],
      ["  DOE: HPC, Linux, Kubernetes, automation, ML.", "dim"],
      ["  Helped NASA test AI for deep space missions.", "dim"],
      ["  National lab supercomputing (LLNL).", "dim"],
      ["", ""],
      ["[2023–2025] Solution Architect, Red Hat", "white"],
      ["  Civilian agencies, edge to supercomputer.", "dim"],
      ["  Open source AI: RamaLama, Docling.", "dim"],
      ["", ""],
      ["[2021–2023] Associate Solution Architect, Red Hat", "white"],
      ["  First job out of college. Trusted advisor to several civilian government agencies.", "dim"],
      ["", ""],
      ["[2020] Software Engineer Intern, Northrop Grumman", "white"],
      ["  Cloud migration, Azure zero-trust, Docker.", "dim"],
      ["", ""],
      ["[2019] Software Engineer Intern, Northrop Grumman", "white"],
      ["  Code modernization tooling, test automation.", "dim"],
      ["", ""],
      ["[2018] Team Leader, Fast Trak", "white"],
      ["  Top-50 Verizon FiOS sales rep nationwide.", "dim"],
      ["", ""],
    ],
    achievements: () => [
      ["talks & stages", "amber"],
      ["  Flight Software Workshop: Edge AI inferencing (llama.cpp vs vLLM)", "", "https://youtu.be/G1w6iS_vsZE"],
      ["  HPSF Conference 2026: bootc + OpenCHAMI", "", "https://github.com/kush-gupt/oc-image-mode"],
      ["  CANOPIE-HPC Workshop @ SC25: 'The Convergence of HPC, K8s and AI'", "", "https://github.com/supercontainers/canopie-hpc/blob/main/docs/prev/2025/slides/The-Convergence-of-HPC-K8s-and-AI.pdf"],
      ["  NLIT Summit '25: Open source AI training with OSTI data", ""],
      ["  Red Hat/Dynatrace/Intel: AI-driven observability webinar", "", "https://youtu.be/CZXT_HeeSrc"],
      ["", ""],
      ["media & writing", "amber"],
      ["  Federal News Network: 'Building AI that works in government'", "", "https://federalnewsnetwork.com/federal-insights/2025/09/building-ai-that-works-redhat-shares-how-ecosystem-approach-can-be-the-glue-in-federal-innovation/"],
      ["  Red Hat blog: RHEL in the cloud (PAYG vs BYOS)", "", "https://www.redhat.com/en/blog/how-deploy-red-hat-enterprise-linux-cloud"],
      ["  Red Hat blog: Identity management + SSO", "", "https://www.redhat.com/en/blog/integrating-identity-management-single-sign-red-hat-solutions"],
      ["  'AI-First Research Platform' acknowledged expert contributor", "", "https://lnkd.in/p/e2Jy43fG"],
      ["", ""],
      ["open source & community", "amber"],
      ["  RamaLama: 17 PRs merged, 43 commits", "", "https://github.com/containers/ramalama/pulls?q=is:pr+author:kush-gupt"],
      ["    MLX runtime: Apple Silicon inference support", "dim", "https://github.com/containers/ramalama/pull/1642"],
      ["    model formats: safetensors-only repos, --gguf convert", "dim", "https://github.com/containers/ramalama/pull/1976"],
      ["    caching + CI: HuggingFace/Ollama cache, system tests", "dim", "https://github.com/containers/ramalama/pull/833"],
      ["    vllm-cpu-arm: own container image for ARM CPUs", "dim", "https://quay.io/repository/kugupta/vllm-cpu-arm"],
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
      ["alexa-skills/: 7 skills published since 2017", "white"],
      ["  └─ kush-roast: ~30 weekly users, 300+ sessions/week", "dim"],
      ["github.com/kush-gupt: 64 public repos and counting", "white"],
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
      ["github: github.com/kush-gupt", "white"],
      ["linkedin: linkedin.com/in/kushsgupta", "white"],
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

  const CHIPS = ["experience", "achievements", "certs", "projects", "personal", "contact", "help"];

  function run(raw) {
    const cmd = raw.trim().toLowerCase();
    echo(raw.trim());
    if (!cmd) return;
    history.unshift(raw.trim());
    histIdx = -1;

    if (cmd === "clear") { output.innerHTML = ""; return; }
    if (cmd.startsWith("theme")) {
      const root = document.documentElement.style;
      const cur = getComputedStyle(document.documentElement).getPropertyValue("--green").trim();
      const THEMES = {
        databricks: {
          "--green": "#FF3621", "--dim-green": "#8f2a1e",
          "--glow-faint": "rgba(255,54,33,.08)", "--glow": "rgba(255,54,33,.35)",
          "--glow-mid": "rgba(255,54,33,.2)", "--glow-strong": "rgba(255,54,33,.8)",
        },
        green: {
          "--green": "#33ff66", "--dim-green": "#1a8f3c",
          "--glow-faint": "rgba(51,255,102,.08)", "--glow": "rgba(51,255,102,.35)",
          "--glow-mid": "rgba(51,255,102,.2)", "--glow-strong": "rgba(51,255,102,.8)",
        },
      };
      const next = cur === "#FF3621" ? "green" : "databricks";
      for (const [k, v] of Object.entries(THEMES[next])) root.setProperty(k, v);
      line("phosphor: " + next, next === "databricks" ? "" : "");
      line("", "");
      return;
    }
    if (cmd.startsWith("cat ")) {
      const target = cmd.slice(4).trim();
      if (COMMANDS[target]) { COMMANDS[target]().forEach(([t, c, u]) => line(t, c, u)); }
      else line(`cat: ${target}: No such file`, "red");
      line("", "");
      return;
    }
    const fn = COMMANDS[cmd];
    if (fn) fn().forEach(([t, c, u]) => line(t, c, u));
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
    COMMANDS.whoami().forEach(([t, c, u]) => line(t, c, u));
    line("type 'help' to poke around", "dim");
    line("", "");
    hiddenInput.focus();
  })();
})();
