class Collapse {
  constructor() {
    this.collapseItems = document.querySelectorAll(".custom-collapse");

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
}

export default Collapse;
