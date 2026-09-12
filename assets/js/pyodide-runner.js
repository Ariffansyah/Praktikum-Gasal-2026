(() => {
  const PYODIDE_VERSION = "0.27.2";
  const PYODIDE_INDEX_URL =
    `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;
  const PYODIDE_SCRIPT_URL = `${PYODIDE_INDEX_URL}pyodide.js`;

  const INDENT = "    ";
  const INDENT_SIZE = 4;

  let pyodidePromise = null;

  /* =========================================================
     PYODIDE RUNTIME
     ========================================================= */

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

        window
          .loadPyodide({
            indexURL: PYODIDE_INDEX_URL,
          })
          .then(resolve)
          .catch(reject);
      };

      /* Pyodide already loaded */
      if (typeof window.loadPyodide === "function") {
        startRuntime();
        return;
      }

      /* Another exercise is already loading Pyodide */
      const existingScript = document.querySelector(
        "script[data-pyodide-runtime]"
      );

      if (existingScript) {
        existingScript.addEventListener(
          "load",
          startRuntime,
          { once: true }
        );

        existingScript.addEventListener(
          "error",
          () =>
            reject(
              new Error("Pyodide script could not be loaded.")
            ),
          { once: true }
        );

        return;
      }

      /* Load Pyodide */
      const script = document.createElement("script");

      script.src = PYODIDE_SCRIPT_URL;
      script.async = true;
      script.dataset.pyodideRuntime = "true";

      script.addEventListener(
        "load",
        startRuntime,
        { once: true }
      );

      script.addEventListener(
        "error",
        () =>
          reject(
            new Error("Pyodide script could not be loaded.")
          ),
        { once: true }
      );

      document.head.appendChild(script);
    }).catch((error) => {
      pyodidePromise = null;
      throw error;
    });

    return pyodidePromise;
  }


  /* =========================================================
     STATUS / OUTPUT
     ========================================================= */

  function setStatus(exercise, message, state) {
    const status = exercise.querySelector(
      "[data-pyodide-status]"
    );

    if (!status) {
      return;
    }

    status.textContent = message;
    status.dataset.state = state || "";
  }


  function setOutput(exercise, message, state) {
    const output = exercise.querySelector(
      "[data-pyodide-output]"
    );

    const panel = exercise.querySelector(
      "[data-pyodide-output-panel]"
    );

    const stateLabel = exercise.querySelector(
      "[data-pyodide-output-state]"
    );

    if (!output || !panel) {
      return;
    }

    output.textContent = message;
    output.dataset.state = state || "";

    output.hidden = false;
    panel.hidden = !message;

    if (stateLabel) {
      stateLabel.textContent =
        {
          error: "Error",
          loading: "Running",
          success: "Completed",
        }[state] || "";
    }
  }


  function setButtonsDisabled(exercise, disabled) {
    exercise
      .querySelectorAll("button")
      .forEach((button) => {
        button.disabled = disabled;
      });
  }


  /* =========================================================
     EDITOR UI
     ========================================================= */

  function updateEditorUI(exercise) {
    const editor = exercise.querySelector(
      "[data-pyodide-editor]"
    );

    const gutter = exercise.querySelector(
      "[data-pyodide-line-numbers]"
    );

    if (!editor || !gutter) {
      return;
    }

    /* -------------------------
       Line numbers
       ------------------------- */

    const lineCount = Math.max(
      1,
      editor.value.split("\n").length
    );

    gutter.replaceChildren(
      ...Array.from(
        { length: lineCount },
        (_, index) => {
          const line = document.createElement("span");

          line.textContent = String(index + 1);

          return line;
        }
      )
    );

    gutter.scrollTop = editor.scrollTop;


    /* -------------------------
       Cursor position
       ------------------------- */

    const cursorPosition = editor.selectionStart;

    const textBeforeCursor = editor.value.slice(
      0,
      cursorPosition
    );

    const lines = textBeforeCursor.split("\n");

    const line = lines.length;

    const column =
      lines[lines.length - 1].length + 1;

    const cursor = exercise.querySelector(
      "[data-pyodide-cursor]"
    );

    if (cursor) {
      cursor.textContent =
        `Ln ${line}, Col ${column}`;
    }
  }


  /* =========================================================
     TEXT HELPERS
     ========================================================= */

  function getLineStart(value, position) {
    const index = value.lastIndexOf(
      "\n",
      position - 1
    );

    return index === -1 ? 0 : index + 1;
  }


  function getLineEnd(value, position) {
    const index = value.indexOf(
      "\n",
      position
    );

    return index === -1 ? value.length : index;
  }


  function getSelectedLineRange(editor) {
    const value = editor.value;

    const start = editor.selectionStart;
    const end = editor.selectionEnd;

    const blockStart = getLineStart(
      value,
      start
    );

    /*
     * If selection ends exactly at the beginning
     * of a line, that line does not belong to
     * the selection.
     */
    let blockEnd;

    if (
      end > start &&
      end < value.length &&
      value[end - 1] === "\n"
    ) {
      blockEnd = end - 1;
    } else {
      blockEnd = getLineEnd(value, end);
    }

    return {
      start,
      end,
      blockStart,
      blockEnd,
    };
  }


  /* =========================================================
     INDENT / OUTDENT
     ========================================================= */

  function indentEditor(editor, outdent) {
    const value = editor.value;

    const start = editor.selectionStart;
    const end = editor.selectionEnd;


    /* =======================================================
       CASE 1
       No selection
       ======================================================= */

    if (start === end) {
      const lineStart = getLineStart(
        value,
        start
      );

      /* -------------------------
         TAB
         ------------------------- */

      if (!outdent) {
        editor.setRangeText(
          INDENT,
          start,
          end,
          "end"
        );

        return;
      }


      /* -------------------------
         SHIFT + TAB
         ------------------------- */

      const lineEnd = getLineEnd(
        value,
        start
      );

      const line = value.slice(
        lineStart,
        lineEnd
      );

      let removeLength = 0;

      if (line.startsWith(INDENT)) {
        removeLength = INDENT_SIZE;
      } else if (line.startsWith("\t")) {
        removeLength = 1;
      } else {
        const spaces = line.match(/^ */);

        removeLength = Math.min(
          INDENT_SIZE,
          spaces ? spaces[0].length : 0
        );
      }

      if (removeLength > 0) {
        editor.value =
          value.slice(
            0,
            lineStart
          ) +
          value.slice(
            lineStart + removeLength
          );

        const newPosition = Math.max(
          lineStart,
          start - removeLength
        );

        editor.selectionStart = newPosition;
        editor.selectionEnd = newPosition;
      }

      return;
    }


    /* =======================================================
       CASE 2
       Multiple lines selected
       ======================================================= */

    const {
      blockStart,
      blockEnd,
    } = getSelectedLineRange(editor);

    const block = value.slice(
      blockStart,
      blockEnd
    );

    const lines = block.split("\n");


    /* =======================================================
       INDENT SELECTED LINES
       ======================================================= */

    if (!outdent) {
      const transformed = lines
        .map((line) => INDENT + line)
        .join("\n");

      const newValue =
        value.slice(0, blockStart) +
        transformed +
        value.slice(blockEnd);

      editor.value = newValue;


      /*
       * Preserve selection.
       *
       * Every selected line receives 4 spaces.
       */
      const lineCount = lines.length;

      const addedBeforeSelection =
        INDENT_SIZE;

      const addedToSelection =
        INDENT_SIZE * lineCount;

      editor.selectionStart =
        start + addedBeforeSelection;

      editor.selectionEnd =
        end + addedToSelection;

      return;
    }


    /* =======================================================
       OUTDENT SELECTED LINES
       ======================================================= */

    const transformedLines = lines.map(
      (line) => {
        if (line.startsWith(INDENT)) {
          return line.slice(INDENT_SIZE);
        }

        if (line.startsWith("\t")) {
          return line.slice(1);
        }

        /*
         * Remove between 1-4 spaces.
         */
        return line.replace(
          /^ {1,4}/,
          ""
        );
      }
    );

    const transformed =
      transformedLines.join("\n");

    const newValue =
      value.slice(0, blockStart) +
      transformed +
      value.slice(blockEnd);

    /*
     * Calculate how much indentation
     * was removed from each line.
     */
    const removedPerLine = lines.map(
      (line) => {
        if (line.startsWith(INDENT)) {
          return INDENT_SIZE;
        }

        if (line.startsWith("\t")) {
          return 1;
        }

        const spaces =
          line.match(/^ {1,4}/);

        return spaces
          ? spaces[0].length
          : 0;
      }
    );

    /*
     * Calculate indentation removed before
     * the cursor.
     */
    const firstLineRemoval =
      removedPerLine[0] || 0;

    /*
     * Total characters removed from the
     * selected block.
     */
    const totalRemoved =
      removedPerLine.reduce(
        (total, amount) =>
          total + amount,
        0
      );

    editor.value = newValue;


    /*
     * Keep the selection sensible.
     */
    editor.selectionStart =
      Math.max(
        blockStart,
        start - firstLineRemoval
      );

    editor.selectionEnd =
      Math.max(
        editor.selectionStart,
        end - totalRemoved
      );
  }


  /* =========================================================
     RUN PYTHON
     ========================================================= */

  function resultToText(result) {
    if (
      result === undefined ||
      result === null
    ) {
      return "";
    }

    let text;

    if (
      typeof result.toString === "function"
    ) {
      text = result.toString();
    } else {
      text = String(result);
    }

    if (
      typeof result.destroy === "function"
    ) {
      result.destroy();
    }

    return text;
  }


  async function runExercise(exercise) {
    const editor = exercise.querySelector(
      "[data-pyodide-editor]"
    );

    if (!editor) {
      return;
    }

    const code = editor.value;


    /* -------------------------
       Empty code
       ------------------------- */

    if (!code.trim()) {
      setStatus(
        exercise,
        "Belum ada kode untuk dijalankan.",
        "error"
      );

      setOutput(
        exercise,
        "Tulis kode Python pada starter code terlebih dahulu.",
        "error"
      );

      editor.focus();

      return;
    }


    setButtonsDisabled(
      exercise,
      true
    );

    setStatus(
      exercise,
      "Memuat Python runtime...",
      "loading"
    );

    setOutput(
      exercise,
      "",
      ""
    );


    try {
      const pyodide =
        await loadPyodideRuntime();

      const stdout = [];
      const stderr = [];


      pyodide.setStdout({
        batched: (text) => {
          stdout.push(text);
        },
      });


      pyodide.setStderr({
        batched: (text) => {
          stderr.push(text);
        },
      });


      setStatus(
        exercise,
        "Menjalankan kode...",
        "loading"
      );


      const result =
        await pyodide.runPythonAsync(
          code
        );

      const resultText =
        resultToText(result);

      let output =
        stdout.join("");


      if (resultText) {
        output +=
          output &&
          !output.endsWith("\n")
            ? "\n"
            : "";

        output += resultText;
      }


      if (stderr.length) {
        output +=
          output &&
          !output.endsWith("\n")
            ? "\n"
            : "";

        output += stderr.join("");
      }


      setOutput(
        exercise,
        output ||
          "Program selesai tanpa output.",
        "success"
      );

      setStatus(
        exercise,
        "Selesai.",
        "success"
      );
    } catch (error) {
      const message =
        error && error.message
          ? error.message
          : String(error);

      setOutput(
        exercise,
        message,
        "error"
      );

      setStatus(
        exercise,
        "Kode menghasilkan error.",
        "error"
      );
    } finally {
      setButtonsDisabled(
        exercise,
        false
      );
    }
  }


  /* =========================================================
     RESET
     ========================================================= */

  function resetExercise(exercise) {
    const editor = exercise.querySelector(
      "[data-pyodide-editor]"
    );

    if (!editor) {
      return;
    }

    editor.value = "";

    setOutput(
      exercise,
      "",
      ""
    );


    updateEditorUI(exercise);

    editor.focus();
  }


  /* =========================================================
     EDITOR KEYBOARD
     ========================================================= */

  function handleEditorKeydown(
    event,
    exercise,
    editor
  ) {
    /* =======================================================
       TAB / SHIFT + TAB
       ======================================================= */

    if (event.key === "Tab") {
      event.preventDefault();

      indentEditor(
        editor,
        event.shiftKey
      );

      /*
       * Notify the rest of the editor UI.
       */
      editor.dispatchEvent(
        new Event("input", {
          bubbles: true,
        })
      );

      updateEditorUI(exercise);

      return;
    }


    /* =======================================================
       CTRL + ENTER / CMD + ENTER
       ======================================================= */

    if (
      (event.ctrlKey || event.metaKey) &&
      event.key === "Enter"
    ) {
      event.preventDefault();

      runExercise(exercise);

      return;
    }
  }


  /* =========================================================
     INITIALIZE EXERCISES
     ========================================================= */

  function initPyodideExercises() {
    document
      .querySelectorAll(
        "[data-pyodide-exercise]"
      )
      .forEach((exercise) => {
        /*
         * Prevent duplicate event listeners.
         */
        if (
          exercise.dataset.pyodideBound ===
          "true"
        ) {
          return;
        }

        exercise.dataset.pyodideBound =
          "true";


        const runButton =
          exercise.querySelector(
            "[data-pyodide-run]"
          );

        const resetButton =
          exercise.querySelector(
            "[data-pyodide-reset]"
          );

        const editor =
          exercise.querySelector(
            "[data-pyodide-editor]"
          );


        if (!editor) {
          return;
        }


        /* -------------------------
           Buttons
           ------------------------- */

        if (runButton) {
          runButton.addEventListener(
            "click",
            () =>
              runExercise(exercise)
          );
        }


        if (resetButton) {
          resetButton.addEventListener(
            "click",
            () =>
              resetExercise(exercise)
          );
        }


        /* -------------------------
           Input
           ------------------------- */

        editor.addEventListener(
          "input",
          () => {
            setStatus(
              exercise,
              "Starter code siap dijalankan.",
              ""
            );

            updateEditorUI(
              exercise
            );
          }
        );


        /* -------------------------
           Keyboard
           ------------------------- */

        editor.addEventListener(
          "keydown",
          (event) => {
            handleEditorKeydown(
              event,
              exercise,
              editor
            );
          }
        );


        /* -------------------------
           Cursor movement
           ------------------------- */

        editor.addEventListener(
          "click",
          () =>
            updateEditorUI(
              exercise
            )
        );

        editor.addEventListener(
          "keyup",
          () =>
            updateEditorUI(
              exercise
            )
        );

        editor.addEventListener(
          "select",
          () =>
            updateEditorUI(
              exercise
            )
        );


        /* -------------------------
           Scroll
           ------------------------- */

        editor.addEventListener(
          "scroll",
          () => {
            const gutter =
              exercise.querySelector(
                "[data-pyodide-line-numbers]"
              );

            if (gutter) {
              gutter.scrollTop =
                editor.scrollTop;
            }
          }
        );


        /* -------------------------
           Initial UI
           ------------------------- */

        updateEditorUI(
          exercise
        );
      });
  }


  /* =========================================================
     DOM READY
     ========================================================= */

  if (
    document.readyState ===
    "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      initPyodideExercises
    );
  } else {
    initPyodideExercises();
  }
})();

