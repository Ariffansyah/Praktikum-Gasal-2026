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
      .querySelectorAll("button, select")
      .forEach((button) => {
        button.disabled = disabled;
      });
  }


  function setSaveButtonVisible(exercise, visible) {
    const saveButton = exercise.querySelector(
      "[data-pyodide-save]"
    );

    if (saveButton) {
      saveButton.hidden = !visible;
    }
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

    if (
      hasVariants(exercise) &&
      exercise.dataset.pyodideVariantReady !==
        "true"
    ) {
      const variantReady =
        initializeVariantExercise(exercise);

      if (!variantReady) {
        return;
      }

      editor.value = getStarterCode(exercise);
      updateEditorUI(exercise);
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
        stdout.join("\n");


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

        output += stderr.join("\n");
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
     STARTER CODE
     ========================================================= */

  function decodePyodideText(encoded) {
    return (encoded || "").replace(/\\n/g, "\n").replace(/\\s/g, " ");
  }


  function getStarterCode(exercise) {
    return decodePyodideText(exercise.dataset.pyodideStarter);
  }


  function getVariantElements(exercise) {
    return Array.from(
      exercise.querySelectorAll(
        "[data-pyodide-variant]"
      )
    );
  }


  function hasVariants(exercise) {
    return getVariantElements(exercise).length > 0;
  }


  function isDebugExercise(exercise) {
    return (
      String(exercise.dataset.pyodideDebug)
        .toLowerCase() === "true"
    );
  }


  function normalizeStudentNim(value) {
    return String(value || "")
      .trim()
      .replace(/\s+/g, "");
  }


  const STUDENT_NIM_COOKIE = "oop_student_nim";


  function isValidStudentNim(nim) {
    return /^\d{6,20}$/.test(nim);
  }


  function getStudentNimCookie() {
    const prefix = `${STUDENT_NIM_COOKIE}=`;
    const cookie = document.cookie
      .split(";")
      .map((item) => item.trim())
      .find((item) => item.startsWith(prefix));

    if (!cookie) {
      return "";
    }

    try {
      return normalizeStudentNim(
        decodeURIComponent(cookie.slice(prefix.length))
      );
    } catch (error) {
      return "";
    }
  }


  function setStudentNimCookie(nim) {
    document.cookie = [
      `${STUDENT_NIM_COOKIE}=${encodeURIComponent(nim)}`,
      "max-age=31536000",
      "path=/",
      "SameSite=Lax",
    ].join("; ");
  }


  const STUDENT_KELAS_COOKIE = "oop_student_kelas";
  const VALID_STUDENT_KELAS = ["2025A", "2025B", "2025C"];


  function normalizeStudentKelas(value) {
    return String(value || "")
      .trim()
      .toUpperCase();
  }


  function isValidStudentKelas(kelas) {
    return VALID_STUDENT_KELAS.includes(kelas);
  }


  function getStudentKelasCookie() {
    const prefix = `${STUDENT_KELAS_COOKIE}=`;
    const cookie = document.cookie
      .split(";")
      .map((item) => item.trim())
      .find((item) => item.startsWith(prefix));

    if (!cookie) {
      return "";
    }

    try {
      return normalizeStudentKelas(
        decodeURIComponent(cookie.slice(prefix.length))
      );
    } catch (error) {
      return "";
    }
  }


  function setStudentKelasCookie(kelas) {
    document.cookie = [
      `${STUDENT_KELAS_COOKIE}=${encodeURIComponent(kelas)}`,
      "max-age=31536000",
      "path=/",
      "SameSite=Lax",
    ].join("; ");
  }


  function clearIdentityCookie(name) {
    document.cookie = [
      `${name}=`,
      "max-age=0",
      "path=/",
      "SameSite=Lax",
    ].join("; ");
  }


  function resetStudentIdentity() {
    if (
      !window.confirm(
        "Hapus NIM dan kelas yang tersimpan? Kamu perlu memasukkannya lagi."
      )
    ) {
      return;
    }

    clearIdentityCookie(STUDENT_NIM_COOKIE);
    clearIdentityCookie(STUDENT_KELAS_COOKIE);
    window.location.reload();
  }


  function getUnlockDateForKelas(exercise, kelas) {
    try {
      const map = JSON.parse(
        exercise.dataset.pyodideUnlockDates || "{}"
      );
      return map[kelas] || null;
    } catch (error) {
      return null;
    }
  }


  function stableHash(value) {
    let hash = 2166136261;

    for (let index = 0; index < value.length; index++) {
      hash ^= value.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }

    return hash >>> 0;
  }


  function createSeededRandom(seed) {
    let state = seed >>> 0;

    return () => {
      state += 0x6d2b79f5;
      let value = state;
      value = Math.imul(
        value ^ (value >>> 15),
        value | 1
      );
      value ^= value + Math.imul(
        value ^ (value >>> 7),
        value | 61
      );

      return (
        (value ^ (value >>> 14)) >>> 0
      ) / 4294967296;
    };
  }


  function getStudentVariant(exercise, variants, nim) {
    const assignmentId =
      exercise.dataset.pyodideAssignmentId ||
      "assignment";

    const version =
      exercise.dataset.pyodideVariantVersion ||
      "1";

    const seed = [
      assignmentId,
      version,
      nim,
    ].join("|");

    const shuffled = [...variants];
    const random = createSeededRandom(
      stableHash(seed)
    );

    for (
      let index = shuffled.length - 1;
      index > 0;
      index--
    ) {
      const swapIndex = Math.floor(
        random() * (index + 1)
      );

      [
        shuffled[index],
        shuffled[swapIndex],
      ] = [
        shuffled[swapIndex],
        shuffled[index],
      ];
    }

    return shuffled[0];
  }


  function appendAutoFormattedText(parent, text) {
    const autoCodePattern = /(?:self\.[A-Za-z_][A-Za-z0-9_]*|__[A-Za-z_][A-Za-z0-9_]*__|@[A-Za-z_][A-Za-z0-9_]*|[A-Za-z_][A-Za-z0-9_]*\(\)|[A-Za-z_][A-Za-z0-9_]*_[A-Za-z0-9_]+|\b(?:Buku|ValueError|True|False|None)\b)/g;
    let lastIndex = 0;
    let match;

    while ((match = autoCodePattern.exec(text)) !== null) {
      const start = match.index;

      if (start > lastIndex) {
        parent.appendChild(
          document.createTextNode(
            text.slice(lastIndex, start)
          )
        );
      }

      const code = document.createElement("code");

      code.textContent = match[0];
      parent.appendChild(code);
      lastIndex = start + match[0].length;
    }

    if (lastIndex < text.length) {
      parent.appendChild(
        document.createTextNode(
          text.slice(lastIndex)
        )
      );
    }
  }


  function appendPromptInline(parent, text) {
    const markdownPattern = /(?:\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g;
    let lastIndex = 0;

    text.replace(
      markdownPattern,
      (match, offset) => {
        if (offset > lastIndex) {
          appendAutoFormattedText(
            parent,
            text.slice(lastIndex, offset)
          );
        }

        let element;
        let content;

        if (match.startsWith("**")) {
          element = document.createElement("strong");
          content = match.slice(2, -2);
        } else if (match.startsWith("`")) {
          element = document.createElement("code");
          content = match.slice(1, -1);
        } else {
          element = document.createElement("em");
          content = match.slice(1, -1);
        }

        if (element.tagName === "CODE") {
          element.textContent = content;
        } else {
          appendAutoFormattedText(element, content);
        }

        parent.appendChild(element);
        lastIndex = offset + match.length;

        return match;
      }
    );

    if (lastIndex < text.length) {
      appendAutoFormattedText(
        parent,
        text.slice(lastIndex)
      );
    }
  }


  function renderPrompt(prompt, text) {
    if (!prompt) {
      return;
    }

    prompt.replaceChildren();

    const lines = String(text || "")
      .split(String.fromCharCode(10))
      .map((line) => line.replace(String.fromCharCode(13), ""));

    let list;

    lines.forEach((line) => {
      const trimmed = line.trim();

      if (!trimmed) {
        list = null;
        return;
      }

      if (trimmed.startsWith("- ")) {
        if (!list) {
          list = document.createElement("ul");
          list.className =
            "pyodide-exercise__prompt-list";
          prompt.appendChild(list);
        }

        const item = document.createElement("li");

        appendPromptInline(
          item,
          trimmed.slice(2)
        );
        list.appendChild(item);
        return;
      }

      list = null;

      const isSection =
        /^\d+\.\s+/.test(trimmed) ||
        trimmed === "Tujuan tugas" ||
        trimmed === "Checklist sebelum Run Tests";

      const block = document.createElement(
        isSection ? "h4" : "p"
      );

      block.className = isSection
        ? "pyodide-exercise__prompt-section"
        : "pyodide-exercise__prompt-paragraph";

      appendPromptInline(block, trimmed);
      prompt.appendChild(block);
    });
  }


  function decodeBase64Utf8(encoded) {
    const binary = atob(encoded);
    const bytes = Uint8Array.from(
      binary,
      (char) => char.charCodeAt(0)
    );

    return new TextDecoder("utf-8").decode(
      bytes
    );
  }


  function decodeVariantPayload(variant) {
    const encoded =
      variant.dataset.pyodideVariantPayload;

    if (!encoded) {
      return {};
    }

    try {
      return JSON.parse(
        decodeBase64Utf8(encoded)
      );
    } catch (error) {
      return {};
    }
  }


  function revealGatedBody(exercise) {
    const gated = exercise.querySelector(
      "[data-pyodide-gated-body]"
    );

    if (!gated) {
      return;
    }

    const encoded =
      gated.dataset.pyodideGatedPayload;

    if (!encoded) {
      return;
    }

    try {
      gated.innerHTML = decodeBase64Utf8(
        encoded
      );
      gated.hidden = false;
    } catch (error) {
      /* keep hidden if decoding fails */
    }
  }


  function applyVariant(exercise, variant) {
    const payload = decodeVariantPayload(variant);

    exercise.dataset.pyodideStarter =
      payload.starter || "";

    exercise.dataset.pyodideTests =
      payload.tests || "";

    exercise.dataset.pyodideVariantId =
      variant.dataset.pyodideVariantId ||
      "";

    exercise.dataset.pyodideVariantReady =
      "true";

    const variantSelect = exercise.querySelector(
      "[data-pyodide-variant-select]"
    );

    if (variantSelect) {
      variantSelect.value =
        variant.dataset.pyodideVariantId ||
        "";
    }

    const title = exercise.querySelector(
      "[data-pyodide-title]"
    );

    const prompt = exercise.querySelector(
      "[data-pyodide-prompt]"
    );

    const brief = exercise.querySelector(
      "[data-pyodide-variant-brief]"
    );

    if (title) {
      title.textContent =
        payload.title ||
        "Latihan mandiri";
    }

    if (prompt) {
      renderPrompt(
        prompt,
        decodePyodideText(
          payload.prompt ||
            "Lengkapi starter code sesuai ketentuan study case."
        )
      );
    }

    if (brief) {
      brief.textContent =
        payload.brief ||
        "Sub study case perpustakaan telah dipilih.";
      brief.hidden = false;
    }
  }


  function switchDebugVariant(exercise, variantId) {
    if (!isDebugExercise(exercise)) {
      return;
    }

    const variant = getVariantElements(exercise).find(
      (item) =>
        item.dataset.pyodideVariantId ===
        variantId
    );

    if (!variant) {
      return;
    }

    applyVariant(exercise, variant);

    const editor = exercise.querySelector(
      "[data-pyodide-editor]"
    );

    if (editor) {
      editor.value = getStarterCode(exercise);
    }

    setSaveButtonVisible(exercise, false);
    clearTestResults(exercise);
    setOutput(exercise, "", "");
    updateEditorUI(exercise);
    setStatus(
      exercise,
      `Mode debug: ${decodeVariantPayload(variant).title || "sub study case"} dimuat.`,
      "success"
    );
  }


  function initializeVariantExercise(exercise) {
    const variants = getVariantElements(exercise);

    if (!variants.length) {
      return true;
    }

    exercise.dataset.pyodideVariantReady =
      "false";

    let variant;

    if (isDebugExercise(exercise)) {
      variant = variants[0];
    } else {
      let nim = getStudentNimCookie();

      if (!isValidStudentNim(nim)) {
        const requestedNim = window.prompt(
          "Masukkan NIM untuk memilih sub study case:",
          ""
        );

        nim = normalizeStudentNim(
          requestedNim
        );

        if (!isValidStudentNim(nim)) {
          setStatus(
            exercise,
            requestedNim === null
              ? "Pengisian NIM dibatalkan."
              : "NIM tidak valid. Masukkan 6 sampai 20 digit.",
            "error"
          );

          return false;
        }

        setStudentNimCookie(nim);
      }

      exercise.dataset.pyodideStudentNim = nim;

      let kelas = getStudentKelasCookie();

      if (!isValidStudentKelas(kelas)) {
        const requestedKelas = window.prompt(
          "Masukkan kelas (2025A / 2025B / 2025C):",
          ""
        );

        kelas = normalizeStudentKelas(
          requestedKelas
        );

        if (!isValidStudentKelas(kelas)) {
          setStatus(
            exercise,
            requestedKelas === null
              ? "Pengisian kelas dibatalkan."
              : "Kelas tidak valid. Gunakan 2025A, 2025B, atau 2025C.",
            "error"
          );

          return false;
        }

        setStudentKelasCookie(kelas);
      }

      exercise.dataset.pyodideStudentKelas = kelas;

      const unlockDate = getUnlockDateForKelas(
        exercise,
        kelas
      );

      if (unlockDate && new Date() < new Date(`${unlockDate}T00:00:00`)) {
        setStatus(
          exercise,
          `Assignment ini baru dibuka mulai ${unlockDate} untuk kelas ${kelas}.`,
          "error"
        );

        return false;
      }

      variant = getStudentVariant(
        exercise,
        variants,
        nim
      );
    }

    applyVariant(exercise, variant);
    revealGatedBody(exercise);

    setStatus(
      exercise,
      isDebugExercise(exercise)
        ? "Mode debug: sub study case 1 dimuat."
        : "Sub study case berhasil dimuat.",
      "success"
    );

    return true;
  }


  /* =========================================================
     TEST CASES
     ========================================================= */

  function getTestCases(exercise) {
    const decoded = decodePyodideText(
      exercise.dataset.pyodideTests
    );

    if (!decoded.trim()) {
      return [];
    }

    return decoded
      .split("\n@@CASE@@\n")
      .map((block) => {
        const [input, expected] = block.split(
          "\n@@OUTPUT@@\n"
        );

        return {
          input: input || "",
          expected: expected || "",
        };
      });
  }


  function normalizeOutput(text) {
    return String(text)
      .split("\n")
      .map((line) => line.replace(/\s+$/, ""))
      .join("\n")
      .replace(/\n+$/, "");
  }


  function clearTestResults(exercise) {
    const list = exercise.querySelector(
      "[data-pyodide-tests-list]"
    );

    const summary = exercise.querySelector(
      "[data-pyodide-tests-summary]"
    );

    const panel = exercise.querySelector(
      "[data-pyodide-tests-panel]"
    );

    if (list) {
      list.replaceChildren();
    }

    if (summary) {
      summary.textContent = "";
    }

    if (panel) {
      panel.hidden = true;
    }
  }


  function renderTestResults(exercise, results) {
    const list = exercise.querySelector(
      "[data-pyodide-tests-list]"
    );

    const summary = exercise.querySelector(
      "[data-pyodide-tests-summary]"
    );

    const panel = exercise.querySelector(
      "[data-pyodide-tests-panel]"
    );

    if (!list || !panel) {
      return;
    }

    panel.hidden = false;

    const passedCount = results.filter(
      (result) => result.passed
    ).length;

    if (summary) {
      summary.textContent =
        `${passedCount} / ${results.length} lulus`;
    }

    list.replaceChildren(
      ...results.map((result, index) => {
        const item = document.createElement("li");

        item.className = "pyodide-tests__item";
        item.dataset.state = result.passed ? "pass" : "fail";

        const label = document.createElement("div");

        label.className = "pyodide-tests__label";
        label.textContent =
          `Test ${index + 1}: ${result.passed ? "Lulus" : "Gagal"}`;

        item.appendChild(label);

        if (!result.passed) {
          const details = document.createElement("details");

          details.className = "pyodide-tests__details";

          const detailsSummary =
            document.createElement("summary");

          detailsSummary.textContent = "Lihat detail";
          details.appendChild(detailsSummary);

          const grid = document.createElement("div");

          grid.className = "pyodide-tests__grid";

          [
            ["Input", result.input],
            ["Expected", result.expected],
            ["Actual", result.actual],
          ].forEach(([heading, value]) => {
            const block = document.createElement("pre");

            block.className = "pyodide-tests__block";
            block.textContent = `${heading}:\n${value}`;

            grid.appendChild(block);
          });

          details.appendChild(grid);
          item.appendChild(details);
        }

        return item;
      })
    );
  }


  async function runTests(exercise) {
    const editor = exercise.querySelector(
      "[data-pyodide-editor]"
    );

    if (!editor) {
      return;
    }

    if (
      hasVariants(exercise) &&
      exercise.dataset.pyodideVariantReady !==
        "true"
    ) {
      const variantReady =
        initializeVariantExercise(exercise);

      if (!variantReady) {
        return;
      }

      editor.value = getStarterCode(exercise);
      updateEditorUI(exercise);
    }

    const code = editor.value;
    const cases = getTestCases(exercise);

    setSaveButtonVisible(exercise, false);

    if (!cases.length) {
      setStatus(
        exercise,
        "Tidak ada test case yang terdaftar untuk latihan ini.",
        "error"
      );

      return;
    }

    if (!code.trim()) {
      setStatus(
        exercise,
        "Belum ada kode untuk diuji.",
        "error"
      );

      editor.focus();

      return;
    }

    setButtonsDisabled(exercise, true);

    setStatus(
      exercise,
      "Memuat Python runtime...",
      "loading"
    );

    try {
      const pyodide = await loadPyodideRuntime();
      const results = [];

      for (let index = 0; index < cases.length; index++) {
        const testCase = cases[index];

        setStatus(
          exercise,
          `Menjalankan test ${index + 1} dari ${cases.length}...`,
          "loading"
        );

        const stdout = [];
        const stderr = [];

        pyodide.setStdout({
          batched: (text) => stdout.push(text),
        });

        pyodide.setStderr({
          batched: (text) => stderr.push(text),
        });

        pyodide.globals.set(
          "_pyodide_test_stdin",
          testCase.input
        );

        let actual = "";
        let passed = false;

        try {
          await pyodide.runPythonAsync(
            "import sys as _sys, io as _io\n_sys.stdin = _io.StringIO(_pyodide_test_stdin)"
          );

          const testGlobals = pyodide.globals.get("dict")();

          try {
            await pyodide.runPythonAsync(code, {
              globals: testGlobals,
            });
          } finally {
            testGlobals.destroy();
          }

          actual = stdout.join("\n");

          if (stderr.length) {
            actual +=
              actual && !actual.endsWith("\n") ? "\n" : "";

            actual += stderr.join("\n");
          }

          passed =
            normalizeOutput(actual) ===
            normalizeOutput(testCase.expected);
        } catch (error) {
          actual =
            error && error.message
              ? error.message
              : String(error);

          passed = false;
        }

        results.push({
          input: testCase.input,
          expected: testCase.expected,
          actual,
          passed,
        });
      }

      renderTestResults(exercise, results);

      const passedCount = results.filter(
        (result) => result.passed
      ).length;

      const allTestsPassed =
        passedCount === results.length;

      setSaveButtonVisible(
        exercise,
        allTestsPassed
      );

      setStatus(
        exercise,
        `${passedCount} dari ${results.length} test case lulus.`,
        allTestsPassed ? "success" : "error"
      );
    } catch (error) {
      setSaveButtonVisible(exercise, false);

      const message =
        error && error.message
          ? error.message
          : String(error);

      setStatus(exercise, message, "error");
    } finally {
      setButtonsDisabled(exercise, false);
    }
  }


  function saveExercise(exercise) {
    const editor = exercise.querySelector(
      "[data-pyodide-editor]"
    );

    if (!editor || !editor.value.trim()) {
      setStatus(
        exercise,
        "Belum ada kode untuk disimpan.",
        "error"
      );

      return;
    }

    const requestedFilename = window.prompt(
      "Masukkan nama file Python:",
      "main.py"
    );

    if (requestedFilename === null) {
      setStatus(
        exercise,
        "Penyimpanan dibatalkan.",
        ""
      );

      return;
    }

    const filename = requestedFilename.trim();

    if (!filename) {
      setStatus(
        exercise,
        "Nama file tidak boleh kosong.",
        "error"
      );

      return;
    }

    if (
      /[\u0000-\u001f<>:\"/\\|?*]/.test(filename) ||
      filename === "." ||
      filename === ".."
    ) {
      setStatus(
        exercise,
        "Nama file mengandung karakter yang tidak valid.",
        "error"
      );

      return;
    }

    const downloadName = filename.toLowerCase().endsWith(
      ".py"
    )
      ? filename
      : `${filename}.py`;

    const file = new Blob(
      [editor.value],
      { type: "text/x-python;charset=utf-8" }
    );

    const url = URL.createObjectURL(file);
    const link = document.createElement("a");

    link.href = url;
    link.download = downloadName;
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.setTimeout(
      () => URL.revokeObjectURL(url),
      0
    );

    setStatus(
      exercise,
      `File ${downloadName} berhasil disimpan.`,
      "success"
    );
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

    if (
      hasVariants(exercise) &&
      exercise.dataset.pyodideVariantReady !==
        "true"
    ) {
      const variantReady =
        initializeVariantExercise(exercise);

      if (!variantReady) {
        return;
      }
    }

    editor.value = getStarterCode(exercise);

    setSaveButtonVisible(exercise, false);
    clearTestResults(exercise);

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

        const runTestsButton =
          exercise.querySelector(
            "[data-pyodide-run-tests]"
          );

        const variantSelect =
          exercise.querySelector(
            "[data-pyodide-variant-select]"
          );

        const saveButton =
          exercise.querySelector(
            "[data-pyodide-save]"
          );

        const editor =
          exercise.querySelector(
            "[data-pyodide-editor]"
          );


        if (!editor) {
          return;
        }

        const variantReady = initializeVariantExercise(
          exercise
        );

        editor.value = variantReady
          ? getStarterCode(exercise)
          : "";

        updateEditorUI(exercise);


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

        const resetIdentityButton =
          exercise.querySelector(
            "[data-pyodide-reset-identity]"
          );

        if (resetIdentityButton) {
          resetIdentityButton.addEventListener(
            "click",
            resetStudentIdentity
          );
        }

        if (runTestsButton) {
          runTestsButton.addEventListener(
            "click",
            () =>
              runTests(exercise)
          );
        }


        if (variantSelect) {
          variantSelect.addEventListener(
            "change",
            (event) => {
              switchDebugVariant(
                exercise,
                event.target.value
              );
            }
          );
        }


        if (saveButton) {
          saveButton.addEventListener(
            "click",
            () =>
              saveExercise(exercise)
          );
        }


        /* -------------------------
           Input
           ------------------------- */

        editor.addEventListener(
          "input",
          () => {
            setSaveButtonVisible(exercise, false);

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

