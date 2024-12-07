import { ChangeDetectorRef, Component, ElementRef, Input, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';
import { ConfigData } from '../bars/bars.component';

@Component({
  selector: 'app-circle',
  standalone: true,
  imports: [],
  templateUrl: './circle.component.html',
  styleUrl: './circle.component.scss'
})
export class CircleComponent {
  @Input({ required: true }) slug: string = '';
  @Input({ required: true }) label: string = '';
  @Input({ required: true }) x_axis: string[] = [];
  @Input({ required: true }) y_axis: number[] = [];
  @Input({ required: false }) backgroundColor: string[] = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(201, 203, 207, 0.2)',
  ];
  @Input({ required: false }) borderColor: string[] = [
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)',
  ];
  data: ConfigData = {} as ConfigData;
  chart: Chart | null = null;

  constructor(private el: ElementRef, private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if(changes['x_axis'] || changes['y_axis']) {
      this.updateChart();
    }
  }

  private updateChart() {
    this.data = {
      labels: this.x_axis,
      datasets: [
        {
          label: this.label,
          data: this.y_axis,
          backgroundColor: this.backgroundColor,
          borderColor: this.borderColor,
          borderWidth: 1,
        },
      ],
    };
    const canvas = this.el.nativeElement.querySelector(`#${this.slug}`);
    if (canvas) {
      if (this.chart) {
        this.chart.destroy();
      }
      const config = {
        type: 'pie',
        data: this.data,
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
        plugins: [{
          id: `custom_event_${this.slug}`,
          beforeEvent(canvas:any, args:any, pluginOptions:any) {
            const event = args.event;
            if (event.type === 'click') {
              console.log('Clicked', event);

            }
          }
        }]
      };
      this.chart = new Chart(canvas.getContext('2d'), config as any);
      this.cdr.detectChanges();
    } else {
      console.log('Canvas not found');
    }
  }
}
