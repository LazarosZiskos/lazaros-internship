import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Carousel from "react-multi-carousel";
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
              ? new Array(4).fill(0).map((element, index) => (
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
                  <div className="p-1 overflow-hidden" key={nft.id}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${nft.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator: Monica Lucas"
                        >
                          <img
                            className="lazy"
                            src={nft.authorImage}
                            alt="author-image"
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="de_countdown">5h 30m 32s</div>

                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-facebook fa-lg"></i>
                              </a>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-twitter fa-lg"></i>
                              </a>
                              <a href="">
                                <i className="fa fa-envelope fa-lg"></i>
                              </a>
                            </div>
                          </div>
                        </div>

                        <Link to={`/item-details/${nft.nftId}`}>
                          <img
                            src={nft.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to={`/item-details/${nft.nftId}`}>
                          <h4>{nft.title}</h4>
                        </Link>
                        <div className="nft__item_price">{nft.price} ETH</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{nft.likes}</span>
                        </div>
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

export default NewItems;
