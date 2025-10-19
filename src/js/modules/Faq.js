class Faq {
  constructor(container = document) {
    this.container = container;
    this.faqNavEl = this.container.querySelector('.faq [data-type="faq-nav"]');
    this.faqGroupEls = this.container.querySelectorAll(
      '.faq [data-type="faq-group"]'
    );
    this.search = this.container.querySelector('.faq [data-type="faq-search"]');
    this.searchInput = this.search?.querySelector("input");

    this.listeners = [];

    this.buildNav();
    this.events();
  }

  generateId(title, index = 0) {
    let id = title.replace(/[^\w\s]/gi, "").replace(/\s+/g, "-");
    if (index) id = `${id}-${index}`;
    return id.toLowerCase();
  }

  debounce(fn, delay = 300) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  events() {
    if (this.faqNavEl) {
      this.navClickHandler = (e) => {
        const btn = e.target.closest("button[data-group-id]");
        if (!btn) return;
        this.setActiveGroup(btn.dataset.groupId);
      };
      this.faqNavEl.addEventListener("click", this.navClickHandler);
      this.listeners.push({
        element: this.faqNavEl,
        handler: this.navClickHandler,
        type: "click",
      });
    }

    if (this.searchInput) {
      this.handleSearchInput = this.debounce((e) => {
        const term = e.target.value.trim();
        this.filterFaq(term);
      }, 300);

      this.searchInput.addEventListener("input", this.handleSearchInput);
      this.listeners.push({
        element: this.searchInput,
        handler: this.handleSearchInput,
        type: "input",
      });
    }
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
        .forEach((c) => c.removeAttribute("open"));
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

    this.scrollNavToActive();
  }

  filterFaq(term) {
    const search = term.trim().toLowerCase();
    const allGroups = this.container.querySelectorAll(
      '.faq [data-type="faq-group"]'
    );
    const navItems = this.container.querySelectorAll(".faq__nav-item");

    if (!allGroups.length) return;

    const prevMsg = this.search?.querySelector(".faq__search-no-results");
    if (prevMsg) prevMsg.remove();

    allGroups.forEach((group) => {
      group
        .querySelectorAll(".custom-collapse")
        .forEach((c) => c.classList.remove("found"));
    });
    navItems.forEach((item) => item.classList.remove("found"));

    if (!search) return;

    let foundAny = false;

    allGroups.forEach((group) => {
      const groupId = group.dataset.groupId;
      const collapses = group.querySelectorAll(".custom-collapse");
      let groupHasMatch = false;

      collapses.forEach((collapse) => {
        if (collapse.textContent.toLowerCase().includes(search)) {
          collapse.classList.add("found");
          groupHasMatch = true;
          foundAny = true;
        }
      });

      if (groupHasMatch) {
        const navItem = this.container.querySelector(
          `.faq__nav-item[data-group-id="${groupId}"]`
        );
        if (navItem) navItem.classList.add("found");
      }
    });

    if (!foundAny && this.search) {
      const msg = document.createElement("p");
      msg.className = "faq__search-no-results";
      msg.textContent = this.search.dataset.notFound;
      this.search.appendChild(msg);
    }
  }

  destroy() {
    this.listeners.forEach(({ element, handler, type }) => {
      element.removeEventListener(type, handler);
    });
    this.listeners = [];
    this.faqGroupEls = [];
    this.faqNavEl = null;
    this.searchInput = null;
    this.container = null;
  }
}

export default Faq;
