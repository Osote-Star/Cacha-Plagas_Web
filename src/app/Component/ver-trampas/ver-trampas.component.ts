import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ver-trampas',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './ver-trampas.component.html',
  styleUrl: './ver-trampas.component.css'
})
export class VerTrampasComponent {
  products = Array(8).fill({
    id: '9347',
    name: 'RAT-TRAP',
    description: 'Especializada en ratas, esta trampa es simple y efectiva, cumple su objetivo gracias a su tamaño y materiales resistentes.',
    imageUrl: '/assets/Trampa.png'
  });
}
