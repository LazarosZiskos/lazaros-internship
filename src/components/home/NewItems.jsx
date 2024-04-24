import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import Skeleton from "../UI/Skeleton";
import "react-multi-carousel/lib/styles.css";
import NftCard from "./NftCard";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const NewItems = () => {
  const [newNfts, setNewNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    console.log(data);
    setNewNfts(data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Carousel responsive={responsive} infinite={true}>
            {loading
              ? new Array(4).fill(0).map((_, index) => (
                  <div className="p-1 overflow-hidden" key={index}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Skeleton width={60} height={60} borderRadius={20} />
                      </div>

                      <div className="nft__item_wrap">
                        <Skeleton width={280} height={350} borderRadius={10} />
                      </div>
                      <div className="nft__item_info">
                        <div className="nft__item_price pt-1">
                          <Skeleton width={160} height={30} />
                        </div>
                        <Skeleton width={100} height={15} />
                      </div>
                    </div>
                  </div>
                ))
              : newNfts.map((nft) => (
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
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
