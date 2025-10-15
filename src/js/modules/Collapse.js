class Collapse {
  constructor() {
    this.collapseItems = document.querySelectorAll('[data-role="collapse"]');

    this.events();
  }

  events() {
    if (this.collapseItems.length > 0) {
      this.collapseItems.forEach((item) => {
        const toggle = item.querySelector('[data-action="toggle"]');

        toggle &&
          toggle.addEventListener("click", (event) =>
            this.collapseElement(event, item)
          );
      });
    }
  }

  collapseElement(event, element) {
    event.preventDefault();

    if (element.hasAttribute("open")) {
      element.removeAttribute("open");
    } else {
      element.setAttribute("open", "");

      if (element.hasAttribute("data-scroll")) {
        setTimeout(() => {
          const targetPosition = element.offsetTop;
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }, 150);
      }
    }

    if (element.parentElement.hasAttribute("data-collapse-close-rest")) {
      this.closeAll(element);
    }
  }

  closeAll(currentElement) {
    this.collapseItems.forEach((item) => {
      item !== currentElement && item.removeAttribute("open");
    });
  }
}

export default Collapse;
