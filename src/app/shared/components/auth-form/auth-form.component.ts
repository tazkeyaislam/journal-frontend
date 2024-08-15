import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() formGroup!: FormGroup;
  @Input() fields: { label: string, type: string, formControlName: string, errorMessages: { [key: string]: string } }[] = [];
  @Input() submitButtonText: string = '';
  @Input() alternateRoute: { text: string, buttonText: string, route: string } = { text: '', buttonText: '', route: '' };

  @Output() formSubmit = new EventEmitter<void>();

  handleSubmit() {
    this.formSubmit.emit();
  }
}
