import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  template: `
  <div class="avatar" [ngStyle]="{'background-color': backgroundColor}">
    {{ initials }}
  </div>
`,
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
  @Input() initials!: string;
  @Input() backgroundColor!: string;
}
