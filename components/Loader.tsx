import React from 'react'

const Loader = ({ className }: { className?: string }) => {

    return (
        <div className={`new-loader ${className}`}></div>
    );
};

export default Loader;
