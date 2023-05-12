import { Directive } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { ConsultaCepService } from '../service/consulta-cep.service';
import { Observable, map } from 'rxjs';

@Directive({
  selector: '[validadorCep]',
  providers: [{
      provide: NG_ASYNC_VALIDATORS,
      useExisting: ValidandoCepDirective,
      multi: true
  }]
})

export class ValidandoCepDirective implements AsyncValidator{

  constructor(private consultaCepService: ConsultaCepService) { }
  
  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null>{
    const cep = control.value;

    return this.consultaCepService.getConsultaCep(cep).pipe(map(
      (resultado: any) => resultado.erro ? {'validadorCep': true} : null
    ))
  }
}