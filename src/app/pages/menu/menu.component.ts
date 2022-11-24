import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Menu } from '../../interfaces/menu-interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {
  
  @Input() menu: Menu = [];

  constructor() { }

  ngOnInit(): void {
  }

}
