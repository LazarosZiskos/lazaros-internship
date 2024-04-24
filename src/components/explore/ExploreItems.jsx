import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NftCard from "../home/NftCard.jsx";

const ExploreItems = () => {
  const [exploreNfts, setExploreNfts] = useState([]);
  const [renderedItems, setRenderedItems] = useState(8);
  const [shortValue, setShortValue] = useState("");

  const getData = async () => {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${shortValue}`
    );
    setExploreNfts(data);
  };

  useEffect(() => {
    getData();
  }, [shortValue]);
  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(e) => setShortValue(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {exploreNfts.slice(0, renderedItems).map((nft) => (
        <NftCard
          id={nft.id}
          title={nft.title}
          authorId={nft.authorId}
          authorImage={nft.authorImage}
          price={nft.price}
          likes={nft.likes}
          nftId={nft.nftId}
          key={nft.nftId}
          nftImage={nft.nftImage}
        />
      ))}

      {/* {new Array(8).fill(0).map((_, index) => (
       
      ))} */}

      {renderedItems < exploreNfts.length ? (
        <div className="col-md-12 text-center">
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={() => setRenderedItems(renderedItems + 4)}
          >
            Load more
          </Link>
        </div>
      ) : null}
    </>
  );
};

export default ExploreItems;
