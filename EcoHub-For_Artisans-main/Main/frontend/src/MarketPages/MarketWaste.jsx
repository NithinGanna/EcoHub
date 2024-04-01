import React from 'react'
import { MarketNavBar } from '../MarketComponents/MarketNavBar'
import {WasteAvailableCards} from '../MarketComponents/WasteAvailableCards'


const MarketWaste = () => {
  return (
    <>
    <div className="flex flex-col min-h-screen">
        <MarketNavBar/>
      <div className="flex-grow">
        <WasteAvailableCards />
      </div>
      </div>
    </>
  )
}

export default MarketWaste