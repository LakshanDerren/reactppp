import logo from './logo.svg';
import { useEffect, useState } from "react"
import axios from "axios"
import './App.css';

function App() {
  const [msg , setmsg] = useState([])
  const [Ivalue , setIvalue] = useState()
 
  // function addmsg(Ivalue){
  //   let list1 = []
  //   list1 = [...msg,Ivalue]
  //   setmsg(list1)
  //   console.log(list1);
    
  // }
  useEffect(()=>{
    getIvalue()
  },[])
    function getIvalue() {
      let list = []
      axios.get("http://localhost:3000/get")
        .then(res=>{
          console.log(res);
          for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index].msg;
            list = [...list,element]
          setmsg(list)
          } 
        })
        .catch(err=>{
          console.log("axios err");
        })
    }
    
    function addIvalue(Ivalue) {
      axios.post("http://localhost:3000/post",{msg:Ivalue})
      .then(()=>{
        console.log("worked");
        getIvalue()
      })
    }

  
  return (
    <>
      <div className="body">
        <div className="midBody">
        <nav>
          <div className="logo">PIGGYROOM</div>
          <div className="text">
            <a href="">log in</a>
            <a href="">Register</a>
          </div>
        </nav>
        <div className="msgarea">
          
    {msg.map(function(object, i){
        return <p key={i}>{object}</p>;
    })}
          
        </div>
        <div className="downarea">
            <input type="text" value={Ivalue} placeholder="say somthin'" onChange={e=>{setIvalue(e.target.value)}}/>
            <button onClick={()=>{addIvalue(Ivalue)
              setIvalue("")
            }}>send</button>
        </div>
        </div>
      </div>
    </>
  )
}

export default App;
