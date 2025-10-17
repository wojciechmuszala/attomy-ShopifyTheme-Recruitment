class Collapse {
  constructor(container = document) {
    this.container = container;
    this.collapseItems = Array.from(
      this.container.querySelectorAll(".custom-collapse")
    );

    this.listeners = [];

    this.events();
  }

  events() {
    if (this.collapseItems.length > 0) {
      this.collapseItems.forEach((item) => {
        const toggle = item.querySelector('[data-action="toggle"]');
        if (!toggle) return;

        const listener = (event) => this.collapseElement(event, item);
        toggle.addEventListener("click", listener);

        this.listeners.push({ element: toggle, handler: listener });
      });
    }
  }

  collapseElement(event, element) {
    event.preventDefault();

    if (element.hasAttribute("open")) {
      element.removeAttribute("open");
    } else {
      element.setAttribute("open", "");

      if (element.classList.contains("scroll-to-element")) {
        setTimeout(() => {
          const targetPosition = element.offsetTop - 100;
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }, 150);
      }
    }

    if (element.closest(".collapse-close-rest")) {
      this.closeAll(element);
    }
  }

  closeAll(currentElement) {
    const parentGroup = currentElement.closest(".collapse-close-rest");
    if (!parentGroup) return;

    const localCollapses = parentGroup.querySelectorAll(".custom-collapse");

    localCollapses.forEach((item) => {
      if (item !== currentElement && !currentElement.contains(item)) {
        item.removeAttribute("open");
      }
    });
  }

  destroy() {
    this.listeners.forEach(({ element, handler }) => {
      element.removeEventListener("click", handler);
    });
    this.listeners = [];
    this.collapseItems = [];
    this.container = null;
  }
}

export default Collapse;
