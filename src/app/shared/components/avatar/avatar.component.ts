import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  template: `
  <div class="avatar" [ngStyle]="{'background-color': backgroundColor}">
    {{ initials }}
  </div>
`,
  styles: [`
  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 14px;
  }
`]
})
export class AvatarComponent {
  @Input() initials!: string;
  @Input() backgroundColor!: string;
}
