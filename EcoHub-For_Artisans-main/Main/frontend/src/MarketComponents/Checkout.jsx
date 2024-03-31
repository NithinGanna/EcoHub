import { X } from 'lucide-react'
import  { useState, useEffect } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { MarketNavBar } from './MarketNavBar';


export function Checkout() {

  return (
    <>
    <MarketNavBar/>
    </>
    )
}