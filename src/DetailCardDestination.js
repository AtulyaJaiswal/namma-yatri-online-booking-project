import React, { Fragment } from 'react';
import "./Home.css";

const DetailCardDestination = ({detail, setDestinationAddressFromChild}) => {

     const add=detail.place_name.split(",");

     const changeAddress = () => {
          setDestinationAddressFromChild(add[0]+", "+add[1],detail.center);
     }

     return (
          <Fragment>
               {add[1]!==undefined ? (
                    <div className='sourceAddDetailsBlock'>
                         <p onClick={changeAddress}>{add[0]+", "+add[1]}</p>
                    </div>
                    ) : (
                    <div className='sourceAddDetailsBlock'>
                         <p onClick={changeAddress}>{add[0]}</p>
                    </div>
                    )
               }
          </Fragment>
     )
}

export default DetailCardDestination;