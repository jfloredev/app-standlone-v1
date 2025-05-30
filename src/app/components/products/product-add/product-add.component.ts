import { ProductsService } from './../../../services/products.service';
import { CategoryService } from './../../../services/category.service';
import { Component, inject, OnInit } from '@angular/core';
import { Category } from '../../../interfaces/categories/category';
import {
  Form,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { first } from 'rxjs';
import { Product } from '../../../interfaces/products/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-add',
  imports: [ReactiveFormsModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css',
})
export class ProductAddComponent implements OnInit {
  categories: Category[] = [];
  product?: Product;
  //2. Formulario
  fmrProducts!: FormGroup;

  categoryService = inject(CategoryService);
  productsService = inject(ProductsService);

  //1.Formularos
  formBuilder = inject(FormBuilder);

  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.getAllCategories();
    this.createFormProduct();
  }

  getAllCategories() {
    this.categoryService.getAll().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log('Complete');
      },
    });
  }

  //1,- Formulario llenarlo

  onSubmit() {
    const title = this.fmrProducts.controls['title'].value;
    const price = this.fmrProducts.controls['price'].value;
    const description = this.fmrProducts.controls['description'].value;
    const categoryId = this.fmrProducts.controls['categoryId'].value;

    const product: Product = {
      title: title,
      price: price,
      description: description,
      categoryId: categoryId,
      images: ['https://placeimg.com/640/480/any'],
    };

    if (price > 5000)
      this.toastr.warning('El producto' + title + 'Es my caro', 'aviso!');

    this.productsService.add(product).subscribe({
      next: (response) => {
        this.product = response;
        this.toastr.success(
          'El producto fue registrado correctamente id = ' + this.product?.id,
          'aviso!'
        );
        console.log('Product created successfully', this.product);
      },
      error: (err) => {
        this.toastr.error('error' + this.product?.id, 'error');
      },
      complete: () => {
        console.log('Complete');
      },
    });

    console.log(product);
  }

  //METODO PARA CREAR EL FORMULARIO

  createFormProduct() {
    this.fmrProducts = this.formBuilder.group({
      title: ['title 123123'],
      price: ['25.25'], //tiene que ser igual al nombre del campo
      description: [
        'Descripcion 2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      ],
      categoryId: ['1'],
    });
  }
}
