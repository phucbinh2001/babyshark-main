import './App.css';
// import imgages
import src from './images/MENU/COIN.png'
import src2 from './images/MENU/BIG_LOGO.png'
import tele from './images/MENU/TELE.png';
import tele2 from './images/MENU/TELE_2.png';
import twitter from './images/MENU/TW.png';
import boxCode from './images/MENU/CODE.png';
import about from './images/ABOUT/about_box.png';
import about2 from './images/ABOUT/frame.svg';
import token from './images/ABOUT/token.png';
import coin from './images/ABOUT/coin.png';
import air from './images/AIRDROP/AIR.png';
import air2 from './images/AIRDROP/COIN_CENTER.png';
import air3 from './images/AIRDROP/REC.png';
import claimBox from './images/AIRDROP/air_box.png';
import link from './images/AIRDROP/LINK.png';
import claim from './images/AIRDROP/CLAIM.png';
import tokenBox from './images/AIRDROP/TOKEN.png';
import buyNow from "./images/AIRDROP/BUY_NOW.png";
import roadmap from "./images/ROADMAP/ROADMAP.png"
import lv1 from "./images/ROADMAP/LV1.png";
import lv2 from "./images/ROADMAP/LV2.png";
import lv3 from "./images/ROADMAP/LV3.png";
import lv4 from "./images/ROADMAP/LV4.png";
import lv5 from "./images/ROADMAP/LV5.png";
import lv6 from "./images/ROADMAP/LV6.png";
import lv7 from "./images/ROADMAP/LV7.png";
import p1 from "./images/VISIT/p1.png";
import p2 from "./images/VISIT/p2.png";
import partner from "./images/VISIT/PARTNER.png";
import oneCall from "./images/VISIT/JUST_CALL.png";
import five from "./images/VISIT/FIVE_FISH.png";
import contactBox from "./images/MENU/BOX.png";
import contactTitle from "./images/MENU/CONTACT.png";
import visitM from "./images/VISIT/VISIT.png";
import miniLogo from "./images/META_BOX.png";
import menuToggle from "./images/menu.png";

import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { useCallback, useEffect, useState } from 'react';
import useEagerConnect from './hooks/useEagerConnect'
import useInactiveListener from './hooks/useInactiveListener'
import useWallet from './hooks/useWallet'
import { injected } from './utils/web3React';
import { ADDRESS_ZERO, APP_URL } from './configs/constants';
import { useLocation } from 'react-router-dom';
import { isAddress } from './utils/getContract'
import { claimToken, buyToken } from './utils/callContract';
import Clock from "./Clock";

import React from 'react';
import videoSrc from './videos/video.mp4';

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}


function App() {
  const { connector, account, library } = useWeb3React();
  const { connect } = useWallet();
  const location = useLocation();
  const [buyAmount, setBuyAmount] = useState(0.01);
  const [refAccount, setRefAccount] = useState(ADDRESS_ZERO);
  const [refLink, setRefLink] = useState("");
  const [coppyValue, setCoppyValue] = useState("Copy");
  const [showMenu, setShowMenu] = useState(false);

  const [activatingConnector, setActivatingConnector] = useState();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);
  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager || !!activatingConnector);

  useEffect(() => {
    if (location?.search) {
      const query = new URLSearchParams(location.search);
      const ref = query.get("ref");
      if (ref && isAddress(ref)) {
        setRefAccount(ref);
      }
    }
  }, [location]);

  console.log(refAccount)

  const handleConnect = useCallback(() => connect(injected), [connect]);

  const handleClaim = async () => {
    try {
      if (!library || !account) return handleConnect();
      await claimToken(library, account, refAccount);
      // TODO: toast
      alert("Claim success");
    } catch (error) {
      console.error(error);
      if (error.data?.message) {
        const errMessage = error.data?.message
          ?.toString()
          .replace("execution reverted: ", "");
        // TODO: toast
        errMessage && alert(errMessage);
      }
    }
  };

  const handleBuy = async () => {
    if (!library || !account) return alert("Please connect wallet");
    if (!buyAmount || isNaN(buyAmount) || +buyAmount === 0)
      return alert("Enter buy amount");
    try {
      await buyToken(library, account, refAccount, buyAmount);
      // TODO: toast
      alert("Buy success");
    } catch (error) {
      console.error(error);
      if (error.data?.message) {
        const errMessage = error.data?.message
          ?.toString()
          .replace("execution reverted: ", "");
        // TODO: toast
        errMessage && alert(errMessage);
      }
    }
  };

  function showToggle() {
    setShowMenu(true);
  }

  function hideToggle(){
    setShowMenu(false);
  }

  return (
    <div className='App'>
      <div className='logo-mini'>
        <img src={miniLogo} alt="mini" />
      </div>

      <div className='Toggle' onClick={showToggle}>
        <div className='toggle-wrap'>
          <img src={menuToggle} alt="toggle" />
        </div>
      </div>
      {
        showMenu ?
          <div className='Toggle-Menu-Wrap'>
            <ul className='Toggle-Menu'>
              <li onClick={hideToggle}><a href="#about">About</a></li>
              <li onClick={hideToggle}><a href="#token">Tokenomics</a></li>
              <li onClick={hideToggle}><a href="#airdrop">Airdrop</a></li>
              <li onClick={hideToggle}><a href="#buy">Buy now</a></li>
              <li onClick={hideToggle}><a href="#roadmap">Road map</a></li>
              <li onClick={hideToggle}><a href="#nft">NFT Marketplace</a></li>
            </ul>

            <div className='X-wrap' onClick={hideToggle}>
              X
            </div>
          </div> : <></>
      }

      <div className='App-header'>
        <ul className='Menu'>
          <li><a href="#about">About</a></li>
          <li><a href="#token">Tokenomics</a></li>
          <li><a href="#airdrop">Airdrop</a></li>
          <li><a href="#buy">Buy now</a></li>
          <li><a href="#roadmap">Road map</a></li>
          <li><a href="#nft">NFT Marketplace</a></li>
        </ul>
      </div>

      <div className='App-fcontact'>
        <div className='img-wrap'>
          <img src={src} alt="logo"></img>
        </div>
        <div className='img-wrap'>
          <img src={src2} alt="logo"></img>
        </div>
      </div>

      <div className='contact-wrapper'>
        <div className='contact-top'>
          <img src={contactBox} alt="bg" />
          <div className='contact-content'>
            <div className='contact-title'>
              <img src={contactTitle} alt="title" />
            </div>
            <div className='contact-item-wrap'>
              <a className='contact-item' href='https://t.me/metababysharkchanel'>
                <img src={tele} alt="tele" />
              </a>
              <a className='contact-item' href='https://t.me/metababyshark'>
                <img src={tele2} alt="tele" />
              </a>
              <a className='contact-item' href='https://twitter.com/metabebyshark'>
                <img src={twitter} alt="tw" />
              </a>
            </div>
          </div>
        </div>
        <div className='contact-bot'>
          <img src={boxCode} alt="boxcode" />
          <div className='code'>0xd43cacA29CCf737732872e4B8737E30d47B27342</div>
        </div>
      </div>

      <div className='App-about' id="about">
        <div className='about-wrap'>
          <img src={about} alt="about box" />
          <div className='about_content'>
            <p className='t2'>
              <b>WELCOME TO MBShark</b>
              <b>STAKE NFTS TO GET THE RICH</b> <br />
              <p className="content-ab">
                MBShark is a revolutionary name that <br /> includes a hyperinflationary mechainsm. <br />
                In conjuction with a highly compleling <br /> Meme NFTs-SafeMEME and asset, <br /> the longer you hold MBShark, the more exponentially.
              </p>
            </p>
          </div>
        </div>
        <div className='video-wrap'>
          <img src={about2} alt="about box" />
          <video id='vd' controls muted autoPlay>
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>

      <div className='tokenomics' id='token' >
        <a target="blank" href="https://drive.google.com/file/d/1tWwL2mLzgC0i6m02d0tn3YH4ivg7DIUE/view?usp=sharing">
          <img src={coin} id="token1" alt="token" />
        </a>
        <a target="blank" href="https://drive.google.com/file/d/1tWwL2mLzgC0i6m02d0tn3YH4ivg7DIUE/view?usp=sharing">
          <img src={token} id="token2" alt="token" />
        </a>
      </div>

      <div className='airdrop' id='airdrop'>
        <img id='a1' alt="a1" src={air} />
        <img id='a2' alt="a2" src={air2} />
        <img id='a3' alt="a3" src={air3} />
        <div className='claim-wrap'>
          <img src={claimBox} id="air-box" alt="air_box" />
          <div className='claim-content'>
            <h2>Invited Address - Optional</h2>

            <input
              value={refLink}
              onChange={(e) => {
                setRefLink(e.target.value);
              }}
            />

            <div href='#' id="link" onClick={() => {
              if (!refLink) return alert("Please enter a wallet");
              if (!isAddress(refLink)) alert("Enter a valid wallet");
              // if (refLink.includes("?ref=")) return;
              const url = `${APP_URL}/?ref=${refLink}`;
              setRefLink(url);
            }} >
              <img src={link} alt="link" />
            </div>

            <div href='#' id="claim" onClick={handleClaim} >
              <img src={claim} alt="claim" />
            </div>

            <p>
              (*) Press "Claim" to receive 33,333 MBShark <br /> <br />
              (*) Share your link to receive up to 30% commission ! <br /> <br />
              (*) There is no limit on the number of referrals you can invite. <br /> <br />
              (**)Note : YOU MUST CLAIM THE AIRDROP BEFORE USING YOUR REFERRAL <br />
              LINK. IF YOU HAVEN'T CLAIMED THE AIRDROP, YOUR REFERRALS WON'T BE  <br />
              ABLE TO CLAIM THE AIRDROP USING YOUR REFERRAL LINK.
            </p>
          </div>
        </div>

        <div className='token-sale-wrap' id='buy'>
          <img src={tokenBox} id="token-sale" alt="token_sale" />
          <div className='token-sale-content'>
            <h1>TOKEN SALE</h1>
            <p id='eb'>ENTER BNB</p>
            <p className='countdown'>
              {<Clock deadline={"April, 12, 2022"} />}
            </p>
            <input
              value={buyAmount}
              onChange={(e) =>
                !isNaN(e.target.value) &&
                setBuyAmount(e.target.value)
              }
            />
            <div href='#' id='linksale' onClick={handleBuy}>
              <img src={buyNow} alt="token_sale" />
            </div>

            <p>
              (*) Sale Price: 0.1 BNB = 1,000,000 MBShark <br />
              (*) Sale Price: 1 BNB = 10,000,000 MBShark <br />
              (*) PinkSale Round: 1 BNB = 7,000,000 MBShark <br />
              (*) Minimum Buy: 0.1 BNB | Maximum Buy: 5 BNB <br />
              (*) Invite your friends to buy and receive 30% Bonus Reward <br />
              (**) Example: Your friend claims 250,000 MBShark  <br />
              {`==>`} You receive 75,000 MBShark.If Your friend buy 5 BNB <br />
              You receive 1 BNB Reward <br />
            </p>
          </div>
        </div>
      </div>

      <div className='roadmap-wrap' id='roadmap'>
        <img src={roadmap} alt="roadmap" />
      </div>

      <div className='item-wrap'>
        <div className='item item1-wrap'>
          <img src={lv1} alt="fish" />
          <img src={lv2} alt="fish" />
          <img src={lv3} alt="fish" />
        </div>
        <div className='item item2-wrap'>
          <img src={lv4} alt="fish" />
          <img src={lv5} alt="fish" />
          <img src={lv6} alt="fish" />
        </div>
        <div className='item3-wrap'>
          <img src={lv7} alt="fish" />
          <img src={miniLogo} alt="fish" />
        </div>
      </div>

      <div className='title-visit' id='nft'>
        <img src={visitM} alt="market-place" />
      </div>

      <div className='visit'>
        <img src={five} alt="market-place" />
      </div>

      <div className='title-partner'>
        <img src={partner} alt="partner" />
      </div>

      <div className='partner'>
        <div className='partner-wrap'>
          <div className='partner-item'>
            <img src={p1} alt="item" />
          </div>
          <div className='partner-item'>
            <img src={p2} alt="item" />
          </div>
        </div>
      </div>

      <div className='title-call'>
        <img src={oneCall} alt="call" />
      </div>

      <div className='fcontact-wrap'>
        <img src={contactBox} alt="bg" />
        <div className='fcontact-content'>
          <div className='fcontact-title'>
            <img src={contactTitle} alt="title" />
          </div>
          <div className='fcontact-item-wrap'>
            <a className='fcontact-item' href='https://t.me/metababysharkchanel'>
              <img src={tele} alt="tele" />
            </a>
            <a className='fcontact-item' href='https://t.me/metababyshark'>
              <img src={tele2} alt="tele" />
            </a>
            <a className='fcontact-item' href='https://twitter.com/metabebyshark'>
              <img src={twitter} alt="tw" />
            </a>
          </div>
        </div>
      </div>

    </div>
  )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  );
}

