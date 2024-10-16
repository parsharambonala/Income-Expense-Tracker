import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, plugins } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { listTransactionsAPI } from "../../services/transactions/transactionServices";
import { useQuery } from "@tanstack/react-query";
ChartJS.register(ArcElement, Tooltip, Legend);

const TransactionChart = () => {
  const {data,isError,isLoading,isSuccess,refetch}=useQuery({
    queryFn:listTransactionsAPI,
    queryKey:['list-transactions'],
  })
  console.log(data);
  const totals=data?.transactions?.reduce((acc,transaction)=>{
    if(transaction?.type==="income")
        acc.income+=transaction?.amount;
    else 
        acc.expense+=transaction?.amount;
    return acc;
  },{income:0,expense:0});

  const info={
    labels:['income','expense'],
    datasets:[
      {
        label: "Transactions",
        data:[totals?.income,totals?.expense],
        backgroundColor: ["#36A2EB", "#FF6384"],
        borderColor: ["#36A2EB","#FF6384"],
        borderWidth: 1,
        hoverOffset: 4,

      }
    ]
  }

  const options={
    maintainAspectRatio: false,
    plugins: {
      legend:{
        position: 'bottom',
        labels:{
          padding: 25,
          boxWidth:12,
          font:{
            size: 14,
          }
        }
      },
      title:{
        display:true,
        text: "Income vs Expense",
        font:{
          size: 18,
          weight: 'bold',
        },
        padding:{
          top: 10,
          bottom: 30,
        },
      },
    },
    cutout: "70%",
  }

  return (
    <div className="my-8 p-6 bg-white rounded-lg shadow-xl border border-gray-200">
      <h1 className="text-2xl font-bold text-center mb-6">
        Transaction Overview
      </h1>
      <div style={{ height: "350px" }}>
        <Doughnut  data={info} options={options}/>
        </div>
    </div>
  );
};

export default TransactionChart;