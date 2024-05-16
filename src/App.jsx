import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [serachval, setSearchval] = useState("")
  const [generatedimg, setGeneratedimg] = useState("")
  const API_KEY = "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";
  async function query(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
      {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.blob();
    return result;
  }
  // query({ "inputs": "Astronaut riding a horse" }).then((response) => {
  //   // Use image
  // });


  const generateimage = async () => {

    await query({ "inputs": serachval }).then((response) => {
      const imgsrc = URL.createObjectURL(response);
      setGeneratedimg(imgsrc)
      console.log(response);
    })
  }
  return (
    <>
      <br />
      <div className='flex'>

        <div className='w-[40%] p-4 text-center m-auto mt-10  shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]  hover:shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]  ' >
          <h1 className='text-3xl font-semibold'>Image generation app</h1>
          <br />
          <input type="text" className='border-2 border-black w-56' placeholder="Enter text " onChange={(e) => setSearchval(e.target.value)} />
          <br />
          <br />
          <button className='bg-blue-400 p-2 rounded-lg' onClick={generateimage}>Generate Image</button>
        </div>


        <div className='w-[40%] p-4 text-center m-auto mt-10'>
          <img src={generatedimg} alt="" width={600} />
        </div>
      </div>
    </>
  )
}

export default App
