import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
    const policies= [
        {
            image: assets.exchange_icon,
            text1: 'Easy Exchange Policy',
            text2: 'We offer hassle free exchange policy'
        },
        {
            image: assets.quality_icon,
            text1: '7 Days Return Policy',
            text2: 'We provide 7 days free return policy'
        },
        {
            image: assets.exchange_icon,
            text1: 'Best Customer Support',
            text2: 'We provide 24/7 customer support'
        },
    ]
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 tex-xs sm:text-sm md:text-base text-gray-700 '>
      {policies.map((policy, i)=>(
        <div key={i}>
        <img src={policy.image} className='w-12 m-auto mb-5'/>
        <p className='font-semibold '>{policy.text1}</p>
        <p className='text-gray-400'>{policy.text2}</p>
      </div>
      ))}
    </div>
  )
}

export default OurPolicy
