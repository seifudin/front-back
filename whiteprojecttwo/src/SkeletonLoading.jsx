import React, { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function SkeletonLoading (){

    const[skelet, setSkelet] = useState (true);

    useEffect (()=>{
        const timer = setTimeout (()=> setSkelet(false), 3000);
        return()=> clearTimeout (timer)

    },[]);
    return(
         <div>
            <p>эта страница загрузится за 3 секунды</p>
            {skelet? (
                <div>
                    <Skeleton
                    hight={100} width={100} style={{marginTop: '5px 5px 0px 0px'}}
                    />

                    <Skeleton
                    hight={100} width={100} style={{marginTop: '5px 5px 0px 0px'}}
                    />
                </div>
            ):(
                <div>
                    <p>страница загружена</p>
                </div>
            )}
         </div>
    );

} export default SkeletonLoading;

