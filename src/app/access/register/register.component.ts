import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required],
    passwordrepeat: ["", Validators.required],
    id_perfil: 3, //Perfil Cliente
    nombres: ["", Validators.required],
    apellidos: ["", Validators.required],
    documentoidentidad: ["", Validators.required, Validators.maxLength(8)],
    direccion: ["", Validators.required],
    celular: ["", Validators.required, Validators.maxLength(9)],
  })

  constructor(
    private fb: FormBuilder,
    private readonly us: UserService,
    private router: Router
  ) { }

  __insert(data: any) {
    this.us.__be_insert_client(data).subscribe((rest: any) => {
      if(rest.issuccess) {
        alert("Usuario creado con ID: " + rest.data.id + " Nombre: " + rest.data.nombre);
        this.router.navigate(['login']);
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
  }

}
