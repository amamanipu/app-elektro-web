import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileService } from 'src/app/services/file.service';
import { GeneralService } from 'src/app/services/general.service';
import { ProductService } from 'src/app/services/product.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  progress: any;
  message: any;
  file: any;
  fileName: any;
  fileType: any;

  elements: any = [];
  headElements = ['ID', 'PRODUCTO', 'CATEGORIA', 'MARCA', 'PRECIO', 'ACCIONES'];
  elementsCategoria: any = [];
  elementsMarca: any = [];
  elementsTamano: any = [];

  productForm = this.fb.group({
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    id_categoria: ['0', [Validators.required]],
    id_marca: ['0', [Validators.required]],
    precio: ['', Validators.required],
    productoDetalles: this.fb.array([
      this.fb.group({
        id_tamano: ['0', [Validators.required]],
        color: ['', [Validators.required]],
        stock: ['', [Validators.required]],
        imagenes: this.fb.array([
          this.fb.group({
            nombre: [''],
            ruta: [[], [Validators.required]],
            tipo: ['png']
          })
        ])
      })
    ]),

  });

  get productoDetallesGroup() {
    return (<FormArray>(<FormGroup>this.productForm).get('productoDetalles')).controls;
  }

  get imagenesGroup() {
    return (<FormArray>((<FormArray>(<FormGroup>this.productForm).get('productoDetalles')).controls[0]).get('imagenes')).controls;
  }

  constructor(
    private fb: FormBuilder,
    private readonly ps: ProductService,
    private readonly gs: GeneralService,
    private readonly fs: FileService,
    private router: Router
  ) { }

  __be_get_products() {
    this.elements = [];
    this.ps.__be_get_products().subscribe((rest: any) => {
      if (rest.issuccess) {
        rest.data.forEach((element: any) => {
          this.elements.push(
            {
              id_producto: element.id_producto,
              nombre: element.nombre,
              categoria: element.categoria,
              marca: element.marca,
              precio: element.precio,
            }
          )
        });
      }
    })
  }

  __be_get_tabla_general(code: any) {
    const params = { code : code }
    this.gs.__be_get_table_general(params).subscribe((rest: any) => {
      if(rest.statusCode == 200) {
        switch (code) {
          case "CATEGORIA":
            rest.data.forEach((element: any) => {
              this.elementsCategoria.push({
                id_categoria: element.id,
                descripcion: element.descripcion
              })
            });
            break;
          case "MARCA":
            rest.data.forEach((element: any) => {
              this.elementsMarca.push({
                id_marca: element.id,
                descripcion: element.descripcion
              })
            });
            break;
          case "TAMANO":
            rest.data.forEach((element: any) => {
              this.elementsTamano.push({
                id_tamano: element.id,
                descripcion: element.descripcion
              })
            });
            break;
          default:
            break;
        }
      }
    })
  }

  __insert(data: any) {
    const token = sessionStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`
    }
    this.ps.__be_insert(data, headers).subscribe((rest: any) => {
      if(rest.issuccess){
        alert("Producto creado con ID: " + rest.data.id );
        this.router.navigate(['home']);
      } else {
        alert(rest.errormessage);
      }
    })
  }

  __onSubmit() {
    console.log(this.productForm.value);
    if(this.productForm.valid) {
      this.__upload(this.file);
    } else {
      alert('Formulario no válido');
    }
  }

  onFileSelect(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const ext =  file.name.split('.').pop();
      const newId = uuidv4();
      this.file = file;
      this.fileName = this.file.name;
      this.fileType = file.type;
      console.log(this.file);
      console.log(this.fileName);
    }
  }

  __upload(file: any) {
    this.fs.__be_upload(file).subscribe(
      data => {
        console.log(data)
      },
      err => {
        console.log(err);
        this.message = "Ocurrio un error: "+err;
      },
      () => {
        console.log('complete')
        this.productForm.value.id_categoria = parseInt(this.productForm.value.id_categoria);
        this.productForm.value.id_marca = parseInt(this.productForm.value.id_marca);
        this.productForm.value.precio = parseFloat(this.productForm.value.precio);
        this.productForm.value.productoDetalles.forEach((element: any) => {
          element.id_tamano = parseInt(element.id_tamano);
          element.stock = parseInt(element.stock);
          element.imagenes.forEach((imagen: any) => {
            imagen.nombre=this.fileName;
            imagen.ruta=`C:\\Fashion21\\productos\\${this.fileName}`; //Ruta del Servidor
            imagen.tipo=this.fileType;
          });
        });
        this.__insert(this.productForm.value)
      }
    )
  }

  __delete(id: any) {
    const token = sessionStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`
    }
    const params = {
      id: id
    }
    this.ps.__be_delete(headers, params).subscribe((rest: any) => {
      if(rest.issuccess){
        alert("Producto eliminado con ID: " + rest.data.id );
        this.__be_get_products();
      } else {
        alert(rest.errormessage);
      }
    })
  }

  __onSubmitDelete(id: any) {
    this.__delete(id);
  }

  ngOnInit(): void {
    this.__be_get_products();
    this.__be_get_tabla_general('CATEGORIA');
    this.__be_get_tabla_general('MARCA');
    this.__be_get_tabla_general('TAMANO');
  }

}
