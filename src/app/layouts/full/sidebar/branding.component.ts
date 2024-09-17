import { Component } from '@angular/core';
@Component({
  selector: 'app-branding',
  template: `
    <div class="branding">
      <a href="/">
        <img
          src="./assets/images/logos/LOGO.svg.png"
          class="align-middle m-2"
          alt="logo"
          style="width: 200px; height: auto;"
        />
      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor() {}
}
