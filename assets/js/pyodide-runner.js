(() => {
  const PYODIDE_VERSION = "0.27.2";
  const PYODIDE_INDEX_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;
  const PYODIDE_SCRIPT_URL = `${PYODIDE_INDEX_URL}pyodide.js`;
  let pyodidePromise = null;

  function loadPyodideRuntime() {
    if (pyodidePromise) {
      return pyodidePromise;
    }

    pyodidePromise = new Promise((resolve, reject) => {
      const startRuntime = () => {
        if (typeof window.loadPyodide !== "function") {
          reject(new Error("Pyodide runtime is unavailable."));
          return;
        }

        window.loadPyodide({ indexURL: PYODIDE_INDEX_URL })
          .then(resolve)
          .catch(reject);
      };

      if (typeof window.loadPyodide === "function") {
        startRuntime();
        return;
      }

      const existingScript = document.querySelector(
        "script[data-pyodide-runtime]"
      );

      if (existingScript) {
        existingScript.addEventListener("load", startRuntime, { once: true });
        existingScript.addEventListener(
          "error",
          () => reject(new Error("Pyodide script could not be loaded.")),
          { once: true }
        );
        return;
      }

      const script = document.createElement("script");
      script.src = PYODIDE_SCRIPT_URL;
      script.async = true;
      script.dataset.pyodideRuntime = "true";
      script.addEventListener("load", startRuntime, { once: true });
      script.addEventListener(
        "error",
        () => reject(new Error("Pyodide script could not be loaded.")),
        { once: true }
      );
      document.head.appendChild(script);
    }).catch((error) => {
      pyodidePromise = null;
      throw error;
    });

    return pyodidePromise;
  }

  function setStatus(exercise, message, state) {
    const status = exercise.querySelector("[data-pyodide-status]");
    status.textContent = message;
    status.dataset.state = state || "";
  }

  function setOutput(exercise, message, state) {
    const output = exercise.querySelector("[data-pyodide-output]");
    const panel = exercise.querySelector("[data-pyodide-output-panel]");
    const stateLabel = exercise.querySelector("[data-pyodide-output-state]");
    output.textContent = message;
    output.dataset.state = state || "";
    output.hidden = false;
    panel.hidden = !message;

    if (stateLabel) {
      stateLabel.textContent = {
        error: "Error",
        loading: "Running",
        success: "Completed",
      }[state] || "";
    }
  }

  function setButtonsDisabled(exercise, disabled) {
    exercise.querySelectorAll("button").forEach((button) => {
      button.disabled = disabled;
    });
  }

  function updateEditorUI(exercise) {
    const editor = exercise.querySelector("[data-pyodide-editor]");
    const gutter = exercise.querySelector("[data-pyodide-line-numbers]");

    if (!editor || !gutter) {
      return;
    }

    const lineCount = Math.max(1, editor.value.split("\n").length);
    gutter.replaceChildren(
      ...Array.from({ length: lineCount }, (_, index) => {
        const line = document.createElement("span");
        line.textContent = String(index + 1);
        return line;
      })
    );
    gutter.scrollTop = editor.scrollTop;

    const textBeforeCursor = editor.value.slice(0, editor.selectionStart);
    const lines = textBeforeCursor.split("\n");
    const line = lines.length;
    const column = lines[lines.length - 1].length + 1;
    const cursor = exercise.querySelector("[data-pyodide-cursor]");

    if (cursor) {
      cursor.textContent = `Ln ${line}, Col ${column}`;
    }
  }

  function resultToText(result) {
    if (result === undefined || result === null) {
      return "";
    }

    let text;
    if (typeof result.toString === "function") {
      text = result.toString();
    } else {
      text = String(result);
    }

    if (typeof result.destroy === "function") {
      result.destroy();
    }

    return text;
  }

  async function runExercise(exercise) {
    const editor = exercise.querySelector("[data-pyodide-editor]");
    const code = editor.value;

    if (!code.trim()) {
      setStatus(exercise, "Belum ada kode untuk dijalankan.", "error");
      setOutput(exercise, "Tulis kode Python pada starter code terlebih dahulu.", "error");
      editor.focus();
      return;
    }

    setButtonsDisabled(exercise, true);
    setStatus(exercise, "Memuat Python runtime...", "loading");
    setOutput(exercise, "", "");

    try {
      const pyodide = await loadPyodideRuntime();
      const stdout = [];
      const stderr = [];

      pyodide.setStdout({ batched: (text) => stdout.push(text) });
      pyodide.setStderr({ batched: (text) => stderr.push(text) });
      setStatus(exercise, "Menjalankan kode...", "loading");

      const result = await pyodide.runPythonAsync(code);
      const resultText = resultToText(result);
      let output = stdout.join("");

      if (resultText) {
        output += output && !output.endsWith("\n") ? "\n" : "";
        output += resultText;
      }

      if (stderr.length) {
        output += output && !output.endsWith("\n") ? "\n" : "";
        output += stderr.join("");
      }

      setOutput(exercise, output || "Program selesai tanpa output.", "success");
      setStatus(exercise, "Selesai.", "success");
    } catch (error) {
      const message = error && error.message ? error.message : String(error);
      setOutput(exercise, message, "error");
      setStatus(exercise, "Kode menghasilkan error.", "error");
    } finally {
      setButtonsDisabled(exercise, false);
    }
  }

  function resetExercise(exercise) {
    const editor = exercise.querySelector("[data-pyodide-editor]");
    editor.value = "";
    setOutput(exercise, "", "");
    setStatus(exercise, "Starter code kosong dan siap diisi.", "");
    updateEditorUI(exercise);
    editor.focus();
  }

  function initPyodideExercises() {
    document.querySelectorAll("[data-pyodide-exercise]").forEach((exercise) => {
      if (exercise.dataset.pyodideBound === "true") {
        return;
      }

      exercise.dataset.pyodideBound = "true";
      const runButton = exercise.querySelector("[data-pyodide-run]");
      const resetButton = exercise.querySelector("[data-pyodide-reset]");
      const editor = exercise.querySelector("[data-pyodide-editor]");

      runButton.addEventListener("click", () => runExercise(exercise));
      resetButton.addEventListener("click", () => resetExercise(exercise));
      editor.addEventListener("input", () => {
        setStatus(exercise, "Starter code siap dijalankan.", "");
        updateEditorUI(exercise);
      });
      editor.addEventListener("click", () => updateEditorUI(exercise));
      editor.addEventListener("keyup", () => updateEditorUI(exercise));
      editor.addEventListener("scroll", () => {
        const gutter = exercise.querySelector("[data-pyodide-line-numbers]");
        if (gutter) {
          gutter.scrollTop = editor.scrollTop;
        }
      });
      updateEditorUI(exercise);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPyodideExercises);
  } else {
    initPyodideExercises();
  }
})();
