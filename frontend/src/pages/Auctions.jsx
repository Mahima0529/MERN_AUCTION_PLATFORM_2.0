import Card from '@/custom-components/Card'
import Spinner from '@/custom-components/Spinner'
import React from 'react'
import { useSelector } from 'react-redux'

const Auctions = () => {
    const {allAuctions, loading}= useSelector((state)=>state.auction)
  return (
    <>
    {
      loading ? (
        <Spinner/>
      )  :(
            <article  className="
    min-h-screen 
    flex flex-col justify-center items-center
    bg-gradient-to-br from-[#FFD8A8] via-[#FFDAB9] to-[#F8D4DD]
    px-6 py-10 space-y-6
    w-[100vw] ml-0
    md:w-[100vw] 
    lg:w-[80vw] lg:ml-[20vw]
    overflow-y-auto
    transition-all duration-300
  ">
                 <section className='my-4'>
                 <h1
              className={`text-[#d6482b] text-xl font-bold mb-2 min-[480px]:text-4xl md:text-4xl xl:text-3xl 2xl:text-3xl`}
            >
              Auctions
            </h1>
                     <div className="flex flex-wrap gap-6">
              {allAuctions.map((element) => (
                <Card
                  title={element.title}
                  startTime={element.startTime}
                  endTime={element.endTime}
                  imgSrc={element.image?.url}
                  startingBid={element.startingBid}
                  id={element._id}
                  key={element._id}
                />
              ))}
            </div>
                 
                  </section>
            </article>
      )
    }
    </>
  )
    
  
}

export default Auctions