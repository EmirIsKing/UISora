import React from 'react'
import { ThreeDMarquee } from '../ui/shadcn-io/3d-marquee'

const Marquee = () => {


  const images = [
    "/mobile-ui-chat-chatsphere.png",
    "/mobile-ui-crypto-crypto-pulse.png",
    "/mobile-ui-crypto-cryptowave.png",
    "/mobile-ui-fitness-fitTrack.png",
    "/mobile-ui-foodies.png",
    "/mobile-ui-productivity-taskflow.png",
    "/mobile-ui-shop-shopease.png",
    "/mobile-ui-snap-snapverse.png",
    "/mobile-ui-thread-crafter.png",
    "/mobile-ui-snap-snapverse.png",
    "/mobile-ui-shop-shopease.png",
    "/mobile-ui-productivity-taskflow.png",
    "/mobile-ui-thread-crafter.png",
    "/mobile-ui-foodies.png",
    "/mobile-ui-chat-chatsphere.png",
    "/mobile-ui-crypto-crypto-pulse.png",
    "/mobile-ui-crypto-cryptowave.png",
    "/mobile-ui-fitness-fitTrack.png",
    "/mobile-ui-fitness-fitTrack.png",
    "/mobile-ui-thread-crafter.png",
    "/mobile-ui-chat-chatsphere.png",
    "/mobile-ui-shop-shopease.png",
    "/mobile-ui-crypto-cryptowave.png",
    "/mobile-ui-foodies.png",
    "/mobile-ui-productivity-taskflow.png",
    "/mobile-ui-crypto-crypto-pulse.png",
    "/mobile-ui-snap-snapverse.png",
    
    
  ]

  return (
    <div className="py-8 relative overflow-hidden h-80">
      <ThreeDMarquee images={images} />
    </div>
  )
}

export default Marquee
