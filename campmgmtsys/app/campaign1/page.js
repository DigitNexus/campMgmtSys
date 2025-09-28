"use client"
import { useEffect } from "react";
import { Button } from "@/components/retroui/Button";
import axios from "axios";
import { Label } from "@/components/retroui/Label";

const C1 = () => {
    useEffect(()=>{
        async function countVisit() {
            const data = {url:window.location.href}
            const response = await axios.patch(`http://localhost:5050/api/campaign/visitCount`, data);
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                console.log(message);
                return;
            }
        }
        countVisit();
    },[]);
    async function countInterest() {
        const data = {url:window.location.href}
        const response = await axios.patch(`http://localhost:5050/api/campaign/interestCount`, data);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            console.log(message);
            return;
        }
    }
    return (
      <div className="w-full p-6">
        <Label>Offer 1</Label><br></br>
        <Button onClick={()=>{countInterest()}}>Buy Now!!!</Button>
      </div>
    );
  };
  export default C1;