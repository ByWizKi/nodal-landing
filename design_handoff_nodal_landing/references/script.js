/* Nodal — interactive bits: theme toggle, tweaks panel */
(function () {
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "theme": "light",
    "accent": "cobalt",
    "logoStyle": "graph"
  }/*EDITMODE-END*/;

  const state = { ...TWEAK_DEFAULTS };

  function applyState() {
    document.documentElement.setAttribute("data-theme", state.theme);
    if (state.accent === "cobalt") {
      document.documentElement.removeAttribute("data-accent");
    } else {
      document.documentElement.setAttribute("data-accent", state.accent);
    }
    document.documentElement.setAttribute("data-logo-style", state.logoStyle);

    // update theme toggle label
    const themeLabel = document.querySelector("[data-theme-label]");
    if (themeLabel) themeLabel.textContent = state.theme === "dark" ? "LIGHT" : "DARK";

    // sync seg buttons
    document.querySelectorAll(".seg [data-tw]").forEach((b) => {
      const k = b.getAttribute("data-tw");
      const v = b.getAttribute("data-val");
      b.setAttribute("aria-pressed", state[k] === v ? "true" : "false");
    });
    document.querySelectorAll(".swatch-pick").forEach((b) => {
      const v = b.getAttribute("data-val");
      b.setAttribute("aria-pressed", state.accent === v ? "true" : "false");
    });
  }

  function setKey(k, v) {
    state[k] = v;
    applyState();
    try {
      window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [k]: v } }, "*");
    } catch (e) {}
  }

  // ---- Theme toggle button ----
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-action]");
    if (!t) return;
    const action = t.getAttribute("data-action");
    if (action === "toggle-theme") {
      setKey("theme", state.theme === "dark" ? "light" : "dark");
    } else if (action === "open-tweaks") {
      const tw = document.getElementById("tweaks");
      if (tw) tw.classList.add("open");
    } else if (action === "close-tweaks") {
      const tw = document.getElementById("tweaks");
      if (tw) tw.classList.remove("open");
      try { window.parent.postMessage({ type: "__edit_mode_dismissed" }, "*"); } catch (e) {}
    }
  });

  // ---- Tweak segmented buttons ----
  document.addEventListener("click", (e) => {
    const seg = e.target.closest(".seg [data-tw]");
    if (seg) {
      setKey(seg.getAttribute("data-tw"), seg.getAttribute("data-val"));
    }
    const sw = e.target.closest(".swatch-pick");
    if (sw) {
      setKey("accent", sw.getAttribute("data-val"));
    }
  });

  // ---- Edit-mode protocol (Tweaks toolbar toggle) ----
  window.addEventListener("message", (ev) => {
    const d = ev.data || {};
    const tw = document.getElementById("tweaks");
    if (!tw) return;
    if (d.type === "__activate_edit_mode") {
      tw.classList.add("open");
    } else if (d.type === "__deactivate_edit_mode") {
      tw.classList.remove("open");
    }
  });

  // Tabs (in-doc demo)
  document.addEventListener("click", (e) => {
    const tab = e.target.closest("[data-tabs] .tab");
    if (!tab) return;
    const group = tab.closest("[data-tabs]");
    group.querySelectorAll(".tab").forEach((t) => t.setAttribute("aria-selected", "false"));
    tab.setAttribute("aria-selected", "true");
  });

  // Toggles demo
  document.addEventListener("click", (e) => {
    const t = e.target.closest(".toggle.demo");
    if (!t) return;
    t.classList.toggle("on");
  });

  // Init
  document.addEventListener("DOMContentLoaded", () => {
    applyState();
    // Announce tweaks availability only if panel exists
    if (document.getElementById("tweaks")) {
      try { window.parent.postMessage({ type: "__edit_mode_available" }, "*"); } catch (e) {}
    }
  });
})();
