class Faq {
  constructor(container = document) {
    this.container = container;
    this.faqNavEl = this.container.querySelector('.faq [data-type="faq-nav"]');
    this.faqGroupEls = this.container.querySelectorAll(
      '.faq [data-type="faq-group"]'
    );

    this.buildNav();
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

      const button = document.createElement("button");
      button.textContent = title;
      button.dataset.groupId = this.generateId(title, index + 1);
      this.faqNavEl.appendChild(button);
    });

    this.faqNavEl.dataset.faqNavBuilt = "true";
  }
}

export default Faq;
