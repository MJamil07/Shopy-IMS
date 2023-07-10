import React from 'react'
import './Stylesheet/style.css'


function Display ({caption , data}) {

  console.log(caption , data);
  return (
    <div>
      <div className='table-info'>
          <table className='table table-responsive table-striped'>
              <caption> {caption} : {data && data.length} </caption>
              <thead className='thead' style={{color : 'gray'}}>
                <tr>
                  {
                        data && Object.keys(data[0]).map((keys , index)=> {
                               <th key={index} scope="col">{keys}</th>
                        })
                  }
                </tr>
              </thead>
              <tbody>
                {data && data.map((data , index) => {

                        return <tr key={index} style={data.isActive ? {height : 50} : {background : 'red' , opacity : '0.3'} }>
                              {Object.keys(data).map((keys , index)=> {
                                    <td >{data[keys]}</td>
                              })}
                        </tr>
                })}
              </tbody>
          </table>
        </div>
    </div>
  )
}

export default Display