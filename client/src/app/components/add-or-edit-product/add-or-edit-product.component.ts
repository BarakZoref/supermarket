import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import ICategory from 'src/app/models/icategory.model';
import { ProductsService } from 'src/app/services/products.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-add-or-edit-product',
  templateUrl: './add-or-edit-product.component.html',
  styleUrls: ['./add-or-edit-product.component.css']
})
export class AddOrEditProductComponent implements OnInit {

  private productData: any = { productName: "", category: "", price: "", imgUrl: "" };
  productForm: UntypedFormGroup;
  categories: ICategory[];
  private productToEditId: number;
  isEdit: boolean = false;
  private subscriptions: Subscription[] = []

  constructor(
    private formBuilder: UntypedFormBuilder,
    private _categoriesService: CategoriesService,
    private _productsService: ProductsService,
    private router: Router
  ) { }


  ngOnInit(): void {
    let categoriesSubscription = this._categoriesService.followCategories().subscribe(categories=>{
      this.categories = categories;
    });

    let productsSubscription = this._productsService.followProduct().subscribe(product =>{
      if(product){
        this.productToEditId = product.id;
        this.initForm(product);
      }
    })

    this.subscriptions.push(categoriesSubscription, productsSubscription);

    this.productForm = this.formBuilder.group({
      productName: [this.productData.productName, [Validators.required, Validators.maxLength(30)]],
      category: [this.productData.category,[Validators.required]],
      price: [this.productData.price,[Validators.required, Validators.min(1), Validators.max(200)]],
      imgUrl: [this.productData.imgUrl,[Validators.required, Validators.maxLength(100)]]
    })
  }

  ngOnDestroy(): void{
    for(let sub of this.subscriptions){
      sub.unsubscribe();
    }
  }


  goBackStartScreen(): void{
    this._productsService.setProduct(null);
    this.router.navigate(['/start-screen/before-shopping']);
  }


  initForm(product): void{
    this.productForm.setValue({
      productName: product.name,
      category: product.categoryId,
      price: product.price,
      imgUrl: product.imgUrl
    });
    this.isEdit = true;
  }

  clear(): void{
    this.productForm.reset();
    this.isEdit = false;
    this._productsService.setProduct(null);
  }

  addNewProductDetailsToServer(): void{
    this.productData = this.productForm.value;
    let productDetailsToBeSent={
      id: null,
      name: this.productData.productName,
      categoryId: this.productData.category,
      price: this.productData.price,
      imgUrl: this.productData.imgUrl
    }
    if(this.isEdit){
      productDetailsToBeSent.id = this.productToEditId;
      this._productsService.editProduct(productDetailsToBeSent);
    }
    else{
      this._productsService.addProduct(productDetailsToBeSent);
    }
    this._productsService.getAllProducts();
    this.clear();
  }


}
