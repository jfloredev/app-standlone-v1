import {
  Component,
  inject,
  LOCALE_ID,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../interfaces/products/product';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import {
  CurrencyPipe,
  DatePipe,
  JsonPipe,
  UpperCasePipe,
  registerLocaleData,
} from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { ShorTextPipe } from '../../../pipes/shor-text.pipe';
import {
  PageChangedEvent,
  PaginationComponent,
  PaginationModule,
} from 'ngx-bootstrap/pagination';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';

registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-product-list',
  imports: [
    ReactiveFormsModule,
    UpperCasePipe,
    CurrencyPipe,
    DatePipe,
    ShorTextPipe,
    FormsModule,
    PaginationModule,
    ModalModule,
    JsonPipe,
  ],
  templateUrl: './product-list.component.html',
  providers: [{ provide: LOCALE_ID, useValue: 'es' }, BsModalService],
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  productSelect?: Product;
  pagedItems: Product[] = [];

  productsService = inject(ProductsService);
  router = inject(Router);
  modalService = inject(BsModalService);
  modalRef?: BsModalRef;

  frmProduct!: FormGroup;

  hoy: Date = new Date();

  itemsPerPage: number = 10;
  currentPage: number = 1;

  formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.createFormProduct();
    this.getAllProducts();
    // this.findByTitle('Comfort');
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

  buscar() {
    this.findByTitle();
  }

  visualizar(product: Product, templateVisualizarProduct: TemplateRef<void>) {
    this.productSelect = product;
    this.openModal(templateVisualizarProduct);
  }

  limpiar() {
    this.frmProduct.reset();
    this.getAllProducts();
  }

  nuevo() {
    this.router.navigate(['products/add']);
  }

  modificar(product: Product) {
    this.router.navigate(['products/add', product.id]);
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }

  findByTitle() {
    const title = this.frmProduct.controls['title'].value;
    this.productsService.findByTitle(title).subscribe({
      next: (products) => {
        this.products = products;
        this.pagedItems = this.products.slice(0, this.itemsPerPage);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log('Complete');
      },
    });
  }

  getAllProducts() {
    this.productsService.getAll().subscribe({
      next: (products) => {
        this.products = products;
        this.pagedItems = this.products.slice(0, this.itemsPerPage);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log('Complete');
      },
    });
  }

  createFormProduct() {
    this.frmProduct = this.formBuilder.group({
      title: ['title'],
    });
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = startItem + event.itemsPerPage;
    this.pagedItems = this.products.slice(startItem, endItem);
  }
}
