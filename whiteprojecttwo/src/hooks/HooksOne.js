import { useState, useEffect } from "react";

export const HooksOne = (finishelItems) => {
    const [items, setItems] = useState(()=>{
        const seit = localStorage.getItem ('shopingItems');
        return seit? JSON.parse(seit): finishelItems;
    });

    useEffect(()=>{
        localStorage.setItems('shopingItems', JSON.stringify(items))
    },[items]);
    return [items, setItems];
};

