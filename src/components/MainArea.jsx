import React,{ useEffect, useState } from "react";
import Tags from "./Tags";
import DataDisplay from "./DataDisplay";
import Charts from "./Charts";

//npm install chartjs react-chartjs-2

function CreateArray(size) {
    const array = [];
    for (var i = 0; i < size; i++) {
      array.push(0);
    }
    return array;
}

function MainArea(props){
    

    const [login, setlogin] = useState(false);

    const [data,setdata] = useState({handle: "", lastName:"", firstName:"", organization: "", rank: "", 
                                    maxRating: 0, rating: 0, country:"", maxRank:"",titlePhoto:""});

    const [ratingGraphData, setratingGraphData] = useState({
        labels:[],
        datasets: [
            {
                label: 'Rating',
                fill: false,
                lineTension: 0.5,
                backgroundColor: "#F8DD2E",
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: []
            }
        ]
    })
    
    const [quesGraphData, setquesGraphData] = useState({
        labels:[],
        datasets: [{
            label: "Problems Solved (Rating)",
            backgroundColor: "#16519F",
            borderColor: "rgba(0,0,0,1)",
            borderWidth: 2,
            data: []
        }]
    })
    
    const [levelGraphData, setlevelGraphData] = useState({
        labels:[],
        datasets: [{
            label: "Problems Solved (level)",
            backgroundColor: "#4FCBE9",
            borderColor: "rgba(0,0,0,1)",
            borderWidth: 2,
            data: []
        }]
    })

    const [tagGraphData, settagGraphData] = useState({
        labels:[],
        datasets: [{
            label: "Problem Tags",
            backgroundColor: ['rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)','rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)','rgba(255, 159, 64, 0.2)',
                        "#D2691E","#FF00FF","#D8BFD8","#9932CC","#8B008B","#C71585","#1E90FF",
                        "#FF1493","#FF69B4","#800080","#4169E1","#0000CD","#AFEEEE","#40E0D0",
                        "#00FFFF","#00FF7F","#32CD32","#FFFF00","#DAA520","#CD5C5C","#A52A2A",
                        "#5F9EA0","#AFEEEE","#5F9EA0"],
            borderColor: "rgba(0,0,0,1)",
            borderWidth: 2,
            data: []
        }]
    })

    useEffect(()=>{
        setlogin(props.loginStatus);
    },[props]);

    useEffect(()=>{
        // console.log(login);
        if(login){
            // now how the data will be available to us it is given on codeforces website as example
            // data is returned in the form of an result array
            // in userInfo object
    
            const url = "https://codeforces.com/api/user.info?handles=" + props.username;
            // console.log(url);

            fetch(url)
            .then((res) => res.json())
            .then((res)=>{
                if(res.status === "FAILED"){
                    alert("Invalid Username");
                    return;
                }
                else{
                    setdata((predata)=>{
                        return {...predata, handle:res.result[0].handle};
                    })
                    setdata((predata)=>{
                        return {...predata, lastName:res.result[0].lastName};
                    })
                    setdata((predata)=>{
                        return {...predata, firstName:res.result[0].firstName};
                    })
                    setdata((predata)=>{
                        return {...predata, organization:res.result[0].organization};
                    })
                    setdata((predata)=>{
                        return {...predata, rating: res.result[0].rating};
                    })
                    setdata((predata)=>{
                        return {...predata, maxRating: res.result[0].maxRating};
                    })
                    setdata((predata)=>{
                        return {...predata, rank: res.result[0].rank};
                    })
                    setdata((predata)=>{
                        return {...predata, maxRank: res.result[0].maxRank};
                    })
                    setdata((predata)=>{
                        return {...predata, country: res.result[0].country};
                    })
                    setdata((predata)=>{
                        return {...predata, titlePhoto: res.result[0].titlePhoto};
                    })

                    // for(var i=0;i<res.result[0].length;i++){
                    //     const {name,value} = res.result[0][i];
                    //     setdata((predata)=>{
                    //         return {...predata, [name]:value};
                    //     })
                    // }
                }
                // console.log(res.result[0]);
            })

            const Graph= "https://codeforces.com/api/user.rating?handle="+props.username;
            const arr=[];
            const contests=[];
            fetch(Graph)
            .then(res =>res.json())
            .then(res=>{
                var temp=res.result;
                for(var i=0;i<temp.length;i++){
                    arr.push(temp[i].newRating);
                    contests.push(i+1);
                }
                setratingGraphData({
                    labels: contests,
                    datasets: [
                        {
                            label: 'Rating',
                            fill: false,
                            lineTension: 0.5,
                            backgroundColor: "#F8DD2E",
                            borderColor: 'rgba(0,0,0,1)',
                            borderWidth: 2,
                            data: arr
                        }
                    ]
                })
            })
            console.log(arr);

            
            
            var ratingWise = CreateArray(50); //array for difficulty wise questions
            var levelWise = CreateArray(50); //array for level wise question
            var tagWise = CreateArray(37); //array for tag wise
            var maxRatingSolved = 0;
            var maxLvl = 0;
            const ratingLabel = [];
            const lvlLabel = [];
            const arrTag = [];
            for(const tag in Tags){
                arrTag.push(tag)
            }
            const quesSolved ="https://codeforces.com/api/user.status?handle=" + props.username + "&from=1&count=1000000";
            console.log(quesSolved)

            fetch(quesSolved)
            .then((res) => res.json())
            .then((res) => {
                if(res.status === "FAILED"){
                    return;
                }
                var temp = res.result;
                for(var i=0;i<temp.length;i++){
                    var lvl = temp[i].problem.index.charCodeAt(0)-65;
                    var rate = temp[i].problem.rating;
                    // console.log(lvl);
                    // console.log(rate);
                    if(temp[i].verdict === "OK"){
                        rate = rate - 800;
                        rate= rate/100;
                        // console.log(rate)
                        // console.log(maxRatingSolved)
                        if(rate>maxRatingSolved){
                            console.log('hello')
                            maxRatingSolved = rate;
                        }
                        ratingWise[rate]++;

                        if(lvl>maxLvl){
                            maxLvl = lvl;
                        }
                        levelWise[lvl]++;

                        for(var z=0;z<temp[i].problem.tags.length;z++){
                            // we need to remove all the white spaces from the string fetched from API

                            var s = temp[i].problem.tags[z];
                            s = s.replace(/[-\s]/g, "");
                            tagWise[Tags[s]]++;
                        }
                    }
                }
                // console.log(maxLvl);
                // console.log(maxRatingSolved);

                
                for(var y=0;y<=maxRatingSolved;y++){
                    var str = y*100+800;
                    str = str.toString();
                    ratingLabel.push(str);
                }
                
                for(var j=0;j<=maxLvl;j++){
                    var x = String.fromCharCode(65+j);
                    lvlLabel.push(x);
                }

                setquesGraphData({
                    labels:ratingLabel,
                    datasets: [{
                        label: "Problems Solved (Rating)",
                        backgroundColor: "#16519F",
                        borderColor: "rgba(0,0,0,1)",
                        borderWidth: 2,
                        data: ratingWise
                    }]
                })

                setlevelGraphData({
                    labels:lvlLabel,
                    datasets: [{
                        label: "Problems Solved (Rating)",
                        backgroundColor: "#4FCBE9",
                        borderColor: "rgba(0,0,0,1)",
                        borderWidth: 2,
                        data: levelWise
                    }]
                })

                settagGraphData({
                    labels:arrTag,
                    datasets: [{
                        label: "Problems Solved (Rating)",

                        backgroundColor: ['rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)','rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)','rgba(255, 159, 64, 0.2)',
                        "#D2691E","#FF00FF","#D8BFD8","#9932CC","#8B008B","#C71585","#1E90FF",
                        "#FF1493","#FF69B4","#800080","#4169E1","#0000CD","#AFEEEE","#40E0D0",
                        "#00FFFF","#00FF7F","#32CD32","#FFFF00","#DAA520","#CD5C5C","#A52A2A",
                        "#5F9EA0","#AFEEEE","#5F9EA0"],

                        borderColor: "rgba(0,0,0,1)",
                        borderWidth: 1,
                        data: tagWise
                    }]
                })
            })
            console.log(ratingLabel);
            console.log(lvlLabel);
            console.log(ratingWise);
            console.log(levelWise);
            console.log(tagWise);

            setlogin(false);
        }
    },[data,login,props]);

    // console.log(data);

    return (
        <div className="main-area">
            <DataDisplay data={data}/>
            {/* to set multiple chart in one page with proper aspect ration 
            prefer puuting all {line,bar ,pie} in one div as it is already a div in which canvas is placed 
            putting in separate components is not seems working */}
            <Charts 
                ratingGraphData={ratingGraphData} 
                quesGraphData={quesGraphData} 
                levelGraphData={levelGraphData} 
                tagGraphData={tagGraphData}>
            </Charts>
        </div>
    );
}

export default MainArea;

//example data from API fetch

/** 
{/* {"status":"OK",
"result":[
    {"id":161223325,
    "contestId":1700,
    "creationTimeSeconds":1655641034,
    "relativeTimeSeconds":2147483647,
    "problem":{
        "contestId":1700,
        "index":"B",
        "name":"Palindromic Numbers ",
        "type":"PROGRAMMING",
        "points":1000.0,
        "rating":1100,
        "tags":["constructive algorithms","implementation","math"]
    },
    "author":{
        "contestId":1700,
        "members":[{"handle":"wolfmoon"}],
        "participantType":"PRACTICE",
        "ghost":false,
        "startTimeSeconds":1655629500
    },
    "programmingLanguage":"GNU C++17",
    "verdict":"OK",
    "testset":"TESTS",
    "passedTestCount":22,
    "timeConsumedMillis":15,
    "memoryConsumedBytes":409600
},...]}  */