import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  dataSource: any = {
    datasets: [
      {
        data: [],
        backgroundColor: [
          //'#ffcd56',
          //'#ff6384',
          //'#36a2eb',
          //'#fd6b19',
          '#C70039', //red
          '#FFC300', //yellow
          '#16E738', //green
          '#339EFF', //blue
          '#C416E7', //purple
          '#FF5733', //orange
          '#ABB2B9', //grey
        ],
      },
    ],
    labels: [],
  };
  pieChartData:any=[]
  constructor(private http: HttpClient) {}

  getBudgetData(): Promise<any> {
    if(this.dataSource.datasets[0].data.length==0){
      return new Promise((resolve, reject) => {
        this.http.get('http://localhost:3000/budget').subscribe((res: any) => {
          console.log(res);
          for (var i = 0; i < res.myBudget.length; i++) {
            //Using data from modifiedBudget array in w4budget.json file
            this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
            this.dataSource.labels[i] = res.myBudget[i].title;
            var data = res.myBudget[i];
          }
          this.pieChartData=res.myBudget;
          resolve({
            pieChartData: this.pieChartData,
            chartjsData: this.dataSource
          });
        },error=>{
          reject(error);
        });
      })
    }else{
      return Promise.resolve({
        pieChartData: this.pieChartData,
        chartjsData: this.dataSource
      });
    }

  }
}
