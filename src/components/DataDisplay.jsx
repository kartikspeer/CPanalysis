import React from "react";

function DataDisplay({data}){
    return (
        <div className="userInfo">
            <div className="userData">
                <h1>Hello {data.handle} </h1>
                <h2 className="name">{data.firstName} {data.lastName}</h2>
                <h2>Country: <span>{data.country}</span></h2>
                <h2>Organization: <span>{data.organization}</span></h2>
                <h2>Rating: <span>{data.rating}</span></h2>
                <h2>Rank: <span>{data.rank}</span></h2>
                <h2>MaxRating: <span>{data.maxRating} ({data.maxRank})</span></h2>
            </div>
            <div className="divider"></div>
            <div className="userImage" style={{backgroundImage:`url(${data.titlePhoto})`}}>
                {/* <img src={data.titlePhoto} className="image" alt=""/> */}
            </div>
        </div>
    );
}

export default DataDisplay;