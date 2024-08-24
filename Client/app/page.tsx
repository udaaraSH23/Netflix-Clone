import React from "react";
import "./page.css";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <div className="main-wrapper">
        <div className="gradient">
          <header id="navbar" className="get-navbar">
            <div>
              <Link href="/" className="logo">
                {" "}
                Netflix
              </Link>
            </div>
            <div>
              <Link href="/signIn" className="sign-in">
                {" "}
                Sign In
              </Link>
            </div>
          </header>

          <div id="hero" className="hero-sec">
            <h1>Unlimited movies, TV shows, and more</h1>
            <h2>Watch anywhere. Cancel anytime.</h2>
            <p>
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>
            <div id="get-started">
              <div className="input-element">
                <input type="text" id="username" required />
                <label className="floating-label" htmlFor="username">
                  Email
                </label>
              </div>
              <button className="get-started-btn">
                <a href="/getStarted" className="sign-in">
                  Get Started &gt;
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tiles */}
      <div className="hr-line"></div>
      <div id="tiles-container" className="grid-container">
        <div className="tile">
          <img
            src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg"
            alt="Enjoy on your TV."
          />
          <div>
            <h3>Enjoy on your TV.</h3>
            <p>
              Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV,
              Blu-ray players, and more.
            </p>
          </div>
        </div>
        <div className="hr-line"></div>
        <div className="tile">
          <img
            src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile-in.png"
            alt="Download your shows to watch offline."
          />
          <div>
            <h3>Download your shows to watch offline.</h3>
            <p>
              Save your favorites easily and always have something to watch.
            </p>
          </div>
        </div>
        <div className="hr-line"></div>
        <div className="tile">
          <img
            src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/boxshot.png"
            alt="Watch everywhere."
          />
          <div>
            <h3>Watch everywhere.</h3>
            <p>
              Stream unlimited movies and TV shows on your phone, tablet,
              laptop, and TV without paying more.
            </p>
          </div>
        </div>
      </div>
      <div className="hr-line"></div>
      <div id="frequently" className="frequently">
        <div className="faq">
          <label>
            <div className="que">
              <h3>What is Netflix?</h3>
              <span>+</span>
            </div>
            <input type="checkbox" id="toggle" className="toggle-checkbox" />
            <p className="ans">
              Netflix is a streaming service that offers a wide variety of
              award-winning TV shows, movies, anime, documentaries, and more on
              thousands of internet-connected devices.
            </p>
            <p className="ans">
              You can watch as much as you want, whenever you want without a
              single commercial – all for one low monthly price. There's always
              something new to discover and new TV shows and movies are added
              every week!
            </p>
          </label>

          <label>
            <div className="que">
              <h3>How much Netflix Cost?</h3>
              <span>+</span>
            </div>
            <input type="checkbox" id="toggle1" className="toggle-checkbox" />
            <p className="ans">
              Watch Netflix on your smartphone, tablet, Smart TV, laptop, or
              streaming device, all for one fixed monthly fee. Plans range from
              USD 2.99 to USD 9.99 a month. No extra costs, no contracts.
            </p>
          </label>

          <label>
            <div className="que">
              <h3>Where Can I Watch?</h3>
              <span>+</span>
            </div>
            <input type="checkbox" id="toggle2" className="toggle-checkbox" />
            <p className="ans">
              Watch anywhere, anytime. Sign in with your Netflix account to
              watch instantly on the web at netflix.com from your personal
              computer or on any internet-connected device that offers the
              Netflix app, including smart TVs, smartphones, tablets, streaming
              media players, and game consoles.
            </p>
            <p className="ans">
              You can also download your favorite shows with the iOS or Android
              app. Use downloads to watch while you're on the go and without an
              internet connection. Take Netflix with you anywhere.
            </p>
          </label>

          <label>
            <div className="que">
              <h3>How do I Cancel?</h3>
              <span>+</span>
            </div>
            <input type="checkbox" id="toggle3" className="toggle-checkbox" />
            <p className="ans">
              Netflix is flexible. There are no pesky contracts and no
              commitments. You can easily cancel your account online in two
              clicks. There are no cancellation fees – start or stop your
              account anytime.
            </p>
          </label>

          <label>
            <div className="que">
              <h3>What can I watch on Netflix?</h3>
              <span>+</span>
            </div>
            <input type="checkbox" id="toggle4" className="toggle-checkbox" />
            <p className="ans">
              Netflix has an extensive library of feature films, documentaries,
              TV shows, anime, award-winning Netflix originals, and more. Watch
              as much as you want, anytime you want.
            </p>
          </label>

          <label>
            <div className="que">
              <h3>Is Netflix good for Kids?</h3>
              <span>+</span>
            </div>
            <input type="checkbox" id="toggle5" className="toggle-checkbox" />
            <p className="ans">
              The Netflix Kids experience is included in your membership to give
              parents control while kids enjoy family-friendly TV shows and
              movies in their own space.
            </p>
            <p className="ans">
              Kids profiles come with PIN-protected parental controls that let
              you restrict the maturity rating of content kids can watch and
              block specific titles you don’t want kids to see.
            </p>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Home;
