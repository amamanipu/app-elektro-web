import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.component.html',
  styleUrls: ['./my-data.component.css']
})
export class MyDataComponent implements OnInit {

  userForm = this.fb.group({
    nombres: [""],
    apellidos: [""],
    documentoidentidad: [""],
    direccion: [""],
    celular: [""],
    email: [""],
  })

  constructor(
    private fb: FormBuilder,
    private readonly us: UserService,
    private router: Router
  ) { }

  __get_user() {
    const token = sessionStorage.getItem("token");
    const id_usuario = sessionStorage.getItem("id_usuario");

    const header = { Authorization: "Bearer " + token };
    const params = { id : id_usuario }

    this.us.__be_get_user(header, params).subscribe((rest: any) => {
      if(rest.issuccess) {
        this.userForm.patchValue({
          nombres: rest.data.nombres,
          apellidos: rest.data.apellidos,
          documentoidentidad: rest.data.documentoidentidad,
          direccion: rest.data.direccion,
          celular: rest.data.celular,
          email: rest.data.email
        })
      }
      else
      {
        alert(rest.errormessage);
      }
    })
  }

  ngOnInit(): void {
    this.__get_user();
  }

}
