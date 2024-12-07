import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeToggleComponent } from "../theme-toggle/theme-toggle.component";

@Component({
  selector: 'app-navabar',
  standalone:true,
  imports: [RouterLink, ThemeToggleComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavabarComponent {
  toggleNavbar() {
    const navbarLinks = document.querySelector('.navbar-links');
    if (navbarLinks) {
      navbarLinks.classList.toggle('active');
    }
  }
}
