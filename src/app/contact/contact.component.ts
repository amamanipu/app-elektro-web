import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm = this.fb.group({
    nombres: ['', [Validators.required, Validators.maxLength(100)]],
    correo: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
    comentarios: ['', [Validators.required, Validators.maxLength(1000)]]
  });

  constructor(
    private fb: FormBuilder,
    private readonly us: ContactService,
    private router: Router) { }

  ngOnInit(): void {
    
  }

  __insert(data: any) {
    this.us.__be_insert_contact(data).subscribe((rest: any) => {
      if(rest.issuccess) {
        alert("Mensaje enviado. Nos pondremos en contacto pronto contigo " + rest.data.nombre);
        this.router.navigate(['login']);
      }
      else
      {
        alert(rest.errormessage);
      }
    })
  }

  __onSubmit() {
    if(this.contactForm.valid) {
        this.__insert(this.contactForm.value);
    }
    else {
      alert("Formulario no valido")
    }
  }

}
