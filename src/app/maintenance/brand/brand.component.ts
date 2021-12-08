import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  elements: any = [];
  headElements = ['ID', 'DESCRIPCIÓN'];

  brandForm = this.fb.group({
    code: ['MARCA'],
    descripcion: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private readonly gs: GeneralService,
    private router: Router
  ) { }

  __be_get_tabla_general() {
    this.elements = [];
    const params = { code : 'MARCA' }
    this.gs.__be_get_table_general(params).subscribe((rest: any) => {
      if(rest.statusCode == 200) {
        rest.data.forEach((element: any) => {
          this.elements.push({
            id_marca: element.id,
            descripcion: element.descripcion
          })
        });
      }
    })
  }

  __insert(data: any) {
    this.gs.__be_insert(data).subscribe((rest: any) => {
      if(rest.statusCode == 200){
        alert("Marca creada correctamente.");
        this.router.navigate(['home']);
      } else {
        alert(rest.errormessage);
      }
    })
  }

  __onSubmit() {
    if(this.brandForm.valid) {
      this.__insert(this.brandForm.value)
    } else {
      alert('Formulario no válido');
    }
  }

  ngOnInit(): void {
    this.__be_get_tabla_general();
  }

}
