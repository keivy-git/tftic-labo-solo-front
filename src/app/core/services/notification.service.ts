import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly messageService = inject(MessageService);

  private show(
    summary: string,
    detail: string,
    severity: string,
    life: number = 1000,
  ) {
    this.messageService.add({
      severity,
      summary,
      detail,
      life,
    });
  }
  showSuccess(summary: string, detail: string) {
    this.show(summary, detail, 'success');
  }
  showError(summary: string, detail: string) {
    this.show(summary, detail, 'error', 5000);
  }
}
