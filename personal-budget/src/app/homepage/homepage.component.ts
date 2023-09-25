import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import * as d3 from 'd3';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'pg-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, AfterViewInit {

  private svg: any;
  private margin = 50;
  private width = 750;
  private height = 600;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors:any = [];
  private data:any = []

  public dataSource:any = {};

  constructor(private http: HttpClient,private dataServiceService: DataServiceService) {}

  ngAfterViewInit(): void {
    
    this.dataServiceService.getBudgetData()
    .then((res: any)=>{
    this.data = res.pieChartData;
    this.dataSource = res.chartjsData;
    this.createChart();
    this.createSvg();
    this.createColors();
    this.drawChart();
    });
  }

  ngOnInit(): void {
    
  }

  createChart() {
    const ctx = document.getElementById("myChart") as HTMLCanvasElement | null;
    if (ctx) {
        const myPieChart = new Chart(ctx, {
            type: 'pie',
            data: this.dataSource,
            options: {}
        });
    } else {
        console.error('Canvas element with ID "myChart" not found.');
    }
}

private createSvg(): void {
  this.svg = d3.select("#myD3Chart")
  .append("svg")
  .attr("width", this.width)
  .attr("height", this.height)
  .append("g")
  .attr(
    "transform",
    "translate(" + this.width / 2 + "," + this.height / 2 + ")"
  );
}

private createColors(): void {
  this.colors = d3.scaleOrdinal()
  .domain(this.data.map((d:any) => d.title.toString()))
  .range(["#c7d3ec", "#a5b8db", "#879cc4", "#677795", "#5a6782"]);
}

private drawChart(): void {
  // Compute the position of each group on the pie:
  const pie = d3.pie<any>().value((d: any) => Number(d.budget));

  // Build the pie chart
  this.svg
  .selectAll('pieces')
  .data(pie(this.data))
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(0)
    .outerRadius(this.radius)
  )
  .attr('fill', (d: any, i: any) => (this.colors(i)))
  .attr("stroke", "#121926")
  .style("stroke-width", "1px");

  // Add labels
  const labelLocation = d3.arc()
  .innerRadius(100)
  .outerRadius(this.radius);

  this.svg
  .selectAll('pieces')
  .data(pie(this.data))
  .enter()
  .append('text')
  .text((d: any)=> d.data.title)
  .attr("transform", (d: any) => "translate(" + labelLocation.centroid(d) + ")")
  .style("text-anchor", "middle")
  .style("font-size", 15);
}
}
