class Faq {
  constructor(container = document) {
    this.container = container;
    this.faqNavEl = this.container.querySelector('.faq [data-type="faq-nav"]');
    this.faqGroupEls = this.container.querySelectorAll(
      '.faq [data-type="faq-group"]'
    );

    this.buildNav();
    this.bindEvents();
  }

  generateId(title, index = 0) {
    let id = title.replace(/[^\w\s]/gi, "");
    id = id.replace(/\s+/g, "-");
    if (index) {
      id = `${id}-${index}`;
    }
    return id.toLowerCase();
  }

  buildNav() {
    if (
      !this.faqNavEl ||
      !this.faqGroupEls.length ||
      this.faqNavEl.dataset.faqNavBuilt
    )
      return;

    this.faqGroupEls.forEach((group, index) => {
      const title = group.dataset.groupName?.trim();
      if (!title) return;

      const groupId = this.generateId(title, index + 1);
      group.dataset.groupId = groupId;

      const button = document.createElement("button");
      button.textContent = title;
      button.classList.add("faq__nav-item");
      if (group.classList.contains("active")) button.classList.add("active");
      button.dataset.groupId = groupId;
      this.faqNavEl.appendChild(button);
    });

    this.faqNavEl.dataset.faqNavBuilt = "true";
  }

  bindEvents() {
    if (!this.faqNavEl) return;

    this.faqNavEl.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-group-id]");
      if (!btn) return;

      const groupId = btn.dataset.groupId;
      this.setActiveGroup(groupId);
    });
  }

  scrollNavToActive() {
    if (!this.faqNavEl) return;

    const activeBtn = this.faqNavEl.querySelector(".faq__nav-item.active");
    if (!activeBtn) return;

    activeBtn.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }

  setActiveGroup(groupId) {
    this.faqGroupEls.forEach((group) => {
      group.classList.remove("active");
      group
        .querySelectorAll(".custom-collapse")
        .forEach((collapse) => collapse.removeAttribute("open"));
    });
    const groupToShow = this.container.querySelector(
      `.faq [data-type="faq-group"][data-group-id="${groupId}"]`
    );
    if (groupToShow) groupToShow.classList.add("active");

    if (this.faqNavEl) {
      const buttons = this.faqNavEl.querySelectorAll("button[data-group-id]");
      buttons.forEach((btn) => btn.classList.remove("active"));
      const activeBtn = this.faqNavEl.querySelector(
        `button[data-group-id="${groupId}"]`
      );
      if (activeBtn) activeBtn.classList.add("active");
    }
    // this.scrollNavToActive();
  }
}

export default Faq;
