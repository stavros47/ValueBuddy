import React from 'react';
import Batches from './Batches';
import Templates from './Templates';
import {Route} from 'react-router-dom';

const FirstContainer = ({match}) => (
    <div>        
         <Route path={`${match.path}/Templates`} exact component={Templates}/>
         <Route path={`${match.path}/Batches`} exact component={Batches} />
         
    </div>
)