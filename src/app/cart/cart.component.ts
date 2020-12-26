import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";

import { CartService } from "../cart.service";
@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  items;
  total;
  checkoutForm;
  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {
    this.checkoutForm = this.formBuilder.group({
      name: "",
      address: ""
    });
  }

  ngOnInit() {
    this.total = 0;
    var i = 0;
    this.items = this.cartService.getItems();

    for (i = 0; i < this.items.length; i++) {
      this.total = this.total + this.items[i].price;
      console.log(this.items[i].price);
    }
  }
  onSubmit(customerData) {
    // Process checkout data here
    this.items = this.cartService.clearCart();
    this.checkoutForm.reset();
    this.total = 0;
    console.warn("Your order has been submitted", customerData);
  }
}
