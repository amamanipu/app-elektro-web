import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  elements: any = [];
  headElements = ['ID', 'NOMBRES', 'APELLIDOS', 'DNI', 'CELULAR', 'EMAIL'];

  userForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required],
    passwordrepeat: ["", Validators.required],
    id_perfil: 2, //Perfil Supervisor
    nombres: ["", Validators.required],
    apellidos: ["", Validators.required],
    documentoidentidad: ["", [Validators.required, Validators.maxLength(8)]],
    direccion: [""],
    celular: ["", [Validators.required, Validators.maxLength(9)]],
  });

  constructor(
    private fb: FormBuilder,
    private readonly us: UserService,
    private router: Router
  ) { }

  __insert(data: any) {
    const token = sessionStorage.getItem("token");
    const header = { Authorization: "Bearer " + token };

    this.us.__be_insert(data, header).subscribe((rest: any) => {
      if(rest.issuccess) {
        alert("Usuario creado con ID: " + rest.data.id + " Nombre: " + rest.data.nombre);
        this.router.navigate(['home']);
      }
      else
      {
        alert(rest.errormessage);
      }
    })
  }

  __be_get_users() {
    const token = sessionStorage.getItem("token");
    const header = { Authorization: "Bearer " + token };

    this.us.__be_get_users(header).subscribe((rest: any) => {
      if(rest.issuccess) {
        this.elements = rest.data
      }
      else
      {
        alert(rest.errormessage);
      }
    })
  }

  __onSubmit() {
    if(this.userForm.valid) {
      if (this.userForm.value.password == this.userForm.value.passwordrepeat) {
        this.userForm.value.id_perfil = parseInt(this.userForm.value.id_perfil);
        this.__insert(this.userForm.value);
      }
      else
      {
        alert("Las contraseñas deben ser iguales")
      }
    } else {
      alert("Formulario no valido")
    }
  }

  ngOnInit(): void {
    this.__be_get_users();
  }

}
