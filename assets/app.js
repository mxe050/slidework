(function () {
  const list = document.querySelector("[data-progress-list]");
  const count = document.querySelector("[data-progress-count]");
  const storageKey = "grade-panel-learning-progress";

  if (list && count) {
    const boxes = Array.from(list.querySelectorAll("input[type='checkbox']"));
    const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
    boxes.forEach((box, index) => {
      box.checked = Boolean(saved[index]);
    });

    const update = () => {
      const states = boxes.map((box) => box.checked);
      localStorage.setItem(storageKey, JSON.stringify(states));
      count.textContent = String(states.filter(Boolean).length);
    };

    boxes.forEach((box) => box.addEventListener("change", update));
    update();
  }

  const form = document.querySelector("[data-vote-form]");
  if (form) {
    const feedback = form.querySelector("[data-vote-feedback]");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const vote = data.get("vote");
      const reason = String(data.get("reason") || "").trim();

      if (!vote) {
        feedback.textContent = "まず投票の選択肢を1つ選んでください。";
        return;
      }

      if (reason.length < 12) {
        feedback.textContent = "理由をもう少し具体化しましょう。利益、害、負担、価値観、確実性のうち少なくとも1つを入れると投票理由になります。";
        return;
      }

      const messages = {
        agree: "よい整理です。同意する場合も、条件付き推奨である理由と、患者が選ばない場合もある点を会議記録に残すと実用的です。",
        revise: "最も実践的な投票です。修正提案では、対象者、条件、注記、患者向け説明のどこを直すかまで示すと合意形成が進みます。",
        oppose: "反対票も重要な貢献です。EtDのどの判断に同意できないのか、または推奨なし・別方向の推奨が妥当な理由を明確にしましょう。"
      };

      feedback.textContent = messages[vote];
    });
  }

  document.querySelectorAll("[data-quiz] .quiz-item").forEach((item) => {
    const answer = item.querySelector(".answer");
    item.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        const correct = button.dataset.correct === "true";
        answer.textContent = correct
          ? "正解です。この視点を投票理由に使えます。"
          : "ここは再確認しましょう。SoFは効果と確実性、EtDは価値判断、投票は推奨の方向と強さを確認します。";
        answer.style.color = correct ? "var(--green)" : "var(--coral)";
      });
    });
  });
})();
