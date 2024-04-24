class RecentProductsSection extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    (this.grid_container = this.querySelector(".recent-products--grid")),
      (this.fragment = new DocumentFragment()),
      (this.spinner = this.querySelector(".recent-products--spinner")),
      (this.storage = JSON.parse(
        localStorage.getItem(theme.local_storage.recent_products)
      )),
      this.storage ? this.load() : (this.style.display = "none");
  }
  load() {
    var t = this.storage.map((t) => this.renderProductItem(t));
    Promise.allSettled(t).then(() => this.productsLoaded());
  }
  async renderProductItem(t) {
    var e,
      r,
      s = await fetch(theme.urls.root + `/products/${t}?view=ajax-item`);
    s.ok &&
      ((e = await s.text()),
      (r = theme.utils.parseHtml(e, ".product-media-container")),
      this.fragment.prepend(r));
  }
  productsLoaded() {
    this.grid_container.prepend(this.fragment),
      theme.transitions.reload("recents"),
      this.grid_container.removeAttribute("style"),
      (this.spinner.style.display = "none");
  }
}
const recentProductsEl = customElements.get("recent-products-root");
recentProductsEl ||
  customElements.define("recent-products-root", RecentProductsSection);
