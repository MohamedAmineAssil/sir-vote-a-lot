import React ,{ useState , useEffect } from 'react';
import Label from '../FormInput/Label/Label';
import LabelWithButton from '../FormInput/LabelWithButton/LabelWithButton';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { useSelector} from 'react-redux';


import { RootState } from '../../store/Store';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip
} from 'chart.js';
import Empty from '../FormInput/Empty/Empty';
import { IPollQuestionOptions } from '../../@types/poll.d';

interface IProps{}

// Register ChartJs
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  ChartDataLabels
);

const PollResult = (props:IProps) => {

  // useSelectot
  const {poll_question_options, poll_main_question, connected_role} = useSelector((state:RootState) => (state.Poll));

  useEffect(()=>{
  },[]);

  // generate label array
  const dynamicLabels = () =>{
    return(poll_question_options.map((poll:IPollQuestionOptions,ind:IPollQuestionOptions["id"])=>{
        return poll.answer;
    }));
  }

  // generate vote rates array
  const dynamicVotes = () =>{
    return(poll_question_options.map((poll:IPollQuestionOptions,ind:IPollQuestionOptions["id"])=>{
        return poll.votes;
    }));
  }

  // generate random colors
  const colorPicker = () =>{
    const colorsPalette = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
    return(poll_question_options.map((poll:IPollQuestionOptions,ind:number)=>{
        return colorsPalette[ind];
    }));
  }

  // generate vote rates array
  const totalVotes = () =>{
    return(poll_question_options.reduce((acc:number,poll:IPollQuestionOptions)=>{
        return acc + poll.votes
    },0));
  }

  // ChartJs display options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
    scales: {
        y: {
          grace: '5%'
        }
    }
  };

  // ChartJs display labels
  const labels = dynamicLabels();
  
  // ChartJs data
  const data = {
    labels,
    datasets: [
      {
        data: dynamicVotes(),
        backgroundColor: colorPicker() ,
        datalabels: {
          align: 'end' as const,
          anchor: 'end' as const,
          formatter: function(value:string, ctx:object) {
              return value;
          },
          color:'black',
          font:{
              size: 14,
              weight:500
          }
        }
      }
    ]
  };

  return (
    <section className='Section' style={(connected_role == "User") ? {maxWidth:"600px",margin:"0px auto"} : {}}>
      { 
          poll_question_options.length < 2 ?
          <div className='SubSection SubSectionCenter'>
                <Empty imgSrc={"./icons/emptyChart.png"} /> 
              </div>
            : 
      
          <div className='SubSection SubSectionCenter'>

            <h1>{poll_main_question}</h1>

            <div className='PollQuestionContainer'>

              <div className='PollQuestion'>
                <Bar options={options} data={data} />
              </div>

            </div>

          </div>
      }
      {
          poll_question_options.length >= 2  &&  <LabelWithButton style={{}}>
                <Label style={{marginRight:"15px"}} content={`Total votes : ${totalVotes()}`}/>
          </LabelWithButton>
      }
    </section>
  )
}

export default PollResult