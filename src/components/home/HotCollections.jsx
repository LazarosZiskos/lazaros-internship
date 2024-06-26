import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

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

const HotCollections = () => {
  const [nftCollection, setNftCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );

    setNftCollection(data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Carousel responsive={responsive} infinite={true}>
            {loading
              ? new Array(4).fill(0).map((_, index) => (
                  <div className="p-1 overflow-hidden" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Skeleton width={314} height={200} borderRadius={10} />
                      </div>
                      <div className="nft_coll_pp">
                        <Skeleton width={60} height={60} borderRadius={20} />
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Skeleton width={200} height={36} />
                      </div>
                      <Skeleton width={100} height={30} />
                    </div>
                  </div>
                ))
              : nftCollection.map((nft) => (
                  <div className="p-1 overflow-hidden" key={nft.id}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img
                            src={nft.nftImage}
                            className="lazy img-fluid"
                            alt="nft-image"
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img
                            className="lazy pp-coll"
                            src={nft.authorImage}
                            alt="nft-author-image"
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{nft.title}</h4>
                        </Link>
                        <span>ERC-{nft.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
