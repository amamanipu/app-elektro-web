import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  elements: any = [];
  headElements = ['ID', 'DESCRIPCIÓN'];

  categoryForm = this.fb.group({
    code: ['CATEGORIA'],
    descripcion: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private readonly gs: GeneralService,
    private router: Router
  ) { }

  __be_get_tabla_general() {
    this.elements = [];
    const params = { code : 'CATEGORIA' }
    this.gs.__be_get_table_general(params).subscribe((rest: any) => {
      if(rest.statusCode == 200) {
        rest.data.forEach((element: any) => {
          this.elements.push({
            id_categoria: element.id,
            descripcion: element.descripcion
          })
        });
      }
    })
  }

  __insert(data: any) {
    this.gs.__be_insert(data).subscribe((rest: any) => {
      if(rest.statusCode == 200){
        alert("Categoria creada correctamente.");
        this.router.navigate(['home']);
      } else {
        alert(rest.errormessage);
      }
    })
  }

  __onSubmit() {
    if(this.categoryForm.valid) {
      this.__insert(this.categoryForm.value)
    } else {
      alert('Formulario no válido');
    }
  }

  ngOnInit(): void {
    this.__be_get_tabla_general();
  }

}
