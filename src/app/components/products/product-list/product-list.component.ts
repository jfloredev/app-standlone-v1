import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../interfaces/products/product';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  productsService = inject(ProductsService);
  router = inject(Router);

  ngOnInit(): void {
    this.getAllProducts();
  }

  eliminar(product: Product) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'confirma ' + product.title,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productsService.delete(product.id!).subscribe({
          next: (res) => {
            console.log(res);
            if (res === true) {
              Swal.fire({
                title: 'aviso!',
                text: 'El producto fue registrado con existo',
                icon: 'success',
              });
              // this.getAllProducts(); //clasica
              this.products = this.products.filter((p) => p.id != product.id);
            }
          },
          error: (err) => {
            Swal.fire({
              title: 'Error!',
              text: 'There was an error deleting the product.',
              icon: 'error',
            });
          },
        });
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });
      }
    });
  }

  buscar() {}

  limpiar() {}

  nuevo() {
    this.router.navigate(['products/add']);
  }

  modificar(product: Product) {
    this.router.navigate(['products/add', product.id]);
  }

  getAllProducts() {
    this.productsService.getAll().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log('Complete');
      },
    });
  }
}
