import React from 'react'
import Link from "next/link";

const ProductHuntBadge = () => {
    return (
       <button className={'flex justify-center items-center'}>
           <Link href="https://www.producthunt.com/products/uisora?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-uisora"
                 target="_blank" rel="noopener noreferrer"><img
               alt="UISora - Build mobile apps fast without getting stuck on UI design | Product Hunt" width="250"
               height="54"
               src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1050635&amp;theme=light&amp;t=1765993318236"/></Link>

       </button>
    )
}
export default ProductHuntBadge
