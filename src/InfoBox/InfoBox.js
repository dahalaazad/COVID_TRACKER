import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

import './InfoBox.css';

function InfoBox({title, cases, isRed,isGreen,isBlack,active, total, ...props}) {
    return (
        <Card onClick = {props.onClick}
              className = {`infoBox ${active && 'infoBox--selected'} 
              ${isRed && 'infoBox--red'} 
              ${isGreen && 'infoBox--green'}
              ${isBlack && 'infoBox--black'}`}>
            <CardContent>
                {/*Title*/}
                    <Typography color="textSecondary">
                        {title}
                    </Typography>
                {/* +120K number of cases*/}
                    <h2 className = 'infoBox__cases'>{cases} </h2>
                {/*1.2M Total*/}
                    <Typography className='infoBox__total' color="textSecondary">
                        {total} Total
                    </Typography>
            </CardContent>
        </Card>
    );
}

export default InfoBox;