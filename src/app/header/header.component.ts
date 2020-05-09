import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  @Input() headerText: string;
  @Input() showCart: boolean;
  
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToCart() {
    this.router.navigate(["/cart"]);
  }
}
