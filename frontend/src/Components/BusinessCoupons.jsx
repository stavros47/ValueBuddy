import React, {useState, useEffect} from 'react';
import {Grid, Typography} from '@material-ui/core';
import CouponItem from './CouponItem';

import AuthHelperMethods from './AuthHelperMethods';


const Auth = new AuthHelperMethods("http://localhost:3001"); 

export default function BusinessCoupons(props) {
    const [coupons,setCoupons] = useState([])
   
    useEffect(()=>{        
        
            Auth.fetch({
                method: 'get',
                url: `http://localhost:3001/${props.resourcePath}/Coupons`,
                data: {}
            }).then(res => {
                console.log(res.coupons);
                if(res.coupons){
                    setCoupons(res.coupons);
                }                
            }).catch(e => {
                console.log(e);
            });       
        
       
    }, [props]);

    return (
        <div>
        <Typography className="section_title" variant="h4">
           Coupons
        </Typography>           
             <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
             >
              {coupons.map((coupon) => (
                <CouponItem key={coupon.coupon_id} coupon={coupon}/>              
            ))}
            </Grid>
        </div>      
    );
}