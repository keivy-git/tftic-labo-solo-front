import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../../../shared/components/form-field/form-field.component';
import { PasswordModule } from 'primeng/password';
import { Button } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { Router } from '@angular/router';
import { LOGIN_FORM } from '../../forms/login.form';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormFieldComponent, PasswordModule, Button],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly notificationService = inject(NotificationService);
  private readonly router = inject(Router);
  private readonly builder = inject(FormBuilder);
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.builder.group(LOGIN_FORM);
  }
  onSubmit() {
    this.authService.login(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/']).then();
        this.notificationService.showSuccess(
          'Connecté avec succès',
          'La connexion s est réaliser avec succès',
        );
      },
      error: (err) => {
        this.notificationService.showError(
          'connexion impossible',
          JSON.stringify(err.error()),
        );
      },
    });
  }
}
